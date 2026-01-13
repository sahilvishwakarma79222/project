// // 'use client';

// // import { useState, useEffect } from 'react';
// // import './products-styles.css';

// // // Star icon component
// // const StarIcon = ({ filled }) => (
// //   <svg 
// //     width="14" 
// //     height="14" 
// //     viewBox="0 0 24 24" 
// //     fill={filled ? "#ffa41c" : "none"} 
// //     stroke="#ffa41c"
// //     strokeWidth="2"
// //   >
// //     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
// //   </svg>
// // );

// // const categories = [
// //   { id: '1', name: 'woodenDoor', displayName: 'Wooden Doors', count: 70 },
// //   { id: '2', name: 'woodenFrame', displayName: 'Wooden Frames', count: 21 },
// //   { id: '3', name: 'safetyDoors', displayName: 'Safety Doors', count: 39 },
// //   { id: '4', name: 'woodenBed', displayName: 'Wooden Beds', count: 31 },
// //   { id: '5', name: 'woodenMandir', displayName: 'Wooden Temples', count: 27 },
// //   { id: '6', name: 'woodenWindow', displayName: 'Wooden Windows', count: 2 },
// //   { id: '7', name: 'woodenArt', displayName: 'Wooden Art', count: 9 },
// //   { id: '8', name: 'sofaChair', displayName: 'Sofa & Chairs', count: 28 }
// // ];

// // export default function ProductsPage() {
// //   const [activeCategory, setActiveCategory] = useState('woodenDoor');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const productsPerPage = 12;

// //   // Generate sample products with rating
// //   const generateSampleProducts = (category, count) => {
// //     return Array.from({ length: count }, (_, i) => {
// //       const rating = (4 + Math.random() * 1).toFixed(1);
// //       const productTypes = ['Design', 'Model', 'Style', 'Pattern', 'Type'];
// //       return {
// //         id: `${category}_product${i + 1}`,
// //         name: `${categories.find(c => c.name === category)?.displayName} ${productTypes[i % 5]} ${i + 1}`,
// //         price: `₹${(12999 + (i * 799)).toLocaleString()}`,
// //         rating: rating,
// //       };
// //     });
// //   };

// //   useEffect(() => {
// //     setLoading(true);
// //     setTimeout(() => {
// //       const categoryCount = categories.find(c => c.name === activeCategory)?.count || 12;
// //       const categoryProducts = generateSampleProducts(activeCategory, categoryCount);
// //       setProducts(categoryProducts);
// //       setLoading(false);
// //       setCurrentPage(1);
// //     }, 300);
// //   }, [activeCategory]);

// //   const indexOfLastProduct = currentPage * productsPerPage;
// //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
// //   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
// //   const totalPages = Math.ceil(products.length / productsPerPage);

// //   const handlePageChange = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// //     window.scrollTo({ top: 380, behavior: 'smooth' });
// //   };

// //   // Render star rating
// //   const renderStars = (rating) => {
// //     const stars = [];
// //     const fullStars = Math.floor(rating);
// //     const hasHalfStar = rating % 1 >= 0.5;
    
// //     for (let i = 0; i < 5; i++) {
// //       if (i < fullStars) {
// //         stars.push(<StarIcon key={i} filled={true} />);
// //       } else if (i === fullStars && hasHalfStar) {
// //         stars.push(<StarIcon key={i} filled={true} />);
// //       } else {
// //         stars.push(<StarIcon key={i} filled={false} />);
// //       }
// //     }
    
// //     return (
// //       <div className="wood-rating-badge">
// //         <div className="wood-rating-stars">{stars}</div>
// //         <span style={{ marginLeft: '6px' }}>{rating}</span>
// //       </div>
// //     );
// //   };

// //   const activeCategoryData = categories.find(cat => cat.name === activeCategory);

// //   return (
// //     <div className="wood-products-page">
// //       {/* Hero Banner */}
// //       <div className="wood-hero-section">
// //         <div className="wood-container">
// //           <h1 className="wood-hero-title">Premium Wooden Products</h1>
// //           <p className="wood-hero-subtitle">
// //             Handcrafted with precision | 100% Quality Assurance | Free Installation Support
// //           </p>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="wood-container wood-main-container">
// //         <div className="wood-layout-wrapper">
// //           {/* ========== PROFESSIONAL SIDEBAR ========== */}
// //           <div className="wood-sidebar">
// //             <div className="wood-sidebar-card">
// //               <h2 className="wood-sidebar-title">All Categories</h2>
// //               <div className="wood-categories-list">
// //                 {categories.map((category) => (
// //                   <button
// //                     key={category.id}
// //                     onClick={() => setActiveCategory(category.name)}
// //                     className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
// //                   >
// //                     <span>{category.displayName}</span>
// //                     <span className="wood-category-count">{category.count}</span>
// //                   </button>
// //                 ))}
// //               </div>
              
// //               {/* WhatsApp Help Section */}
// //               <div className="wood-whatsapp-help">
// //                 <h3>Need Assistance?</h3>
// //                 <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
// //                 <a
// //                   href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="wood-whatsapp-btn"
// //                 >
// //                   <span>💬 Chat on WhatsApp</span>
// //                 </a>
// //               </div>
// //             </div>
// //           </div>

// //           {/* ========== MAIN PRODUCTS AREA ========== */}
// //           <div className="wood-main-content-area">
// //             {/* Category Header */}
// //             <div className="wood-category-header">
// //               <div className="wood-header-content">
// //                 <div>
// //                   <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
// //                   <p className="wood-product-count">
// //                     {products.length} products • Page {currentPage} of {totalPages}
// //                   </p>
// //                 </div>
// //                 <div className="wood-page-indicator">
// //                   <span>Showing:</span>
// //                   <span className="wood-current-page">
// //                     {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Products Grid */}
// //             {loading ? (
// //               <div className="wood-products-grid wood-loading-grid">
// //                 {[...Array(12)].map((_, i) => (
// //                   <div key={i} className="wood-product-card wood-loading-card">
// //                     <div className="wood-product-image wood-loading-image"></div>
// //                     <div className="wood-product-info">
// //                       <div className="wood-loading-line"></div>
// //                       <div className="wood-loading-line short"></div>
// //                       <div className="wood-loading-line" style={{ width: '40%' }}></div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : currentProducts.length > 0 ? (
// //               <>
// //                 <div className="wood-products-grid">
// //                   {currentProducts.map((product) => (
// //                     <div key={product.id} className="wood-product-card">
// //                       <div className="wood-product-image">
// //                         <div className="wood-image-placeholder">
// //                           <div className="wood-icon">🚪</div>
// //                           <p className="wood-image-text">Click to view details</p>
// //                         </div>
// //                         {/* Rating Badge */}
// //                         {renderStars(parseFloat(product.rating))}
// //                       </div>
                      
// //                       <div className="wood-product-info">
// //                         <h3 className="wood-product-title">{product.name}</h3>
                        
// //                         <div className="wood-price-section">
// //                           <div className="wood-product-price">
// //                             <span className="wood-price-superscript">₹</span>
// //                             {product.price.replace('₹', '')}
// //                           </div>
                          
// //                           <a
// //                             href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)} for ${encodeURIComponent(product.price)}`}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             className="wood-buy-button"
// //                           >
// //                             <span>Buy Now</span>
// //                           </a>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 {/* Pagination */}
// //                 {totalPages > 1 && (
// //                   <div className="wood-pagination">
// //                     <button
// //                       onClick={() => handlePageChange(currentPage - 1)}
// //                       disabled={currentPage === 1}
// //                       className="wood-pagination-btn wood-prev-btn"
// //                     >
// //                       <span>‹</span> Previous
// //                     </button>

// //                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                       let pageNumber;
// //                       if (totalPages <= 5) {
// //                         pageNumber = i + 1;
// //                       } else if (currentPage <= 3) {
// //                         pageNumber = i + 1;
// //                       } else if (currentPage >= totalPages - 2) {
// //                         pageNumber = totalPages - 4 + i;
// //                       } else {
// //                         pageNumber = currentPage - 2 + i;
// //                       }

// //                       return (
// //                         <button
// //                           key={pageNumber}
// //                           onClick={() => handlePageChange(pageNumber)}
// //                           className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
// //                         >
// //                           {pageNumber}
// //                         </button>
// //                       );
// //                     })}

// //                     <button
// //                       onClick={() => handlePageChange(currentPage + 1)}
// //                       disabled={currentPage === totalPages}
// //                       className="wood-pagination-btn wood-next-btn"
// //                     >
// //                       Next <span>›</span>
// //                     </button>
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <div className="wood-empty-state">
// //                 <div className="wood-empty-icon">🚪</div>
// //                 <h3>No products available</h3>
// //                 <p>We're updating our inventory. Please check back soon.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import './products-styles.css';
// import { categories, getProductsByCategory } from '@/utils/productData';

// // Star icon component
// const StarIcon = ({ filled }) => (
//   <svg 
//     width="14" 
//     height="14" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "#ffa41c" : "none"} 
//     stroke="#ffa41c"
//     strokeWidth="2"
//   >
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// export default function ProductsPage() {
//   const [activeCategory, setActiveCategory] = useState('woodenDoor');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const productsPerPage = 12;

//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       try {
//         const categoryProducts = await getProductsByCategory(activeCategory);
//         setProducts(categoryProducts);
//       } catch (error) {
//         console.error('Error loading products:', error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//         setCurrentPage(1);
//       }
//     };

//     loadProducts();
//   }, [activeCategory]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 380, behavior: 'smooth' });
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else {
//         stars.push(<StarIcon key={i} filled={false} />);
//       }
//     }
    
//     return (
//       <div className="wood-rating-badge">
//         <div className="wood-rating-stars">{stars}</div>
//         <span style={{ marginLeft: '6px' }}>{rating}</span>
//       </div>
//     );
//   };

//   const activeCategoryData = categories.find(cat => cat.name === activeCategory);

//   return (
//     <div className="wood-products-page">
//       {/* Hero Banner */}
//       <div className="wood-hero-section">
//         <div className="wood-container">
//           <h1 className="wood-hero-title">Premium Wooden Products</h1>
//           <p className="wood-hero-subtitle">
//             Handcrafted with precision | 100% Quality Assurance | Free Installation Support
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container wood-main-container">
//         <div className="wood-layout-wrapper">
//           {/* ========== PROFESSIONAL SIDEBAR ========== */}
//           <div className="wood-sidebar">
//             <div className="wood-sidebar-card">
//               <h2 className="wood-sidebar-title">All Categories</h2>
//               <div className="wood-categories-list">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => setActiveCategory(category.name)}
//                     className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
//                   >
//                     <span>{category.displayName}</span>
//                     <span className="wood-category-count">{category.count}</span>
//                   </button>
//                 ))}
//               </div>
              
//               {/* WhatsApp Help Section */}
//               <div className="wood-whatsapp-help">
//                 <h3>Need Assistance?</h3>
//                 <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
//                 <a
//                   href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="wood-whatsapp-btn"
//                 >
//                   <span>💬 Chat on WhatsApp</span>
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* ========== MAIN PRODUCTS AREA ========== */}
//           <div className="wood-main-content-area">
//             {/* Category Header */}
//             <div className="wood-category-header">
//               <div className="wood-header-content">
//                 <div>
//                   <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
//                   <p className="wood-product-count">
//                     {products.length} products • Page {currentPage} of {totalPages}
//                   </p>
//                 </div>
//                 <div className="wood-page-indicator">
//                   <span>Showing:</span>
//                   <span className="wood-current-page">
//                     {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {loading ? (
//               <div className="wood-products-grid wood-loading-grid">
//                 {[...Array(12)].map((_, i) => (
//                   <div key={i} className="wood-product-card wood-loading-card">
//                     <div className="wood-product-image wood-loading-image"></div>
//                     <div className="wood-product-info">
//                       <div className="wood-loading-line"></div>
//                       <div className="wood-loading-line short"></div>
//                       <div className="wood-loading-line" style={{ width: '40%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : currentProducts.length > 0 ? (
//               <>
//                 <div className="wood-products-grid">
//                   {currentProducts.map((product) => (
//                     <div key={product.id} className="wood-product-card">
//                       <div className="wood-product-image">
//                         {/* Product Image - First image from product folder */}
//                         <div className="image-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
//                           <div className="wood-image-placeholder">
//                             {/* Placeholder for actual image */}
//                             <div className="wood-icon">🚪</div>
//                             <p className="wood-image-text">Click to view 4 angles</p>
//                           </div>
                          
//                           {/* For actual images, use this: */}
//                           {/* 
//                           <Image
//                             src={product.images[0]}
//                             alt={product.name}
//                             fill
//                             className="object-cover"
//                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                             priority={i < 4}
//                           />
//                           */}
//                         </div>
                        
//                         {/* Rating Badge */}
//                         {renderStars(parseFloat(product.rating))}
//                       </div>
                      
//                       <div className="wood-product-info">
//                         <h3 className="wood-product-title">{product.name}</h3>
                        
//                         {/* Quick Specs */}
//                         <div style={{ marginBottom: '10px', fontSize: '13px', color: '#565959' }}>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
//                             <span style={{ fontWeight: '500' }}>Wood:</span>
//                             <span>{product.woodtype}</span>
//                           </div>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                             <span style={{ fontWeight: '500' }}>Size:</span>
//                             <span>{product.size}</span>
//                           </div>
//                         </div>
                        
//                         <div className="wood-price-section">
//                           <div className="wood-product-price">
//                             <span className="wood-price-superscript">₹</span>
//                             {product.price.replace('₹', '')}
//                           </div>
                          
//                           <a
//                             href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)}%0A%0APrice: ${encodeURIComponent(product.price)}%0AWood Type: ${encodeURIComponent(product.woodtype)}%0ASize: ${encodeURIComponent(product.size)}%0A%0APlease provide more details.`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="wood-buy-button"
//                           >
//                             <span>Buy on WhatsApp</span>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="wood-pagination">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="wood-pagination-btn wood-prev-btn"
//                     >
//                       <span>‹</span> Previous
//                     </button>

//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNumber;
//                       if (totalPages <= 5) {
//                         pageNumber = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNumber = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNumber = totalPages - 4 + i;
//                       } else {
//                         pageNumber = currentPage - 2 + i;
//                       }

//                       return (
//                         <button
//                           key={pageNumber}
//                           onClick={() => handlePageChange(pageNumber)}
//                           className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
//                         >
//                           {pageNumber}
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="wood-pagination-btn wood-next-btn"
//                     >
//                       Next <span>›</span>
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="wood-empty-state">
//                 <div className="wood-empty-icon">🚪</div>
//                 <h3>No products available</h3>
//                 <p>We're updating our inventory. Please check back soon.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// products/page.js



// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import './products-styles.css';
// import { categories, getProductsByCategory } from '@/utils/productData';

// // Star icon component
// const StarIcon = ({ filled }) => (
//   <svg 
//     width="14" 
//     height="14" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "#ffa41c" : "none"} 
//     stroke="#ffa41c"
//     strokeWidth="2"
//   >
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// export default function ProductsPage() {
//   const [activeCategory, setActiveCategory] = useState('woodenDoor');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categoryCounts, setCategoryCounts] = useState({});

//   const productsPerPage = 12;

//   // Load category counts on component mount
//   useEffect(() => {
//     const loadCategoryCounts = async () => {
//       const counts = {};
//       for (const category of categories) {
//         try {
//           const response = await fetch(`/api/products/count?category=${category.name}`);
//           const data = await response.json();
//           counts[category.name] = data.count || 0;
//         } catch (error) {
//           console.error(`Error loading count for ${category.name}:`, error);
//           counts[category.name] = 0;
//         }
//       }
//       setCategoryCounts(counts);
//     };
    
//     loadCategoryCounts();
//   }, []);

//   // Load products when category changes
//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       try {
//         const categoryProducts = await getProductsByCategory(activeCategory);
//         setProducts(categoryProducts);
//       } catch (error) {
//         console.error('Error loading products:', error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//         setCurrentPage(1);
//       }
//     };

//     loadProducts();
//   }, [activeCategory]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 380, behavior: 'smooth' });
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else {
//         stars.push(<StarIcon key={i} filled={false} />);
//       }
//     }
    
//     return (
//       <div className="wood-rating-badge">
//         <div className="wood-rating-stars">{stars}</div>
//         <span style={{ marginLeft: '6px' }}>{rating}</span>
//       </div>
//     );
//   };

//   const activeCategoryData = categories.find(cat => cat.name === activeCategory);

//   return (
//     <div className="wood-products-page">
//       {/* Hero Banner */}
//       <div className="wood-hero-section">
//         <div className="wood-container">
//           <h1 className="wood-hero-title">Premium Wooden Products</h1>
//           <p className="wood-hero-subtitle">
//             Handcrafted with precision | 100% Quality Assurance | Free Installation Support
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container wood-main-container">
//         <div className="wood-layout-wrapper">
//           {/* Sidebar */}
//           <div className="wood-sidebar">
//             <div className="wood-sidebar-card">
//               <h2 className="wood-sidebar-title">All Categories</h2>
//               <div className="wood-categories-list">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => setActiveCategory(category.name)}
//                     className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
//                   >
//                     <span>{category.displayName}</span>
//                     <span className="wood-category-count">
//                       {categoryCounts[category.name] || 0}
//                     </span>
//                   </button>
//                 ))}
//               </div>
              
//               {/* WhatsApp Help Section */}
//               <div className="wood-whatsapp-help">
//                 <h3>Need Assistance?</h3>
//                 <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
//                 <a
//                   href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="wood-whatsapp-btn"
//                 >
//                   <span>💬 Chat on WhatsApp</span>
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Main Products Area */}
//           <div className="wood-main-content-area">
//             {/* Category Header */}
//             <div className="wood-category-header">
//               <div className="wood-header-content">
//                 <div>
//                   <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
//                   <p className="wood-product-count">
//                     {products.length} products • Page {currentPage} of {totalPages}
//                   </p>
//                 </div>
//                 <div className="wood-page-indicator">
//                   <span>Showing:</span>
//                   <span className="wood-current-page">
//                     {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {loading ? (
//               <div className="wood-products-grid wood-loading-grid">
//                 {[...Array(12)].map((_, i) => (
//                   <div key={i} className="wood-product-card wood-loading-card">
//                     <div className="wood-product-image wood-loading-image"></div>
//                     <div className="wood-product-info">
//                       <div className="wood-loading-line"></div>
//                       <div className="wood-loading-line short"></div>
//                       <div className="wood-loading-line" style={{ width: '40%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : currentProducts.length > 0 ? (
//               <>
//                 <div className="wood-products-grid">
//                   {currentProducts.map((product) => (
//                     <div key={product.id} className="wood-product-card">
//                       <div className="wood-product-image">
//                         <div className="image-container">
//                           {product.images && product.images.length > 0 ? (
//                             <Image
//                               src={product.images[0]}
//                               alt={product.name}
//                               fill
//                               style={{ objectFit: 'cover' }}
//                               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                               onError={(e) => {
//                                 // Show placeholder if image fails to load
//                                 const placeholder = e.target.parentNode.querySelector('.wood-image-placeholder');
//                                 if (placeholder) {
//                                   e.target.style.display = 'none';
//                                   placeholder.style.display = 'flex';
//                                 }
//                               }}
//                             />
//                           ) : null}
                          
//                           <div className="wood-image-placeholder" style={{ 
//                             display: !product.images || product.images.length === 0 ? 'flex' : 'none' 
//                           }}>
//                             <div className="wood-icon">🚪</div>
//                             <p className="wood-image-text">No Image</p>
//                           </div>
                          
//                           {/* Rating Badge */}
//                           {renderStars(parseFloat(product.rating))}
//                         </div>
//                       </div>
                      
//                       <div className="wood-product-info">
//                         <h3 className="wood-product-title">{product.name}</h3>
                        
//                         <div className="wood-price-section">
//                           <div className="wood-product-price">
//                             <span className="wood-price-superscript">₹</span>
//                             {product.price.replace('₹', '')}
//                           </div>
                          
//                           <a
//                             href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)}%0APrice: ${encodeURIComponent(product.price)}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="wood-buy-button"
//                           >
//                             <span>Buy Now</span>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="wood-pagination">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="wood-pagination-btn wood-prev-btn"
//                     >
//                       <span>‹</span> Previous
//                     </button>

//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNumber;
//                       if (totalPages <= 5) {
//                         pageNumber = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNumber = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNumber = totalPages - 4 + i;
//                       } else {
//                         pageNumber = currentPage - 2 + i;
//                       }

//                       return (
//                         <button
//                           key={pageNumber}
//                           onClick={() => handlePageChange(pageNumber)}
//                           className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
//                         >
//                           {pageNumber}
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="wood-pagination-btn wood-next-btn"
//                     >
//                       Next <span>›</span>
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="wood-empty-state">
//                 <div className="wood-empty-icon">🚪</div>
//                 <h3>No products available</h3>
//                 <p>We're updating our inventory. Please check back soon.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// app/products/wooden-doors/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import './products-styles.css'; // Correct path
// import { categories, getProductsByCategory } from '@/utils/productData';

// // Star icon component
// const StarIcon = ({ filled }) => (
//   <svg 
//     width="14" 
//     height="14" 
//     viewBox="0 0 24 24" 
//     fill={filled ? "#ffa41c" : "none"} 
//     stroke="#ffa41c"
//     strokeWidth="2"
//   >
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // MAIN EXPORT FUNCTION
// export default function WoodenDoorsPage() {
//   const [activeCategory, setActiveCategory] = useState('woodenDoor');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categoryCounts, setCategoryCounts] = useState({});

//   const productsPerPage = 12;

//   // Load category counts on component mount
//   useEffect(() => {
//     const loadCategoryCounts = async () => {
//       const counts = {};
//       for (const category of categories) {
//         try {
//           const response = await fetch(`/api/products/count?category=${category.name}`);
//           const data = await response.json();
//           counts[category.name] = data.count || 0;
//         } catch (error) {
//           console.error(`Error loading count for ${category.name}:`, error);
//           counts[category.name] = 0;
//         }
//       }
//       setCategoryCounts(counts);
//     };
    
//     loadCategoryCounts();
//   }, []);

//   // Load products when category changes
//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       try {
//         const categoryProducts = await getProductsByCategory(activeCategory);
//         setProducts(categoryProducts);
//       } catch (error) {
//         console.error('Error loading products:', error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//         setCurrentPage(1);
//       }
//     };

//     loadProducts();
//   }, [activeCategory]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 380, behavior: 'smooth' });
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else {
//         stars.push(<StarIcon key={i} filled={false} />);
//       }
//     }
    
//     return (
//       <div className="wood-rating-badge">
//         <div className="wood-rating-stars">{stars}</div>
//         <span style={{ marginLeft: '6px' }}>{rating}</span>
//       </div>
//     );
//   };

//   const activeCategoryData = categories.find(cat => cat.name === activeCategory);

//   return (
//     <div className="wood-products-page">
//       {/* Hero Banner */}
//       <div className="wood-hero-section">
//         <div className="wood-container">
//           <h1 className="wood-hero-title">Premium Wooden Products</h1>
//           <p className="wood-hero-subtitle">
//             Handcrafted with precision | 100% Quality Assurance | Free Installation Support
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container wood-main-container">
//         <div className="wood-layout-wrapper">
//           {/* Sidebar */}
//           <div className="wood-sidebar">
//             <div className="wood-sidebar-card">
//               <h2 className="wood-sidebar-title">All Categories</h2>
//               <div className="wood-categories-list">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => setActiveCategory(category.name)}
//                     className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
//                   >
//                     <span>{category.displayName}</span>
//                     <span className="wood-category-count">
//                       {categoryCounts[category.name] || 0}
//                     </span>
//                   </button>
//                 ))}
//               </div>
              
//               {/* WhatsApp Help Section */}
//               <div className="wood-whatsapp-help">
//                 <h3>Need Assistance?</h3>
//                 <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
//                 <a
//                   href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="wood-whatsapp-btn"
//                 >
//                   <span>💬 Chat on WhatsApp</span>
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Main Products Area */}
//           <div className="wood-main-content-area">
//             {/* Category Header */}
//             <div className="wood-category-header">
//               <div className="wood-header-content">
//                 <div>
//                   <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
//                   <p className="wood-product-count">
//                     {products.length} products • Page {currentPage} of {totalPages}
//                   </p>
//                 </div>
//                 <div className="wood-page-indicator">
//                   <span>Showing:</span>
//                   <span className="wood-current-page">
//                     {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {loading ? (
//               <div className="wood-products-grid wood-loading-grid">
//                 {[...Array(12)].map((_, i) => (
//                   <div key={i} className="wood-product-card wood-loading-card">
//                     <div className="wood-product-image wood-loading-image"></div>
//                     <div className="wood-product-info">
//                       <div className="wood-loading-line"></div>
//                       <div className="wood-loading-line short"></div>
//                       <div className="wood-loading-line" style={{ width: '40%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : currentProducts.length > 0 ? (
//               <>
//                 <div className="wood-products-grid">
//                   {currentProducts.map((product) => (
//                     <div key={product.id} className="wood-product-card">
//                       <div className="wood-product-image">
//                         <div className="image-container">
//                           {product.images && product.images.length > 0 ? (
//                             <Image
//                               src={product.images[0]}
//                               alt={product.name}
//                               fill
//                               style={{ objectFit: 'cover' }}
//                               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                               onError={(e) => {
//                                 // Show placeholder if image fails to load
//                                 const placeholder = e.target.parentNode.querySelector('.wood-image-placeholder');
//                                 if (placeholder) {
//                                   e.target.style.display = 'none';
//                                   placeholder.style.display = 'flex';
//                                 }
//                               }}
//                             />
//                           ) : null}
                          
//                           <div className="wood-image-placeholder" style={{ 
//                             display: !product.images || product.images.length === 0 ? 'flex' : 'none' 
//                           }}>
//                             <div className="wood-icon">🚪</div>
//                             <p className="wood-image-text">No Image</p>
//                           </div>
                          
//                           {/* Rating Badge */}
//                           {renderStars(parseFloat(product.rating))}
//                         </div>
//                       </div>
                      
//                       <div className="wood-product-info">
//                         <h3 className="wood-product-title">{product.name}</h3>
                        
//                         <div className="wood-price-section">
//                           <div className="wood-product-price">
//                             <span className="wood-price-superscript">₹</span>
//                             {product.price.replace('₹', '')}
//                           </div>
                          
//                           <a
//                             href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)}%0APrice: ${encodeURIComponent(product.price)}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="wood-buy-button"
//                           >
//                             <span>Buy Now</span>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="wood-pagination">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="wood-pagination-btn wood-prev-btn"
//                     >
//                       <span>‹</span> Previous
//                     </button>

//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNumber;
//                       if (totalPages <= 5) {
//                         pageNumber = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNumber = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNumber = totalPages - 4 + i;
//                       } else {
//                         pageNumber = currentPage - 2 + i;
//                       }

//                       return (
//                         <button
//                           key={pageNumber}
//                           onClick={() => handlePageChange(pageNumber)}
//                           className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
//                         >
//                           {pageNumber}
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="wood-pagination-btn wood-next-btn"
//                     >
//                       Next <span>›</span>
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="wood-empty-state">
//                 <div className="wood-empty-icon">🚪</div>
//                 <h3>No products available</h3>
//                 <p>We're updating our inventory. Please check back soon.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// app/products/wooden-doors/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import './products-styles.css';
// import { categories, getProductsByCategory } from '@/utils/productData';

// const StarIcon = ({ filled }) => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// export default function ProductsPage() {
//   const [activeCategory, setActiveCategory] = useState('woodenDoor');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [categoryCounts, setCategoryCounts] = useState({});

//   const productsPerPage = 12;

//   // Initialize with sample data
//   useEffect(() => {
//     const initData = async () => {
//       setLoading(true);
//       try {
//         // Load products for active category
//         const loadedProducts = await getProductsByCategory(activeCategory);
//         setProducts(loadedProducts);
        
//         // Set category counts
//         const counts = {};
//         for (const cat of categories) {
//           const count = await getActualProductCount(cat.name);
//           counts[cat.name] = count;
//         }
//         setCategoryCounts(counts);
//       } catch (error) {
//         console.error('Error initializing:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     initData();
//   }, [activeCategory]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 380, behavior: 'smooth' });
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     for (let i = 0; i < 5; i++) {
//       stars.push(<StarIcon key={i} filled={i < fullStars || (i === fullStars && hasHalfStar)} />);
//     }
    
//     return (
//       <div className="wood-rating-badge">
//         <div className="wood-rating-stars">{stars}</div>
//         <span style={{ marginLeft: '6px' }}>{rating}</span>
//       </div>
//     );
//   };

//   const activeCategoryData = categories.find(cat => cat.name === activeCategory);

//   // Function to handle category change
//   const handleCategoryChange = async (categoryName) => {
//     setActiveCategory(categoryName);
//     setCurrentPage(1);
//     setLoading(true);
    
//     try {
//       const loadedProducts = await getProductsByCategory(categoryName);
//       setProducts(loadedProducts);
//     } catch (error) {
//       console.error('Error loading products:', error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="wood-products-page">
//       {/* Hero Banner */}
//       <div className="wood-hero-section">
//         <div className="wood-container">
//           <h1 className="wood-hero-title">Premium Wooden Products</h1>
//           <p className="wood-hero-subtitle">
//             Handcrafted with precision | 100% Quality Assurance | Free Installation Support
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container wood-main-container">
//         <div className="wood-layout-wrapper">
//           {/* Sidebar */}
//           <div className="wood-sidebar">
//             <div className="wood-sidebar-card">
//               <h2 className="wood-sidebar-title">All Categories</h2>
//               <div className="wood-categories-list">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => handleCategoryChange(category.name)}
//                     className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
//                   >
//                     <span>{category.displayName}</span>
//                     <span className="wood-category-count">
//                       {categoryCounts[category.name] || 0}
//                     </span>
//                   </button>
//                 ))}
//               </div>
              
//               <div className="wood-whatsapp-help">
//                 <h3>Need Assistance?</h3>
//                 <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
//                 <a
//                   href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="wood-whatsapp-btn"
//                 >
//                   <span>💬 Chat on WhatsApp</span>
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Main Products Area */}
//           <div className="wood-main-content-area">
//             {/* Category Header */}
//             <div className="wood-category-header">
//               <div className="wood-header-content">
//                 <div>
//                   <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
//                   <p className="wood-product-count">
//                     {products.length} products • Page {currentPage} of {totalPages}
//                   </p>
//                 </div>
//                 <div className="wood-page-indicator">
//                   <span>Showing:</span>
//                   <span className="wood-current-page">
//                     {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {loading ? (
//               <div className="wood-products-grid">
//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
//                   <div key={i} className="wood-product-card" style={{ opacity: 0.5 }}>
//                     <div className="wood-product-image" style={{ background: '#f0f0f0' }}>
//                       <div className="wood-image-placeholder">
//                         <div className="wood-icon">⌛</div>
//                         <p className="wood-image-text">Loading...</p>
//                       </div>
//                     </div>
//                     <div className="wood-product-info">
//                       <div style={{ height: '20px', background: '#f0f0f0', marginBottom: '10px' }}></div>
//                       <div style={{ height: '15px', background: '#f0f0f0', width: '60%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : products.length > 0 ? (
//               <>
//                 <div className="wood-products-grid">
//                   {currentProducts.map((product) => (
//                     <div key={product.id} className="wood-product-card">
//                       <div className="wood-product-image">
//                         {product.images && product.images[0] ? (
//                           <div style={{ width: '100%', height: '100%', position: 'relative' }}>
//                             <Image
//                               src={product.images[0]}
//                               alt={product.name}
//                               fill
//                               style={{ objectFit: 'cover' }}
//                               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                               onError={(e) => {
//                                 console.error('Image failed to load:', product.images[0]);
//                                 e.target.style.display = 'none';
//                               }}
//                             />
//                             {renderStars(parseFloat(product.rating))}
//                           </div>
//                         ) : (
//                           <div className="wood-image-placeholder">
//                             <div className="wood-icon">🚪</div>
//                             <p className="wood-image-text">Product Image</p>
//                             {renderStars(parseFloat(product.rating))}
//                           </div>
//                         )}
//                       </div>
                      
//                       <div className="wood-product-info">
//                         <h3 className="wood-product-title">{product.name}</h3>
//                         <div style={{ marginBottom: '10px', fontSize: '13px', color: '#565959' }}>
//                           <div>Wood: {product.woodtype}</div>
//                           <div>Size: {product.size}</div>
//                         </div>
                        
//                         <div className="wood-price-section">
//                           <div className="wood-product-price">
//                             <span className="wood-price-superscript">₹</span>
//                             {product.price.replace('₹', '')}
//                           </div>
                          
//                           <a
//                             href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)} - ${encodeURIComponent(product.price)}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="wood-buy-button"
//                           >
//                             <span>Buy Now</span>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {totalPages > 1 && (
//                   <div className="wood-pagination">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="wood-pagination-btn wood-prev-btn"
//                     >
//                       <span>‹</span> Previous
//                     </button>

//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNumber;
//                       if (totalPages <= 5) pageNumber = i + 1;
//                       else if (currentPage <= 3) pageNumber = i + 1;
//                       else if (currentPage >= totalPages - 2) pageNumber = totalPages - 4 + i;
//                       else pageNumber = currentPage - 2 + i;

//                       return (
//                         <button
//                           key={pageNumber}
//                           onClick={() => handlePageChange(pageNumber)}
//                           className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
//                         >
//                           {pageNumber}
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="wood-pagination-btn wood-next-btn"
//                     >
//                       Next <span>›</span>
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="wood-empty-state">
//                 <div className="wood-empty-icon">🚪</div>
//                 <h3>No products available</h3>
//                 <p>We're updating our inventory. Please check back soon.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// app/products/wooden-doors/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import './products-styles.css';
// import { categories, getProductsByCategory } from '@/utils/productData';

// const StarIcon = ({ filled }) => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // Custom Image Component with fallback
// const ProductImage = ({ images, alt, productNumber }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [error, setError] = useState(false);
  
//   if (!images || images.length === 0 || error) {
//     return (
//       <div className="wood-image-placeholder">
//         <div className="wood-icon">🚪</div>
//         <p className="wood-image-text">Product {productNumber}</p>
//       </div>
//     );
//   }
  
//   const currentImage = images[currentImageIndex];
  
//   return (
//     <div style={{ width: '100%', height: '100%', position: 'relative' }}>
//       <Image
//         src={currentImage}
//         alt={alt}
//         fill
//         style={{ objectFit: 'cover' }}
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         onError={() => {
//           if (currentImageIndex < images.length - 1) {
//             // Try next image
//             setCurrentImageIndex(currentImageIndex + 1);
//           } else {
//             // All images failed
//             setError(true);
//           }
//         }}
//         onLoad={() => {
//           console.log('Image loaded successfully:', currentImage);
//         }}
//       />
//     </div>
//   );
// };

// export default function ProductsPage() {
//   const [activeCategory, setActiveCategory] = useState('woodenDoor');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categoryCounts, setCategoryCounts] = useState({});

//   const productsPerPage = 12;

//   useEffect(() => {
//     const initData = async () => {
//       setLoading(true);
//       try {
//         // Load products for active category
//         const loadedProducts = await getProductsByCategory(activeCategory);
//         console.log('Loaded products:', loadedProducts.length);
//         console.log('First product images:', loadedProducts[0]?.images);
        
//         setProducts(loadedProducts);
        
//         // Set category counts
//         const counts = {};
//         for (const cat of categories) {
//           const count = await getActualProductCount(cat.name);
//           counts[cat.name] = count;
//         }
//         setCategoryCounts(counts);
//       } catch (error) {
//         console.error('Error initializing:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     initData();
//   }, [activeCategory]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 380, behavior: 'smooth' });
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     for (let i = 0; i < 5; i++) {
//       stars.push(<StarIcon key={i} filled={i < fullStars || (i === fullStars && hasHalfStar)} />);
//     }
    
//     return (
//       <div className="wood-rating-badge">
//         <div className="wood-rating-stars">{stars}</div>
//         <span style={{ marginLeft: '6px' }}>{rating}</span>
//       </div>
//     );
//   };

//   const handleCategoryChange = async (categoryName) => {
//     setActiveCategory(categoryName);
//     setCurrentPage(1);
//     setLoading(true);
    
//     try {
//       const loadedProducts = await getProductsByCategory(categoryName);
//       setProducts(loadedProducts);
//     } catch (error) {
//       console.error('Error loading products:', error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const activeCategoryData = categories.find(cat => cat.name === activeCategory);

//   return (
//     <div className="wood-products-page">
//       <div className="wood-hero-section">
//         <div className="wood-container">
//           <h1 className="wood-hero-title">Premium Wooden Products</h1>
//           <p className="wood-hero-subtitle">
//             Handcrafted with precision | 100% Quality Assurance | Free Installation Support
//           </p>
//         </div>
//       </div>

//       <div className="wood-container wood-main-container">
//         <div className="wood-layout-wrapper">
//           <div className="wood-sidebar">
//             <div className="wood-sidebar-card">
//               <h2 className="wood-sidebar-title">All Categories</h2>
//               <div className="wood-categories-list">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => handleCategoryChange(category.name)}
//                     className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
//                   >
//                     <span>{category.displayName}</span>
//                     <span className="wood-category-count">
//                       {categoryCounts[category.name] || 0}
//                     </span>
//                   </button>
//                 ))}
//               </div>
              
//               <div className="wood-whatsapp-help">
//                 <h3>Need Assistance?</h3>
//                 <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
//                 <a
//                   href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="wood-whatsapp-btn"
//                 >
//                   <span>💬 Chat on WhatsApp</span>
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="wood-main-content-area">
//             <div className="wood-category-header">
//               <div className="wood-header-content">
//                 <div>
//                   <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
//                   <p className="wood-product-count">
//                     {products.length} products • Page {currentPage} of {totalPages}
//                   </p>
//                 </div>
//                 <div className="wood-page-indicator">
//                   <span>Showing:</span>
//                   <span className="wood-current-page">
//                     {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {loading ? (
//               <div className="wood-products-grid">
//                 {[...Array(12)].map((_, i) => (
//                   <div key={i} className="wood-product-card">
//                     <div className="wood-product-image" style={{ background: '#f5f5f5' }}>
//                       <div className="wood-image-placeholder">
//                         <div className="wood-icon">⏳</div>
//                         <p className="wood-image-text">Loading...</p>
//                       </div>
//                     </div>
//                     <div className="wood-product-info">
//                       <div className="wood-loading-line"></div>
//                       <div className="wood-loading-line short"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : products.length > 0 ? (
//               <>
//                 <div className="wood-products-grid">
//                   {currentProducts.map((product) => (
//                     <div key={product.id} className="wood-product-card">
//                       <div className="wood-product-image">
//                         <ProductImage 
//                           images={product.images} 
//                           alt={product.name}
//                           productNumber={product.productNumber}
//                         />
//                         {renderStars(parseFloat(product.rating))}
//                       </div>
                      
//                       <div className="wood-product-info">
//                         <h3 className="wood-product-title">{product.name}</h3>
//                         <div style={{ margin: '10px 0', fontSize: '13px', color: '#565959' }}>
//                           <div style={{ marginBottom: '4px' }}>
//                             <strong>Wood:</strong> {product.woodtype}
//                           </div>
//                           <div>
//                             <strong>Size:</strong> {product.size}
//                           </div>
//                         </div>
                        
//                         <div className="wood-price-section">
//                           <div className="wood-product-price">
//                             <span className="wood-price-superscript">₹</span>
//                             {product.price.replace('₹', '')}
//                           </div>
                          
//                           <a
//                             href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)}%0AWood: ${encodeURIComponent(product.woodtype)}%0ASize: ${encodeURIComponent(product.size)}%0APrice: ${encodeURIComponent(product.price)}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="wood-buy-button"
//                           >
//                             <span>Buy on WhatsApp</span>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {totalPages > 1 && (
//                   <div className="wood-pagination">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="wood-pagination-btn wood-prev-btn"
//                     >
//                       <span>‹</span> Previous
//                     </button>

//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNumber;
//                       if (totalPages <= 5) pageNumber = i + 1;
//                       else if (currentPage <= 3) pageNumber = i + 1;
//                       else if (currentPage >= totalPages - 2) pageNumber = totalPages - 4 + i;
//                       else pageNumber = currentPage - 2 + i;

//                       return (
//                         <button
//                           key={pageNumber}
//                           onClick={() => handlePageChange(pageNumber)}
//                           className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
//                         >
//                           {pageNumber}
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="wood-pagination-btn wood-next-btn"
//                     >
//                       Next <span>›</span>
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="wood-empty-state">
//                 <div className="wood-empty-icon">🚪</div>
//                 <h3>No products available</h3>
//                 <p>Check if images exist in public/images/category/ folder</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// app/products/wooden-doors/page.js
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import './products-styles.css';
// import { categories, getProductsByCategory, getActualProductCount, clearProductCountCache } from '@/utils/productData';

// const StarIcon = ({ filled }) => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // Simple Product Image Component
// const ProductImage = ({ images, alt, productNumber }) => {
//   const [imgError, setImgError] = useState(false);
  
//   const imageSrc = images && images.length > 0 ? images[0] : null;
  
//   if (!imageSrc || imgError) {
//     return (
//       <div className="wood-image-placeholder">
//         <div className="wood-icon">🚪</div>
//         <p className="wood-image-text">Product {productNumber}</p>
//       </div>
//     );
//   }
  
//   return (
//     <div style={{ width: '100%', height: '100%', position: 'relative' }}>
//       <Image
//         src={imageSrc}
//         alt={alt}
//         fill
//         style={{ objectFit: 'cover' }}
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         onError={() => {
//           console.error('Image failed to load:', imageSrc);
//           setImgError(true);
//         }}
//         onLoad={() => console.log('Image loaded:', imageSrc)}
//       />
//     </div>
//   );
// };

// export default function ProductsPage() {
//   const [activeCategory, setActiveCategory] = useState('woodenDoor');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categoryCounts, setCategoryCounts] = useState({});
//   const [countsLoading, setCountsLoading] = useState(true);

//   const productsPerPage = 12;

//   // Function to load all category counts
//   const loadAllCategoryCounts = useCallback(async () => {
//     setCountsLoading(true);
//     try {
//       const counts = {};
//       console.log('Loading counts for all categories...');
      
//       // Load counts for all categories
//       for (const category of categories) {
//         try {
//           const count = await getActualProductCount(category.name);
//           counts[category.name] = count;
//           console.log(`${category.displayName}: ${count} products`);
//         } catch (error) {
//           console.error(`Error loading count for ${category.name}:`, error);
//           counts[category.name] = 0;
//         }
//       }
      
//       setCategoryCounts(counts);
//       console.log('All counts loaded:', counts);
//     } catch (error) {
//       console.error('Error loading category counts:', error);
//     } finally {
//       setCountsLoading(false);
//     }
//   }, []);

//   // Load category counts on mount
//   useEffect(() => {
//     loadAllCategoryCounts();
//   }, [loadAllCategoryCounts]);

//   // Load products when category changes
//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       try {
//         console.log(`Loading products for ${activeCategory}...`);
//         const loadedProducts = await getProductsByCategory(activeCategory);
//         setProducts(loadedProducts);
//         console.log(`Loaded ${loadedProducts.length} products for ${activeCategory}`);
//       } catch (error) {
//         console.error('Error loading products:', error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//         setCurrentPage(1);
//       }
//     };

//     loadProducts();
//   }, [activeCategory]);

//   // Calculate pagination
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 380, behavior: 'smooth' });
//   };

//   // Handle category change
//   const handleCategoryChange = async (categoryName) => {
//     if (categoryName === activeCategory) return;
    
//     setActiveCategory(categoryName);
//     setCurrentPage(1);
//     setLoading(true);
    
//     try {
//       const loadedProducts = await getProductsByCategory(categoryName);
//       setProducts(loadedProducts);
//     } catch (error) {
//       console.error('Error loading products:', error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh counts function
//   const handleRefreshCounts = async () => {
//     // Clear cache
//     clearProductCountCache();
    
//     // Reload counts
//     await loadAllCategoryCounts();
    
//     // Also reload current category products
//     setLoading(true);
//     try {
//       const loadedProducts = await getProductsByCategory(activeCategory);
//       setProducts(loadedProducts);
//     } catch (error) {
//       console.error('Error reloading products:', error);
//     } finally {
//       setLoading(false);
//     }
    
//     alert('Product counts refreshed successfully!');
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
    
//     for (let i = 0; i < 5; i++) {
//       stars.push(<StarIcon key={i} filled={i < fullStars} />);
//     }
    
//     return (
//       <div className="wood-rating-badge">
//         <div className="wood-rating-stars">{stars}</div>
//         <span style={{ marginLeft: '6px' }}>{rating}</span>
//       </div>
//     );
//   };

//   const activeCategoryData = categories.find(cat => cat.name === activeCategory);

//   return (
//     <div className="wood-products-page">
//       {/* Hero Banner */}
//       <div className="wood-hero-section">
//         <div className="wood-container">
//           <h1 className="wood-hero-title">Premium Wooden Products</h1>
//           <p className="wood-hero-subtitle">
//             Handcrafted with precision | 100% Quality Assurance | Free Installation Support
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container wood-main-container">
//         <div className="wood-layout-wrapper">
//           {/* Sidebar */}
//           <div className="wood-sidebar">
//             <div className="wood-sidebar-card">
//               <h2 className="wood-sidebar-title">All Categories</h2>
//               <div className="wood-categories-list">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => handleCategoryChange(category.name)}
//                     className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
//                     disabled={countsLoading}
//                   >
//                     <span>{category.displayName}</span>
//                     <span className="wood-category-count">
//                       {countsLoading ? (
//                         <span style={{ fontSize: '10px' }}>...</span>
//                       ) : (
//                         categoryCounts[category.name] || 0
//                       )}
//                     </span>
//                   </button>
//                 ))}
//               </div>
              
//               <div className="wood-whatsapp-help">
//                 <h3>Need Assistance?</h3>
//                 <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
//                 <a
//                   href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="wood-whatsapp-btn"
//                 >
//                   <span>💬 Chat on WhatsApp</span>
//                 </a>
                
//                 {/* Refresh Button */}
//                 <button
//                   onClick={handleRefreshCounts}
//                   disabled={countsLoading}
//                   style={{
//                     marginTop: '12px',
//                     background: '#f0f2f2',
//                     color: '#0f1111',
//                     border: '1px solid #d5d9d9',
//                     padding: '8px 12px',
//                     borderRadius: '4px',
//                     width: '100%',
//                     cursor: 'pointer',
//                     fontSize: '12px',
//                     fontWeight: '500',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '6px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#e3e6e6';
//                     e.target.style.borderColor = '#a2a6ac';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = '#f0f2f2';
//                     e.target.style.borderColor = '#d5d9d9';
//                   }}
//                 >
//                   {countsLoading ? '⏳ Loading...' : '🔄 Refresh Counts'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main Products Area */}
//           <div className="wood-main-content-area">
//             <div className="wood-category-header">
//               <div className="wood-header-content">
//                 <div>
//                   <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
//                   <p className="wood-product-count">
//                     {products.length} products • Page {currentPage} of {totalPages}
//                     {countsLoading && ' (Loading counts...)'}
//                   </p>
//                 </div>
//                 <div className="wood-page-indicator">
//                   <span>Showing:</span>
//                   <span className="wood-current-page">
//                     {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {loading ? (
//               <div className="wood-products-grid">
//                 {[...Array(12)].map((_, i) => (
//                   <div key={i} className="wood-product-card">
//                     <div className="wood-product-image" style={{ background: '#f0f0f0' }}>
//                       <div className="wood-image-placeholder">
//                         <div className="wood-icon">⏳</div>
//                         <p className="wood-image-text">Loading...</p>
//                       </div>
//                     </div>
//                     <div className="wood-product-info">
//                       <div style={{ height: '16px', background: '#f0f0f0', marginBottom: '8px' }}></div>
//                       <div style={{ height: '14px', background: '#f0f0f0', width: '70%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : products.length > 0 ? (
//               <>
//                 <div className="wood-products-grid">
//                   {currentProducts.map((product) => (
//                     <div key={product.id} className="wood-product-card">
//                       <div className="wood-product-image" style={{ position: 'relative' }}>
//                         <ProductImage 
//                           images={product.images} 
//                           alt={product.name}
//                           productNumber={product.productNumber}
//                         />
//                         {renderStars(parseFloat(product.rating))}
//                       </div>
                      
//                       <div className="wood-product-info">
//                         <h3 className="wood-product-title">{product.name}</h3>
                        
//                         {/* Product specs */}
//                         <div style={{ margin: '8px 0', fontSize: '13px', color: '#565959' }}>
//                           <div style={{ marginBottom: '4px' }}>
//                             <span style={{ fontWeight: '500' }}>Wood:</span> {product.woodtype}
//                           </div>
//                           <div>
//                             <span style={{ fontWeight: '500' }}>Size:</span> {product.size}
//                           </div>
//                         </div>
                        
//                         <div className="wood-price-section">
//                           <div className="wood-product-price">
//                             <span className="wood-price-superscript">₹</span>
//                             {product.price.replace('₹', '')}
//                           </div>
                          
//                           <a
//                             href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)}%0A%0AWood Type: ${encodeURIComponent(product.woodtype)}%0ASize: ${encodeURIComponent(product.size)}%0APrice: ${encodeURIComponent(product.price)}%0A%0APlease provide more details.`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="wood-buy-button"
//                           >
//                             <span>Buy on WhatsApp</span>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="wood-pagination">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="wood-pagination-btn wood-prev-btn"
//                     >
//                       <span>‹</span> Previous
//                     </button>

//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNumber;
//                       if (totalPages <= 5) {
//                         pageNumber = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNumber = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNumber = totalPages - 4 + i;
//                       } else {
//                         pageNumber = currentPage - 2 + i;
//                       }

//                       return (
//                         <button
//                           key={pageNumber}
//                           onClick={() => handlePageChange(pageNumber)}
//                           className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
//                         >
//                           {pageNumber}
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="wood-pagination-btn wood-next-btn"
//                     >
//                       Next <span>›</span>
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="wood-empty-state">
//                 <div className="wood-empty-icon">🚪</div>
//                 <h3>No products available</h3>
//                 <p>
//                   {categoryCounts[activeCategory] === 0 
//                     ? `No product folders found in ${activeCategoryData?.displayName} category.` 
//                     : 'Check if .webp images exist in the product folders'}
//                 </p>
//                 <button
//                   onClick={handleRefreshCounts}
//                   style={{
//                     marginTop: '15px',
//                     padding: '8px 16px',
//                     background: '#ffa41c',
//                     color: '#0f1111',
//                     border: '1px solid #ff8f00',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontWeight: '500'
//                   }}
//                 >
//                   Refresh Data
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// app/products/wooden-doors/page.js
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import './products-styles.css';
// import { categories, getProductsByCategory, getActualProductCount, clearProductCountCache, clearProductInfoCache } from '@/utils/productData';
// import Link from 'next/link';

// const StarIcon = ({ filled }) => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // Simple Product Image Component
// const ProductImage = ({ images, alt, productNumber }) => {
//   const [imgError, setImgError] = useState(false);
  
//   const imageSrc = images && images.length > 0 ? images[0] : null;
  
//   if (!imageSrc || imgError) {
//     return (
//       <div className="wood-image-placeholder">
//         <div className="wood-icon">🚪</div>
//         <p className="wood-image-text">Product {productNumber}</p>
//       </div>
//     );
//   }
  
//   return (
//     <div style={{ width: '100%', height: '100%', position: 'relative' }}>
//       <Image
//         src={imageSrc}
//         alt={alt}
//         fill
//         style={{ objectFit: 'cover' }}
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         onError={() => {
//           console.error('Image failed to load:', imageSrc);
//           setImgError(true);
//         }}
//         onLoad={() => console.log('Image loaded:', imageSrc)}
//       />
//     </div>
//   );
// };

// export default function ProductsPage() {
//   const [activeCategory, setActiveCategory] = useState('woodenDoor');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categoryCounts, setCategoryCounts] = useState({});
//   const [countsLoading, setCountsLoading] = useState(true);

//   const productsPerPage = 12;

//   // Function to load all category counts
//   const loadAllCategoryCounts = useCallback(async () => {
//     setCountsLoading(true);
//     try {
//       const counts = {};
//       console.log('Loading counts for all categories...');
      
//       // Load counts for all categories
//       for (const category of categories) {
//         try {
//           const count = await getActualProductCount(category.name);
//           counts[category.name] = count;
//           console.log(`${category.displayName}: ${count} products`);
//         } catch (error) {
//           console.error(`Error loading count for ${category.name}:`, error);
//           counts[category.name] = 0;
//         }
//       }
      
//       setCategoryCounts(counts);
//       console.log('All counts loaded:', counts);
//     } catch (error) {
//       console.error('Error loading category counts:', error);
//     } finally {
//       setCountsLoading(false);
//     }
//   }, []);

//   // Load category counts on mount
//   useEffect(() => {
//     loadAllCategoryCounts();
//   }, [loadAllCategoryCounts]);

//   // Load products when category changes
//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       try {
//         console.log(`Loading products for ${activeCategory}...`);
//         const loadedProducts = await getProductsByCategory(activeCategory);
//         setProducts(loadedProducts);
//         console.log(`Loaded ${loadedProducts.length} products for ${activeCategory}`);
//       } catch (error) {
//         console.error('Error loading products:', error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//         setCurrentPage(1);
//       }
//     };

//     loadProducts();
//   }, [activeCategory]);

//   // Calculate pagination
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 380, behavior: 'smooth' });
//   };

//   // Handle category change
//   const handleCategoryChange = async (categoryName) => {
//     if (categoryName === activeCategory) return;
    
//     setActiveCategory(categoryName);
//     setCurrentPage(1);
//     setLoading(true);
    
//     try {
//       const loadedProducts = await getProductsByCategory(categoryName);
//       setProducts(loadedProducts);
//     } catch (error) {
//       console.error('Error loading products:', error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh counts function
//   const handleRefreshCounts = async () => {
//     // Clear all caches
//     clearProductCountCache();
//     clearProductInfoCache();
    
//     // Reload counts
//     await loadAllCategoryCounts();
    
//     // Also reload current category products
//     setLoading(true);
//     try {
//       const loadedProducts = await getProductsByCategory(activeCategory);
//       setProducts(loadedProducts);
//     } catch (error) {
//       console.error('Error reloading products:', error);
//     } finally {
//       setLoading(false);
//     }
    
//     alert('Product data refreshed successfully!');
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else {
//         stars.push(<StarIcon key={i} filled={false} />);
//       }
//     }
    
//     return (
//       <div className="wood-rating-badge">
//         <div className="wood-rating-stars">{stars}</div>
//         <span style={{ marginLeft: '6px' }}>{rating}</span>
//       </div>
//     );
//   };

//   const activeCategoryData = categories.find(cat => cat.name === activeCategory);

//   return (
//     <div className="wood-products-page">
//       {/* Hero Banner */}
//       <div className="wood-hero-section">
//         <div className="wood-container">
//           <h1 className="wood-hero-title">Premium Wooden Products</h1>
//           <p className="wood-hero-subtitle">
//             Handcrafted with precision | 100% Quality Assurance | Free Installation Support
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container wood-main-container">
//         <div className="wood-layout-wrapper">
//           {/* Sidebar */}
//           <div className="wood-sidebar">
//             <div className="wood-sidebar-card">
//               <h2 className="wood-sidebar-title">All Categories</h2>
//               <div className="wood-categories-list">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => handleCategoryChange(category.name)}
//                     className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
//                     disabled={countsLoading}
//                   >
//                     <span>{category.displayName}</span>
//                     <span className="wood-category-count">
//                       {countsLoading ? (
//                         <span style={{ fontSize: '10px' }}>...</span>
//                       ) : (
//                         categoryCounts[category.name] || 0
//                       )}
//                     </span>
//                   </button>
//                 ))}
//               </div>
              
//               <div className="wood-whatsapp-help">
//                 <h3>Need Assistance?</h3>
//                 <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
//                 <a
//                   href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="wood-whatsapp-btn"
//                 >
//                   <span>💬 Chat on WhatsApp</span>
//                 </a>
                
//                 {/* Refresh Button */}
//                 <button
//                   onClick={handleRefreshCounts}
//                   disabled={countsLoading || loading}
//                   style={{
//                     marginTop: '12px',
//                     background: '#f0f2f2',
//                     color: '#0f1111',
//                     border: '1px solid #d5d9d9',
//                     padding: '8px 12px',
//                     borderRadius: '4px',
//                     width: '100%',
//                     cursor: countsLoading || loading ? 'not-allowed' : 'pointer',
//                     fontSize: '12px',
//                     fontWeight: '500',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '6px',
//                     transition: 'all 0.2s ease',
//                     opacity: countsLoading || loading ? 0.6 : 1
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!countsLoading && !loading) {
//                       e.target.style.background = '#e3e6e6';
//                       e.target.style.borderColor = '#a2a6ac';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!countsLoading && !loading) {
//                       e.target.style.background = '#f0f2f2';
//                       e.target.style.borderColor = '#d5d9d9';
//                     }
//                   }}
//                 >
//                   {countsLoading || loading ? '⏳ Loading...' : '🔄 Refresh Data'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main Products Area */}
//           <div className="wood-main-content-area">
//             <div className="wood-category-header">
//               <div className="wood-header-content">
//                 <div>
//                   <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
//                   <p className="wood-product-count">
//                     {products.length} products • Page {currentPage} of {totalPages}
//                     {countsLoading && ' (Loading counts...)'}
//                   </p>
//                 </div>
//                 <div className="wood-page-indicator">
//                   <span>Showing:</span>
//                   <span className="wood-current-page">
//                     {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {loading ? (
//               <div className="wood-products-grid">
//                 {[...Array(12)].map((_, i) => (






//                   <div key={i} className="wood-product-card">
//                     <div className="wood-product-image" style={{ background: '#f0f0f0' }}>
//                       <div className="wood-image-placeholder">
//                         <div className="wood-icon">⏳</div>
//                         <p className="wood-image-text">Loading...</p>
//                       </div>
//                     </div>
//                     <div className="wood-product-info">
//                       <div style={{ height: '16px', background: '#f0f0f0', marginBottom: '8px' }}></div>
//                       <div style={{ height: '14px', background: '#f0f0f0', width: '70%' }}></div>
//                     </div>
//                   </div>


//                 ))}
//               </div>
//             ) : products.length > 0 ? (
//               <>
              
//              // Import Link
// import Link from 'next/link';

// // Product Card को Link में wrap करें (line 350 के आसपास):
// <div className="wood-products-grid">
//   {currentProducts.map((product) => (
//     <Link 
//       key={product.id}
//       href={`/products/${activeCategory}/${product.id.replace(`${activeCategory}_`, '')}`}
//       style={{ 
//         textDecoration: 'none', 
//         color: 'inherit',
//         display: 'block'
//       }}
//     >
//       <div className="wood-product-card">
//         <div className="wood-product-image" style={{ position: 'relative' }}>
//           <ProductImage 
//             images={product.images} 
//             alt={product.name}
//             productNumber={product.productNumber}
//           />
//           {renderStars(parseFloat(product.rating))}
//         </div>
        
//         <div className="wood-product-info">
//           <h3 className="wood-product-title">{product.name}</h3>
          
//           {/* Product specs - Now using actual data from info.json */}
//           <div style={{ margin: '8px 0', fontSize: '13px', color: '#565959' }}>
//             <div style={{ marginBottom: '4px' }}>
//               <span style={{ fontWeight: '500' }}>Wood:</span> {product.woodtype}
//             </div>
//             <div style={{ marginBottom: '4px' }}>
//               <span style={{ fontWeight: '500' }}>Size:</span> {product.size}
//             </div>
//             {product.sales > 0 && (
//               <div style={{ 
//                 marginTop: '6px', 
//                 fontSize: '12px', 
//                 color: '#ffa41c',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}>
//                 <span>🔥</span> {product.sales}+ Sold
//               </div>
//             )}
//           </div>
          
//           <div className="wood-price-section">
//             <div className="wood-product-price">
//               <span className="wood-price-superscript">₹</span>
//               {product.price.replace('₹', '')}
//             </div>
            
//             {/* Short description if available */}
//             {product.description && product.description.trim() !== '' && (
//               <div style={{ 
//                 fontSize: '12px', 
//                 color: '#565959', 
//                 margin: '8px 0',
//                 lineHeight: '1.4',
//                 maxHeight: '36px',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 display: '-webkit-box',
//                 WebkitLineClamp: 2,
//                 WebkitBoxOrient: 'vertical'
//               }}>
//                 {product.description}
//               </div>
//             )}
            
//             <a
//               href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)}%0A%0AWood Type: ${encodeURIComponent(product.woodtype)}%0ASize: ${encodeURIComponent(product.size)}%0APrice: ${encodeURIComponent(product.price)}%0A${product.description ? `Description: ${encodeURIComponent(product.description)}%0A` : ''}%0APlease provide more details.`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="wood-buy-button"
//               onClick={(e) => e.stopPropagation()} // Prevent link click from triggering card click
//             >
//               <span>Buy on WhatsApp</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </Link>
//   ))}
// </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="wood-pagination">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="wood-pagination-btn wood-prev-btn"
//                     >
//                       <span>‹</span> Previous
//                     </button>

//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNumber;
//                       if (totalPages <= 5) {
//                         pageNumber = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNumber = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNumber = totalPages - 4 + i;
//                       } else {
//                         pageNumber = currentPage - 2 + i;
//                       }

//                       return (
//                         <button
//                           key={pageNumber}
//                           onClick={() => handlePageChange(pageNumber)}
//                           className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
//                         >
//                           {pageNumber}
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="wood-pagination-btn wood-next-btn"
//                     >
//                       Next <span>›</span>
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="wood-empty-state">
//                 <div className="wood-empty-icon">🚪</div>
//                 <h3>No products available</h3>
//                 <p>
//                   {categoryCounts[activeCategory] === 0 
//                     ? `No product folders found in ${activeCategoryData?.displayName} category.` 
//                     : 'Check if info.json files exist in product folders'}
//                 </p>
//                 <button
//                   onClick={handleRefreshCounts}
//                   style={{
//                     marginTop: '15px',
//                     padding: '8px 16px',
//                     background: '#ffa41c',
//                     color: '#0f1111',
//                     border: '1px solid #ff8f00',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontWeight: '500'
//                   }}
//                 >
//                   Refresh Data
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import './products-styles.css';
// import { categories, getProductsByCategory, getActualProductCount, clearProductCountCache, clearProductInfoCache } from '@/utils/productData';

// const StarIcon = ({ filled }) => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // Simple Product Image Component
// const ProductImage = ({ images, alt, productNumber }) => {
//   const [imgError, setImgError] = useState(false);
  
//   const imageSrc = images && images.length > 0 ? images[0] : null;
  
//   if (!imageSrc || imgError) {
//     return (
//       <div className="wood-image-placeholder">
//         <div className="wood-icon">🚪</div>
//         <p className="wood-image-text">Product {productNumber}</p>
//       </div>
//     );
//   }
  
//   return (
//     <div style={{ width: '100%', height: '100%', position: 'relative' }}>
//       <Image
//         src={imageSrc}
//         alt={alt}
//         fill
//         style={{ objectFit: 'cover' }}
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         onError={() => {
//           console.error('Image failed to load:', imageSrc);
//           setImgError(true);
//         }}
//         onLoad={() => console.log('Image loaded:', imageSrc)}
//       />
//     </div>
//   );
// };

// export default function ProductsPage() {
//   const [activeCategory, setActiveCategory] = useState('woodenDoor');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categoryCounts, setCategoryCounts] = useState({});
//   const [countsLoading, setCountsLoading] = useState(true);

//   const productsPerPage = 12;

//   // Function to load all category counts
//   const loadAllCategoryCounts = useCallback(async () => {
//     setCountsLoading(true);
//     try {
//       const counts = {};
//       console.log('Loading counts for all categories...');
      
//       // Load counts for all categories
//       for (const category of categories) {
//         try {
//           const count = await getActualProductCount(category.name);
//           counts[category.name] = count;
//           console.log(`${category.displayName}: ${count} products`);
//         } catch (error) {
//           console.error(`Error loading count for ${category.name}:`, error);
//           counts[category.name] = 0;
//         }
//       }
      
//       setCategoryCounts(counts);
//       console.log('All counts loaded:', counts);
//     } catch (error) {
//       console.error('Error loading category counts:', error);
//     } finally {
//       setCountsLoading(false);
//     }
//   }, []);

//   // Load category counts on mount
//   useEffect(() => {
//     loadAllCategoryCounts();
//   }, [loadAllCategoryCounts]);

//   // Load products when category changes
//   useEffect(() => {
//     const loadProducts = async () => {
//       setLoading(true);
//       try {
//         console.log(`Loading products for ${activeCategory}...`);
//         const loadedProducts = await getProductsByCategory(activeCategory);
//         setProducts(loadedProducts);
//         console.log(`Loaded ${loadedProducts.length} products for ${activeCategory}`);
//       } catch (error) {
//         console.error('Error loading products:', error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//         setCurrentPage(1);
//       }
//     };

//     loadProducts();
//   }, [activeCategory]);

//   // Calculate pagination
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 380, behavior: 'smooth' });
//   };

//   // Handle category change
//   const handleCategoryChange = async (categoryName) => {
//     if (categoryName === activeCategory) return;
    
//     setActiveCategory(categoryName);
//     setCurrentPage(1);
//     setLoading(true);
    
//     try {
//       const loadedProducts = await getProductsByCategory(categoryName);
//       setProducts(loadedProducts);
//     } catch (error) {
//       console.error('Error loading products:', error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh counts function
//   const handleRefreshCounts = async () => {
//     // Clear all caches
//     clearProductCountCache();
//     clearProductInfoCache();
    
//     // Reload counts
//     await loadAllCategoryCounts();
    
//     // Also reload current category products
//     setLoading(true);
//     try {
//       const loadedProducts = await getProductsByCategory(activeCategory);
//       setProducts(loadedProducts);
//     } catch (error) {
//       console.error('Error reloading products:', error);
//     } finally {
//       setLoading(false);
//     }
    
//     alert('Product data refreshed successfully!');
//   };

//   // Render star rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<StarIcon key={i} filled={true} />);
//       } else {
//         stars.push(<StarIcon key={i} filled={false} />);
//       }
//     }
    
//     return (
//       <div className="wood-rating-badge">
//         <div className="wood-rating-stars">{stars}</div>
//         <span style={{ marginLeft: '6px' }}>{rating}</span>
//       </div>
//     );
//   };

//   const activeCategoryData = categories.find(cat => cat.name === activeCategory);

//   return (
//     <div className="wood-products-page">
//       {/* Hero Banner */}
//       <div className="wood-hero-section">
//         <div className="wood-container">
//           <h1 className="wood-hero-title">Premium Wooden Products</h1>
//           <p className="wood-hero-subtitle">
//             Handcrafted with precision | 100% Quality Assurance | Free Installation Support
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container wood-main-container">
//         <div className="wood-layout-wrapper">
//           {/* Sidebar */}
//           <div className="wood-sidebar">
//             <div className="wood-sidebar-card">
//               <h2 className="wood-sidebar-title">All Categories</h2>
//               <div className="wood-categories-list">
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     onClick={() => handleCategoryChange(category.name)}
//                     className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
//                     disabled={countsLoading}
//                   >
//                     <span>{category.displayName}</span>
//                     <span className="wood-category-count">
//                       {countsLoading ? (
//                         <span style={{ fontSize: '10px' }}>...</span>
//                       ) : (
//                         categoryCounts[category.name] || 0
//                       )}
//                     </span>
//                   </button>
//                 ))}
//               </div>
              
//               <div className="wood-whatsapp-help">
//                 <h3>Need Assistance?</h3>
//                 <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
//                 <a
//                   href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="wood-whatsapp-btn"
//                 >
//                   <span>💬 Chat on WhatsApp</span>
//                 </a>
                
//                 {/* Refresh Button */}
//                 <button
//                   onClick={handleRefreshCounts}
//                   disabled={countsLoading || loading}
//                   style={{
//                     marginTop: '12px',
//                     background: '#f0f2f2',
//                     color: '#0f1111',
//                     border: '1px solid #d5d9d9',
//                     padding: '8px 12px',
//                     borderRadius: '4px',
//                     width: '100%',
//                     cursor: countsLoading || loading ? 'not-allowed' : 'pointer',
//                     fontSize: '12px',
//                     fontWeight: '500',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '6px',
//                     transition: 'all 0.2s ease',
//                     opacity: countsLoading || loading ? 0.6 : 1
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!countsLoading && !loading) {
//                       e.target.style.background = '#e3e6e6';
//                       e.target.style.borderColor = '#a2a6ac';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!countsLoading && !loading) {
//                       e.target.style.background = '#f0f2f2';
//                       e.target.style.borderColor = '#d5d9d9';
//                     }
//                   }}
//                 >
//                   {countsLoading || loading ? '⏳ Loading...' : '🔄 Refresh Data'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main Products Area */}
//           <div className="wood-main-content-area">
//             <div className="wood-category-header">
//               <div className="wood-header-content">
//                 <div>
//                   <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
//                   <p className="wood-product-count">
//                     {products.length} products • Page {currentPage} of {totalPages}
//                     {countsLoading && ' (Loading counts...)'}
//                   </p>
//                 </div>
//                 <div className="wood-page-indicator">
//                   <span>Showing:</span>
//                   <span className="wood-current-page">
//                     {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {loading ? (
//               <div className="wood-products-grid">
//                 {[...Array(12)].map((_, i) => (
//                   <div key={i} className="wood-product-card">
//                     <div className="wood-product-image" style={{ background: '#f0f0f0' }}>
//                       <div className="wood-image-placeholder">
//                         <div className="wood-icon">⏳</div>
//                         <p className="wood-image-text">Loading...</p>
//                       </div>
//                     </div>
//                     <div className="wood-product-info">
//                       <div style={{ height: '16px', background: '#f0f0f0', marginBottom: '8px' }}></div>
//                       <div style={{ height: '14px', background: '#f0f0f0', width: '70%' }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : products.length > 0 ? (
//               <>
//                 <div className="wood-products-grid">
//                   {currentProducts.map((product) => (
//                     <Link 
//                       key={product.id}
//                       href={`/products/${activeCategory}/${product.id.replace(`${activeCategory}_`, '')}`}
//                       style={{ 
//                         textDecoration: 'none', 
//                         color: 'inherit',
//                         display: 'block'
//                       }}
//                     >
//                       <div className="wood-product-card">
//                         <div className="wood-product-image" style={{ position: 'relative' }}>
//                           <ProductImage 
//                             images={product.images} 
//                             alt={product.name}
//                             productNumber={product.productNumber}
//                           />
//                           {renderStars(parseFloat(product.rating))}
//                         </div>
                        
//                         <div className="wood-product-info">
//                           <h3 className="wood-product-title">{product.name}</h3>
                          
//                           {/* Product specs - Now using actual data from info.json */}
//                           <div style={{ margin: '8px 0', fontSize: '13px', color: '#565959' }}>
//                             <div style={{ marginBottom: '4px' }}>
//                               <span style={{ fontWeight: '500' }}>Wood:</span> {product.woodtype}
//                             </div>
//                             <div style={{ marginBottom: '4px' }}>
//                               <span style={{ fontWeight: '500' }}>Size:</span> {product.size}
//                             </div>
//                             {product.sales > 0 && (
//                               <div style={{ 
//                                 marginTop: '6px', 
//                                 fontSize: '12px', 
//                                 color: '#ffa41c',
//                                 fontWeight: '500',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '4px'
//                               }}>
//                                 <span>🔥</span> {product.sales}+ Sold
//                               </div>
//                             )}
//                           </div>
                          
//                           <div className="wood-price-section">
//                             <div className="wood-product-price">
//                               <span className="wood-price-superscript">₹</span>
//                               {product.price.replace('₹', '')}
//                             </div>
                            
//                             {/* Short description if available */}
//                             {product.description && product.description.trim() !== '' && (
//                               <div style={{ 
//                                 fontSize: '12px', 
//                                 color: '#565959', 
//                                 margin: '8px 0',
//                                 lineHeight: '1.4',
//                                 maxHeight: '36px',
//                                 overflow: 'hidden',
//                                 textOverflow: 'ellipsis',
//                                 display: '-webkit-box',
//                                 WebkitLineClamp: 2,
//                                 WebkitBoxOrient: 'vertical'
//                               }}>
//                                 {product.description}
//                               </div>
//                             )}
                            
//                             <a
//                               href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)}%0A%0AWood Type: ${encodeURIComponent(product.woodtype)}%0ASize: ${encodeURIComponent(product.size)}%0APrice: ${encodeURIComponent(product.price)}%0A${product.description ? `Description: ${encodeURIComponent(product.description)}%0A` : ''}%0APlease provide more details.`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="wood-buy-button"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               <span>Buy on WhatsApp</span>
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="wood-pagination">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="wood-pagination-btn wood-prev-btn"
//                     >
//                       <span>‹</span> Previous
//                     </button>

//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNumber;
//                       if (totalPages <= 5) {
//                         pageNumber = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNumber = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNumber = totalPages - 4 + i;
//                       } else {
//                         pageNumber = currentPage - 2 + i;
//                       }

//                       return (
//                         <button
//                           key={pageNumber}
//                           onClick={() => handlePageChange(pageNumber)}
//                           className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
//                         >
//                           {pageNumber}
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="wood-pagination-btn wood-next-btn"
//                     >
//                       Next <span>›</span>
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="wood-empty-state">
//                 <div className="wood-empty-icon">🚪</div>
//                 <h3>No products available</h3>
//                 <p>
//                   {categoryCounts[activeCategory] === 0 
//                     ? `No product folders found in ${activeCategoryData?.displayName} category.` 
//                     : 'Check if info.json files exist in product folders'}
//                 </p>
//                 <button
//                   onClick={handleRefreshCounts}
//                   style={{
//                     marginTop: '15px',
//                     padding: '8px 16px',
//                     background: '#ffa41c',
//                     color: '#0f1111',
//                     border: '1px solid #ff8f00',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontWeight: '500'
//                   }}
//                 >
//                   Refresh Data
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './products-styles.css';
import { categories, getProductsByCategory, getActualProductCount, clearProductCountCache, clearProductInfoCache } from '@/utils/productData';
import Navbar from '@/components/Navbar';

const StarIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// Simple Product Image Component
const ProductImage = ({ images, alt, productNumber }) => {
  const [imgError, setImgError] = useState(false);
  
  const imageSrc = images && images.length > 0 ? images[0] : null;
  
  if (!imageSrc || imgError) {
    return (
      <div className="wood-image-placeholder">
        <div className="wood-icon">🚪</div>
        <p className="wood-image-text">Product {productNumber}</p>
      </div>
    );
  }
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => {
          console.error('Image failed to load:', imageSrc);
          setImgError(true);
        }}
        onLoad={() => console.log('Image loaded:', imageSrc)}
      />
    </div>
  );
};

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('woodenDoor');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [countsLoading, setCountsLoading] = useState(true);

  const productsPerPage = 12;

  // Function to load all category counts
  const loadAllCategoryCounts = useCallback(async () => {
    setCountsLoading(true);
    try {
      const counts = {};
      console.log('Loading counts for all categories...');
      
      // Load counts for all categories
      for (const category of categories) {
        try {
          const count = await getActualProductCount(category.name);
          counts[category.name] = count;
          console.log(`${category.displayName}: ${count} products`);
        } catch (error) {
          console.error(`Error loading count for ${category.name}:`, error);
          counts[category.name] = 0;
        }
      }
      
      setCategoryCounts(counts);
      console.log('All counts loaded:', counts);
    } catch (error) {
      console.error('Error loading category counts:', error);
    } finally {
      setCountsLoading(false);
    }
  }, []);

  // Load category counts on mount
  useEffect(() => {
    loadAllCategoryCounts();
  }, [loadAllCategoryCounts]);

  // Load products when category changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        console.log(`Loading products for ${activeCategory}...`);
        const loadedProducts = await getProductsByCategory(activeCategory);
        setProducts(loadedProducts);
        console.log(`Loaded ${loadedProducts.length} products for ${activeCategory}`);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
        setCurrentPage(1);
      }
    };

    loadProducts();
  }, [activeCategory]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  // Handle category change
  const handleCategoryChange = async (categoryName) => {
    if (categoryName === activeCategory) return;
    
    setActiveCategory(categoryName);
    setCurrentPage(1);
    setLoading(true);
    
    try {
      const loadedProducts = await getProductsByCategory(categoryName);
      setProducts(loadedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Refresh counts function
  const handleRefreshCounts = async () => {
    // Clear all caches
    clearProductCountCache();
    clearProductInfoCache();
    
    // Reload counts
    await loadAllCategoryCounts();
    
    // Also reload current category products
    setLoading(true);
    try {
      const loadedProducts = await getProductsByCategory(activeCategory);
      setProducts(loadedProducts);
    } catch (error) {
      console.error('Error reloading products:', error);
    } finally {
      setLoading(false);
    }
    
    alert('Product data refreshed successfully!');
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} filled={true} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarIcon key={i} filled={true} />);
      } else {
        stars.push(<StarIcon key={i} filled={false} />);
      }
    }
    
    return (
      <div className="wood-rating-badge">
        <div className="wood-rating-stars">{stars}</div>
        <span style={{ marginLeft: '6px' }}>{rating}</span>
      </div>
    );
  };

  const activeCategoryData = categories.find(cat => cat.name === activeCategory);

  return (

    <>
    < Navbar />
    <div className="wood-products-page">
      {/* Hero Banner */}
      <div className="wood-hero-section">
        <div className="wood-container">
          <h1 className="wood-hero-title"></h1>
          <p className="wood-hero-subtitle">
            {/* Handcrafted with precision | 100% Quality Assurance | Free Installation Support */}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="wood-container wood-main-container">
        <div className="wood-layout-wrapper">
          {/* Sidebar */}
          <div className="wood-sidebar">
            <div className="wood-sidebar-card">
              <h2 className="wood-sidebar-title">All Categories</h2>
              <div className="wood-categories-list">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
                    disabled={countsLoading}
                  >
                    <span>{category.displayName}</span>
                    <span className="wood-category-count">
                      {countsLoading ? (
                        <span style={{ fontSize: '10px' }}>...</span>
                      ) : (
                        categoryCounts[category.name] || 0
                      )}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="wood-whatsapp-help">
                <h3>Need Assistance?</h3>
                <p>Our experts are available 10AM - 7PM to help you choose the perfect product</p>
                <a
                  href="https://wa.me/919876543210?text=Hello, I need help choosing wooden products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wood-whatsapp-btn"
                >
                  <span>💬 Chat on WhatsApp</span>
                </a>
                
                {/* Refresh Button */}
                <button
                  onClick={handleRefreshCounts}
                  disabled={countsLoading || loading}
                  style={{
                    marginTop: '12px',
                    background: '#f0f2f2',
                    color: '#0f1111',
                    border: '1px solid #d5d9d9',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    width: '100%',
                    cursor: countsLoading || loading ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    opacity: countsLoading || loading ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!countsLoading && !loading) {
                      e.target.style.background = '#e3e6e6';
                      e.target.style.borderColor = '#a2a6ac';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!countsLoading && !loading) {
                      e.target.style.background = '#f0f2f2';
                      e.target.style.borderColor = '#d5d9d9';
                    }
                  }}
                >
                  {countsLoading || loading ? '⏳ Loading...' : '🔄 Refresh Data'}
                </button>
              </div>
            </div>
          </div>

          {/* Main Products Area */}
          <div className="wood-main-content-area">
            <div className="wood-category-header">
              <div className="wood-header-content">
                <div>
                  <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
                  <p className="wood-product-count">
                    {products.length} products • Page {currentPage} of {totalPages}
                    {countsLoading && ' (Loading counts...)'}
                  </p>
                </div>
                <div className="wood-page-indicator">
                  <span>Showing:</span>
                  <span className="wood-current-page">
                    {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
                  </span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="wood-products-grid">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="wood-product-card">
                    <div className="wood-product-image" style={{ background: '#f0f0f0' }}>
                      <div className="wood-image-placeholder">
                        <div className="wood-icon">⏳</div>
                        <p className="wood-image-text">Loading...</p>
                      </div>
                    </div>
                    <div className="wood-product-info">
                      <div style={{ height: '16px', background: '#f0f0f0', marginBottom: '8px' }}></div>
                      <div style={{ height: '14px', background: '#f0f0f0', width: '70%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="wood-products-grid">
                  {currentProducts.map((product) => (
                    <Link 
                      key={product.id}
                      href={`/products/${activeCategory}/product${product.productNumber}`}
                      style={{ 
                        textDecoration: 'none', 
                        color: 'inherit',
                        display: 'block'
                      }}
                    >
                      <div className="wood-product-card">
                        <div className="wood-product-image" style={{ position: 'relative' }}>
                          <ProductImage 
                            images={product.images} 
                            alt={product.name}
                            productNumber={product.productNumber}
                          />
                          {renderStars(parseFloat(product.rating))}
                        </div>
                        
                        <div className="wood-product-info">
                          <h3 className="wood-product-title">{product.name}</h3>
                          
                          {/* Product specs - Now using actual data from info.json */}
                          <div style={{ margin: '8px 0', fontSize: '13px', color: '#565959' }}>
                            <div style={{ marginBottom: '4px' }}>
                              <span style={{ fontWeight: '500' }}>Wood:</span> {product.woodtype}
                            </div>
                            <div style={{ marginBottom: '4px' }}>
                              <span style={{ fontWeight: '500' }}>Size:</span> {product.size}
                            </div>
                            {product.sales > 0 && (
                              <div style={{ 
                                marginTop: '6px', 
                                fontSize: '12px', 
                                color: '#ffa41c',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <span>🔥</span> {product.sales}+ Sold
                              </div>
                            )}
                          </div>
                          
                          <div className="wood-price-section">
                            <div className="wood-product-price">
                              <span className="wood-price-superscript">₹</span>
                              {product.price.toString().replace('₹', '')}
                            </div>
                            
                            {/* Short description if available */}
                            {product.description && product.description.trim() !== '' && (
                              <div style={{ 
                                fontSize: '12px', 
                                color: '#565959', 
                                margin: '8px 0',
                                lineHeight: '1.4',
                                maxHeight: '36px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                              }}>
                                {product.description}
                              </div>
                            )}
                            
                            <a
                              href={`https://wa.me/919876543210?text=Hello, I want to buy: ${encodeURIComponent(product.name)}%0A%0AWood Type: ${encodeURIComponent(product.woodtype)}%0ASize: ${encodeURIComponent(product.size)}%0APrice: ${encodeURIComponent(product.price)}%0A${product.description ? `Description: ${encodeURIComponent(product.description)}%0A` : ''}%0APlease provide more details.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="wood-buy-button"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Buy on WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="wood-pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="wood-pagination-btn wood-prev-btn"
                    >
                      <span>‹</span> Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`wood-page-number ${currentPage === pageNumber ? 'active' : ''}`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="wood-pagination-btn wood-next-btn"
                    >
                      Next <span>›</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="wood-empty-state">
                <div className="wood-empty-icon">🚪</div>
                <h3>No products available</h3>
                <p>
                  {categoryCounts[activeCategory] === 0 
                    ? `No product folders found in ${activeCategoryData?.displayName} category.` 
                    : 'Check if info.json files exist in product folders'}
                </p>
                <button
                  onClick={handleRefreshCounts}
                  style={{
                    marginTop: '15px',
                    padding: '8px 16px',
                    background: '#ffa41c',
                    color: '#0f1111',
                    border: '1px solid #ff8f00',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Refresh Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}