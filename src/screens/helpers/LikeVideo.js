import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import firebase from "../../firebase";

let currently_liked = false;

function LikeVideo(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)

    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    // } else {
    //     variable = { commentId: props.commentId, userId: props.userId }
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
    }, [props.videoId])


    const onLike = () => {
        //increase likes by 1
        const post_ref = firebase.firestore().collection("posts");
        if (currently_liked === false) {
            post_ref.doc(props.videoId).update({
               likes: (Likes + 1)
            });
            currently_liked = true;
            setLikes(Likes+1);
        } else {   //unlike, decrease likes by 1
            post_ref.doc(props.videoId).update({
                likes: (Likes - 1)
            });
            currently_liked = false;
            setLikes(Likes-1);
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
            </span>
        </React.Fragment>
    )
}

export default LikeVideo