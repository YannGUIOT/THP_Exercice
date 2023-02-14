import { useState, useEffect } from "react";

export const Home = () => {

  const [posts, setPosts] = useState('');

  useEffect(() => {

    fetch("http://localhost:1337/api/posts", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setPosts(response.data);
      console.log(response.data);
    })
    .catch((error) => console.error(error));
  },[])

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  }

  
  if (Array.isArray(posts)) {
    return (
      <div className="posts">
      <h2>POSTS LIST</h2>
        {posts.map(post => (
          <div className="post" key={post.id}>
            <p>{post.attributes.texte}</p>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  } 
  else 
  {
    return <p>No posts found.</p>;
  }
}