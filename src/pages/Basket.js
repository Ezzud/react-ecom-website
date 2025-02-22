import React, { useEffect, useState } from 'react';
import { getUserBasketItems, addItemToBasket, removeItemFromBasket } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Basket.css'; // Import custom CSS for Basket
import BasketItem from '../components/BasketItem'; // Import the BasketItem component

const Basket = ({ user }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBasketItems = async () => {
      if (user) {
        const items = await getUserBasketItems(user.id);
        setBasketItems(items);
      }
    };

    fetchBasketItems();
  }, [user]);

  const handleQuantityChange = async (index, delta) => {
    setLoading(true);
    setError(null);
    const item = basketItems[index];
    try {
      if (delta < 0) {
        const result = await removeItemFromBasket(user.id, item.id, 1);
        if (!result.success) {
          setError(result.error || 'Failed to remove item from basket');
        } else {
          const items = await getUserBasketItems(user.id);
          setBasketItems(items);
        }
      } else {
        const result = await addItemToBasket(user.id, item.id, 1);
        if (result === null) {
          setError('Failed to update item quantity');
        } else {
          const items = await getUserBasketItems(user.id);
          setBasketItems(items);
        }
      }
    } catch (error) {
      setError('An error occurred while updating the basket');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = basketItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>Your Basket</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {basketItems.length > 0 ? (
            basketItems.map((item, index) => (
              <BasketItem
                key={index}
                item={item}
                index={index}
                handleQuantityChange={handleQuantityChange}
                loading={loading}
              />
            ))
          ) : (
            <p>Your basket is empty</p>
          )}
        </div>
        <div className="col-md-4">
          <div className="border p-3">
            <h4>Basket Summary</h4>
            <ul className="list-group mb-3">
              {basketItems.map((item, index) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                  {item.name}
                  <span className="quantity-text">x{item.quantity}</span>
                </li>
              ))}
            </ul>
            <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;