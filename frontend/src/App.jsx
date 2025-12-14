import React, { useState } from 'react';
import './App.css';
import { User, Bell, Search } from 'lucide-react';
import kapebaraLogo from './assets/kapebara logo transparent.png';

// Mock Data
const PRODUCTS = {
  classic: [
    { id: 101, name: "Iced Mocha", price: "₱140.00", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=2574&auto=format&fit=crop" },
    { id: 102, name: "Matcha Latte", price: "₱160.00", img: "https://images.unsplash.com/photo-1515825838458-f2a94b20105a?q=80&w=2574&auto=format&fit=crop" },
    { id: 103, name: "Caramel Latte", price: "₱150.00", img: "https://images.unsplash.com/photo-1558475152-4891e91d4e7d?q=80&w=2574&auto=format&fit=crop" },
    { id: 104, name: "Espresso", price: "₱120.00", img: "https://images.unsplash.com/photo-1521747116042-5d57e4d56a4f?q=80&w=2574&auto=format&fit=crop" },
    { id: 105, name: "Cold Brew", price: "₱145.00", img: "https://images.unsplash.com/photo-1558475152-4891e91d4e7d?q=80&w=2574&auto=format&fit=crop" },
    { id: 106, name: "Americano", price: "₱130.00", img: "https://images.unsplash.com/photo-1517701604599-bb22b5c5090c?q=80&w=2574&auto=format&fit=crop" },
    { id: 107, name: "Cinnamon Delight", price: "₱170.00", img: "https://images.unsplash.com/photo-1571206895350-e7a90b5b5021?q=80&w=2574&auto=format&fit=crop" },
    { id: 108, name: "Hazelnut Coffee", price: "₱155.00", img: "https://images.unsplash.com/photo-1570816627670-62d1a89877a2?q=80&w=2574&auto=format&fit=crop" }
  ],
  frappe: [
    { id: 201, name: "White Choco Mocha", price: "₱155.00", img: "https://images.unsplash.com/photo-1517701604599-bb22b5c5090c?q=80&w=2574&auto=format&fit=crop" },
    { id: 202, name: "Matcha Frappe", price: "₱170.00", img: "https://images.unsplash.com/photo-1571206895350-e7a90b5b5021?q=80&w=2574&auto=format&fit=crop" },
    { id: 203, name: "Chocolate Frappe", price: "₱160.00", img: "https://images.unsplash.com/photo-1570816627670-62d1a89877a2?q=80&w=2574&auto=format&fit=crop" },
    { id: 204, name: "Caramel Frappe", price: "₱165.00", img: "https://images.unsplash.com/photo-1558475152-4891e91d4e7d?q=80&w=2574&auto=format&fit=crop" }
  ],
  latte: [],
  specialty: [],
  baked: []
};

const NAV_LINKS = ["Orders", "Menu", "Delivery"];
const CATEGORY_TABS = [
  { key: 'classic', label: 'Classic Coffee Series' },
  { key: 'frappe', label: 'Frappe' },
  { key: 'latte', label: 'Latte' },
  { key: 'specialty', label: 'Specialty Drinks' },
  { key: 'baked', label: 'Cupcakes & Baked T...' }
];

const App = () => {
  const [activeCategory, setActiveCategory] = useState('classic');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = (category) => {
    if (!PRODUCTS[category] || PRODUCTS[category].length === 0) return [];
    return PRODUCTS[category].filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderProductSections = () => CATEGORY_TABS.map(tab => {
    const productsToDisplay = filteredProducts(tab.key);
    if (PRODUCTS[tab.key]?.length > 0 || productsToDisplay.length > 0) {
      return (
        <div key={tab.key} className="menu-section">
          <h2 className="section-title">{tab.label}</h2>
          <p className="section-subtitle">
            {tab.key === 'classic' 
              ? 'Smooth cold brews to energize your day, with a touch of KapeBara charm.' 
              : 'Refreshing & sweet drinks for a cool day.'}
          </p>
          <div className="product-grid">
            {productsToDisplay.map(item => (
              <div key={item.id} className="product-card">
                <img src={item.img} alt={item.name} className="product-img" />
                <div className="product-info">
                  <h3 className="product-name">{item.name}</h3>
                  <p className="product-price-label">Price</p>
                  <p className="product-price-value">{item.price}</p>
                  <button className="edit-btn">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="main-header-bar">
        <div className="header-content-wrapper">
          {/* LEFT: Logo */}
          <div className="logo">
            <img src={kapebaraLogo} alt="Kapebara" className="logo-img" />
          </div>

          {/* CENTER: Nav Links */}
          <nav className="header-nav-centered">
            {NAV_LINKS.map(link => (
              <a 
                key={link} 
                href="#" 
                className={`nav-link-header ${link === "Menu" ? 'active' : ''}`}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* RIGHT: Icons + Log Out (FLAT, SAME SIZE) */}
          <div className="nav-right">
            <Bell size={20} className="nav-icon" />
            <User size={20} className="nav-icon" />
            <button className="logout-btn">Log Out</button>
          </div>
        </div>
      </header>

      {/* CONTROL BAR */}
      <div className="control-bar-wrapper">
        <div className="control-bar-content">
          <div className="product-tabs">
            {CATEGORY_TABS.map(tab => (
              <button
                key={tab.key}
                className={`tab-button ${activeCategory === tab.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="action-area">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <Search size={18} className="search-icon" />
            </div>
            <button className="add-item-btn">Add Item</button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="main-content-wrapper">
          {renderProductSections()}
        </div>
      </main>
    </div>
  );
};

export default App;