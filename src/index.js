// Importing necessary dependencies from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the main App component and the global CSS
import App from './App';
import './index.css';

// Importing the utility to report web vitals (performance metrics)
import reportWebVitals from './reportWebVitals';

// Creating a root element using ReactDOM.createRoot
// This is where our React app will be attached in the HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering our React app within the root element
root.render(
  // React.StrictMode is a tool for highlighting potential problems in an application
  <React.StrictMode>
    {/* Inserting the main App component */}
    <App />
  </React.StrictMode>
);

// The reportWebVitals function is a part of the Create React App template.
// It is used to log performance metrics. You can either use it for logging
// these metrics or send them to an analytics endpoint.
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
