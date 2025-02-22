import React from 'react';

const BasketItem = ({ item, index, handleQuantityChange, loading }) => {
  return (
    <div className="card mb-4" key={index}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <img 
            src={item.avatarURL} 
            alt="Item Avatar" 
            className="basket-item-avatar" 
          />
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleQuantityChange(index, -1)}
              disabled={loading}
            >
              {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : '-'}
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => handleQuantityChange(index, 1)}
              disabled={loading}
            >
              {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : '+'}
            </button>
          </div>
        </div>
        <div>
          <h5 className="card-title">${Number(item.price).toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;