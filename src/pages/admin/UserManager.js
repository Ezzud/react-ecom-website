import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser, updateUser } from '../../services/api';
import DashboardMenu from '../../components/DashboardMenu';
import '../../styles/UserManager.css'; // Assuming you have the CSS in UserManager.css

const UserManager = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    } else {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  const handleSave = async () => {
    await updateUser(editedUser);
    setEditingUserId(null);
    fetchUsers();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className="user-manager-container">
      <DashboardMenu />
      <div className="user-manager-content">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <input
                    type="text"
                    name="firstName"
                    value={editingUserId === user.id ? editedUser.firstName : user.firstName}
                    onChange={handleChange}
                    disabled={editingUserId !== user.id}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="lastName"
                    value={editingUserId === user.id ? editedUser.lastName : user.lastName}
                    onChange={handleChange}
                    disabled={editingUserId !== user.id}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={editingUserId === user.id ? editedUser.email : user.email}
                    onChange={handleChange}
                    disabled={editingUserId !== user.id}
                  />
                </td>
                <td>
                  {editingUserId === user.id ? (
                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleEdit(user)}>Edit</button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;