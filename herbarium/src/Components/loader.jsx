// src/components/Loader.jsx
import React from 'react';
import '../Style/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
