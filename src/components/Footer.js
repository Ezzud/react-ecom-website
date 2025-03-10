import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Import the Footer CSS
import logo from '../assets/img/logo512.png'; // Import the logo image

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-center">
          <a href="#top">
            <img src={logo} alt="Website Logo" className="logo" />
          </a>
          <p>&copy; 2025 ezzud.fr</p>
        </div>
        <div className="footer-links">
          <Link to="/legal-mentions" className="footer-link">Legal Mentions</Link>
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;