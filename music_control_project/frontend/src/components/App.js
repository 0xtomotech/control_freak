import React from 'react';
import { render } from 'react-dom';
import HomePage from './HomePage';

// Converted App to a functional component
const App = () => (
  <div className='center'>
      <HomePage />
  </div>
);

const appDiv = document.getElementById("app");
render(<App />, appDiv);
