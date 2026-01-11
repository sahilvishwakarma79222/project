// app/products/page.jsx
'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import { FiGrid, FiList, FiFilter, FiSearch, FiChevronDown } from 'react-icons/fi';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  // Sample product data - In real app, fetch from API
  const sampleProducts = [
    {
      id: 1,
      title: "Teak Wood Premium Door",
      subtitle: "Handcrafted Traditional Design",
      price: 15234,
      originalPrice: 20000,
      discountPercentage: 24,
      rating: 4.5,
      reviewCount: 1234,
      material: "Premium Teak Wood",
      dimensions: "50 x 30 inches",
      finish: "Polished Finish",
      image: "teak-door.jpg",
      badge: "Best Seller",
      inStock: true
    },
    {
      id: 2,
      title: "Modern Wooden Bed Frame",
      subtitle: "King Size with Storage",
      price: 25000,
      originalPrice: 30000,
      discountPercentage: 17,
      rating: 4.3,
      reviewCount: 800,
      material: "Sheesham Wood",
      dimensions: "78 x 60 inches",
      finish: "Matte Finish",
      image: "modern-bed.png",
      badge: "New",
      inStock: true
    },
    {
      id: 3,
      title: "Safety Door with Grill",
      subtitle: "Extra Security Design",
      price: 12500,
      originalPrice: 15000,
      discountPercentage: 17,
      rating: 4.7,
      reviewCount: 567,
      material: "Hardwood with Steel",
      dimensions: "36 x 84 inches",
      finish: "Powder Coated",
      image: "safety-door.jpeg",
      inStock: true
    },
    {
      id: 4,
      title: "Wooden Window Frame",
      subtitle: "Traditional Jharokha Style",
      price: 8500,
      originalPrice: 10000,
      discountPercentage: 15,
      rating: 4.2,
      reviewCount: 342,
      material: "Pine Wood",
      dimensions: "48 x 36 inches",
      finish: "Varnished",
      image: "window-frame.jpg",
      inStock: true
    },
    {
      id: 5,
      title: "Wooden Mandir for Home",
      subtitle: "Hand Carved Temple",
      price: 32000,
      originalPrice: 40000,
      discountPercentage: 20,
      rating: 4.8,
      reviewCount: 456,
      material: "Rosewood",
      dimensions: "60 x 48 x 24 inches",
      finish: "Antique Finish",
      image: "wooden-mandir.png",
      badge: "Premium",
      inStock: true
    },
    {
      id: 6,
      title: "Solid Wood Sofa Set",
      subtitle: "3+2+1 Seater",
      price: 75000,
      originalPrice: 95000,
      discountPercentage: 21,
      rating: 4.6,
      reviewCount: 789,
      material: "Solid Wood with Fabric",
      dimensions: "Complete Set",
      finish: "Upholstered",
      image: "sofa-set.jpeg",
      inStock: true
    },
    {
      id: 7,
      title: "Wooden Art Frame",
      subtitle: "Hand Painted Wall Art",
      price: 5500,
      originalPrice: 7000,
      discountPercentage: 21,
      rating: 4.4,
      reviewCount: 234,
      material: "MDF with Wood Frame",
      dimensions: "36 x 24 inches",
      finish: "Glossy",
      image: "art-frame.jpg",
      inStock: true
    },
    {
      id: 8,
      title: "Wooden Study Table",
      subtitle: "With Bookshelf",
      price: 18500,
      originalPrice: 22000,
      discountPercentage: 16,
      rating: 4.5,
      reviewCount: 321,
      material: "Engineered Wood",
      dimensions: "60 x 30 x 48 inches",
      finish: "Walnut Finish",
      image: "study-table.png",
      inStock: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 500);
  }, []);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'discount', label: 'Best Discount' }
  ];

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <style jsx>{`
        .products-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f9f7f3 0%, #f5efe6 100%);
          padding-left: 320px;
        }

        .collapsed-sidebar {
          padding-left: 100px;
        }

        .main-content {
          padding: 30px;
        }

        .header-section {
          background: white;
          border-radius: 16px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 8px 25px rgba(139, 90, 43, 0.1);
          border: 1px solid #e9e5de;
        }

        .page-title {
          font-size: 32px;
          font-weight: 700;
          color: #2c1810;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .page-title span {
          color: #8b5a2b;
        }

        .product-count {
          font-size: 16px;
          color: #666;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f5efe6;
        }

        .controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .search-box {
          flex: 1;
          max-width: 400px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 14px 20px 14px 50px;
          border: 2px solid #e9e5de;
          border-radius: 12px;
          font-size: 16px;
          background: white;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #8b5a2b;
          box-shadow: 0 0 0 3px rgba(139, 90, 43, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #8b5a2b;
          font-size: 20px;
        }

        .view-controls {
          display: flex;
          gap: 10px;
          background: white;
          border-radius: 12px;
          padding: 5px;
          border: 2px solid #e9e5de;
        }

        .view-btn {
          padding: 10px 20px;
          border: none;
          background: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 18px;
          color: #666;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .view-btn.active {
          background: #8b5a2b;
          color: white;
        }

        .sort-filter-container {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .select-wrapper {
          position: relative;
          min-width: 200px;
        }

        .sort-select {
          width: 100%;
          padding: 14px 20px;
          border: 2px solid #e9e5de;
          border-radius: 12px;
          font-size: 16px;
          background: white;
          appearance: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sort-select:focus {
          outline: none;
          border-color: #8b5a2b;
          box-shadow: 0 0 0 3px rgba(139, 90, 43, 0.1);
        }

        .select-arrow {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #8b5a2b;
          pointer-events: none;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 25px;
          background: #8b5a2b;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: #5c4033;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 90, 43, 0.3);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .products-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          flex-direction: column;
          gap: 20px;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #8b5a2b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .page-btn {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #e9e5de;
          background: white;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #2c1810;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .page-btn:hover {
          border-color: #8b5a2b;
          color: #8b5a2b;
        }

        .page-btn.active {
          background: #8b5a2b;
          color: white;
          border-color: #8b5a2b;
        }

        .page-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .results-info {
          text-align: center;
          color: #666;
          margin-top: 20px;
          font-size: 14px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(139, 90, 43, 0.1);
          border: 1px solid #e9e5de;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        @media (max-width: 1200px) {
          .products-page {
            padding-left: 100px;
          }
        }

        @media (max-width: 992px) {
          .products-page {
            padding-left: 0;
            padding-top: 80px;
          }
          
          .controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-box {
            max-width: 100%;
          }
          
          .sort-filter-container {
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 20px;
          }
          
          .page-title {
            font-size: 24px;
          }
          
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
          
          .select-wrapper {
            min-width: 150px;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
          
          .sort-filter-container {
            flex-direction: column;
          }
          
          .select-wrapper, .filter-btn {
            width: 100%;
          }
        }
      `}</style>

      <Sidebar />
      
      <div className={`products-page`}>
        <div className="main-content">
          <div className="header-section">
            <h1 className="page-title">
              🪵 Wooden <span>Door</span>
            </h1>
            
            <div className="product-count">
              Showing {displayedProducts.length} of 70 products in "Wooden Door" category
            </div>
            
            <div className="controls-bar">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search doors by name, material, or type..."
                  className="search-input"
                />
              </div>
              
              <div className="view-controls">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid /> Grid
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList /> List
                </button>
              </div>
              
              <div className="sort-filter-container">
                <div className="select-wrapper">
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="select-arrow" />
                </div>
                
                <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
                  <FiFilter /> Filters
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div>Loading products...</div>
            </div>
          ) : (
            <>
              {displayedProducts.length > 0 ? (
                <div className={viewMode === 'grid' ? 'products-grid' : 'products-list'}>
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search term</p>
                </div>
              )}

              {products.length > itemsPerPage && (
                <>
                  <div className="pagination">
                    <button
                      className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      ←
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button
                      className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      →
                    </button>
                  </div>
                  
                  <div className="results-info">
                    Page {currentPage} of {totalPages} • {products.length} products total
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}