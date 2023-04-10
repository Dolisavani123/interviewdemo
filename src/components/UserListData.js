// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const UserListData = () => {

//     const [users, setUsers] = useState([]);
//     const [name, setname] = useState('');
//     const [email, setEmail] = useState('');
//     const [editing, setEditing] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         axios.get('https://jsonplaceholder.typicode.com/users')
//             .then(respons => setUsers(respons.data))
//             .catch(error => console.log('error', error))
//     }, [])

//     const addPost = () => {
//         const newPost = { title, body };
//         axios.post('https://jsonplaceholder.typicode.com/users', newPost)
//             .then(respons => setUsers([...posts, respons.data]))
//             .catch(error => console.log('error', error))
//         setTitle('');
//         setBody('');
//     }

//     const editPost = post => {
//         setEditing(true);
//         setCurrentPost(post);
//     }

//     const CancleEdit = () => {
//         setEditing(false);
//         setCurrentPost(null);
//     }

//     const updatePost = updatePost => {
//         setEditing(false);
//         setCurrentPost(null);
//         setPosts(
//             posts.map(post => (
//                 post.id === updatePost.id ? updatePost : post
//             ))
//         )
//     }

//     const deletePost = id =>{
//         axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
//         .then(() => setPosts(posts.filter(post => post.id !== id)))
//         .catch(error => console.log('error', error))
//     }

//     return (
//         <div className='container'>
//             <h2 className='heading'>PostListData</h2>
//             {editing ?
//                 <div className='contact-form'>
//                     <h3>Edit Post</h3>
//                     <div className='form-group'>
//                         <div className='form-input'>
//                             <label htmlFor='title'>Title:</label>
//                             <input type='text' id='title' value={currentPost.title} onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })} />
//                         </div>
//                     </div>
//                     <div className='form-group'> 
//                         <div className='form-input'>
//                             <label htmlFor='body'>Body:</label>
//                             <input type='text' id='body' value={currentPost.body}  onChange={e => setCurrentPost({ ...currentPost, body: e.target.value })} />
//                         </div>
//                     </div>
//                     <button onClick={() => updatePost(currentPost)}>Save Post</button>
//                     <button onClick={() => CancleEdit()}>Cancle Post</button>
//                 </div> :

//                 <div className='container'>
//                     <div>
//                         <div>
//                             <label htmlFor='title'>Title:</label>
//                             <input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} />
//                         </div>
//                     </div>
//                     <div>
//                         <div>
//                             <label htmlFor='body'>Body:</label>
//                             <input type='text' id='body' value={body} onChange={e => setBody(e.target.value)} />
//                         </div>
//                     </div>
//                     <button onClick={addPost}>Add Post</button>
//                 </div>
//             }
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Body</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {posts.map(post => (
//                         <tr key={post.id}>
//                             <td>{post.title}</td>
//                             <td>{post.body}</td>
//                             <td>
//                                 <button onClick={() => editPost(post)}>Edit</button>
//                                 <button onClick={() =>deletePost(post.id)}>Delete</button>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default UserListData