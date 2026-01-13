'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '../../wooden-doors/product-detail-styles.css'; // ✅ Import CSS

export default function ProductImages({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoomPreview, setShowZoomPreview] = useState(false);
  const imageContainerRef = useRef(null);
  const zoomRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle mouse movement for zoom
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current || !isZoomed) return;
    
    const container = imageContainerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    // Clamp values between 0-100
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    
    setZoomPosition({ x: clampedX, y: clampedY });
    
    // Update zoom preview position
    if (zoomRef.current) {
      zoomRef.current.style.backgroundPosition = `${clampedX}% ${clampedY}%`;
    }
  };

  // Handle zoom on click
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setShowZoomPreview(true);
    } else {
      setShowZoomPreview(false);
    }
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    setIsZoomed(false);
    setShowZoomPreview(false);
  };

  if (!isClient) {
    return (
      <div className="main-image-container"></div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="main-image-container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#666'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🖼️</div>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image with Zoom Container */}
      <div 
        className="main-image-container"
        ref={imageContainerRef}
        onMouseMove={isZoomed ? handleMouseMove : undefined}
        onMouseLeave={() => setShowZoomPreview(false)}
        style={{ position: 'relative', cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
        onClick={toggleZoom}
      >
        {/* Main Image */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          height: '100%',
          overflow: isZoomed ? 'hidden' : 'visible'
        }}>
          <Image
            src={images[selectedImage]}
            alt={`${productName} - View ${selectedImage + 1}`}
            fill
            style={{ 
              objectFit: isZoomed ? 'none' : 'contain',
              objectPosition: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
              transform: isZoomed ? 'scale(2)' : 'scale(1)',
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transition: isZoomed ? 'none' : 'transform 0.3s ease'
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        
        {/* Zoom Instructions */}
        {!isZoomed && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '500',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            backdropFilter: 'blur(4px)'
          }}>
            <span>🔍</span> Click to zoom
          </div>
        )}
        
        {/* Zoom Out Button */}
        {isZoomed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #d5d9d9',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#0f1111',
              cursor: 'pointer',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'white'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.95)'}
          >
            <span>✕</span> Zoom Out
          </button>
        )}

        {/* Zoom Preview (Magnifying Glass Effect) */}
        {showZoomPreview && !isZoomed && (
          <div style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            border: '2px solid #ffa41c',
            borderRadius: '50%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 15,
            background: `url(${images[selectedImage]}) no-repeat`,
            backgroundSize: '200%',
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            boxShadow: '0 0 15px rgba(0,0,0,0.3)',
            display: 'none' // Hidden by default, show on hover
          }} ref={zoomRef} />
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && !isZoomed && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="nav-arrow prev"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="nav-arrow next"
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}
        
        {/* Image Counter */}
        <div className="image-counter">
          {selectedImage + 1} / {images.length}
          {isZoomed && ' • Zoomed 2x'}
        </div>

        {/* Zoom Controls */}
        {isZoomed && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '500',
            zIndex: 15,
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>🖱️</span>
              <span>Move mouse to pan</span>
            </div>
            <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.3)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>🔄</span>
              <span>Click to zoom out</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="thumbnail-strip">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleThumbnailClick(index);
              }}
              className={`thumbnail-button ${selectedImage === index ? 'active' : ''}`}
              aria-label={`View image ${index + 1}`}
              onMouseEnter={() => {
                if (!isZoomed) {
                  setZoomPosition({ x: 50, y: 50 });
                }
              }}
            >
              <div className="thumbnail-image">
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="80px"
                />
                
                {/* Image number badge for thumbnails */}
                <div className="image-number-badge">
                  {index + 1}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Image Description */}
      <div className="image-description">
        <p>Click on image to zoom • Click thumbnails to switch views</p>
        <p style={{ fontSize: '11px', marginTop: '4px', color: '#767676' }}>
          Zoom: Click image (2x) • Pan: Move mouse • Exit: Click again or use button
        </p>
      </div>
    </div>
  );
}