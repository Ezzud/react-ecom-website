import React, { useState, useEffect, useRef } from 'react';
import ItemCard from '../components/ItemCard';
import ItemDetails from '../components/ItemDetails';
import BasketPreviewDrawer from '../components/BasketPreviewDrawer';
import { fetchItems } from '../services/api';
import { cuteToast } from 'cute-alert';

const Home = ({ user, isLoggedIn, onLogout }) => {
  const [items, setItems] = useState([]);
  const [previewDrawerVisible, setPreviewDrawerVisible] = useState(null);
  const [basket, setBasket] = useState([]);
  const [basketDrawerVisible, setBasketDrawerVisible] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchItems();
      if (fetchedItems) {
        setItems(fetchedItems);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setPreviewDrawerVisible(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerRef]);

  const showPreviewDrawer = (id) => {
    setPreviewDrawerVisible(id);
  };

  const hidePreviewDrawer = () => {
    setPreviewDrawerVisible(null);
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  const updateBasket = (newItem) => {
    try {
      setBasket(prevBasket => {
        const existingItem = prevBasket.find(item => item.id === newItem.id);
        if (existingItem) {
          return prevBasket.map(item =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevBasket, { ...newItem, quantity: 1 }];
        }
      });
      cuteToast({
        type: "success",
        title: "Success",
        description: `${newItem.name} has been added to the basket.`,
        timer: 3000
      });
    } catch (error) {
      cuteToast({
        type: "error",
        title: "Error",
        description: "An error occurred while adding the item to the basket.",
        timer: 3000
      });
    }
  };

  const toggleBasketDrawer = (visible) => {
    setBasketDrawerVisible(visible);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {items.map(item => (
          <ItemCard 
            key={item.id} 
            item={item} 
            showPreviewDrawer={showPreviewDrawer} 
            updateBasket={updateBasket} 
            user={user} 
            toggleBasketDrawer={toggleBasketDrawer}
          />
        ))}
      </div>

      {items.map(item => (
        previewDrawerVisible === item.id && (
          <div ref={drawerRef} key={item.id}>
            <ItemDetails
              item={item}
              hidePreviewDrawer={hidePreviewDrawer}
              isLoggedIn={isLoggedIn}
              handleLoginRedirect={handleLoginRedirect}
              updateBasket={updateBasket}
              user={user}
              toggleBasketDrawer={toggleBasketDrawer}
            />
          </div>
        )
      ))}

      <BasketPreviewDrawer
        visible={basketDrawerVisible}
        toggleDrawer={() => toggleBasketDrawer(false)}
        isLoggedIn={isLoggedIn}
        user={user}
        basketItems={basket}
      />
    </div>
  );
};

export default Home;