import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchItems, deleteItem, updateItem } from '../../services/api';
import DashboardMenu from '../../components/DashboardMenu';
import '../../styles/UserManager.css'; // Reusing the CSS from UserManager

const ItemManager = ({ user }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    } else {
      fetchItemsList();
    }
  }, [user, navigate]);

  const fetchItemsList = async () => {
    const items = await fetchItems();
    setItems(items);
  };

  const handleDelete = async (itemId) => {
    await deleteItem(itemId);
    fetchItemsList();
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditedItem(item);
  };

  const handleSave = async () => {
    await updateItem(editedItem);
    setEditingItemId(null);
    fetchItemsList();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  return (
    <div className="user-manager-container">
      <DashboardMenu />
      <div className="user-manager-content">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={editingItemId === item.id ? editedItem.name : item.name}
                    onChange={handleChange}
                    disabled={editingItemId !== item.id}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={editingItemId === item.id ? editedItem.description : item.description}
                    onChange={handleChange}
                    disabled={editingItemId !== item.id}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="price"
                    value={editingItemId === item.id ? editedItem.price : item.price}
                    onChange={handleChange}
                    disabled={editingItemId !== item.id}
                  />
                </td>
                <td>
                  {editingItemId === item.id ? (
                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemManager;