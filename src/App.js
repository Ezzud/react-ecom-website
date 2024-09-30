import React, { useState } from 'react';
import './App.css'; // Assuming you have the CSS in App.css
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

const App = () => {
  const [profileDrawerVisible, setProfileDrawerVisible] = useState(false);
  const [previewDrawerVisible, setPreviewDrawerVisible] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const items = [
    { id: 1, name: 'Item 1', price: '$10.00', description: 'Short description of item 1', fullDescription: 'Full description of item 1. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Item 2', price: '$20.00', description: 'Short description of item 2', fullDescription: 'Full description of item 2. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Item 3', price: '$30.00', description: 'Short description of item 3', fullDescription: 'Full description of item 3. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 4, name: 'Item 4', price: '$40.00', description: 'Short description of item 4', fullDescription: 'Full description of item 4. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 5, name: 'Item 5', price: '$50.00', description: 'Short description of item 5', fullDescription: 'Full description of item 5. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 6, name: 'Item 6', price: '$60.00', description: 'Short description of item 6', fullDescription: 'Full description of item 6. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 7, name: 'Item 7', price: '$70.00', description: 'Short description of item 7', fullDescription: 'Full description of item 7. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 8, name: 'Item 8', price: '$80.00', description: 'Short description of item 8', fullDescription: 'Full description of item 8. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 9, name: 'Item 9', price: '$90.00', description: 'Short description of item 9', fullDescription: 'Full description of item 9. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 10, name: 'Item 10', price: '$100.00', description: 'Short description of item 10', fullDescription: 'Full description of item 10. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 11, name: 'Item 11', price: '$110.00', description: 'Short description of item 11', fullDescription: 'Full description of item 11. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 12, name: 'Item 12', price: '$120.00', description: 'Short description of item 12', fullDescription: 'Full description of item 12. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 13, name: 'Item 13', price: '$130.00', description: 'Short description of item 13', fullDescription: 'Full description of item 13. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 14, name: 'Item 14', price: '$140.00', description: 'Short description of item 14', fullDescription: 'Full description of item 14. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 15, name: 'Item 15', price: '$150.00', description: 'Short description of item 15', fullDescription: 'Full description of item 15. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 16, name: 'Item 16', price: '$160.00', description: 'Short description of item 16', fullDescription: 'Full description of item 16. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 17, name: 'Item 17', price: '$170.00', description: 'Short description of item 17', fullDescription: 'Full description of item 17. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 18, name: 'Item 18', price: '$180.00', description: 'Short description of item 18', fullDescription: 'Full description of item 18. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 19, name: 'Item 19', price: '$190.00', description: 'Short description of item 19', fullDescription: 'Full description of item 19. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
    { id: 20, name: 'Item 20', price: '$200.00', description: 'Short description of item 20', fullDescription: 'Full description of item 20. This is a longer description that spans three lines.', imageUrl: 'https://via.placeholder.com/100' },
  ];

  const toggleProfileDrawer = () => {
    setProfileDrawerVisible(!profileDrawerVisible);
  };

  const showPreviewDrawer = (id) => {
    setPreviewDrawerVisible(id);
  };

  const hidePreviewDrawer = () => {
    setPreviewDrawerVisible(null);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.profile-pic') && !event.target.closest('.offcanvas')) {
      setProfileDrawerVisible(false);
    }
    if (!event.target.closest('.sold-item') && !event.target.closest('.preview-drawer')) {
      setPreviewDrawerVisible(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#28a745' }}>
        <a className="navbar-brand" href="#">Logo</a>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#"><i className="bi bi-basket basket-icon"></i></a>
            </li>
            <li className="nav-item d-flex align-items-center">
              <div className="profile-pic" onClick={toggleProfileDrawer}></div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {items.map(item => (
            <div className="col-12 col-md-6 col-lg-4" key={item.id}>
              <div className="sold-item" onClick={() => showPreviewDrawer(item.id)}>
                <img src={item.imageUrl} alt="Profile Picture" />
                <h5>{item.name}</h5>
                <p>{item.price}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Drawer */}
      {profileDrawerVisible && (
        <div className="offcanvas show">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Profile</h5>
            <button type="button" className="close" onClick={toggleProfileDrawer} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="offcanvas-body">
            <button className="btn btn-primary btn-block">Settings</button>
            {isLoggedIn ? (
              <button className="btn btn-danger btn-block mt-2" onClick={() => setIsLoggedIn(false)}>Log Out</button>
            ) : (
              <button className="btn btn-success btn-block mt-2" onClick={() => setIsLoggedIn(true)}>Log In</button>
            )}
          </div>
        </div>
      )}

      {/* Preview Drawers */}
      {items.map(item => (
        previewDrawerVisible === item.id && (
          <div className="preview-drawer show" key={item.id}>
            <div className="close" onClick={hidePreviewDrawer}>&times;</div>
            <div className="drawer-content">
              <div className="image" style={{ backgroundImage: `url(${item.imageUrl.replace('100', '400')})` }}></div>
              <div className="details">
                <h5>{item.name}</h5>
                <p>{item.fullDescription}</p>
                <p><strong>{item.price}</strong></p>
                <button className="btn btn-primary btn-block">Add to Cart</button>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default App;