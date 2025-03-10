import React, { useEffect, useState } from 'react';
import { getUserBasketItems, addItemToBasket, removeItemFromBasket, clearBasket } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Basket.css'; // Import custom CSS for Basket
import BasketItem from '../components/BasketItem'; // Import the BasketItem component
import { useNavigate } from 'react-router-dom';

const Basket = ({ user }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleClearBasket = async () => {
    setLoading(true);
    setError(null);
    try {
      await clearBasket(user.id);
      setBasketItems([]);
    } catch (error) {
      setError('An error occurred while clearing the basket');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteOrder = () => {
    navigate('/order-confirmation');
  };

  const totalPrice = basketItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  return (
    <div className="container mt-4">
      <div className="basket-row">
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
            <button className="btn btn-clear-basket btn-block mt-3" onClick={handleClearBasket} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <><i className="fas fa-trash-alt"></i> Clear Basket</>}
            </button>
            <button className="btn btn-complete-order btn-block mt-3" onClick={handleCompleteOrder} disabled={loading || basketItems.length === 0}>
              <i className="fas fa-check"></i> Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;