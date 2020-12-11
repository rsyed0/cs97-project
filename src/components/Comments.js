import React from "react";
import firebase from "../firebase";

class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.currentUser = firebase.auth().currentUser;
        this.state = {
            commentText: "",
        }
    }

    handleCommentInputChange = (event) => {
        this.setState({commentText: event.target.value});
        console.log("Comments::", event.target.value, this.currentUser.email, this.props.post);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        let body = this.state.commentText;
        let username = this.currentUser.email;
        let comment = { body: body, username: username };
        let post = this.props.post;
        
        const postDoc = firebase.firestore().collection("posts").doc(post.postId);

        postDoc.update({
            comments: firebase.firestore.FieldValue.arrayUnion(comment)
        })
    }

    render() {
        // set comments to empty array if post doesn't have any comments
        let comments = this.props.post.comments || [];
        return (
        <div>
            <h3>
                Comments
            </h3>
            <form onSubmit={this.handleSubmit}>
                 Comment:
                <input type="text" value={this.state.commentText} onChange={this.handleCommentInputChange} placeholder="Comment Here" />
            </form>
            <div>
                {comments.map((comment) =>
                        <p>{comment.username}: {comment.body}</p>

                    // <div className="comment" key={comment.body}>
                    //     <p>{comment.username}: {comment.body}</p>
                    // </div>
                )}
            </div>
        </div>
        )
    }
}



export default Comments;