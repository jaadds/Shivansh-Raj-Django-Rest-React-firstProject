import React from "react";
import "../styles/post.css"

function Posts({post, onDelete}) {
    const formatttedDate = new Date(post.time).toLocaleDateString("en-US")
    return (
        <div className="post-container">
            <p className="post-title">{post.title}</p>
            <p className="post-content">{post.content}</p>
            <p className="post-data">{formatttedDate}</p>
            <button className="delete-button" onClick={()=>onDelete(post.id)}>
                DELETE
            </button> 
        </div>
    )
    
}
export default Posts