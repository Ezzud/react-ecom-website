import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders, deleteOrder, updateOrder } from '../../services/api';
import DashboardMenu from '../../components/DashboardMenu';
import '../../styles/UserManager.css'; // Reusing the CSS from UserManager

const OrderManager = ({ user }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    } else {
      fetchOrdersList();
    }
  }, [user, navigate]);

  const fetchOrdersList = async () => {
    const orders = await fetchOrders();
    setOrders(orders);
  };

  const handleDelete = async (orderId) => {
    await deleteOrder(orderId);
    fetchOrdersList();
  };

  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setEditedOrder(order);
  };

  const handleSave = async () => {
    await updateOrder(editedOrder);
    setEditingOrderId(null);
    fetchOrdersList();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder({ ...editedOrder, [name]: value });
  };

  return (
    <div className="user-manager-container">
      <DashboardMenu />
      <div className="user-manager-content">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user}</td>
                <td>
                  <select
                    name="status"
                    value={editingOrderId === order.id ? editedOrder.status : order.status}
                    onChange={handleChange}
                    disabled={editingOrderId !== order.id}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
                <td>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {editingOrderId === order.id ? (
                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleEdit(order)}>Edit</button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDelete(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManager;