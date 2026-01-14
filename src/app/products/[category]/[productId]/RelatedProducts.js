'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RelatedProducts({ products, currentCategory }) {
  const [loadingStates, setLoadingStates] = useState({});

  const handleImageLoad = (productId) => {
    setLoadingStates(prev => ({
      ...prev,
      [productId]: false
    }));
  };

  const handleImageError = (productId) => {
    setLoadingStates(prev => ({
      ...prev,
      [productId]: false
    }));
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="related-products-section">
      <h2 className="related-products-title">
        <span style={{ color: '#2874f0', marginRight: '8px' }}>📦</span>
        Related Products
        <span className="related-products-subtitle">
          More from this category
        </span>
      </h2>
      
      <div className="related-products-grid">
        {products.map((product) => {
          const isLoading = loadingStates[product.id] !== false;
          
          return (
            <Link 
              href={`/product/${product.slug}`}
              key={product.id}
              className="related-product-card"
            >
              <div className="related-product-image">
                {product.image ? (
                  <>
                    {isLoading && (
                      <div className="image-loading-skeleton">
                        <div className="skeleton-shimmer"></div>
                      </div>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ 
                        objectFit: 'cover',
                        opacity: isLoading ? 0 : 1,
                        transition: 'opacity 0.3s ease'
                      }}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={75}
                      onLoadingComplete={() => handleImageLoad(product.id)}
                      onError={() => handleImageError(product.id)}
                    />
                  </>
                ) : (
                  <div className="no-image-placeholder">
                    <span>🖼️</span>
                  </div>
                )}
              </div>
              <div className="related-product-info">
                <h3 className="related-product-name">
                  {product.name}
                </h3>
                <div className="related-product-price">
                  ₹{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                </div>
                {product.woodtype && (
                  <div className="related-product-woodtype">
                    {product.woodtype}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}