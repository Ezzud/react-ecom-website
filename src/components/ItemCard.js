import React, { useState } from 'react';
import { addItemToBasket } from '../services/api';

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

  return (
    <div className="col-12 col-md-6 col-lg-4" key={item.id}>
      <div className="sold-item" onClick={() => showPreviewDrawer(item.id)}>
        <img src={item.avatarURL} alt="Profile Picture" />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: ${item.price}</p>
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart} 
          disabled={isLoading}
          style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'green', color: 'white', borderRadius: '15%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isLoading ? '...' : '+'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default ItemCard;