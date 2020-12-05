import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

function LikeVideo(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    


    useEffect(() => {

        

    }, [])

    const onLike = () => {

        if (LikeAction === null) {


        } else {

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