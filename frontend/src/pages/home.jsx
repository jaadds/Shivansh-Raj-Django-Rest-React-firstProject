import {useState, useEffect } from 'react'
import api from "../api"
import Posts from '../components/Posts'
import "../styles/home.css"
function home() {
  const [post, setPost] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState(" ")

  useEffect(() => {
    
    getPost();
  },[])

  const getPost = () => {
    api.get("/api/post/")
    .then((res) => res.data)
    .then((data) => {setPost(data); console.log(data)}).catch((err) => console.log(err));
  }

  const deletePost = (id) => {
    api.delete(`api/post/delete/${id}/`)
    .then((res) => {
      if(res.status === 204) {console.log("Post deleted"); getPost()}
      else alert("Failed to delete the Post!!")
    }).catch((err) => console.log(err))
    getPost()
  }

  const createPost = (e) => {
    e.preventDefault();
    api.post("/api/post/", {content, title}).then((res) => {
      if (res.status == 201) {console.log("Post created."), getPost()}
      else console.log("Failed to create the Post!!")        
    }).catch((err) => console.log(err))
    getPost()
  }

  return (
    <>
      <div>Home</div>
      <h1>All POSTS----</h1>
        {post.map((Post) => <Posts post={Post} onDelete={deletePost} key={Post.id} />)}
        <br />
        <br />
        <form onSubmit={createPost}>
        <label htmlFor='title'>TITLE:</label>
        <br />
        <br />
        <input 
          input = "text"
          id = "title"
          name = "title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value = {title}
        />
        <br />
        <br />
        <label htmlFor='content'>CONTENT:</label>
        <br />
        <textarea 
          id="content" 
          name="content" 
          required 
          value={content} 
          onChange={(e) =>setContent(e.target.value)}
        />
        <br />
        <input type = "submit" value="Submit"/>
        
      </form>
    </>
  )
}

export default home