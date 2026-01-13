// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import '../../wooden-doors/product-detail-styles.css'; // ✅ Import CSS

// export default function ProductImages({ images, productName }) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isClient, setIsClient] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [showZoomPreview, setShowZoomPreview] = useState(false);
//   const imageContainerRef = useRef(null);
//   const zoomRef = useRef(null);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Handle mouse movement for zoom
//   const handleMouseMove = (e) => {
//     if (!imageContainerRef.current || !isZoomed) return;
    
//     const container = imageContainerRef.current;
//     const { left, top, width, height } = container.getBoundingClientRect();
    
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
    
//     // Clamp values between 0-100
//     const clampedX = Math.max(0, Math.min(100, x));
//     const clampedY = Math.max(0, Math.min(100, y));
    
//     setZoomPosition({ x: clampedX, y: clampedY });
    
//     // Update zoom preview position
//     if (zoomRef.current) {
//       zoomRef.current.style.backgroundPosition = `${clampedX}% ${clampedY}%`;
//     }
//   };

//   // Handle zoom on click
//   const toggleZoom = () => {
//     setIsZoomed(!isZoomed);
//     if (!isZoomed) {
//       setShowZoomPreview(true);
//     } else {
//       setShowZoomPreview(false);
//     }
//   };

//   // Handle thumbnail click
//   const handleThumbnailClick = (index) => {
//     setSelectedImage(index);
//     setIsZoomed(false);
//     setShowZoomPreview(false);
//   };

//   if (!isClient) {
//     return (
//       <div className="main-image-container"></div>
//     );
//   }

//   if (!images || images.length === 0) {
//     return (
//       <div className="main-image-container" style={{ 
//         display: 'flex', 
//         alignItems: 'center', 
//         justifyContent: 'center',
//         color: '#666'
//       }}>
//         <div style={{ textAlign: 'center' }}>
//           <div style={{ fontSize: '48px', marginBottom: '15px' }}>🖼️</div>
//           <p>No images available</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Main Image with Zoom Container */}
//       <div 
//         className="main-image-container"
//         ref={imageContainerRef}
//         onMouseMove={isZoomed ? handleMouseMove : undefined}
//         onMouseLeave={() => setShowZoomPreview(false)}
//         style={{ position: 'relative', cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
//         onClick={toggleZoom}
//       >
//         {/* Main Image */}
//         <div style={{ 
//           position: 'relative', 
//           width: '100%', 
//           height: '100%',
//           overflow: isZoomed ? 'hidden' : 'visible'
//         }}>
//           <Image
//             src={images[selectedImage]}
//             alt={`${productName} - View ${selectedImage + 1}`}
//             fill
//             style={{ 
//               objectFit: isZoomed ? 'none' : 'contain',
//               objectPosition: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
//               transform: isZoomed ? 'scale(2)' : 'scale(1)',
//               transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//               transition: isZoomed ? 'none' : 'transform 0.3s ease'
//             }}
//             sizes="(max-width: 768px) 100vw, 50vw"
//             priority
//           />
//         </div>
        
//         {/* Zoom Instructions */}
//         {!isZoomed && (
//           <div style={{
//             position: 'absolute',
//             bottom: '10px',
//             right: '10px',
//             background: 'rgba(0, 0, 0, 0.7)',
//             color: 'white',
//             padding: '6px 10px',
//             borderRadius: '6px',
//             fontSize: '11px',
//             fontWeight: '500',
//             zIndex: 5,
//             display: 'flex',
//             alignItems: 'center',
//             gap: '5px',
//             backdropFilter: 'blur(4px)'
//           }}>
//             <span>🔍</span> Click to zoom
//           </div>
//         )}
        
//         {/* Zoom Out Button */}
//         {isZoomed && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               toggleZoom();
//             }}
//             style={{
//               position: 'absolute',
//               top: '10px',
//               right: '10px',
//               background: 'rgba(255, 255, 255, 0.95)',
//               border: '1px solid #d5d9d9',
//               borderRadius: '6px',
//               padding: '6px 12px',
//               fontSize: '12px',
//               fontWeight: '600',
//               color: '#0f1111',
//               cursor: 'pointer',
//               zIndex: 20,
//               display: 'flex',
//               alignItems: 'center',
//               gap: '5px',
//               boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//               transition: 'all 0.2s ease'
//             }}
//             onMouseEnter={(e) => e.target.style.background = 'white'}
//             onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.95)'}
//           >
//             <span>✕</span> Zoom Out
//           </button>
//         )}

//         {/* Zoom Preview (Magnifying Glass Effect) */}
//         {showZoomPreview && !isZoomed && (
//           <div style={{
//             position: 'absolute',
//             width: '150px',
//             height: '150px',
//             border: '2px solid #ffa41c',
//             borderRadius: '50%',
//             overflow: 'hidden',
//             pointerEvents: 'none',
//             zIndex: 15,
//             background: `url(${images[selectedImage]}) no-repeat`,
//             backgroundSize: '200%',
//             backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
//             boxShadow: '0 0 15px rgba(0,0,0,0.3)',
//             display: 'none' // Hidden by default, show on hover
//           }} ref={zoomRef} />
//         )}

//         {/* Navigation Arrows */}
//         {images.length > 1 && !isZoomed && (
//           <>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//               }}
//               className="nav-arrow prev"
//               aria-label="Previous image"
//             >
//               ←
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//               }}
//               className="nav-arrow next"
//               aria-label="Next image"
//             >
//               →
//             </button>
//           </>
//         )}
        
//         {/* Image Counter */}
//         <div className="image-counter">
//           {selectedImage + 1} / {images.length}
//           {isZoomed && ' • Zoomed 2x'}
//         </div>

//         {/* Zoom Controls */}
//         {isZoomed && (
//           <div style={{
//             position: 'absolute',
//             bottom: '10px',
//             left: '10px',
//             background: 'rgba(0, 0, 0, 0.7)',
//             color: 'white',
//             padding: '8px 12px',
//             borderRadius: '6px',
//             fontSize: '11px',
//             fontWeight: '500',
//             zIndex: 15,
//             backdropFilter: 'blur(4px)',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <span>🖱️</span>
//               <span>Move mouse to pan</span>
//             </div>
//             <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.3)' }}></div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <span>🔄</span>
//               <span>Click to zoom out</span>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Thumbnail Strip */}
//       {images.length > 1 && (
//         <div className="thumbnail-strip">
//           {images.map((img, index) => (
//             <button
//               key={index}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleThumbnailClick(index);
//               }}
//               className={`thumbnail-button ${selectedImage === index ? 'active' : ''}`}
//               aria-label={`View image ${index + 1}`}
//               onMouseEnter={() => {
//                 if (!isZoomed) {
//                   setZoomPosition({ x: 50, y: 50 });
//                 }
//               }}
//             >
//               <div className="thumbnail-image">
//                 <Image
//                   src={img}
//                   alt={`${productName} thumbnail ${index + 1}`}
//                   fill
//                   style={{ objectFit: 'cover' }}
//                   sizes="80px"
//                 />
                
//                 {/* Image number badge for thumbnails */}
//                 <div className="image-number-badge">
//                   {index + 1}
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}
      
//       {/* Image Description */}
//       <div className="image-description">
        
//         <p>Click on image to zoom • Click thumbnails to switch views</p>
//         <p style={{ fontSize: '11px', marginTop: '4px', color: '#767676' }}>
//           Zoom: Click image (2x) • Pan: Move mouse • Exit: Click again or use button
//         </p>
//       </div>
//     </div>
    
//   );
// }

// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import '../../wooden-doors/product-view-flipkart.css';

// export default function ProductImages({ images, productName }) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isClient, setIsClient] = useState(false);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [showZoomPreview, setShowZoomPreview] = useState(false);
//   const [isZoomPreviewVisible, setIsZoomPreviewVisible] = useState(false);
//   const imageContainerRef = useRef(null);
//   const zoomRef = useRef(null);
//   const previewTimerRef = useRef(null);

//   useEffect(() => {
//     setIsClient(true);
//     return () => {
//       if (previewTimerRef.current) {
//         clearTimeout(previewTimerRef.current);
//       }
//     };
//   }, []);

//   // Handle mouse movement for zoom
//   const handleMouseMove = (e) => {
//     if (!imageContainerRef.current || !isZoomed) return;
    
//     const container = imageContainerRef.current;
//     const { left, top, width, height } = container.getBoundingClientRect();
    
//     let x = ((e.clientX - left) / width) * 100;
//     let y = ((e.clientY - top) / height) * 100;
    
//     // Clamp values between 0-100
//     x = Math.max(0, Math.min(100, x));
//     y = Math.max(0, Math.min(100, y));
    
//     setZoomPosition({ x, y });
    
//     // Update zoom preview position
//     if (zoomRef.current) {
//       zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
//     }
//   };

//   // Toggle zoom on main image click
//   const toggleZoom = () => {
//     const newZoomState = !isZoomed;
//     setIsZoomed(newZoomState);
//     setShowZoomPreview(newZoomState);
//     setIsZoomPreviewVisible(newZoomState);
    
//     if (newZoomState) {
//       // Center zoom on initial click
//       setZoomPosition({ x: 50, y: 50 });
//     }
//   };

//   // Handle thumbnail click
//   const handleThumbnailClick = (index) => {
//     setSelectedImage(index);
//     setIsZoomed(false);
//     setShowZoomPreview(false);
//     setIsZoomPreviewVisible(false);
//   };

//   // Show zoom preview on thumbnail hover (with delay)
//   const handleThumbnailHover = (index) => {
//     if (previewTimerRef.current) {
//       clearTimeout(previewTimerRef.current);
//     }
    
//     previewTimerRef.current = setTimeout(() => {
//       setSelectedImage(index);
//       setShowZoomPreview(true);
//       setIsZoomPreviewVisible(true);
//     }, 300);
//   };

//   // Hide zoom preview
//   const hideZoomPreview = () => {
//     if (previewTimerRef.current) {
//       clearTimeout(previewTimerRef.current);
//     }
    
//     if (!isZoomed) {
//       setShowZoomPreview(false);
//       setIsZoomPreviewVisible(false);
//     }
//   };

//   // Navigation functions
//   const goToPreviousImage = () => {
//     setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1);
//     setIsZoomed(false);
//     setShowZoomPreview(false);
//     setIsZoomPreviewVisible(false);
//   };

//   const goToNextImage = () => {
//     setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1);
//     setIsZoomed(false);
//     setShowZoomPreview(false);
//     setIsZoomPreviewVisible(false);
//   };

//   if (!isClient) {
//     return (
//       <div className="image-gallery-container">
//         <div className="image-gallery-sidebar">
//           <div className="sub-image-list">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="sub-image-item image-loading"></div>
//             ))}
//           </div>
//         </div>
//         <div className="main-image-area">
//           <div className="main-image-container image-loading"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!images || images.length === 0) {
//     return (
//       <div className="image-gallery-container">
//         <div className="image-gallery-sidebar">
//           <div className="sub-image-list">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="sub-image-item" style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: '#999',
//                 fontSize: '12px'
//               }}>
//                 No Image
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="main-image-area">
//           <div className="main-image-container" style={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             justifyContent: 'center',
//             color: '#666',
//             fontSize: '14px'
//           }}>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: '48px', marginBottom: '15px' }}>🖼️</div>
//               <p>No images available</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="image-gallery-container">
//       {/* Sub Images - Left Side */}
//       <div className="image-gallery-sidebar">
//         <div className="sub-image-list">
//           {images.map((img, index) => (
//             <div
//               key={index}
//               className={`sub-image-item ${selectedImage === index ? 'active' : ''}`}
//               onClick={() => handleThumbnailClick(index)}
//               onMouseEnter={() => handleThumbnailHover(index)}
//               onMouseLeave={hideZoomPreview}
//               role="button"
//               tabIndex={0}
//               aria-label={`View image ${index + 1}`}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   e.preventDefault();
//                   handleThumbnailClick(index);
//                 }
//               }}
//             >
//               <div className="sub-image-number">{index + 1}</div>
//               <Image
//                 src={img}
//                 alt={`${productName} thumbnail ${index + 1}`}
//                 fill
//                 style={{ objectFit: 'cover' }}
//                 sizes="100px"
//                 quality={60}
//                 priority={index === 0}
//               />
//             </div>
//           ))}
//         </div>
        
//         {/* Image Count Info */}
//         <div style={{
//           marginTop: '15px',
//           textAlign: 'center',
//           fontSize: '12px',
//           color: '#666',
//           padding: '8px',
//           background: '#f9f9f9',
//           borderRadius: '6px'
//         }}>
//           {images.length} image{images.length !== 1 ? 's' : ''} available
//         </div>
//       </div>

//       {/* Main Image Area */}
//       <div className="main-image-area">
//         <div 
//           className="main-image-container"
//           ref={imageContainerRef}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={hideZoomPreview}
//           style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
//           onClick={toggleZoom}
//           role="button"
//           tabIndex={0}
//           aria-label={isZoomed ? 'Zoom out of image' : 'Zoom into image'}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' || e.key === ' ') {
//               e.preventDefault();
//               toggleZoom();
//             }
//           }}
//         >
//           {/* Main Image */}
//           <Image
//             src={images[selectedImage]}
//             alt={`${productName} - View ${selectedImage + 1}`}
//             fill
//             style={{ 
//               objectFit: isZoomed ? 'none' : 'contain',
//               objectPosition: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
//               transform: isZoomed ? 'scale(2)' : 'scale(1)',
//               transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//               transition: isZoomed ? 'none' : 'transform 0.3s ease'
//             }}
//             sizes="(max-width: 768px) 100vw, 70vw"
//             quality={90}
//             priority
//           />
          
//           {/* Zoom Instruction */}
//           <div className="zoom-instruction">
//             <span>{isZoomed ? '❌' : '🔍'}</span>
//             {isZoomed ? 'Click to zoom out' : 'Click to zoom 2x'}
//           </div>
          
//           {/* Navigation Arrows */}
//           {images.length > 1 && (
//             <>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToPreviousImage();
//                 }}
//                 className="nav-arrow prev"
//                 aria-label="Previous image"
//               >
//                 ←
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   goToNextImage();
//                 }}
//                 className="nav-arrow next"
//                 aria-label="Next image"
//               >
//                 →
//               </button>
//             </>
//           )}
          
//           {/* Image Counter */}
//           <div className="image-counter">
//             Image {selectedImage + 1} of {images.length}
//           </div>
          
//           {/* Zoom Controls Info */}
//           {isZoomed && (
//             <div style={{
//               position: 'absolute',
//               bottom: '16px',
//               left: '16px',
//               background: 'rgba(0, 0, 0, 0.8)',
//               color: 'white',
//               padding: '8px 12px',
//               borderRadius: '20px',
//               fontSize: '11px',
//               fontWeight: '500',
//               zIndex: 15,
//               backdropFilter: 'blur(4px)',
//               border: '1px solid rgba(255,255,255,0.1)',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}>
//               <span>🖱️ Move mouse to pan</span>
//             </div>
//           )}
//         </div>

//         {/* Flipkart-style Zoom Preview */}
//         {isZoomPreviewVisible && (
//           <div 
//             className="zoom-preview-container"
//             ref={zoomRef}
//             style={{ 
//               display: isZoomed ? 'block' : (showZoomPreview ? 'block' : 'none'),
//               backgroundImage: `url(${images[selectedImage]})`,
//               backgroundSize: '200%',
//               backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
//               backgroundRepeat: 'no-repeat',
//               transition: 'opacity 0.3s ease'
//             }}
//           />
//         )}
        
//         {/* Image Navigation Dots for Mobile */}
//         {images.length > 1 && (
//           <div className="image-dots" style={{
//             display: 'flex',
//             justifyContent: 'center',
//             gap: '8px',
//             marginTop: '12px',
//             display: 'none'
//           }}>
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleThumbnailClick(index)}
//                 style={{
//                   width: '8px',
//                   height: '8px',
//                   borderRadius: '50%',
//                   border: 'none',
//                   background: selectedImage === index ? '#2874f0' : '#d4d5d9',
//                   cursor: 'pointer',
//                   padding: '0',
//                   transition: 'background 0.3s'
//                 }}
//                 aria-label={`Go to image ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '../../wooden-doors/product-view-flipkart.css';

export default function ProductImages({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [zoomPreviewStyle, setZoomPreviewStyle] = useState({});
  
  const mainImageContainerRef = useRef(null);
  const mainImageRef = useRef(null);
  const zoomLensRef = useRef(null);
  const zoomedImageContainerRef = useRef(null);
  const zoomedImageRef = useRef(null);
  
  // Thumbnails refs
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    setIsClient(true);
    // Initialize zoom preview position
    updateZoomPreviewPosition();
    window.addEventListener('resize', updateZoomPreviewPosition);
    
    return () => {
      window.removeEventListener('resize', updateZoomPreviewPosition);
    };
  }, []);

  // Update zoom preview container position
  const updateZoomPreviewPosition = () => {
    if (!mainImageContainerRef.current) return;
    
    const containerRect = mainImageContainerRef.current.getBoundingClientRect();
    const zoomContainerWidth = 400;
    
    // Check if there's enough space on the right
    if (window.innerWidth - containerRect.right > zoomContainerWidth + 20) {
      // Position to the right
      setZoomPreviewStyle({
        left: `${containerRect.right + 20}px`,
        top: `${containerRect.top}px`
      });
    } else {
      // Position to the left
      setZoomPreviewStyle({
        left: `${containerRect.left - zoomContainerWidth - 20}px`,
        top: `${containerRect.top}px`
      });
    }
  };

  // Handle mouse movement for zoom
  const handleMouseMove = (e) => {
    if (!mainImageContainerRef.current || !zoomEnabled || !mainImageRef.current) return;
    
    const container = mainImageContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Calculate mouse position relative to container
    let x = e.clientX - containerRect.left;
    let y = e.clientY - containerRect.top;
    
    // Adjust for scroll position
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    
    // Keep lens within bounds
    const lensWidth = zoomLensRef.current?.offsetWidth || 150;
    const lensHeight = zoomLensRef.current?.offsetHeight || 150;
    
    // Calculate max positions
    const maxX = containerRect.width - lensWidth;
    const maxY = containerRect.height - lensHeight;
    
    // Constrain position
    x = Math.max(0, Math.min(x - lensWidth / 2, maxX));
    y = Math.max(0, Math.min(y - lensHeight / 2, maxY));
    
    // Set lens position
    if (zoomLensRef.current) {
      zoomLensRef.current.style.left = `${x}px`;
      zoomLensRef.current.style.top = `${y}px`;
    }
    
    // Calculate background position for zoomed image
    const bgX = (x / maxX) * 100;
    const bgY = (y / maxY) * 100;
    
    // Set zoomed image background position
    if (zoomedImageRef.current) {
      zoomedImageRef.current.style.backgroundPosition = `${bgX}% ${bgY}%`;
    }
    
    setMousePosition({ x, y, bgX, bgY });
  };

  // Handle mouse enter on main image
  const handleMouseEnter = (e) => {
    setZoomEnabled(true);
    updateZoomPreviewPosition();
    
    // Calculate lens size (40% of main image)
    if (mainImageRef.current && zoomLensRef.current) {
      const lensSize = Math.min(
        mainImageRef.current.offsetWidth, 
        mainImageRef.current.offsetHeight
      ) * 0.4;
      
      zoomLensRef.current.style.width = `${lensSize}px`;
      zoomLensRef.current.style.height = `${lensSize}px`;
    }
  };

  // Handle mouse leave from main image
  const handleMouseLeave = () => {
    setZoomEnabled(false);
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  // Handle thumbnail hover
  const handleThumbnailHover = (index) => {
    setSelectedImage(index);
  };

  // Navigation functions
  const goToPreviousImage = () => {
    setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const goToNextImage = () => {
    setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  if (!isClient) {
    return (
      <div className="image-gallery-container">
        <div className="image-gallery-sidebar">
          <div className="sub-image-list">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="sub-image-item image-loading"></div>
            ))}
          </div>
        </div>
        <div className="main-image-area">
          <div className="main-image-container image-loading"></div>
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="image-gallery-container">
        <div className="image-gallery-sidebar">
          <div className="sub-image-list">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="sub-image-item" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '12px'
              }}>
                No Image
              </div>
            ))}
          </div>
        </div>
        <div className="main-image-area">
          <div className="main-image-container" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#666',
            fontSize: '14px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🖼️</div>
              <p>No images available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="image-gallery-container">
      {/* Sub Images - Left Side */}
      <div className="image-gallery-sidebar">
        <div className="sub-image-list">
          {images.map((img, index) => (
            <div
              key={index}
              className={`sub-image-item ${selectedImage === index ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
              onMouseEnter={() => handleThumbnailHover(index)}
              ref={el => thumbnailRefs.current[index] = el}
              role="button"
              tabIndex={0}
              aria-label={`View image ${index + 1}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleThumbnailClick(index);
                }
              }}
            >
              <div className="sub-image-number">{index + 1}</div>
              <Image
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="90px"
                quality={60}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        
        {/* Image Count Info */}
        <div className="image-count-info">
          {images.length} image{images.length !== 1 ? 's' : ''} available
        </div>
      </div>

      {/* Main Image Area */}
      <div className="main-image-area">
        <div 
          className="main-image-container"
          ref={mainImageContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ 
            cursor: zoomEnabled ? 'crosshair' : 'default',
            position: 'relative'
          }}
        >
          {/* Main Image */}
          <Image
            ref={mainImageRef}
            src={images[selectedImage]}
            alt={`${productName} - View ${selectedImage + 1}`}
            fill
            style={{ 
              objectFit: 'contain',
              objectPosition: 'center'
            }}
            sizes="(max-width: 768px) 100vw, 70vw"
            quality={90}
            priority
          />
          
          {/* Zoom Lens (Magnifying Glass) - Only shows on hover */}
          <div 
            ref={zoomLensRef}
            className="zoom-lens"
            style={{
              display: zoomEnabled ? 'block' : 'none'
            }}
          />
          
          {/* Zoom Instruction */}
          <div className="zoom-instruction">
            <span>🔍</span> Hover to zoom
          </div>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousImage();
                }}
                className="nav-arrow prev"
                aria-label="Previous image"
                style={{ zIndex: 20 }}
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextImage();
                }}
                className="nav-arrow next"
                aria-label="Next image"
                style={{ zIndex: 20 }}
              >
                →
              </button>
            </>
          )}
          
          {/* Image Counter */}
          <div className="image-counter">
            Image {selectedImage + 1} of {images.length}
          </div>
        </div>

        {/* Zoomed Image Container (Right Side) - Flipkart Style */}
        <div 
          ref={zoomedImageContainerRef}
          className="zoomed-image-container"
          style={{
            ...zoomPreviewStyle,
            display: zoomEnabled ? 'block' : 'none',
            position: 'fixed'
          }}
        >
          <div 
            ref={zoomedImageRef}
            className="zoomed-image"
            style={{
              backgroundImage: `url(${images[selectedImage]})`,
              backgroundSize: '200%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
      </div>
    </div>
  );
}