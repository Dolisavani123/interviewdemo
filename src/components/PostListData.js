import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PostListData = () => {

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editing, setEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(respons => setPosts(respons.data))
      .catch(error => console.log('error', error))
    }, [])
    


    return (
        <div className='container'>
            <h2 className='heading'>PostListData</h2>
            {editing ? '' : ''}
            <div className='container'>
                <div>
                    <div>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor='body'>Body:</label>
                        <input type='text' id='body' value={body} onChange={e => setBody(e.target.value)} />
                    </div>
                </div>
                <button>Add Post</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PostListData