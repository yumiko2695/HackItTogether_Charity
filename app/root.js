import React from 'react';
import Routes from './routes';
import Navbar from './components/navbar';

const Root = () => {
  return (
    <div>
      <Navbar />
      <h1>Hello World!</h1>
      <Routes />
    </div>
  );
};

export default Root;
