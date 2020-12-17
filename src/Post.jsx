import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postId, user, username, caption, imgUrl }) {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="abrahag40"
          scr="/static/images/avatar/1.jpg"
        />
        <h3> {username} </h3>
      </div>

      <img className="post__image" src={imgUrl} alt="" />

      <h4 className="post__text">
        {" "}
        <strong> {username} </strong> {caption}
      </h4>

      <div className="post__sectionComents">
        {comments.map(({ comment }) => (
          <p className="post__comments">
            <strong> {comment.username} </strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form>
          <div className="d-flex post__comentsBox">
            <input
              className="post__input"
              type="text"
              placeholder="Agregar comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="post__button"
              disabled={!comment}
              type="submit"
              onClick={postComment}
            >
              Publicar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Post;
