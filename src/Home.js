import React, { useState, useEffect } from 'react';

const Home = () => {
    const [items, setItems] = useState([]); // State to store items
    const [previewDrawerVisible, setPreviewDrawerVisible] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3333/items/all')
          .then(response => response.json())
          .then(data => {
            const formattedItems = data.map(item => ({
              ...item,
              description: item.description.substring(0, 100),
              avatarURL: item.avatarURL,
              price: item.price
            }));
            setItems(formattedItems);
          })
          .catch(error => console.error('Error fetching items:', error));
      }, []);

    const showPreviewDrawer = (id) => {
        setPreviewDrawerVisible(id);
      };
    
      const hidePreviewDrawer = () => {
        setPreviewDrawerVisible(null);
      };
  return (
    <div>
        <div className="container mt-4">
            <div className="row">
                {items.map(item => (
                  <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                    <div className="sold-item" onClick={() => showPreviewDrawer(item.id)}>
                      <img src={item.avatarURL} alt="Profile Picture" />
                      <h2>{item.name}</h2>
                      <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
            </div>
        </div>

        {/* Preview Drawers */}
        {items.map(item => (
                previewDrawerVisible === item.id && (
                  <div className="preview-drawer show" key={item.id}>
                    <div className="close" onClick={hidePreviewDrawer}>&times;</div>
                    <div className="drawer-content">
                      <div className="image" style={{ backgroundImage: `url(${item.avatarURL.replace('100', '400')})` }}></div>
                      <div className="details">
                        <h5>{item.name}</h5>
                        <p>{item.fullDescription}</p>
                        <p><strong>${item.price}</strong></p>
                        <button className="btn btn-primary btn-block">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                )
              ))}
    </div>
  );
};

export default Home;