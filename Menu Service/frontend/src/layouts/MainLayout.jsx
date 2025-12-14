import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Navbar />

      <main style={{ minHeight: '80vh', padding: '2rem' }}>
        <Outlet />        {/* Nested page renders here */}
      </main>
      
      <Footer />         
    </div>
  );
};

export default MainLayout;
