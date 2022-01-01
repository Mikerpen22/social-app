import React from 'react'
import "./post.css"
import { More } from "@material-ui/icons"
import { ThumbUp } from "@material-ui/icons"
import { ThumbDown } from "@material-ui/icons"
import { IconButton } from '@material-ui/core'


export default function Post(props) {
    // console.log(props)
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src="/assets/profile_pic_1.jpg" className="postProfilePic" alt=""/>
                        <span className="postUsername">user{props.posts.userId}</span>
                        <span className="postTime">x mins ago</span>
                    </div>
                    <div className="postTopRight"></div>
                    <IconButton>
                        <More className="postMoreOptions"/>
                    </IconButton>
                </div>
                
                <div className="postCenter">
                    <span className="postText">{props.posts? props.posts.body: ""}</span>
                    <img className="postImg" src="assets/post_img_1.jpg" alt=""/>
                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUp className="reactionIcon" htmlColor="blue"/>
                        <ThumbDown className="reactionIcon" htmlColor="red"/>
                        <span className="thumbUpCounter">XXX says: It's cool!</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">z comments</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
