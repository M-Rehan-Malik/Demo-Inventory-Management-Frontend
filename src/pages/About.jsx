import React, { useEffect } from 'react';
import '../styles/About.css';

const About = () => {
  useEffect(() => {
    document.title = "Company Name - About"
  }, [])

  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <p className="about-text">
        Welcome to our wholesale distribution website! We specialize in providing a wide range of high-quality products to retailers, businesses, and organizations.
        <br />
        At our company, we offer a diverse selection of products including <span>cosmetics, diapers, laundry products, and much more.</span> Our mission is to deliver exceptional value and service to our customers, ensuring their satisfaction with every purchase.
        <br />
        Whether you're a small retail store, an online retailer, or a large corporation, we have the products and solutions to meet your needs. Our dedicated team works tirelessly to source the best products at competitive prices, allowing you to maximize your profits and delight your customers.
        <br />
        Thank you for choosing <span>Company name</span>. We look forward to serving you and building a successful partnership together.
      </p>
    </div>
  );
};

export default About;
