import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserBasketItems } from '../services/api';
import '../styles/BasketPreviewDrawer.css';

const BasketPreviewDrawer = ({ visible, toggleDrawer, isLoggedIn, user }) => {
  const navigate = useNavigate();
  const [basketItems, setBasketItems] = useState([]);
  const [isHiding, setIsHiding] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (visible && isLoggedIn) {
      getUserBasketItems(user.id).then(items => setBasketItems(items));
    }
  }, [visible, isLoggedIn, user]);

  const handleClose = useCallback(() => {
    setIsHiding(true);
    setTimeout(() => {
      setIsHiding(false);
      toggleDrawer();
    }, 300); // Match the duration of the slide-out animation
  }, [toggleDrawer]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, handleClose]);

  if (!visible && !isHiding) {
    return null;
  }

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleViewFullBasket = () => {
    navigate('/basket');
  };

  const totalPrice = basketItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div ref={drawerRef} className={`basket-drawer ${isHiding ? 'hide' : ''}`}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Basket</h5>
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
        {isLoggedIn && basketItems.length > 0 && (
          <div className="basket-total">
            <p>Total: <strong>{totalPrice.toFixed(2)}€</strong></p>
          </div>
        )}
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