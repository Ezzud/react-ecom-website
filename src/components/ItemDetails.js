import React, { useState } from 'react';
import { addItemToBasket } from '../services/api';
import '../styles/ItemDetails.css'; // Import the CSS file for styling

const ItemDetails = ({ item, hidePreviewDrawer, isLoggedIn, handleLoginRedirect, updateBasket, user, toggleBasketDrawer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      handleLoginRedirect();
    } else {
      setIsLoading(true);
      setError(null);
      try {
        const result = await addItemToBasket(user.id, item.id, 1);
        if (result === null) {
          setError('Failed to add item to basket');
        } else {
          updateBasket(result);
          hidePreviewDrawer(); // Hide the item details drawer
          toggleBasketDrawer(true); // Show the basket preview drawer
        }
      } catch (error) {
        setError('An error occurred');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="preview-drawer show">
      <div className="close" onClick={hidePreviewDrawer}>&times;</div>
      <div className="drawer-content">
        <div className="image" style={{ backgroundImage: `url(${item.avatarURL.replace('100', '400')})` }}></div>
        <div className="details">
          <h5>{item.name}</h5>
          <p><strong>{item.price.toFixed(2)}€</strong></p>
          <p className="description">{item.description}</p> {/* Apply the description class */}
          <button 
            className="btn-full-width" 
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            <span>{isLoading ? 'Loading...' : 'Add to Cart'}</span>
            <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-cart-plus'}`}></i>
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;