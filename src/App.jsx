// src/App.jsx
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddItemAdmin from './AddItemAdmin.jsx'; 

function App() {
  const [showModal, setShowModal] = useState(false);
  
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="p-5">
      <h1>(Admin View) </h1>
      <p>Click the button below to add a new item</p>

      { }
      <Button variant="primary" onClick={handleShow}>
        Add Item
      </Button>
      
      {}
      <AddItemAdmin show={showModal} handleClose={handleClose} />
    </div>
  );
}

export default App;