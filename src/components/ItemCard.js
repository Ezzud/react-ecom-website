import React, { useState } from 'react';
import { addItemToBasket } from '../services/api';
import '../styles/ItemCard.css';

const ItemCard = ({ item, showPreviewDrawer, updateBasket, user, toggleBasketDrawer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    setError(null);
    try {
      const result = await addItemToBasket(user.id, item.id, 1);
      if (result === null) {
        setError('Failed to add item to basket');
      } else {
        updateBasket(result);
        toggleBasketDrawer(true); // Show the basket preview drawer
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowDetails = () => {
    showPreviewDrawer(item.id);
  };

  return (
    <div className="item-card">
      <div className="item-image" style={{ backgroundImage: `url(${item.avatarURL})` }} onClick={handleShowDetails}>
        <div className="item-price" unselectable="on">{item.price.toFixed(2)}€</div>
        <button 
          className="add-to-basket" 
          onClick={handleAddToCart} 
          disabled={isLoading}
        >
          <i className="bi bi-cart-plus"></i>
        </button>
      </div>
      <div className="item-name" onClick={handleShowDetails}>{item.name}</div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ItemCard;