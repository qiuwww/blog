import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';

const container = document.getElementById('app-react'),
  // Create a root.
  root = ReactDOM.createRoot(container);

console.log('React', React, root, container);

root.render(<App callback={() => console.log('renderered')} />);
