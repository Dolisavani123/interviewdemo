import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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

    const addPost = () => {
        const newPost = { title, body };
        axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
            .then(respons => setPosts([...posts, respons.data]))
            .catch(error => console.log('error', error))
        setTitle('');
        setBody('');
    }

    const editPost = post => {
        setEditing(true);
        setCurrentPost(post);
    }

    const CancleEdit = () => {
        setEditing(false);
        setCurrentPost(null);
    }

    const updatePost = updatePost => {
        setEditing(false);
        setCurrentPost(null);
        setPosts(
            posts.map(post => (
                post.id === updatePost.id ? updatePost : post
            ))
        )
    }

    const deletePost = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(() => setPosts(posts.filter(post => post.id !== id)))
            .catch(error => console.log('error', error))
    }

    const handleDragEnd = result => {
        if (!result.destination) return;
        const PostLists = Array.from(posts);
        const [reorderdPost] = PostLists.splice(result.source.index, 1);
        PostLists.splice(result.destination.index, 0, reorderdPost);
        setPosts(PostLists);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='container'>
                <h2 className='heading'>PostListData</h2>
                <div className='post-form'>
                    {editing ? (
                        <div className='contact-form'>
                            <h3>Edit Post</h3>
                            <div className='form-group'>
                                <div className='form-input'>
                                    <label htmlFor='title'>Title:</label>
                                    <input type='text' id='title' value={currentPost.title} onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })} />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='form-input'>
                                    <label htmlFor='body'>Body:</label>
                                    <input type='text' id='body' value={currentPost.body} onChange={e => setCurrentPost({ ...currentPost, body: e.target.value })} />
                                </div>
                            </div>
                            <button onClick={() => updatePost(currentPost)}>Save Post</button>
                            <button onClick={() => CancleEdit()}>Cancle Post</button>
                        </div>
                    ) : (
                        <div className=''>
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
                            <button onClick={addPost}>Add Post</button>
                        </div>
                    )}
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <Droppable droppableId='container'>
                        {(provided) => (
                            <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                {posts.map((post, index) => (
                                    <Draggable key={post.id} draggableId={post.id.toString()} index={index}>
                                        {(provided) => (
                                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <td>{post.title}</td>
                                                <td>{post.body}</td>
                                                <td>
                                                    <button onClick={() => editPost(post)}>Edit</button>
                                                    <button onClick={() => deletePost(post.id)}>Delete</button>
                                                </td>

                                            </tr>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </tbody>
                        )}
                    </Droppable>

                </table>
            </div>
        </DragDropContext>

    )
}

export default PostListData