import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchItems, deleteItem, updateItem, addItem } from '../../services/api';
import DashboardMenu from '../../components/DashboardMenu';
import '../../styles/UserManager.css'; // Reusing the CSS from UserManager
import { cuteToast } from 'cute-alert'; // Importing cuteToast from cute-alert module

const ItemManager = ({ user }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    avatarURL: '',
    requirePrescription: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleNewItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem({ ...newItem, [name]: type === 'checkbox' ? checked : value });
    validateForm();
  };

  const validateForm = () => {
    const { name, description, price, avatarURL } = newItem;
    setIsFormValid(name && description && price && avatarURL);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await addItem(newItem);
      if (response.id) {
        cuteToast('success', 'Item added successfully', 1000);
        fetchItemsList();
        setNewItem({
          name: '',
          description: '',
          price: '',
          avatarURL: '',
          requirePrescription: false,
        });
      } else {
        throw new Error('Failed to add item');
      }
    } catch (error) {
      cuteToast('error', 'Error adding item', 3000);
    }
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
                  <textarea
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
                    <button className="btn btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form className="new-item-form" onSubmit={handleAddItem}>
          <h3>Add New Item</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newItem.name}
            onChange={handleNewItemChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleNewItemChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleNewItemChange}
          />
          <input
            type="text"
            name="avatarURL"
            placeholder="Avatar URL"
            value={newItem.avatarURL}
            onChange={handleNewItemChange}
          />
          <label>
            <input
              type="checkbox"
              name="requirePrescription"
              checked={newItem.requirePrescription}
              onChange={handleNewItemChange}
            />
            Require Prescription
          </label>
          <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default ItemManager;