// components/ProductCard.jsx
'use client';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  
  // Function to handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  // List of supported image formats
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  
  // Function to get image URL with fallback
  const getImageUrl = (imgName) => {
    // First try with different extensions
    const baseName = imgName.split('.')[0];
    
    for (const format of supportedFormats) {
      const possibleUrl = `/products/${baseName}${format}`;
      // In real app, you would check if image exists
      return possibleUrl;
    }
    
    // Fallback to placeholder
    return '/api/placeholder/300/300';
  };

  // Format price with Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(139, 90, 43, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          border: 1px solid #e9e5de;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(139, 90, 43, 0.2);
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: linear-gradient(135deg, #f9f7f3 0%, #f5efe6 100%);
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e9e5de 0%, #d9d0c1 100%);
          color: #8b5a2b;
          font-size: 14px;
          text-align: center;
          padding: 20px;
        }

        .badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: linear-gradient(135deg, #8b5a2b 0%, #5c4033 100%);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(139, 90, 43, 0.3);
          z-index: 2;
        }

        .discount-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
          z-index: 2;
        }

        .product-content {
          padding: 20px;
        }

        .product-title {
          font-size: 18px;
          font-weight: 700;
          color: #2c1810;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .product-subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .price-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .current-price {
          font-size: 22px;
          font-weight: 700;
          color: #2c1810;
        }

        .original-price {
          font-size: 16px;
          color: #999;
          text-decoration: line-through;
        }

        .discount {
          background: rgba(220, 53, 69, 0.1);
          color: #dc3545;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
        }

        .rating-container {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
        }

        .stars {
          display: flex;
          gap: 2px;
          color: #ffc107;
        }

        .rating-count {
          font-size: 14px;
          color: #666;
        }

        .product-specs {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          padding: 15px;
          background: #f9f7f3;
          border-radius: 10px;
          border: 1px solid #e9e5de;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .spec-label {
          color: #666;
        }

        .spec-value {
          color: #2c1810;
          font-weight: 500;
        }

        .button-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .buy-now-btn {
          background: linear-gradient(135deg, #8b5a2b 0%, #5c4033 100%);
          color: white;
          border: none;
          padding: 12px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .buy-now-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 90, 43, 0.3);
        }

        .cart-btn {
          background: white;
          color: #8b5a2b;
          border: 2px solid #8b5a2b;
          padding: 12px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .cart-btn:hover {
          background: #8b5a2b;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 90, 43, 0.2);
        }

        .out-of-stock {
          background: #f8f9fa;
          color: #6c757d;
          padding: 12px;
          border-radius: 10px;
          text-align: center;
          font-weight: 600;
          border: 1px solid #dee2e6;
        }

        @media (max-width: 768px) {
          .button-group {
            grid-template-columns: 1fr;
          }
          
          .product-title {
            font-size: 16px;
          }
          
          .current-price {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="product-card">
        {product.discountPercentage > 0 && (
          <div className="discount-badge">{product.discountPercentage}% OFF</div>
        )}
        
        {product.badge && <div className="badge">{product.badge}</div>}

        <div className="image-container">
          {!imageError ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.title}
              className="product-image"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder">
              <div>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>🪵</div>
                <div>{product.title}</div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                  (Image coming soon)
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="product-content">
          <h3 className="product-title">{product.title}</h3>
          {product.subtitle && <div className="product-subtitle">{product.subtitle}</div>}
          
          <div className="price-container">
            <div className="current-price">{formatPrice(product.price)}</div>
            {product.originalPrice && (
              <div className="original-price">{formatPrice(product.originalPrice)}</div>
            )}
            {product.discountPercentage > 0 && (
              <div className="discount">Save {formatPrice(product.originalPrice - product.price)}</div>
            )}
          </div>

          <div className="rating-container">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  fill={i < Math.floor(product.rating) ? "#ffc107" : "#e4e5e9"} 
                />
              ))}
            </div>
            <div className="rating-count">({product.reviewCount})</div>
          </div>

          <div className="product-specs">
            <div className="spec-item">
              <span className="spec-label">Material:</span>
              <span className="spec-value">{product.material}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Dimensions:</span>
              <span className="spec-value">{product.dimensions}</span>
            </div>
            {product.finish && (
              <div className="spec-item">
                <span className="spec-label">Finish:</span>
                <span className="spec-value">{product.finish}</span>
              </div>
            )}
          </div>

          {product.inStock ? (
            <div className="button-group">
              <button className="buy-now-btn">
                Buy Now
              </button>
              <button className="cart-btn">
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          ) : (
            <div className="out-of-stock">Out of Stock</div>
          )}
        </div>
      </div>
    </>
  );
}