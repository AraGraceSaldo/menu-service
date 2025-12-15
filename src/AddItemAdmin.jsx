import React, { useState, useRef } from 'react';
import { Modal, Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import './AddItemAdmin.css';

// --- Size/Price Row Component ---
const SizeOptionRow = ({ size, index, handleSizeChange, handlePriceChange, handleDeleteSize }) => (
    <Row className="size-option-row d-flex align-items-center mb-3" key={size.id}>
      
        {/* Size Input Column */}
        <Col xs={4} className="d-flex align-items-center pe-0">
            {/* Checkmark Icon */}
            <div className="size-checkmark me-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#28a745" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.047 0l-4.87-5.18a.732.732 0 0 1 1.047-1.054L7.38 10.96z"/>
                </svg>
            </div>
            {/* Size Label Input */}
            <Form.Control 
                type="text" 
                value={size.label}
                onChange={(e) => handleSizeChange(index, e.target.value)}
                placeholder="Size" 
                className="size-input-custom text-center flex-grow-1"
            />
        </Col>

        {/* Price Input Column */}
        <Col xs={8} className="d-flex align-items-center ps-3">
            {/* Price Input */}
            <InputGroup className="flex-grow-1">
                <Form.Control 
                    type="number" 
                    value={size.price}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    placeholder="Amount" 
                    className="price-input-custom"
                />
            </InputGroup>
            
            {/* Delete Button */}
            <Button 
                variant="danger" 
                className="delete-size-button ms-3 flex-shrink-0"
                onClick={() => handleDeleteSize(index)}
            >
                {/* Trash Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4h7.764L13 2H3z"/>
                </svg>
            </Button>
        </Col>
    </Row>
);
// --- End Size/Price Row Component ---


const AddItemAdmin = ({ show, handleClose }) => {
  // --- State Initialization ---
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const fileInputRef = useRef(null); 
  
  const [sizes, setSizes] = useState([
   /* { id: uuidv4(), label: '', price: '' }, */
  ])

  // --- Utility Functions ---

  // Reset form fields
  const resetForm = () => {
    setProductName('');
    setDescription('');
    setImageFile(null);
    /*setSizes([{ id: uuidv4(), label: '', price: '' }]);*/
  };

  // Close modal and reset form
  const handleCloseAndReset = () => {
    resetForm();
    handleClose();
  }

  // --- Image Handling ---
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // --- Size/Price Handling ---
  const handleSizeChange = (index, newLabel) => {
    setSizes(sizes.map((size, i) => 
        i === index ? { ...size, label: newLabel } : size
    ));
  };
  
  const handlePriceChange = (index, newPrice) => {
    const validPrice = newPrice.replace(/[^0-9.]/g, ''); 
    setSizes(sizes.map((size, i) => 
        i === index ? { ...size, price: validPrice } : size
    ));
  };

  // Add new size row
  const handleAddSize = () => {
    setSizes([...sizes, { id: uuidv4(), label: '', price: '' }]);
  };

  // Delete size row
  const handleDeleteSize = (index) => {
    if (sizes.length > 1) { 
        setSizes(sizes.filter((_, i) => i !== index));
    }
  };
  
  // --- Save Handler (API Call) ---
  const handleSave = async () => {
    // 1. Validation Checks
    if (!productName.trim() || !description.trim() || sizes.length === 0) {
      alert("Please fill out the Product Name, Description, and at least one Size/Price.");
      return;
    }
    
    const incompleteSizes = sizes.some(size => !size.label.trim() || !size.price.trim() || parseFloat(size.price) <= 0);
    if (incompleteSizes) {
        alert("Please ensure all sizes have a valid Label and a Price greater than 0.");
        return;
    }

    // 2. Prepare Data
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    
    formData.append('sizes', JSON.stringify(sizes.map(size => ({
        label: size.label,
        price: parseFloat(size.price).toFixed(2), 
    }))));

    if (imageFile) {
        formData.append('productImage', imageFile);
    }
    
    // 3. API Call
    try {
        const API_ENDPOINT = 'YOUR_API_ENDPOINT/add_product'; // ! Update this URL po hehe!
        
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: formData, 
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown server error' }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        console.log('Product saved successfully:', await response.json());
        alert('Item added successfully!');
        handleCloseAndReset(); 

    } catch (error) {
        console.error('Error saving product:', error);
        alert(`Failed to add item: ${error.message}`);
    }
  };


  return (
    <Modal show={show} onHide={handleCloseAndReset} size="lg" centered dialogClassName="custom-modal-dialog">
      
      {/*Modal Header*/}
      <Modal.Header className="custom-modal-header">
        {/* Back Button */}
        <Button variant="dark" onClick={handleCloseAndReset} className="back-button-modal">
          &larr;
        </Button>
      </Modal.Header>

      {/*Modal Body */}
      <Modal.Body className="custom-modal-body p-4 pt-0">
        <Container fluid>
          {}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          
          <Row>
            
            {/*  Left Column: Item Photo */}
            <Col md={5} className="d-flex flex-column align-items-stretch">
              <div className="image-placeholder-box d-flex justify-content-center align-items-center">
                {imageFile ? (
                  <img src={URL.createObjectURL(imageFile)} alt="Product Preview" className="img-preview" />
                ) : (
                  // Placeholder Icon
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    fill="currentColor" 
                    className="bi bi-image" 
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.576-.094l-3.777 2.421 1.05 1.05a1 1 0 0 1 1.036 0l2.5-2.5a.5.5 0 0 0 .17-.432l.738-1.745l-4.502 2.5a.5.5 0 0 1-.576-.094l-3.777-2.421-2.5 2.5V3a1 1 0 0 1 1-1z"/>
                  </svg>
                )}
              </div>
            </Col>

            {/* Right Column: Form Inputs */}
            <Col md={7} className="mt-4 mt-md-0">
              <Form>
                
                {/* Product Name Input */}
                <Form.Group className="mb-3" controlId="formProductName">
                    <Form.Label className="form-label-custom">Product Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter a Product Name" 
                    />
                </Form.Group>

                {/*Description Input */}
                <Form.Group className="mb-3" controlId="formProductDescription">
                    <Form.Label className="form-label-custom">Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a Product Description" 
                    />
                </Form.Group>
                
                {/* --- Sizes/Prices Headings --- */}
                <Row className="mb-2">
                    <Col xs={4}>
                        <Form.Label className="form-label-custom mt-1 mb-0">Available Sizes</Form.Label> 
                    </Col>
                    <Col xs={8}>
                        <Form.Label className="form-label-custom mt-1 mb-0">Price</Form.Label>
                    </Col>
                </Row>

                {/* Render Size/Price Rows */}
                {sizes.map((size, index) => (
                  <SizeOptionRow 
                    key={size.id} 
                    size={size} 
                    index={index}
                    handleSizeChange={handleSizeChange}
                    handlePriceChange={handlePriceChange}
                    handleDeleteSize={handleDeleteSize}
                  />
                ))}
                
                {/* Add Size Link */}
                <div className="d-flex justify-content-center mb-4 mt-2">
                    <Button 
                      variant="link" 
                      onClick={handleAddSize} 
                      className="add-size-link p-0"
                    >
                      + Add Size
                    </Button>
                </div>
                
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      {/*Footer*/}
      <Modal.Footer className="custom-modal-footer">
        <div className="d-flex gap-3">
            {/* Add Photo Button */}
            <Button 
              className="action-button add-photo-button-footer" 
              onClick={handleImageUploadClick}
            >
              Add Photo
            </Button>
            
            {/* Delete Button */}
            <Button className="action-button delete-button">
              Delete
            </Button>

            {/* Save Button */}
            <Button 
              className="action-button save-button" 
              onClick={handleSave} 
            >
              Save
            </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemAdmin;