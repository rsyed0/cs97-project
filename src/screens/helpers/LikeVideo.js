import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import firebase from "../../firebase";

function LikeVideo(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    let variable = {};
    const currently_liked = false;

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    


    useEffect(() => {
        //get video metedata from firestore to get number of video likes
        const post_ref = firebase.firestore().collection("posts");
        post_ref.doc(props.videoId).get().then(function(doc) {
            //get number of likes on video
            setLikes(doc.data().likes)

            //if I already click this like button or not 
            if (currently_liked === false) {
                setLikeAction('liked')
            }
        });
        

    }, [currently_liked])

    const onLike = () => {
        //increase likes by 1
        if (LikeAction === null) {
            

        } else {   //unlike, decrease likes by 1
            
        }

    }



    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <LikeOutlined theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
        </React.Fragment>
    )
}

export default LikeVideo