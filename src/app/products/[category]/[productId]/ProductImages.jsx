
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import '../../wooden-doors/product-view-flipkart.css';

// export default function ProductImages({ images, productName }) {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isClient, setIsClient] = useState(false);
//   const [zoomEnabled, setZoomEnabled] = useState(false);
//   const [isStuck, setIsStuck] = useState(false);
  
//   const mainImageContainerRef = useRef(null);
//   const mainImageRef = useRef(null);
//   const zoomLensRef = useRef(null);
//   const zoomedImageRef = useRef(null);
//   const gallerySectionRef = useRef(null);
  
//   // Thumbnails refs
//   const thumbnailRefs = useRef([]);

//   useEffect(() => {
//     setIsClient(true);
//     updateZoomPreviewPosition();
//     window.addEventListener('resize', updateZoomPreviewPosition);
    
//     // Add scroll listener for sticky behavior
//     const handleScroll = () => {
//       if (!gallerySectionRef.current || window.innerWidth <= 1024) return;
      
//       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//       const shouldStick = scrollTop > 100;
      
//       if (shouldStick !== isStuck) {
//         setIsStuck(shouldStick);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
    
//     return () => {
//       window.removeEventListener('resize', updateZoomPreviewPosition);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [isStuck]);

//   // Update zoom preview container position
//   const updateZoomPreviewPosition = () => {
//     if (!mainImageContainerRef.current) return;
    
//     const containerRect = mainImageContainerRef.current.getBoundingClientRect();
//     const zoomContainerWidth = 400;
    
//     // Check if there's enough space on the right
//     if (window.innerWidth - containerRect.right > zoomContainerWidth + 20) {
//       // Position to the right
//       zoomedImageRef.current?.parentElement?.style.setProperty('left', `${containerRect.right + 20}px`);
//       zoomedImageRef.current?.parentElement?.style.setProperty('top', `${containerRect.top}px`);
//     } else {
//       // Position to the left
//       zoomedImageRef.current?.parentElement?.style.setProperty('left', `${containerRect.left - zoomContainerWidth - 20}px`);
//       zoomedImageRef.current?.parentElement?.style.setProperty('top', `${containerRect.top}px`);
//     }
//   };

//   // FIXED: Handle mouse movement for zoom
//   const handleMouseMove = (e) => {
//     if (!mainImageContainerRef.current || !zoomEnabled || !mainImageRef.current) return;
    
//     const container = mainImageContainerRef.current;
//     const containerRect = container.getBoundingClientRect();
    
//     // Get mouse position relative to container
//     let mouseX = e.clientX - containerRect.left;
//     let mouseY = e.clientY - containerRect.top;
    
//     // Clamp mouse position within container bounds
//     mouseX = Math.max(0, Math.min(mouseX, containerRect.width));
//     mouseY = Math.max(0, Math.min(mouseY, containerRect.height));
    
//     // Calculate relative position (0 to 1)
//     const relativeX = mouseX / containerRect.width;
//     const relativeY = mouseY / containerRect.height;
    
//     // Position zoom lens (centered on cursor)
//     if (zoomLensRef.current) {
//       const lensWidth = zoomLensRef.current.offsetWidth;
//       const lensHeight = zoomLensRef.current.offsetHeight;
      
//       // Calculate lens position (center lens on cursor)
//       const lensX = mouseX - (lensWidth / 2);
//       const lensY = mouseY - (lensHeight / 2);
      
//       // Constrain lens within container
//       const maxX = containerRect.width - lensWidth;
//       const maxY = containerRect.height - lensHeight;
      
//       const constrainedX = Math.max(0, Math.min(lensX, maxX));
//       const constrainedY = Math.max(0, Math.min(lensY, maxY));
      
//       zoomLensRef.current.style.left = `${constrainedX}px`;
//       zoomLensRef.current.style.top = `${constrainedY}px`;
      
//       // Calculate zoomed image background position
//       // This is the FIX: Use the relative position to set background
//       const bgX = relativeX * 100;
//       const bgY = relativeY * 100;
      
//       // Update zoomed image position
//       if (zoomedImageRef.current) {
//         zoomedImageRef.current.style.backgroundPosition = `${bgX}% ${bgY}%`;
//       }
//     }
//   };

//   // Handle mouse enter on main image
//   const handleMouseEnter = (e) => {
//     setZoomEnabled(true);
//     updateZoomPreviewPosition();
    
//     // Calculate lens size (30% of main image)
//     if (mainImageRef.current && zoomLensRef.current) {
//       const containerRect = mainImageContainerRef.current.getBoundingClientRect();
//       const lensSize = Math.min(containerRect.width, containerRect.height) * 0.3;
      
//       zoomLensRef.current.style.width = `${lensSize}px`;
//       zoomLensRef.current.style.height = `${lensSize}px`;
//     }
//   };

//   // Handle mouse leave from main image
//   const handleMouseLeave = () => {
//     setZoomEnabled(false);
//   };

//   // Handle thumbnail click
//   const handleThumbnailClick = (index) => {
//     setSelectedImage(index);
//   };

//   // Handle thumbnail hover
//   const handleThumbnailHover = (index) => {
//     setSelectedImage(index);
//   };

//   // Navigation functions
//   const goToPreviousImage = () => {
//     setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1);
//   };

//   const goToNextImage = () => {
//     setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1);
//   };

//   // Handle enquiry now button click
//   const handleEnquiryNow = () => {
//     // You can implement your enquiry logic here
//     // For example, scroll to enquiry form or open modal
//     const enquirySection = document.getElementById('enquiry-section');
//     if (enquirySection) {
//       enquirySection.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       // Fallback - open WhatsApp or show contact info
//       window.open('https://wa.me/your-number', '_blank');
//     }
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
//     <div 
//       className={`image-gallery-section ${isStuck ? 'stuck' : ''}`}
//       ref={gallerySectionRef}
//     >
//       {isStuck && <div className="sticky-indicator">Sticky Image</div>}
      
//       <div className="image-gallery-container">
//         {/* Sub Images - Left Side */}
//         <div className="image-gallery-sidebar">
//           <div className="sub-image-list">
//             {images.map((img, index) => (
//               <div
//                 key={index}
//                 className={`sub-image-item ${selectedImage === index ? 'active' : ''}`}
//                 onClick={() => handleThumbnailClick(index)}
//                 onMouseEnter={() => handleThumbnailHover(index)}
//                 ref={el => thumbnailRefs.current[index] = el}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`View image ${index + 1}`}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     e.preventDefault();
//                     handleThumbnailClick(index);
//                   }
//                 }}
//               >
//                 <div className="sub-image-number">{index + 1}</div>
//                 <Image
//                   src={img}
//                   alt={`${productName} thumbnail ${index + 1}`}
//                   fill
//                   style={{ objectFit: 'cover' }}
//                   sizes="90px"
//                   quality={60}
//                   priority={index === 0}
//                 />
//               </div>
//             ))}
//           </div>
          
//           {/* Image Count Info */}
//           <div className="image-count-info">
//             {images.length} image{images.length !== 1 ? 's' : ''} available
//           </div>
//         </div>

//         {/* Main Image Area */}
//         <div className="main-image-area">
//           <div 
//             className="main-image-container"
//             ref={mainImageContainerRef}
//             onMouseMove={handleMouseMove}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             style={{ 
//               cursor: zoomEnabled ? 'crosshair' : 'default',
//               position: 'relative'
//             }}
//           >
//             {/* Main Image */}
//             <Image
//               ref={mainImageRef}
//               src={images[selectedImage]}
//               alt={`${productName} - View ${selectedImage + 1}`}
//               fill
//               style={{ 
//                 objectFit: 'contain',
//                 objectPosition: 'center'
//               }}
//               sizes="(max-width: 768px) 100vw, 70vw"
//               quality={90}
//               priority
//             />
            
//             {/* Zoom Lens (Magnifying Glass) - Only shows on hover */}
//             <div 
//               ref={zoomLensRef}
//               className="zoom-lens"
//               style={{
//                 display: zoomEnabled ? 'block' : 'none',
//                 position: 'absolute'
//               }}
//             />
            
//             {/* Zoom Instruction */}
//             <div className="zoom-instruction">
//               <span>🔍</span> Hover to zoom
//             </div>
            
//             {/* Navigation Arrows */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     goToPreviousImage();
//                   }}
//                   className="nav-arrow prev"
//                   aria-label="Previous image"
//                   style={{ zIndex: 20 }}
//                 >
//                   ←
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     goToNextImage();
//                   }}
//                   className="nav-arrow next"
//                   aria-label="Next image"
//                   style={{ zIndex: 20 }}
//                 >
//                   →
//                 </button>
//               </>
//             )}
            
//             {/* Image Counter */}
//             <div className="image-counter">
//               Image {selectedImage + 1} of {images.length}
//             </div>
//           </div>

//           {/* Zoomed Image Container (Right Side) */}
//           <div 
//             className="zoomed-image-container"
//             style={{
//               display: zoomEnabled ? 'block' : 'none',
//               position: 'fixed',
//               zIndex: 1000
//             }}
//           >
//             <div 
//               ref={zoomedImageRef}
//               className="zoomed-image"
//               style={{
//                 backgroundImage: `url(${images[selectedImage]})`,
//                 backgroundSize: '200%',
//                 backgroundRepeat: 'no-repeat',
//                 width: '100%',
//                 height: '100%'
//               }}
//             />
//           </div>
//         </div>
//       </div>
      
//       {/* Enquiry Now Button */}
//       <div className="enquiry-now-button-container">
//         <button 
//           className="enquiry-now-button"
//           onClick={handleEnquiryNow}
//         >
//           <span className="enquiry-icon">💬</span>
//           <span className="enquiry-text">Enquiry Now</span>
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '../../wooden-doors/product-view-flipkart.css';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

export default function ProductImages({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  
  const mainImageContainerRef = useRef(null);
  const mainImageRef = useRef(null);
  const zoomLensRef = useRef(null);
  const zoomedImageRef = useRef(null);
  const gallerySectionRef = useRef(null);
  
  // Thumbnails refs
  const thumbnailRefs = useRef([]);

  useEffect(() => {
    setIsClient(true);
    updateZoomPreviewPosition();
    window.addEventListener('resize', updateZoomPreviewPosition);
    
    // Add scroll listener for sticky behavior
    const handleScroll = () => {
      if (!gallerySectionRef.current || window.innerWidth <= 1024) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldStick = scrollTop > 100;
      
      if (shouldStick !== isStuck) {
        setIsStuck(shouldStick);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', updateZoomPreviewPosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isStuck]);

  // Open fullscreen function
  const openFullscreen = (index) => {
    setIsFullscreen(true);
    setFullscreenImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  // Close fullscreen function
  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = 'auto';
  };

  // Fullscreen navigation functions
  const goToPreviousImageFullscreen = () => {
    setFullscreenImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const goToNextImageFullscreen = () => {
    setFullscreenImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  // Handle main image click for mobile
  const handleMainImageClick = () => {
    if (window.innerWidth <= 768) {
      openFullscreen(selectedImage);
    }
  };

  // Update zoom preview container position
  const updateZoomPreviewPosition = () => {
    if (!mainImageContainerRef.current) return;
    
    const containerRect = mainImageContainerRef.current.getBoundingClientRect();
    const zoomContainerWidth = 400;
    
    // Check if there's enough space on the right
    if (window.innerWidth - containerRect.right > zoomContainerWidth + 20) {
      // Position to the right
      zoomedImageRef.current?.parentElement?.style.setProperty('left', `${containerRect.right + 20}px`);
      zoomedImageRef.current?.parentElement?.style.setProperty('top', `${containerRect.top}px`);
    } else {
      // Position to the left
      zoomedImageRef.current?.parentElement?.style.setProperty('left', `${containerRect.left - zoomContainerWidth - 20}px`);
      zoomedImageRef.current?.parentElement?.style.setProperty('top', `${containerRect.top}px`);
    }
  };

  // FIXED: Handle mouse movement for zoom
  const handleMouseMove = (e) => {
    if (!mainImageContainerRef.current || !zoomEnabled || !mainImageRef.current) return;
    
    const container = mainImageContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Get mouse position relative to container
    let mouseX = e.clientX - containerRect.left;
    let mouseY = e.clientY - containerRect.top;
    
    // Clamp mouse position within container bounds
    mouseX = Math.max(0, Math.min(mouseX, containerRect.width));
    mouseY = Math.max(0, Math.min(mouseY, containerRect.height));
    
    // Calculate relative position (0 to 1)
    const relativeX = mouseX / containerRect.width;
    const relativeY = mouseY / containerRect.height;
    
    // Position zoom lens (centered on cursor)
    if (zoomLensRef.current) {
      const lensWidth = zoomLensRef.current.offsetWidth;
      const lensHeight = zoomLensRef.current.offsetHeight;
      
      // Calculate lens position (center lens on cursor)
      const lensX = mouseX - (lensWidth / 2);
      const lensY = mouseY - (lensHeight / 2);
      
      // Constrain lens within container
      const maxX = containerRect.width - lensWidth;
      const maxY = containerRect.height - lensHeight;
      
      const constrainedX = Math.max(0, Math.min(lensX, maxX));
      const constrainedY = Math.max(0, Math.min(lensY, maxY));
      
      zoomLensRef.current.style.left = `${constrainedX}px`;
      zoomLensRef.current.style.top = `${constrainedY}px`;
      
      // Calculate zoomed image background position
      // This is the FIX: Use the relative position to set background
      const bgX = relativeX * 100;
      const bgY = relativeY * 100;
      
      // Update zoomed image position
      if (zoomedImageRef.current) {
        zoomedImageRef.current.style.backgroundPosition = `${bgX}% ${bgY}%`;
      }
    }
  };

  // Handle mouse enter on main image
  const handleMouseEnter = (e) => {
    if (window.innerWidth > 768) {
      setZoomEnabled(true);
      updateZoomPreviewPosition();
      
      // Calculate lens size (30% of main image)
      if (mainImageRef.current && zoomLensRef.current) {
        const containerRect = mainImageContainerRef.current.getBoundingClientRect();
        const lensSize = Math.min(containerRect.width, containerRect.height) * 0.3;
        
        zoomLensRef.current.style.width = `${lensSize}px`;
        zoomLensRef.current.style.height = `${lensSize}px`;
      }
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

  // Handle enquiry now button click
  const handleEnquiryNow = () => {
    // You can implement your enquiry logic here
    // For example, scroll to enquiry form or open modal
    const enquirySection = document.getElementById('enquiry-section');
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback - open WhatsApp or show contact info
      window.open('https://wa.me/your-number', '_blank');
    }
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
    <div 
      className={`image-gallery-section ${isStuck ? 'stuck' : ''}`}
      ref={gallerySectionRef}
    >
      {isStuck && <div className="sticky-indicator">Sticky Image</div>}
      
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
            onClick={handleMainImageClick}
            style={{ 
              cursor: window.innerWidth > 768 && zoomEnabled ? 'crosshair' : 'pointer',
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
                display: zoomEnabled ? 'block' : 'none',
                position: 'absolute'
              }}
            />
            
            {/* Zoom Instruction - Desktop only */}
            {window.innerWidth > 768 ? (
              <div className="zoom-instruction">
                <span>🔍</span> Hover to zoom
              </div>
            ) : (
              <div className="mobile-tap-instruction">
                <span>👆</span> Tap to view fullscreen
              </div>
            )}
            
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
                  <MdOutlineArrowBackIosNew></MdOutlineArrowBackIosNew>
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
                  <MdOutlineArrowForwardIos />
                </button>
              </>
            )}
            
            {/* Image Counter */}
            <div className="image-counter">
              Image {selectedImage + 1} of {images.length}
            </div>
          </div>

          {/* Zoomed Image Container (Right Side) */}
          <div 
            className="zoomed-image-container"
            style={{
              display: zoomEnabled ? 'block' : 'none',
              position: 'fixed',
              zIndex: 1000
            }}
          >
            <div 
              ref={zoomedImageRef}
              className="zoomed-image"
              style={{
                backgroundImage: `url(${images[selectedImage]})`,
                backgroundSize: '200%',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>
      </div>
      

      {/* MOBILE FULLSCREEN VIEWER */}
      {isFullscreen && (
        <div className="mobile-fullscreen-viewer">
          {/* Close Button - Top Left */}
          <button
            className="fullscreen-close"
            onClick={closeFullscreen}
            aria-label="Close fullscreen"
          >
            ✕
          </button>

          {/* Image Container - Full Screen */}
          <div className="fullscreen-image-container">
            <Image
              src={images[fullscreenImageIndex]}
              alt={`${productName} - Fullscreen view ${fullscreenImageIndex + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              quality={100}
              priority
            />
          </div>

          {/* Navigation Arrows - Only show if more than 1 image */}
          {images.length > 1 && (
            <>
              <button
                className="fullscreen-nav prev"
                onClick={goToPreviousImageFullscreen}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                className="fullscreen-nav next"
                onClick={goToNextImageFullscreen}
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}