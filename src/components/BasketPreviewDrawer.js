import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserBasketItems } from '../services/api';
import '../styles/BasketPreviewDrawer.css';

const BasketPreviewDrawer = ({ visible, toggleDrawer, isLoggedIn, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    if (visible && isLoggedIn) {
      getUserBasketItems(user.id).then(items => setBasketItems(items));
    }
  }, [visible, isLoggedIn, user]);

  if (!visible || location.pathname === '/login' || location.pathname === '/basket') {
    return null;
  }

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleViewFullBasket = () => {
    navigate('/basket');
  };

  return (
    <div className="basket-drawer">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Basket</h5>
        <button type="button" className="close" onClick={toggleDrawer} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="offcanvas-body">
        <div className="basket-items">
          {isLoggedIn ? (
            <>
              {basketItems.length > 0 ? (
                <ul>
                  {basketItems.map((item, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.name}</span>
                      <span style={{ fontWeight: 'bold', color: 'black' }}>x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Your basket is empty</p>
              )}
            </>
          ) : (
            <p>Your basket is empty</p>
          )}
        </div>
        <div className="basket-footer">
          {isLoggedIn ? (
            <button className="btn btn-primary btn-block mt-2" onClick={handleViewFullBasket}>View Full Basket</button>
          ) : (
            <button className="btn btn-success btn-block mt-2" onClick={handleLoginRedirect}>Log In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasketPreviewDrawer;