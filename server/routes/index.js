
/* DEFAULT CODE */
const express = require('express');
/*var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;*/

const Hashids = require('hashids/cjs');
const hashids = new Hashids();

const HASH_LEN = 10;
function generateId(upload){
    return hashids.encode(upload.name).substring(0,HASH_LEN);
}

function fileExt(fName){
    return fName.substring(fName.lastIndexOf('.')+1);
}

function parseMetadata(upload){

    // metadata format in upload name: <timestamp>_<lat>_<lng>_<uid>.mp4
    let fName = upload.name;
    let metaTokens = fName.substring(0,fName.lastIndexOf('.')).split('_');

    let time = parseInt(metaTokens[0]);
    let lat = parseFloat(metaTokens[1].replace('p','.'));
    let lng = parseFloat(metaTokens[2].replace('p','.'));
    let uid = metaData[3];

    return [time,lat,lng,uid];
}

/* FROM https://nodejs.dev/learn/reading-files-with-nodejs */
// used to respond to GET requests, move to routes/browse.js (?)
const os = require('os');
const fs = require('fs');
const DB_PATH = '../data.txt';

let database = [];

function queryDatabase(minLat, maxLat, minLng, maxLng){

    let found = [];

    const fData = fs.readFileSync(DB_PATH, 'utf8');
    const fLines = fData.split(os.EOL);

    fLines.forEach((line) => {
        let metaTokens = line.split(',');

        let time = parseInt(metaTokens[0]);
        let lat = parseFloat(metaTokens[1]);
        let lng = parseFloat(metaTokens[2]);
        let uid = metaData[3];
        let hash = metaData[4];

        let fMeta = [time,lat,lng,uid,hash];

        if (minLat <= lat && lat <= maxLat && minLng <= lng && lng <= maxLng)
            found.push(fMeta);

        database.push(fMeta);
    });

    return found;

}

/* FROM https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node */
function addToDatabase(upload, hashid){

    let fData = parseMetadata(upload);
    let text = fData.toString()+","+hashid+"\n";

    fs.appendFile(DB_PATH, text, function (err) {
        if (err) throw err;
        console.log('added file to database');
    });

}

/* FROM https://attacomsian.com/blog/uploading-files-nodejs-express */
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3000;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);

// TODO move this to a separate file routes/upload.js (?)
// respond to HTTP POST request to upload a file
app.post('/upload-video', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'failed to receive video'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let upload = req.files.upload;

            const hashid = generateId(upload);
            const storageName = hashid + '.' + fileExt(upload.name);

            const fData = parseMetadata(upload);
            addToDatabase(upload, hashid);
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            upload.mv('../uploads/' + storageName);

            //send response
            res.send({
                status: true,
                message: 'uploaded video successfully',
                data: {
                    name: upload.name,
                    mimetype: upload.mimetype,
                    size: upload.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// TODO move this to a separate file routes/browse.js (?)
// respond to HTTP GET request to query database for local video posts
app.get('/query-video', async (req, res) => {

    let minLat = req.body.minLat;
    let maxLat = req.body.maxLat;
    let minLng = req.body.minLng;
    let maxLng = req.body.maxLng;

    let found = queryDatabase(minLat,maxLat,minLng,maxLng);

    // TODO change this to send files in ../uploads/ in buffer format
    res.send({
        found: found
    });
});
