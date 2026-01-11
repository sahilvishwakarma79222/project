// components/Sidebar.jsx
'use client';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiFilter, FiStar, FiSearch } from 'react-icons/fi';
import { TbDoor, TbFrame, TbDoorEnter, TbBed, TbWindow, TbArmchair } from 'react-icons/tb';
import { GiWoodBeam, GiHolySymbol } from 'react-icons/gi';
import { FaAmazon, FaRupeeSign, FaCheck } from 'react-icons/fa';
import './Sidebar.css';

export default function Sidebar({ onCategoryChange, selectedCategory: propSelectedCategory }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(propSelectedCategory || 'Wooden Door');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(['All']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const categories = [
    { name: 'Wooden Door', count: 70, icon: <TbDoor />, color: '#8B4513' },
    { name: 'Wooden Frame', count: 50, icon: <GiWoodBeam />, color: '#A0522D' },
    { name: 'Safety Doors', count: 65, icon: <TbDoorEnter />, color: '#CD853F' },
    { name: 'Wooden Bed', count: 45, icon: <TbBed />, color: '#D2691E' },
    { name: 'Wooden Mandir', count: 30, icon: <GiHolySymbol />, color: '#8B7355' },
    { name: 'Wooden Window', count: 40, icon: <TbWindow />, color: '#BC8F8F' },
    { name: 'Wooden Art', count: 35, icon: <FiStar />, color: '#DEB887' },
    { name: 'Sofa Chair', count: 55, icon: <TbArmchair />, color: '#F4A460' },
  ];

  const brands = [
    'Godrej Interio', 'Pepperfry', 'Wooden Street', 'HomeTown', 
    'Spacewood', 'Durian', 'Royal Oak', 'Mintwud', 'Woodsworth'
  ];

  const ratings = [
    { value: 4, label: '4★ & above' },
    { value: 3, label: '3★ & above' },
    { value: 2, label: '2★ & above' },
    { value: 1, label: '1★ & above' }
  ];

  const priceRanges = [
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
    { label: '₹20,000 - ₹30,000', min: 20000, max: 30000 },
    { label: '₹30,000 - ₹50,000', min: 30000, max: 50000 },
    { label: 'Over ₹50,000', min: 50000, max: 100000 }
  ];

  const toggleRating = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => {
      if (brand === 'All') {
        return ['All'];
      }
      if (prev.includes(brand)) {
        const newBrands = prev.filter(b => b !== brand);
        return newBrands.length === 0 ? ['All'] : newBrands;
      } else {
        const newBrands = prev.filter(b => b !== 'All');
        return [...newBrands, brand];
      }
    });
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    if (onCategoryChange) {
      onCategoryChange(categoryName);
    }
  };

  const clearAllFilters = () => {
    setSelectedRatings([]);
    setSelectedBrands(['All']);
    setPriceRange([0, 50000]);
    setSearchQuery('');
  };

  const filteredBrands = brands.filter(brand => 
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedCategories = showMoreCategories ? categories : categories.slice(0, 5);

  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="sidebar-toggle" 
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      {!isCollapsed ? (
        <>
          {/* Amazon-style Header */}
          <div className="sidebar-header">
            <div className="amazon-logo">
              <FaAmazon className="amazon-icon" />
              <span className="amazon-text">WoodCraft</span>
            </div>
            <div className="sidebar-subtitle">Premium Wooden Furniture</div>
          </div>

          {/* Search in Sidebar - Amazon Style */}
          <div className="sidebar-search">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search in categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Department Section - Amazon Style */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3 className="section-title">Departments</h3>
              <span className="section-count">{categories.length}</span>
            </div>
            <div className="categories-list">
              {displayedCategories.map((category) => (
                <div
                  key={category.name}
                  className={`category-item ${selectedCategory === category.name ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <div className="category-icon-wrapper" style={{ backgroundColor: category.color }}>
                    {category.icon}
                  </div>
                  <div className="category-details">
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{category.count}</span>
                  </div>
                  {selectedCategory === category.name && (
                    <FaCheck className="selected-check" />
                  )}
                </div>
              ))}
              
              {!showMoreCategories && categories.length > 5 && (
                <button 
                  className="show-more-btn"
                  onClick={() => setShowMoreCategories(true)}
                >
                  Show more categories
                </button>
              )}
              
              {showMoreCategories && (
                <button 
                  className="show-less-btn"
                  onClick={() => setShowMoreCategories(false)}
                >
                  Show less
                </button>
              )}
            </div>
          </div>

          {/* Price Filter - Flipkart Style */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3 className="section-title">Price</h3>
            </div>
            <div className="price-slider-container">
              <div className="price-range-display">
                <span className="price-min">
                  <FaRupeeSign /> {priceRange[0].toLocaleString()}
                </span>
                <span className="price-to">to</span>
                <span className="price-max">
                  <FaRupeeSign /> {priceRange[1].toLocaleString()}
                </span>
              </div>
              <div className="slider-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="range-slider min-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="range-slider max-slider"
                />
                <div className="slider-track"></div>
              </div>
            </div>
            
            {/* Price Range Buttons - Flipkart Style */}
            <div className="price-range-buttons">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  className={`price-range-btn ${
                    priceRange[0] === range.min && priceRange[1] === range.max ? 'active' : ''
                  }`}
                  onClick={() => setPriceRange([range.min, range.max])}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter - Amazon Style */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3 className="section-title">Brands</h3>
              <span className="section-count">{selectedBrands.length > 1 ? selectedBrands.length - 1 : 'All'}</span>
            </div>
            <div className="brands-search">
              <FiSearch className="brand-search-icon" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="brand-search-input"
              />
            </div>
            <div className="brands-list">
              <div className="brand-item">
                <input
                  type="checkbox"
                  id="brand-all"
                  checked={selectedBrands.includes('All')}
                  onChange={() => toggleBrand('All')}
                  className="brand-checkbox"
                />
                <label htmlFor="brand-all" className="brand-label">
                  All Brands
                </label>
              </div>
              
              {filteredBrands.map((brand) => (
                <div key={brand} className="brand-item">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="brand-checkbox"
                  />
                  <label htmlFor={`brand-${brand}`} className="brand-label">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Rating - Flipkart Style */}
          <div className="sidebar-section">
            <div className="section-header">
              <h3 className="section-title">Customer Rating</h3>
              <span className="section-count">{selectedRatings.length}</span>
            </div>
            <div className="ratings-list">
              {ratings.map((rating) => (
                <div
                  key={rating.value}
                  className={`rating-item ${selectedRatings.includes(rating.value) ? 'selected' : ''}`}
                  onClick={() => toggleRating(rating.value)}
                >
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`star-icon ${i < rating.value ? 'filled' : 'empty'}`}
                      />
                    ))}
                  </div>
                  <span className="rating-label">{rating.label}</span>
                  {selectedRatings.includes(rating.value) && (
                    <FaCheck className="rating-check" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="filter-actions">
            <button className="clear-filters-btn" onClick={clearAllFilters}>
              Clear all filters
            </button>
            <button className="apply-filters-btn">
              Apply Filters
            </button>
          </div>

          {/* Sidebar Footer */}
          <div className="sidebar-footer">
            <div className="active-filters">
              {selectedRatings.length > 0 && (
                <span className="filter-tag">
                  Ratings: {selectedRatings.map(r => `${r}★`).join(', ')}
                </span>
              )}
              {selectedBrands.length > 1 && (
                <span className="filter-tag">
                  Brands: {selectedBrands.filter(b => b !== 'All').length}
                </span>
              )}
            </div>
            <div className="sidebar-stats">
              Showing {categories.find(c => c.name === selectedCategory)?.count || 0} products
            </div>
          </div>
        </>
      ) : (
        /* Collapsed View */
        <div className="collapsed-view">
          <div className="collapsed-logo">
            <FaAmazon className="collapsed-amazon-icon" />
            <span className="collapsed-brand">WC</span>
          </div>
          
          <div className="collapsed-categories">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`collapsed-category-btn ${
                  selectedCategory === category.name ? 'active' : ''
                }`}
                onClick={() => handleCategorySelect(category.name)}
                title={category.name}
                style={{ color: category.color }}
              >
                <div className="collapsed-icon-wrapper">
                  {category.icon}
                </div>
                <div className="collapsed-count">{category.count}</div>
              </button>
            ))}
          </div>
          
          <div className="collapsed-filters">
            <button 
              className="collapsed-filter-btn"
              title="Price Filter"
              onClick={() => setIsCollapsed(false)}
            >
              <FaRupeeSign />
            </button>
            <button 
              className="collapsed-filter-btn"
              title="Brand Filter"
              onClick={() => setIsCollapsed(false)}
            >
              <FiFilter />
            </button>
            <button 
              className="collapsed-filter-btn"
              title="Rating Filter"
              onClick={() => setIsCollapsed(false)}
            >
              <FiStar />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}