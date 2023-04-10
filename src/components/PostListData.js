import React, { useState } from 'react'

const PostListData = () => {

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editing, setEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);


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
            </table>
        </div>
    )
}

export default PostListData