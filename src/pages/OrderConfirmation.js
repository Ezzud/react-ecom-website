import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, getUserBasketItems } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/OrderConfirmation.css'; // Import custom CSS for OrderConfirmation

const OrderConfirmation = ({ user }) => {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [basketItems, setBasketItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await createOrder({ street, city, state, postalCode, country });
      if (response.id) {
        navigate('/account');
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError('An error occurred while creating the order');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return street && city && state && country && postalCode;
  };

  const totalPrice = basketItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>Order Confirmation</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="street">Street:</label>
              <input type="text" id="street" name="street" className="form-control" value={street} onChange={(e) => setStreet(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input type="text" id="state" name="state" className="form-control" value={state} onChange={(e) => setState(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input type="text" id="country" name="country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code:</label>
              <input type="text" id="postalCode" name="postalCode" className="form-control" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-success btn-block mt-3" disabled={!isFormValid() || loading}>
              {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Place Order'}
            </button>
          </form>
        </div>
        <div className="col-md-4">
          <div className="border p-3">
            <h4>Order Summary</h4>
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

export default OrderConfirmation;