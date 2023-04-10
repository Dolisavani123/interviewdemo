import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import SimpleReactValidator from 'simple-react-validator';

const UserListData = () => {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editing, setEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const validator = useRef(new SimpleReactValidator({
        validators: {
            email: {
                message: "Please enter valid email address",
                // eslint-disable-next-line
                rule: (val, params, validator) => validator.helpers.testRegex(val.trim(), /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i), required: true, // optional
            },
            name: {
                message: "Special characters or number are not allowed",
                // eslint-disable-next-line
                rule: (val, params, validator) => validator.helpers.testRegex(val.trim(), /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])+$/i), required: true, // optional
            },
        },
    }));
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(respons => setUsers(respons.data))
            .catch(error => console.log('error', error))
    }, [])

    const addUser = (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            const newUser = { name, email };
            axios.post('https://jsonplaceholder.typicode.com/users', newUser)
                .then(respons => setUsers([...users, respons.data]))
                .catch(error => console.log('error', error))
            setName('');
            setEmail('');
        }
        else {
            validator.current.showMessages();
            forceUpdate();
        }
    }

    const editUser = user => {
        setEditing(true);
        setCurrentUser(user);
    }

    const CancleEdit = () => {
        setEditing(false);
        setCurrentUser(null);
    }

    const updateUser = updateUser => {
        setEditing(false);
        setCurrentUser(null);
        setUsers(
            users.map(user => (
                user.id === updateUser.id ? updateUser : user
            ))
        )
    }

    const deleteUser = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(() => setUsers(users.filter(user => user.id !== id)))
            .catch(error => console.log('error', error))
    }

    const handleDragEnd = result => {
        if (!result.destination) return;
        const UserLists = Array.from(users);
        const [reorderdPost] = UserLists.splice(result.source.index, 1);
        UserLists.splice(result.destination.index, 0, reorderdPost);
        setUsers(UserLists);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='usercontainer'>
                <h2 className='heading'>UserListData</h2>
                <div className='post-form'>
                    {editing ? (
                        <div className='contact-form'>
                            <h3>Edit User</h3>
                            <div className='form-group'>
                                <div className='form-input'>
                                    <label htmlFor='name'>name:</label>
                                    <input type='text' id='name' value={currentUser.name} onChange={e => setCurrentUser({ ...currentUser, name: e.target.value })} required />
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='form-input'>
                                    <label htmlFor='email'>Email:</label>
                                    <input type='email' id='email' value={currentUser.email} onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })} required />
                                </div>
                            </div>
                            <button onClick={() => updateUser(currentUser)}>Save Post</button>
                            <button onClick={() => CancleEdit()}>Cancle Post</button>
                        </div>
                    ) : (
                        <div className='contact-form'>
                            <h3>Add User</h3>
                            <div className='form-group'>
                                <div className='form-input'>
                                    <label htmlFor='name'>name:</label>
                                    <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} />
                                    <span style={{ fontSize: 13, color: "red" }}>{validator.current.message(`name`, name, "required|name|min:3|max:20")}</span>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='form-input'>
                                    <label htmlFor='email'>email:</label>
                                    <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                                    <span style={{ fontSize: 13, color: "red" }}>{validator.current.message(`email`, email, "required|email")}</span>
                                </div>
                            </div>
                            <button type="submit" onClick={(e) => addUser(e)}>Add User</button>
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
                    <Droppable droppableId='usercontainer'>
                        {(provided) => (
                            <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                {users.map((user, index) => (
                                    <Draggable key={user.id} draggableId={user.id.toString()} index={index}>
                                        {(provided) => (
                                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button onClick={() => editUser(user)}>Edit</button>
                                                    <button onClick={() => deleteUser(user.id)}>Delete</button>
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

export default UserListData