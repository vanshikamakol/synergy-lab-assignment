import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', phone: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

  // Fetch users
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  // Create user
  const createUser = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '', phone: '' });
      })
      .catch(error => console.error(error));
  };

  // Update user
  const updateUser = (e) => {
    e.preventDefault();
    axios.put(`https://jsonplaceholder.typicode.com/users/${currentUser.id}`, currentUser)
      .then(response => {
        setUsers(users.map(user => (user.id === currentUser.id ? response.data : user)));
        setIsEditing(false);
        setCurrentUser({ name: '', email: '', phone: '' });
      })
      .catch(error => console.error(error));
  };

  // Delete user
  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error(error));
  };

  // Edit user
  const editUser = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      <h2>Users List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{isEditing ? "Edit User" : "Create User"}</h2>
      <form onSubmit={isEditing ? updateUser : createUser}>
        <input
          type="text"
          placeholder="Name"
          value={isEditing ? currentUser.name : newUser.name}
          onChange={(e) =>
            isEditing
              ? setCurrentUser({ ...currentUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={isEditing ? currentUser.email : newUser.email}
          onChange={(e) =>
            isEditing
              ? setCurrentUser({ ...currentUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone"
          value={isEditing ? currentUser.phone : newUser.phone}
          onChange={(e) =>
            isEditing
              ? setCurrentUser({ ...currentUser, phone: e.target.value })
              : setNewUser({ ...newUser, phone: e.target.value })
          }
        />
        <button type="submit">{isEditing ? "Update User" : "Create User"}</button>
      </form>
    </div>
  );
}

export default App;
