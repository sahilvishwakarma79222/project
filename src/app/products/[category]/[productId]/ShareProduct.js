'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import '../../wooden-doors/product-view-flipkart.css';

export default function ShareProduct({ product, category, productId, mobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if mobile device
    setIsMobileDevice(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const productUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/product/${category}/${productId}`
    : '';

  const shareMessage = `Check out this ${product.name} - ₹${product.price}`;
  const whatsappText = `Check out this product: ${product.name}%0APrice: ₹${product.price}%0A${productUrl}`;

  const handleShare = async () => {
    if (isMobileDevice && navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareMessage,
          url: productUrl,
        });
      } catch (error) {
        console.log('Share cancelled:', error);
      }
    } else {
      setIsOpen(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '💬',
      color: '#25D366',
      action: () => window.open(`https://wa.me/?text=${whatsappText}`, '_blank')
    },
    {
      name: 'Copy Link',
      icon: copied ? '✅' : '🔗',
      color: copied ? '#4CAF50' : '#666',
      action: copyToClipboard
    },
    {
      name: 'Facebook',
      icon: '📘',
      color: '#1877F2',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank')
    },
    {
      name: 'Twitter',
      icon: '🐦',
      color: '#1DA1F2',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(productUrl)}`, '_blank')
    }
  ];

  if (mobile) {
    return (
      <>
        <button 
          className="share-button-mobile"
          onClick={handleShare}
          aria-label="Share product"
        >
          <span className="share-icon">📤</span>
        </button>
        
        {isOpen && (
          <div className="share-modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="share-modal" onClick={e => e.stopPropagation()}>
              <div className="share-modal-header">
                <h3>Share Product</h3>
                <button 
                  className="share-modal-close"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="share-options-grid">
                {shareOptions.map((option, index) => (
                  <button
                    key={index}
                    className="share-option"
                    onClick={option.action}
                    style={{ '--option-color': option.color }}
                  >
                    <span className="share-option-icon">{option.icon}</span>
                    <span className="share-option-name">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button 
        className="share-button"
        onClick={handleShare}
        aria-label="Share product"
      >
        <span className="share-icon">📤</span>
        <span className="share-text">Share</span>
      </button>
      
      {isOpen && (
        <div className="share-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="share-modal" onClick={e => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Share Product</h3>
              <button 
                className="share-modal-close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="share-options-grid">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  className="share-option"
                  onClick={option.action}
                  style={{ '--option-color': option.color }}
                >
                  <span className="share-option-icon">{option.icon}</span>
                  <span className="share-option-name">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}