

// 'use client';

// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import './products-styles.css';
// import { categories, getProductsByCategory, getActualProductCount, clearProductCountCache, clearProductInfoCache } from '@/utils/productData';
// import Navbar from '@/components/Navbar';
// import { useSearchParams, useRouter } from 'next/navigation';

// // Create a debounce hook
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

// // Memoized StarIcon component
// const StarIcon = React.memo(({ filled }) => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// ));

// StarIcon.displayName = 'StarIcon';

// // Memoized ProductImage component with lazy loading
// const ProductImage = React.memo(({ images, alt, productNumber, priority = false }) => {
//   const [imgError, setImgError] = useState(false);
//   const [imgLoaded, setImgLoaded] = useState(true);

//   const imageSrc = images && images.length > 0 ? images[0] : null;

//   useEffect(() => {
//     setImgLoaded(false);
//     setImgError(false);
//   }, [imageSrc]);

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
//         style={{ 
//           objectFit: 'cover',
//           opacity: imgLoaded ? 1 : 0,
//           transition: 'opacity 0.3s ease'
//         }}
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         loading={priority ? "eager" : "lazy"}
//         onError={() => setImgError(true)}
//         onLoad={() => setImgLoaded(true)}
//         priority={priority}
//       />
//     </div>
//   );
// });

// ProductImage.displayName = 'ProductImage';

// // Memoized Product Card Component
// const ProductCard = React.memo(({ product, activeCategory, currentPage }) => {
//   const renderStars = useCallback((rating) => {
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
//   }, []);

//   const whatsappMessage = useMemo(() => 
//     `Hello, I want to buy: ${encodeURIComponent(product.name)}%0A%0AWood Type: ${encodeURIComponent(product.woodtype)}%0ASize: ${encodeURIComponent(product.size)}%0APrice: ${encodeURIComponent(product.price)}%0A${product.description ? `Description: ${encodeURIComponent(product.description)}%0A` : ''}%0APlease provide more details.`,
//     [product]
//   );

//   return (
//     <Link 
//       href={`/products/${activeCategory}/product${product.productNumber}?pageNumber=${currentPage}`}
//       style={{ 
//         textDecoration: 'none', 
//         color: 'inherit',
//         display: 'block'
//       }}
//       prefetch={false}
//     >
//       <div className="wood-product-card">
//         <div className="wood-product-image" style={{ position: 'relative' }}>
//           <ProductImage 
//             images={product.images} 
//             alt={product.name}
//             productNumber={product.productNumber}
//             priority={false}
//           />
//           {renderStars(parseFloat(product.rating))}
//         </div>

//         <div className="wood-product-info">
//           <h3 className="wood-product-title">{product.name}</h3>

//           <div className='wood-product-dimention' style={{ margin: '0', fontSize: '13px', color: '#565959' }}>
//             <div style={{ marginBottom: '2px' }}>
//               <span style={{ fontWeight: '500' }}>Wood:</span> {product.woodtype}
//             </div>
//             <div style={{ marginBottom: '2px' }}>
//               <span style={{ fontWeight: '500' }}>Size:</span> {product.size}
//             </div>
//             {product.sales > 0 && (
//               <div style={{ 
//                 marginTop: '3px', 
//                 fontSize: '12px', 
//                 color: '#ffa41c',
//                 fontWeight: '500',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '4px'
//               }}>
//               {product.sales}+ Sold
//               </div>
//             )}
//           </div>

//           <div className="wood-price-section">
//             <div className="wood-product-price">
//               <span className="wood-price-superscript">₹</span>
//               {product.price.toString().replace('₹', '')}
//             </div>

//             {product.description && product.description.trim() !== '' && (
//               <div style={{ 
//                 fontSize: '12px', 
//                 color: '#565959', 
//                 margin: '4px 0',
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
//               href={`https://wa.me/919876543210?text=${whatsappMessage}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="wood-buy-button"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <span>Buy Now</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// });

// ProductCard.displayName = 'ProductCard';

// // Loading Skeleton Component
// const ProductSkeleton = React.memo(() => (
//   <div className="wood-product-card">
//     <div className="wood-product-image wood-loading-image">
//       <div className="wood-image-placeholder">
//         <div className="wood-icon">⏳</div>
//         <p className="wood-image-text">Loading...</p>
//       </div>
//     </div>
//     <div className="wood-product-info">
//       <div className="wood-loading-line" style={{ height: '16px', marginBottom: '8px' }}></div>
//       <div className="wood-loading-line short" style={{ height: '14px', width: '70%' }}></div>
//     </div>
//   </div>
// ));

// ProductSkeleton.displayName = 'ProductSkeleton';

// // Main Products Page Component
// export default function ProductsPage() {
//   const searchParams = useSearchParams()
//   const URLParams = new URLSearchParams(searchParams)
//   const category = URLParams.get('category');
//   const router = useRouter()

//   // States
//   const [activeCategory, setActiveCategory] = useState(URLParams.get('category'));
//   const [currentPage, setCurrentPage] = useState(Number(URLParams.get('pageNumber')) || 1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true); // Keep true initially
//   const [categoryCounts, setCategoryCounts] = useState({});
//   const [countsLoading, setCountsLoading] = useState(true); // Keep true initially

//   // Cache states
//   const [productsCache, setProductsCache] = useState({});
//   const [hoveredCategory, setHoveredCategory] = useState(null);
//   const [initialLoadComplete, setInitialLoadComplete] = useState(false);

//   // Refs
//   const loadingRef = useRef(false);
//   const abortControllerRef = useRef(null);

//   // Constants
//   const productsPerPage = 12;
//   const debouncedHoveredCategory = useDebounce(hoveredCategory, 200);

//   // Calculate pagination with useMemo
//   const { indexOfLastProduct, indexOfFirstProduct, currentProducts, totalPages } = useMemo(() => {
//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//     const totalPages = Math.ceil(products.length / productsPerPage);

//     return { indexOfLastProduct, indexOfFirstProduct, currentProducts, totalPages };
//   }, [products, currentPage, productsPerPage]);

//   // Load all category counts in parallel
//   const loadAllCategoryCounts = useCallback(async () => {
//     try {
//       // Create promises for all categories
//       const countPromises = categories.map(async (category) => {
//         try {
//           const count = await getActualProductCount(category.name);
//           return { category: category.name, count };
//         } catch (error) {
//           console.error(`Error loading count for ${category.name}:`, error);
//           return { category: category.name, count: 0 };
//         }
//       });

//       // Execute all promises in parallel
//       const results = await Promise.allSettled(countPromises);

//       const counts = {};
//       results.forEach(result => {
//         if (result.status === 'fulfilled' && result.value) {
//           const { category, count } = result.value;
//           counts[category] = count;
//         }
//       });

//       setCategoryCounts(counts);
//     } catch (error) {
//       console.error('Error loading category counts:', error);
//     } finally {
//       setCountsLoading(false);
//     }
//   }, []);

//   // Prefetch category products
//   const prefetchCategoryProducts = useCallback(async (categoryName) => {
//     if (productsCache[categoryName] || loadingRef.current || categoryName === activeCategory) {
//       return;
//     }

//     try {
//       const loadedProducts = await getProductsByCategory(categoryName);

//       setProductsCache(prev => ({
//         ...prev,
//         [categoryName]: loadedProducts
//       }));
//     } catch (error) {
//       console.error(`Prefetch error for ${categoryName}:`, error);
//     }
//   }, [productsCache, activeCategory]);

//   // Handle category change
//   const handleCategoryChange = useCallback(async (categoryName) => {
//     if (categoryName === activeCategory || loadingRef.current) return;

//     // Reset loading states
//     loadingRef.current = true;
//     setLoading(true);

//     // Cancel any ongoing requests
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }

//     // Create new abort controller
//     abortControllerRef.current = new AbortController();

//     // Update UI immediately
//     setActiveCategory(categoryName);
//     setCurrentPage(1);

//     // Check cache first
//     if (productsCache[categoryName]) {
//       setProducts(productsCache[categoryName]);
//       setLoading(false);
//       loadingRef.current = false;
//       return;
//     }

//     try {
//       const loadedProducts = await getProductsByCategory(categoryName);

//       if (abortControllerRef.current.signal.aborted) {
//         return;
//       }

//       // Update cache and state
//       setProductsCache(prev => ({
//         ...prev,
//         [categoryName]: loadedProducts
//       }));

//       setProducts(loadedProducts);

//     } catch (error) {
//       if (error.name !== 'AbortError') {
//         console.error('Error loading products:', error);
//         setProducts([]);
//       }
//     } finally {
//       if (!abortControllerRef.current?.signal.aborted) {
//         setLoading(false);
//       }
//       loadingRef.current = false;
//     }
//   }, [activeCategory, productsCache]);

//   // Handle prefetch on hover
//   useEffect(() => {
//     if (debouncedHoveredCategory && 
//         debouncedHoveredCategory !== activeCategory && 
//         !productsCache[debouncedHoveredCategory]) {
//       prefetchCategoryProducts(debouncedHoveredCategory);
//     }
//   }, [debouncedHoveredCategory, activeCategory, productsCache, prefetchCategoryProducts]);

//   // Initial load
//   useEffect(() => {
//     const initialLoad = async () => {
//       loadingRef.current = true;
//       setLoading(true);
//       setCountsLoading(true);

//       try {
//         // Load counts and initial products in parallel
//         await Promise.allSettled([
//           loadAllCategoryCounts(),
//           (async () => {
//             try {
//               const initialProducts = await getProductsByCategory(activeCategory);
//               setProducts(initialProducts);
//               setProductsCache(prev => ({ 
//                 ...prev, 
//                 [activeCategory]: initialProducts 
//               }));
//             } catch (error) {
//               console.error('Error loading initial products:', error);
//               setProducts([]);
//             }
//           })()
//         ]);
//       } catch (error) {
//         console.error('Initial load error:', error);
//       } finally {
//         setLoading(false);
//         setCountsLoading(false);
//         setInitialLoadComplete(true);
//         loadingRef.current = false;
//       }
//     };

//     initialLoad();

//     // Cleanup function
//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//       loadingRef.current = false;
//     };
//   }, [activeCategory, loadAllCategoryCounts]);

//   // Handle page change
//   const handlePageChange = useCallback((pageNumber) => {
//     setCurrentPage(pageNumber);
//     requestAnimationFrame(() => {
//       window.scrollTo({ top: 380, behavior: 'smooth' });
//     });
//   }, []);

//   // Refresh counts function
//   const handleRefreshCounts = useCallback(async () => {
//     if (loadingRef.current) return;

//     loadingRef.current = true;

//     // Clear caches
//     clearProductCountCache();
//     clearProductInfoCache();
//     setProductsCache({});
//     setCategoryCounts({});

//     // Reload counts and products in parallel
//     setLoading(true);
//     setCountsLoading(true);

//     try {
//       await Promise.allSettled([
//         loadAllCategoryCounts(),
//         (async () => {
//           const loadedProducts = await getProductsByCategory(activeCategory);
//           setProducts(loadedProducts);
//           setProductsCache(prev => ({ 
//             ...prev, 
//             [activeCategory]: loadedProducts 
//           }));
//         })()
//       ]);
//     } catch (error) {
//       console.error('Error refreshing data:', error);
//     } finally {
//       setLoading(false);
//       setCountsLoading(false);
//       loadingRef.current = false;
//     }
//   }, [activeCategory, loadAllCategoryCounts]);

//   // Render pagination buttons
//   const renderPaginationButtons = useMemo(() => {
//     if (totalPages <= 1) return null;

//     const buttons = [];
//     const maxButtons = 5;

//     let startPage = 1;
//     let endPage = totalPages;

//     if (totalPages > maxButtons) {
//       if (currentPage <= 3) {
//         endPage = maxButtons;
//       } else if (currentPage >= totalPages - 2) {
//         startPage = totalPages - 4;
//       } else {
//         startPage = currentPage - 2;
//         endPage = currentPage + 2;
//       }
//     }

//     for (let i = startPage; i <= Math.min(endPage, totalPages); i++) {
//       buttons.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`wood-page-number ${currentPage === i ? 'active' : ''}`}
//           aria-label={`Go to page ${i}`}
//         >
//           {i}
//         </button>
//       );
//     }

//     return buttons;
//   }, [currentPage, totalPages, handlePageChange]);

//   // Memoize active category data
//   const activeCategoryData = useMemo(() => 
//     categories.find(cat => cat.name === activeCategory),
//     [activeCategory]
//   );

//   // Memoize category buttons
//   const categoryButtons = useMemo(() => 
//     categories.map((category) => (
//       <button
//         key={category.id}
//         onClick={() => {
//           URLParams.set("category", category.name);
//           router.push(`?${URLParams.toString()}`);
//         }}
//         onMouseEnter={() => setHoveredCategory(category.name)}
//         onMouseLeave={() => setHoveredCategory(null)}
//         onFocus={() => setHoveredCategory(category.name)}
//         onBlur={() => setHoveredCategory(null)}
//         className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
//         disabled={loading}
//         aria-label={`View ${category.displayName} products`}
//         aria-disabled={loading}
//       >
//         <span>{category.displayName}</span>
//         <span className="wood-category-count">
//           {countsLoading ? (
//             <span style={{ fontSize: '10px' }}>...</span>
//           ) : (
//             categoryCounts[category.name] || 0
//           )}
//         </span>
//       </button>
//     )),
//     [categories, activeCategory, countsLoading, categoryCounts, loading, handleCategoryChange]
//   );

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(()=>{
//     handleCategoryChange(category)
//     prefetchCategoryProducts(category)
//   }, [category])

//   // Show loading until initial load is complete
//   if (loading && !initialLoadComplete) {
//     return (
//       <>
//         <Navbar />
//         <div className="wood-products-page">
//           <div className="wood-hero-section">
//             <div className="wood-container">
//               <h1 className="wood-hero-title"></h1>
//               <p className="wood-hero-subtitle"></p>
//             </div>
//           </div>

//           <div className="wood-container wood-main-container">
//             <div className="wood-layout-wrapper">
//               {/* Sidebar Loading */}
//               <div className="wood-sidebar">
//                 <div className="wood-sidebar-card">
//                   <h2 className="wood-sidebar-title">All Categories</h2>
//                   <div className="wood-categories-list">
//                     {categories.map((_, i) => (
//                       <div key={i} className="wood-category-btn" style={{ cursor: 'default' }}>
//                         <div style={{ width: '120px', height: '16px', background: '#f0f0f0', borderRadius: '4px' }}></div>
//                         <span className="wood-category-count" style={{ background: '#f0f0f0', color: 'transparent' }}>0</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Main Content Loading */}
//               <div className="wood-main-content-area">
//                 <div className="wood-category-header">
//                   <div className="wood-header-content">
//                     <div>
//                       <div style={{ width: '200px', height: '24px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }}></div>
//                       <div style={{ width: '150px', height: '14px', background: '#f0f0f0', borderRadius: '4px' }}></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Products Grid Loading */}
//                 <div className="wood-products-grid">
//                   {Array.from({ length: 12 }).map((_, i) => (
//                     <ProductSkeleton key={i} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="wood-products-page">
//         {/* Hero Banner */}
//         <div className="wood-hero-section">
//           <div className="wood-container">
//             <h1 className="wood-hero-title"></h1>
//             <p className="wood-hero-subtitle"></p>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="wood-container wood-main-container">
//           <div className="wood-layout-wrapper">
//             {/* Sidebar */}
//             <div className="wood-sidebar desktop-only">
//               <div className="wood-sidebar-card">
//                 <h2 className="wood-sidebar-title">All Categories</h2>
//                 <div className="wood-categories-list">
//                   {categoryButtons}
//                 </div>




//               </div>
//             </div>

//             <div className="mobile-nav-btn">
//               <button
//                 className="mobile-nav-fab"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 aria-label="Open navigation"
//               >
//                 {isMobileMenuOpen ? '✕' : '☰'}
//               </button>

//               <nav className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
//                 {categoryButtons}
//               </nav>
//             </div>

//             <div className="wood-main-content-area">
//               <div className="wood-category-header">
//                 <div className="wood-header-content">
//                   <div>
//                     <h2 className="wood-category-title">{activeCategoryData?.displayName}</h2>
//                     <p className="wood-product-count">
//                       {products.length} products • Page {currentPage} of {totalPages}
//                       {countsLoading && ' (Loading counts...)'}
//                     </p>
//                   </div>
//                   <div className="wood-page-indicator">
//                     <span>Showing:</span>
//                     <span className="wood-current-page">
//                       {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {loading ? (
//                 <div className="wood-products-grid">
//                   {Array.from({ length: Math.min(12, categoryCounts[activeCategory] || 12) }).map((_, i) => (
//                     <ProductSkeleton key={i} />
//                   ))}
//                 </div>
//               ) : products.length > 0 ? (
//                 <>
//                   <div className="wood-products-grid" role="list" aria-label="Products list">
//                     {currentProducts.map((product) => (
//                       <ProductCard
//                         key={`${activeCategory}-${product.id}`}
//                         product={product}
//                         activeCategory={activeCategory}
//                         currentPage={currentPage}
//                       />
//                     ))}
//                   </div>

//                   {totalPages > 1 && (
//                     <div className="wood-pagination" role="navigation" aria-label="Product pagination">
//                       <button
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="wood-pagination-btn wood-prev-btn"
//                         aria-label="Previous page"
//                       >
//                         <span>‹</span> Previous
//                       </button>

//                       {renderPaginationButtons}

//                       <button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="wood-pagination-btn wood-next-btn"
//                         aria-label="Next page"
//                       >
//                         Next <span>›</span>
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : initialLoadComplete && products.length === 0 ? (
//                 <div className="wood-empty-state" role="alert">
//                   <div className="wood-empty-icon">🚪</div>
//                   <h3>No products available</h3>
//                   <p>
//                     {categoryCounts[activeCategory] === 0 
//                       ? `No product folders found in ${activeCategoryData?.displayName} category.` 
//                       : 'Check if info.json files exist in product folders'}
//                   </p>
//                   <button
//                     onClick={handleRefreshCounts}
//                     disabled={loading || countsLoading}
//                     style={{
//                       marginTop: '15px',
//                       padding: '8px 16px',
//                       background: '#ffa41c',
//                       color: '#0f1111',
//                       border: '1px solid #ff8f00',
//                       borderRadius: '4px',
//                       cursor: loading || countsLoading ? 'not-allowed' : 'pointer',
//                       fontWeight: '500',
//                       opacity: loading || countsLoading ? 0.6 : 1
//                     }}
//                   >
//                     Refresh Data
//                   </button>
//                 </div>
//               ) : null}
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './products-styles.css';
import { categories, getProductsByCategory, getActualProductCount, clearProductCountCache, clearProductInfoCache } from '@/utils/productData';
import Navbar from '@/components/Navbar';
import { useSearchParams, useRouter } from 'next/navigation';

// Create a debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Memoized StarIcon component
const StarIcon = React.memo(({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
));

StarIcon.displayName = 'StarIcon';

// Memoized ProductImage component with lazy loading
const ProductImage = React.memo(({ images, alt, productNumber, priority = false }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(true);

  const imageSrc = images && images.length > 0 ? images[0] : null;

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [imageSrc]);

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
        style={{
          objectFit: 'contain',
          transition: 'opacity 0.3s ease'
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading={priority ? "eager" : "lazy"}
        onError={() => setImgError(true)}
        onLoad={() => setImgLoaded(true)}
        priority={priority}
      />
    </div>
  );
});

ProductImage.displayName = 'ProductImage';

// Memoized Rating Display Component (Always visible on desktop)
const RatingDisplay = React.memo(({ rating, sales }) => {
  const renderStars = useCallback((rating) => {
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

    return stars;
  }, []);

  return (
    <div className="desktop-rating">
      <div className="wood-rating-stars">{renderStars(parseFloat(rating))}</div>
      <span style={{ marginLeft: '6px' }}>{rating}</span>
      {sales > 0 && (
        <span className="sales-count">{sales}+ sold</span>
      )}
    </div>
  );
});

RatingDisplay.displayName = 'RatingDisplay';

// Product Image Hover Overlay Component (Desktop only)
const ProductHoverOverlay = React.memo(({ product, activeCategory, currentPage }) => {
  const whatsappMessage = useMemo(() =>
    `Hello, I want to buy: ${encodeURIComponent(product.name)}%0A%0AWood Type: ${encodeURIComponent(product.woodtype)}%0ASize: ${encodeURIComponent(product.size)}%0APrice: ${encodeURIComponent(product.price)}%0A${product.description ? `Description: ${encodeURIComponent(product.description)}%0A` : ''}%0APlease provide more details.`,
    [product]
  );

  return (
    <div className="product-hover-overlay">
      {/* Top Section - Name & Specs */}
      <div className="overlay-top">
        <h4 className="overlay-title">{product.name}</h4>
        <div className="overlay-specs">
          <div className="overlay-spec-item">
            <strong>Wood:</strong> {product.woodtype}
          </div>
          <div className="overlay-spec-item">
            <strong>Size:</strong> {product.size}
          </div>
        </div>
      </div>

      {/* Bottom Section - Price & Actions */}
      <div className="overlay-bottom">
        <div className="overlay-price-section">
          <div className="overlay-price">
            <span className="price-symbol">₹</span>
            {product.price.toString().replace('₹', '')}
          </div>
        </div>
        <div className="overlay-actions">
          <Link
            href={`/products/${activeCategory}/product${product.productNumber}?pageNumber=${currentPage}`}
            className="overlay-view-btn"
            prefetch={false}
          >
            View
          </Link>
          <a
            href={`https://wa.me/919876543210?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="overlay-whatsapp-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Buy
          </a>
        </div>
      </div>
    </div>
  );
});

ProductHoverOverlay.displayName = 'ProductHoverOverlay';

// Memoized Product Card Component
const ProductCard = React.memo(({ product, activeCategory, currentPage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappMessage = useMemo(() =>
    `Hello, I want to buy: ${encodeURIComponent(product.name)}%0A%0AWood Type: ${encodeURIComponent(product.woodtype)}%0ASize: ${encodeURIComponent(product.size)}%0APrice: ${encodeURIComponent(product.price)}%0A${product.description ? `Description: ${encodeURIComponent(product.description)}%0A` : ''}%0APlease provide more details.`,
    [product]
  );

  return (
    <Link
      href={`/products/${activeCategory}/product${product.productNumber}?pageNumber=${currentPage}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block'
      }}
      prefetch={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="wood-product-card">
        <div className="wood-product-image" style={{ position: 'relative' }}>
          <ProductImage
            images={product.images}
            alt={product.name}
            productNumber={product.productNumber}
            priority={false}
          />

          {/* Rating - Always visible on desktop */}
          <RatingDisplay rating={parseFloat(product.rating)} sales={product.sales} />

          {/* Desktop Hover Overlay */}
          <ProductHoverOverlay
            product={product}
            activeCategory={activeCategory}
            currentPage={currentPage}
          />
        </div>

        {/* Desktop: Hide this section, Mobile: Show this section */}
        <div className="wood-product-info desktop-hide">
          <h3 className="wood-product-title">{product.name}</h3>

          <div className='wood-product-dimention' style={{ margin: '0', fontSize: '13px', color: '#565959' }}>
            <div style={{ marginBottom: '2px' }}>
              <span style={{ fontWeight: '500' }}>Wood:</span> {product.woodtype}
            </div>
            <div style={{ marginBottom: '2px' }}>
              <span style={{ fontWeight: '500' }}>Size:</span> {product.size}
            </div>
          </div>

          <div className="wood-price-section">
            <div className="wood-product-price">
              <span className="wood-price-superscript">₹</span>
              {product.price.toString().replace('₹', '')}
            </div>

            {product.description && product.description.trim() !== '' && (
              <div style={{
                fontSize: '12px',
                color: '#565959',
                margin: '4px 0',
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
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wood-buy-button"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Buy Now</span>
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

// Loading Skeleton Component
const ProductSkeleton = React.memo(() => (
  <div className="wood-product-card">
    <div className="wood-product-image wood-loading-image">
      <div className="wood-image-placeholder">
        <div className="wood-icon">⏳</div>
        <p className="wood-image-text">Loading...</p>
      </div>
    </div>
    <div className="wood-product-info">
      <div className="wood-loading-line" style={{ height: '16px', marginBottom: '8px' }}></div>
      <div className="wood-loading-line short" style={{ height: '14px', width: '70%' }}></div>
    </div>
  </div>
));

ProductSkeleton.displayName = 'ProductSkeleton';

// Main Products Page Component
export default function ProductsPage() {
  const searchParams = useSearchParams()
  const URLParams = new URLSearchParams(searchParams)
  const category = URLParams.get('category');
  const router = useRouter()

  // States
  const [activeCategory, setActiveCategory] = useState(URLParams.get('category'));
  const [currentPage, setCurrentPage] = useState(Number(URLParams.get('pageNumber')) || 1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [countsLoading, setCountsLoading] = useState(true);

  // Cache states
  const [productsCache, setProductsCache] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Refs
  const loadingRef = useRef(false);
  const abortControllerRef = useRef(null);

  // Constants
  const productsPerPage = 12;
  const debouncedHoveredCategory = useDebounce(hoveredCategory, 200);

  // Calculate pagination with useMemo
  const { indexOfLastProduct, indexOfFirstProduct, currentProducts, totalPages } = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return { indexOfLastProduct, indexOfFirstProduct, currentProducts, totalPages };
  }, [products, currentPage, productsPerPage]);

  // Load all category counts in parallel
  const loadAllCategoryCounts = useCallback(async () => {
    try {
      const countPromises = categories.map(async (category) => {
        try {
          const count = await getActualProductCount(category.name);
          return { category: category.name, count };
        } catch (error) {
          console.error(`Error loading count for ${category.name}:`, error);
          return { category: category.name, count: 0 };
        }
      });

      const results = await Promise.allSettled(countPromises);

      const counts = {};
      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value) {
          const { category, count } = result.value;
          counts[category] = count;
        }
      });

      setCategoryCounts(counts);
    } catch (error) {
      console.error('Error loading category counts:', error);
    } finally {
      setCountsLoading(false);
    }
  }, []);

  // Prefetch category products
  const prefetchCategoryProducts = useCallback(async (categoryName) => {
    if (productsCache[categoryName] || loadingRef.current || categoryName === activeCategory) {
      return;
    }

    try {
      const loadedProducts = await getProductsByCategory(categoryName);

      setProductsCache(prev => ({
        ...prev,
        [categoryName]: loadedProducts
      }));
    } catch (error) {
      console.error(`Prefetch error for ${categoryName}:`, error);
    }
  }, [productsCache, activeCategory]);

  // Handle category change
  const handleCategoryChange = useCallback(async (categoryName) => {
    if (categoryName === activeCategory || loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setActiveCategory(categoryName);
    setCurrentPage(1);

    if (productsCache[categoryName]) {
      setProducts(productsCache[categoryName]);
      setLoading(false);
      loadingRef.current = false;
      return;
    }

    try {
      const loadedProducts = await getProductsByCategory(categoryName);

      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      setProductsCache(prev => ({
        ...prev,
        [categoryName]: loadedProducts
      }));

      setProducts(loadedProducts);

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error loading products:', error);
        setProducts([]);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
      loadingRef.current = false;
    }
  }, [activeCategory, productsCache]);

  // Handle prefetch on hover
  useEffect(() => {
    if (debouncedHoveredCategory &&
      debouncedHoveredCategory !== activeCategory &&
      !productsCache[debouncedHoveredCategory]) {
      prefetchCategoryProducts(debouncedHoveredCategory);
    }
  }, [debouncedHoveredCategory, activeCategory, productsCache, prefetchCategoryProducts]);

  // Initial load
  useEffect(() => {
    const initialLoad = async () => {
      loadingRef.current = true;
      setLoading(true);
      setCountsLoading(true);

      try {
        await Promise.allSettled([
          loadAllCategoryCounts(),
          (async () => {
            try {
              const initialProducts = await getProductsByCategory(activeCategory);
              setProducts(initialProducts);
              setProductsCache(prev => ({
                ...prev,
                [activeCategory]: initialProducts
              }));
            } catch (error) {
              console.error('Error loading initial products:', error);
              setProducts([]);
            }
          })()
        ]);
      } catch (error) {
        console.error('Initial load error:', error);
      } finally {
        setLoading(false);
        setCountsLoading(false);
        setInitialLoadComplete(true);
        loadingRef.current = false;
      }
    };

    initialLoad();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      loadingRef.current = false;
    };
  }, [activeCategory, loadAllCategoryCounts]);

  // Handle page change
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    });
  }, []);

  // Refresh counts function
  const handleRefreshCounts = useCallback(async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;

    clearProductCountCache();
    clearProductInfoCache();
    setProductsCache({});
    setCategoryCounts({});

    setLoading(true);
    setCountsLoading(true);

    try {
      await Promise.allSettled([
        loadAllCategoryCounts(),
        (async () => {
          const loadedProducts = await getProductsByCategory(activeCategory);
          setProducts(loadedProducts);
          setProductsCache(prev => ({
            ...prev,
            [activeCategory]: loadedProducts
          }));
        })()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
      setCountsLoading(false);
      loadingRef.current = false;
    }
  }, [activeCategory, loadAllCategoryCounts]);

  // Render pagination buttons
  const renderPaginationButtons = useMemo(() => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxButtons = 5;

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxButtons) {
      if (currentPage <= 3) {
        endPage = maxButtons;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= Math.min(endPage, totalPages); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`wood-page-number ${currentPage === i ? 'active' : ''}`}
          aria-label={`Go to page ${i}`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  }, [currentPage, totalPages, handlePageChange]);

  // Memoize active category data
  const activeCategoryData = useMemo(() =>
    categories.find(cat => cat.name === activeCategory),
    [activeCategory]
  );

  // Memoize category buttons
  const categoryButtons = useMemo(() =>
    categories.map((category) => (
      <button
        key={category.id}
        onClick={() => {
          URLParams.set("category", category.name);
          router.push(`?${URLParams.toString()}`);

          // Close mobile menu after selecting a category
          setIsMobileMenuOpen(false);
        }}
        onMouseEnter={() => setHoveredCategory(category.name)}
        onMouseLeave={() => setHoveredCategory(null)}
        onFocus={() => setHoveredCategory(category.name)}
        onBlur={() => setHoveredCategory(null)}
        className={`wood-category-btn ${activeCategory === category.name ? 'active' : ''}`}
        disabled={loading}
        aria-label={`View ${category.displayName} products`}
        aria-disabled={loading}
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
    )),
    [categories, activeCategory, countsLoading, categoryCounts, loading, router]
  );


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    // Always enable scroll when page loads
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);


  useEffect(() => {
    handleCategoryChange(category)
    prefetchCategoryProducts(category)
  }, [category])

  // Show loading until initial load is complete
  if (loading && !initialLoadComplete) {
    return (
      <>
        <Navbar />
        <div className="wood-products-page">
          <div className="wood-hero-section">
            <div className="wood-container">
              <h1 className="wood-hero-title"></h1>
              <p className="wood-hero-subtitle"></p>
            </div>
          </div>

          <div className="wood-container wood-main-container">
            <div className="wood-layout-wrapper">
              <div className="wood-sidebar">
                <div className="wood-sidebar-card">
                  <h2 className="wood-sidebar-title">All Categories</h2>
                  <div className="wood-categories-list">
                    {categories.map((_, i) => (
                      <div key={i} className="wood-category-btn" style={{ cursor: 'default' }}>
                        <div style={{ width: '120px', height: '16px', background: '#f0f0f0', borderRadius: '4px' }}></div>
                        <span className="wood-category-count" style={{ background: '#f0f0f0', color: 'transparent' }}>0</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="wood-main-content-area">
                <div className="wood-category-header">
                  <div className="wood-header-content">
                    <div>
                      <div style={{ width: '200px', height: '24px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                      <div style={{ width: '150px', height: '14px', background: '#f0f0f0', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                </div>

                <div className="wood-products-grid">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="wood-products-page">
        <div className="wood-hero-section">
          <div className="wood-container">
            <h1 className="wood-hero-title"></h1>
            <p className="wood-hero-subtitle"></p>
          </div>
        </div>

        <div className="wood-container wood-main-container">
          <div className="wood-layout-wrapper">
            <div className="wood-sidebar desktop-only">
              <div className="wood-sidebar-card">
                <h2 className="wood-sidebar-title">All Categories</h2>
                <div className="wood-categories-list">
                  {categoryButtons}
                </div>
              </div>
            </div>

            <div className="mobile-nav-btn">
              <button
                className="mobile-nav-fab"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open navigation"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>

              <nav className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                {categoryButtons}
              </nav>
            </div>

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

              {loading ? (
                <div className="wood-products-grid">
                  {Array.from({ length: Math.min(12, categoryCounts[activeCategory] || 12) }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="wood-products-grid" role="list" aria-label="Products list">
                    {currentProducts.map((product) => (
                      <ProductCard
                        key={`${activeCategory}-${product.id}`}
                        product={product}
                        activeCategory={activeCategory}
                        currentPage={currentPage}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="wood-pagination" role="navigation" aria-label="Product pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="wood-pagination-btn wood-prev-btn"
                        aria-label="Previous page"
                      >
                        <span>‹</span> Previous
                      </button>

                      {renderPaginationButtons}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="wood-pagination-btn wood-next-btn"
                        aria-label="Next page"
                      >
                        Next <span>›</span>
                      </button>
                    </div>
                  )}
                </>
              ) : initialLoadComplete && products.length === 0 ? (
                <div className="wood-empty-state" role="alert">
                  <div className="wood-empty-icon">🚪</div>
                  <h3>No products available</h3>
                  <p>
                    {categoryCounts[activeCategory] === 0
                      ? `No product folders found in ${activeCategoryData?.displayName} category.`
                      : 'Check if info.json files exist in product folders'}
                  </p>
                  <button
                    onClick={handleRefreshCounts}
                    disabled={loading || countsLoading}
                    style={{
                      marginTop: '15px',
                      padding: '8px 16px',
                      background: '#ffa41c',
                      color: '#0f1111',
                      border: '1px solid #ff8f00',
                      borderRadius: '4px',
                      cursor: loading || countsLoading ? 'not-allowed' : 'pointer',
                      fontWeight: '500',
                      opacity: loading || countsLoading ? 0.6 : 1
                    }}
                  >
                    Refresh Data
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}