// // app/products/[category]/[productId]/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import '@/products-styles.css';
// import { categories } from '@/utils/productData';

// const StarIcon = ({ filled }) => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // Function to fetch product data
// const fetchProductData = async (categoryName, productNumber) => {
//   const categoryFolders = {
//     woodenDoor: '1_woodenDoor',
//     woodenFrame: '2_WoodenFream',
//     safetyDoors: '3_safetyDoors',
//     woodenBed: '4_woodenBed',
//     woodenMandir: '5_woodenMandir',
//     woodenWindow: '6_woodenWindow',
//     woodenArt: '7_woodenArt',
//     sofaChair: '8_sofaChair'
//   };
  
//   const folderName = categoryFolders[categoryName];
//   if (!folderName) return null;
  
//   const infoUrl = `/images/category/${folderName}/product${productNumber}/info.json`;
//   const basePath = `/images/category/${folderName}/product${productNumber}/`;
  
//   try {
//     // Fetch product info
//     const infoResponse = await fetch(infoUrl);
//     if (!infoResponse.ok) {
//       throw new Error('Product info not found');
//     }
//     const infoData = await infoResponse.json();
    
//     // Get all available images (1.webp to 4.webp)
//     const images = [];
//     for (let i = 1; i <= 4; i++) {
//       const imageUrl = `${basePath}${i}.webp`;
//       try {
//         const imgResponse = await fetch(imageUrl, { method: 'HEAD' });
//         if (imgResponse.ok) {
//           images.push(imageUrl);
//         }
//       } catch {
//         // Skip if image doesn't exist
//       }
//     }
    
//     return {
//       ...infoData,
//       images,
//       categoryName,
//       productNumber,
//       folderName
//     };
//   } catch (error) {
//     console.error('Error fetching product data:', error);
//     return null;
//   }
// };

// export default function ProductDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { category, productId } = params;
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   // Extract product number from productId (format: product1, product2, etc.)
//   const productNumber = productId ? parseInt(productId.replace('product', '')) : null;

//   useEffect(() => {
//     const loadProductData = async () => {
//       if (!category || !productNumber) {
//         setError('Invalid product URL');
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       try {
//         const productData = await fetchProductData(category, productNumber);
        
//         if (!productData) {
//           setError('Product not found');
//           setProduct(null);
//         } else {
//           setProduct(productData);
//           setError(null);
//         }
//       } catch (err) {
//         console.error('Error loading product:', err);
//         setError('Failed to load product data');
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductData();
//   }, [category, productNumber]);

//   // Handle image navigation
//   const nextImage = () => {
//     if (product && product.images.length > 0) {
//       setActiveImageIndex((prev) => (prev + 1) % product.images.length);
//     }
//   };

//   const prevImage = () => {
//     if (product && product.images.length > 0) {
//       setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
//     }
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
//       <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//         {stars}
//         <span style={{ marginLeft: '8px', fontSize: '16px', fontWeight: '600' }}>{rating}</span>
//       </div>
//     );
//   };

//   // WhatsApp messages
//   const getWhatsAppBuyMessage = () => {
//     if (!product) return '';
//     return `Hello, I want to BUY this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A⭐ Rating: ${product.rating}%0A${product.desc ? `📝 Description: ${encodeURIComponent(product.desc)}%0A` : ''}%0A✅ I want to proceed with purchase.`;
//   };

//   const getWhatsAppEnquiryMessage = () => {
//     if (!product) return '';
//     return `Hello, I have an ENQUIRY about this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A%0A❓ My Question: [Please specify your question here]`;
//   };

//   if (loading) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '40px 20px', textAlign: 'center' }}>
//           <div className="wood-empty-icon">⏳</div>
//           <h3>Loading Product Details...</h3>
//           <p>Please wait while we fetch the product information</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '40px 20px' }}>
//           <div className="wood-empty-state">
//             <div className="wood-empty-icon">🚫</div>
//             <h3>Product Not Found</h3>
//             <p>{error || 'The requested product could not be loaded.'}</p>
//             <Link href="/products" style={{
//               marginTop: '15px',
//               padding: '10px 20px',
//               background: '#ffa41c',
//               color: '#0f1111',
//               textDecoration: 'none',
//               borderRadius: '4px',
//               display: 'inline-block',
//               fontWeight: '500'
//             }}>
//               ← Back to Products
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const categoryData = categories.find(cat => cat.name === category);

//   return (
//     <div className="wood-products-page">
//       {/* Breadcrumb Navigation */}
//       <div className="wood-container" style={{ padding: '20px 15px 0' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#565959' }}>
//           <Link href="/products" style={{ color: '#007185', textDecoration: 'none' }}>
//             Products
//           </Link>
//           <span>›</span>
//           <Link href={`/products`} style={{ color: '#007185', textDecoration: 'none' }}>
//             {categoryData?.displayName || category}
//           </Link>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '500' }}>{product.name}</span>
//         </div>
//       </div>

//       <div className="wood-container" style={{ padding: '20px 15px 40px' }}>
//         <div className="wood-layout-wrapper" style={{ gap: '40px' }}>
//           {/* Product Images Section */}
//           <div style={{ flex: '1', minWidth: '0' }}>
//             <div style={{ 
//               background: '#ffffff', 
//               border: '1px solid #e7e7e7', 
//               borderRadius: '8px',
//               padding: '20px',
//               marginBottom: '20px'
//             }}>
//               {/* Main Image */}
//               <div style={{ 
//                 position: 'relative', 
//                 height: '500px',
//                 marginBottom: '20px',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//                 background: '#f8f8f8'
//               }}>
//                 {product.images.length > 0 ? (
//                   <>
//                     <Image
//                       src={product.images[activeImageIndex]}
//                       alt={`${product.name} - View ${activeImageIndex + 1}`}
//                       fill
//                       style={{ objectFit: 'contain' }}
//                       sizes="100vw"
//                     />
                    
//                     {/* Navigation Arrows */}
//                     {product.images.length > 1 && (
//                       <>
//                         <button
//                           onClick={prevImage}
//                           style={{
//                             position: 'absolute',
//                             left: '15px',
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             background: 'rgba(255, 255, 255, 0.9)',
//                             border: '1px solid #ddd',
//                             borderRadius: '50%',
//                             width: '40px',
//                             height: '40px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             fontSize: '20px'
//                           }}
//                         >
//                           ‹
//                         </button>
//                         <button
//                           onClick={nextImage}
//                           style={{
//                             position: 'absolute',
//                             right: '15px',
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             background: 'rgba(255, 255, 255, 0.9)',
//                             border: '1px solid #ddd',
//                             borderRadius: '50%',
//                             width: '40px',
//                             height: '40px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             fontSize: '20px'
//                           }}
//                         >
//                           ›
//                         </button>
//                       </>
//                     )}
                    
//                     {/* Image Counter */}
//                     <div style={{
//                       position: 'absolute',
//                       bottom: '15px',
//                       right: '15px',
//                       background: 'rgba(0, 0, 0, 0.7)',
//                       color: 'white',
//                       padding: '4px 10px',
//                       borderRadius: '12px',
//                       fontSize: '12px'
//                     }}>
//                       {activeImageIndex + 1} / {product.images.length}
//                     </div>
//                   </>
//                 ) : (
//                   <div style={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     justifyContent: 'center',
//                     height: '100%',
//                     color: '#565959'
//                   }}>
//                     <div className="wood-image-placeholder">
//                       <div className="wood-icon">🚪</div>
//                       <p className="wood-image-text">No Image Available</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnail Images */}
//               {product.images.length > 1 && (
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '10px', 
//                   justifyContent: 'center',
//                   flexWrap: 'wrap'
//                 }}>
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setActiveImageIndex(index)}
//                       style={{
//                         width: '80px',
//                         height: '80px',
//                         border: activeImageIndex === index ? '2px solid #ffa41c' : '1px solid #ddd',
//                         borderRadius: '4px',
//                         overflow: 'hidden',
//                         background: '#f8f8f8',
//                         cursor: 'pointer',
//                         padding: '0'
//                       }}
//                     >
//                       <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                         <Image
//                           src={image}
//                           alt={`View ${index + 1}`}
//                           fill
//                           style={{ objectFit: 'cover' }}
//                           sizes="80px"
//                         />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Info Section */}
//           <div style={{ flex: '1', minWidth: '0' }}>
//             <div style={{ 
//               background: '#ffffff', 
//               border: '1px solid #e7e7e7', 
//               borderRadius: '8px',
//               padding: '30px'
//             }}>
//               {/* Product Title and Rating */}
//               <div style={{ marginBottom: '20px' }}>
//                 <h1 style={{ 
//                   fontSize: '28px', 
//                   fontWeight: '500', 
//                   color: '#0f1111',
//                   marginBottom: '10px',
//                   lineHeight: '1.3'
//                 }}>
//                   {product.name}
//                 </h1>
                
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
//                   {renderStars(product.rating)}
//                   {product.sales > 0 && (
//                     <span style={{ 
//                       fontSize: '14px', 
//                       color: '#565959',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px'
//                     }}>
//                       <span style={{ color: '#ffa41c' }}>🔥</span> {product.sales}+ Sold
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Price Section */}
//               <div style={{ 
//                 padding: '20px', 
//                 background: '#fafafa', 
//                 borderRadius: '8px',
//                 marginBottom: '25px',
//                 border: '1px solid #e7e7e7'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '10px' }}>
//                   <span style={{ fontSize: '14px', color: '#565959', marginRight: '4px' }}>₹</span>
//                   <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f1111' }}>
//                     {product.price.toLocaleString()}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: '14px', color: '#565959' }}>
//                   Inclusive of all taxes
//                 </div>
//               </div>

//               {/* Product Specifications */}
//               <div style={{ marginBottom: '30px' }}>
//                 <h3 style={{ 
//                   fontSize: '18px', 
//                   fontWeight: '600', 
//                   color: '#0f1111',
//                   marginBottom: '15px',
//                   paddingBottom: '10px',
//                   borderBottom: '2px solid #ffa41c'
//                 }}>
//                   Product Specifications
//                 </h3>
                
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Wood Type</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.woodtype}</div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Size</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.size}</div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Category</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
//                       {categoryData?.displayName || category}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Product Code</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
//                       {category.toUpperCase()}-{productNumber}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               {product.desc && (
//                 <div style={{ marginBottom: '30px' }}>
//                   <h3 style={{ 
//                     fontSize: '18px', 
//                     fontWeight: '600', 
//                     color: '#0f1111',
//                     marginBottom: '15px',
//                     paddingBottom: '10px',
//                     borderBottom: '2px solid #ffa41c'
//                   }}>
//                     Description
//                   </h3>
//                   <div style={{ 
//                     fontSize: '15px', 
//                     color: '#0f1111', 
//                     lineHeight: '1.6',
//                     whiteSpace: 'pre-line'
//                   }}>
//                     {product.desc}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                 <a
//                   href={`https://wa.me/919876543210?text=${getWhatsAppBuyMessage()}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: '#25D366',
//                     color: 'white',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#128C7E';
//                     e.target.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = '#25D366';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <span>🛒</span> Buy Now on WhatsApp
//                 </a>
                
//                 <a
//                   href={`https://wa.me/919876543210?text=${getWhatsAppEnquiryMessage()}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: 'transparent',
//                     color: '#0f1111',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     border: '2px solid #ffa41c',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#fff8f6';
//                     e.target.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = 'transparent';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <span>💬</span> Enquire About This Product
//                 </a>
//               </div>

//               {/* Additional Info */}
//               <div style={{ 
//                 marginTop: '30px', 
//                 paddingTop: '20px', 
//                 borderTop: '1px solid #e7e7e7',
//                 fontSize: '13px',
//                 color: '#565959'
//               }}>
//                 <p style={{ marginBottom: '10px' }}>
//                   <strong>Note:</strong> All prices are inclusive of GST. Free installation support available.
//                 </p>
//                 <p>
//                   Need help? Our experts are available 10AM - 7PM to assist you.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Back Button */}
//         <div style={{ marginTop: '30px', textAlign: 'center' }}>
//           <button
//             onClick={() => router.back()}
//             style={{
//               background: '#f0f2f2',
//               color: '#0f1111',
//               padding: '10px 20px',
//               borderRadius: '4px',
//               border: '1px solid #d5d9d9',
//               fontSize: '14px',
//               cursor: 'pointer',
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}
//           >
//             ← Back to Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import '@/products-styles.css';
// import { categories } from '@/utils/productData';

// const StarIcon = ({ filled }) => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // Function to fetch product data
// const fetchProductData = async (categoryName, productNumber) => {
//   const categoryFolders = {
//     woodenDoor: '1_woodenDoor',
//     woodenFrame: '2_WoodenFream',
//     safetyDoors: '3_safetyDoors',
//     woodenBed: '4_woodenBed',
//     woodenMandir: '5_woodenMandir',
//     woodenWindow: '6_woodenWindow',
//     woodenArt: '7_woodenArt',
//     sofaChair: '8_sofaChair'
//   };
  
//   const folderName = categoryFolders[categoryName];
//   if (!folderName) return null;
  
//   const infoUrl = `/images/category/${folderName}/product${productNumber}/info.json`;
//   const basePath = `/images/category/${folderName}/product${productNumber}/`;
  
//   try {
//     // Fetch product info
//     const infoResponse = await fetch(infoUrl);
//     if (!infoResponse.ok) {
//       throw new Error('Product info not found');
//     }
//     const infoData = await infoResponse.json();
    
//     // Get all available images (1.webp to 4.webp)
//     const images = [];
//     for (let i = 1; i <= 4; i++) {
//       const imageUrl = `${basePath}${i}.webp`;
//       try {
//         const imgResponse = await fetch(imageUrl, { method: 'HEAD' });
//         if (imgResponse.ok) {
//           images.push(imageUrl);
//         }
//       } catch {
//         // Skip if image doesn't exist
//       }
//     }
    
//     return {
//       ...infoData,
//       images,
//       categoryName,
//       productNumber,
//       folderName
//     };
//   } catch (error) {
//     console.error('Error fetching product data:', error);
//     return null;
//   }
// };

// export default function ProductDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { category, productId } = params;
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   // Extract product number from productId (format: product1, product2, etc.)
//   const productNumber = productId ? parseInt(productId.replace('product', '')) : null;

//   useEffect(() => {
//     const loadProductData = async () => {
//       if (!category || !productNumber) {
//         setError('Invalid product URL');
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       try {
//         const productData = await fetchProductData(category, productNumber);
        
//         if (!productData) {
//           setError('Product not found');
//           setProduct(null);
//         } else {
//           setProduct(productData);
//           setError(null);
//         }
//       } catch (err) {
//         console.error('Error loading product:', err);
//         setError('Failed to load product data');
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductData();
//   }, [category, productNumber]);

//   // Handle image navigation
//   const nextImage = () => {
//     if (product && product.images.length > 0) {
//       setActiveImageIndex((prev) => (prev + 1) % product.images.length);
//     }
//   };

//   const prevImage = () => {
//     if (product && product.images.length > 0) {
//       setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
//     }
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
//       <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//         {stars}
//         <span style={{ marginLeft: '8px', fontSize: '16px', fontWeight: '600' }}>{rating}</span>
//       </div>
//     );
//   };

//   // WhatsApp messages
//   const getWhatsAppBuyMessage = () => {
//     if (!product) return '';
//     return `Hello, I want to BUY this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A⭐ Rating: ${product.rating}%0A${product.desc ? `📝 Description: ${encodeURIComponent(product.desc)}%0A` : ''}%0A✅ I want to proceed with purchase.`;
//   };

//   const getWhatsAppEnquiryMessage = () => {
//     if (!product) return '';
//     return `Hello, I have an ENQUIRY about this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A%0A❓ My Question: [Please specify your question here]`;
//   };

//   if (loading) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '40px 20px', textAlign: 'center' }}>
//           <div className="wood-empty-icon">⏳</div>
//           <h3>Loading Product Details...</h3>
//           <p>Please wait while we fetch the product information</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '40px 20px' }}>
//           <div className="wood-empty-state">
//             <div className="wood-empty-icon">🚫</div>
//             <h3>Product Not Found</h3>
//             <p>{error || 'The requested product could not be loaded.'}</p>
//             <Link href="/products" style={{
//               marginTop: '15px',
//               padding: '10px 20px',
//               background: '#ffa41c',
//               color: '#0f1111',
//               textDecoration: 'none',
//               borderRadius: '4px',
//               display: 'inline-block',
//               fontWeight: '500'
//             }}>
//               ← Back to Products
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const categoryData = categories.find(cat => cat.name === category);

//   return (
//     <div className="wood-products-page">
//       {/* Breadcrumb Navigation */}
//       <div className="wood-container" style={{ padding: '20px 15px 0' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#565959' }}>
//           <Link href="/products" style={{ color: '#007185', textDecoration: 'none' }}>
//             Products
//           </Link>
//           <span>›</span>
//           <Link href={`/products`} style={{ color: '#007185', textDecoration: 'none' }}>
//             {categoryData?.displayName || category}
//           </Link>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '500' }}>{product.name}</span>
//         </div>
//       </div>

//       <div className="wood-container" style={{ padding: '20px 15px 40px' }}>
//         <div className="wood-layout-wrapper" style={{ gap: '40px' }}>
//           {/* Product Images Section */}
//           <div style={{ flex: '1', minWidth: '0' }}>
//             <div style={{ 
//               background: '#ffffff', 
//               border: '1px solid #e7e7e7', 
//               borderRadius: '8px',
//               padding: '20px',
//               marginBottom: '20px'
//             }}>
//               {/* Main Image */}
//               <div style={{ 
//                 position: 'relative', 
//                 height: '500px',
//                 marginBottom: '20px',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//                 background: '#f8f8f8'
//               }}>
//                 {product.images.length > 0 ? (
//                   <>
//                     <Image
//                       src={product.images[activeImageIndex]}
//                       alt={`${product.name} - View ${activeImageIndex + 1}`}
//                       fill
//                       style={{ objectFit: 'contain' }}
//                       sizes="100vw"
//                     />
                    
//                     {/* Navigation Arrows */}
//                     {product.images.length > 1 && (
//                       <>
//                         <button
//                           onClick={prevImage}
//                           style={{
//                             position: 'absolute',
//                             left: '15px',
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             background: 'rgba(255, 255, 255, 0.9)',
//                             border: '1px solid #ddd',
//                             borderRadius: '50%',
//                             width: '40px',
//                             height: '40px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             fontSize: '20px'
//                           }}
//                         >
//                           ‹
//                         </button>
//                         <button
//                           onClick={nextImage}
//                           style={{
//                             position: 'absolute',
//                             right: '15px',
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             background: 'rgba(255, 255, 255, 0.9)',
//                             border: '1px solid #ddd',
//                             borderRadius: '50%',
//                             width: '40px',
//                             height: '40px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             fontSize: '20px'
//                           }}
//                         >
//                           ›
//                         </button>
//                       </>
//                     )}
                    
//                     {/* Image Counter */}
//                     <div style={{
//                       position: 'absolute',
//                       bottom: '15px',
//                       right: '15px',
//                       background: 'rgba(0, 0, 0, 0.7)',
//                       color: 'white',
//                       padding: '4px 10px',
//                       borderRadius: '12px',
//                       fontSize: '12px'
//                     }}>
//                       {activeImageIndex + 1} / {product.images.length}
//                     </div>
//                   </>
//                 ) : (
//                   <div style={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     justifyContent: 'center',
//                     height: '100%',
//                     color: '#565959'
//                   }}>
//                     <div className="wood-image-placeholder">
//                       <div className="wood-icon">🚪</div>
//                       <p className="wood-image-text">No Image Available</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnail Images */}
//               {product.images.length > 1 && (
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '10px', 
//                   justifyContent: 'center',
//                   flexWrap: 'wrap'
//                 }}>
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setActiveImageIndex(index)}
//                       style={{
//                         width: '80px',
//                         height: '80px',
//                         border: activeImageIndex === index ? '2px solid #ffa41c' : '1px solid #ddd',
//                         borderRadius: '4px',
//                         overflow: 'hidden',
//                         background: '#f8f8f8',
//                         cursor: 'pointer',
//                         padding: '0'
//                       }}
//                     >
//                       <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                         <Image
//                           src={image}
//                           alt={`View ${index + 1}`}
//                           fill
//                           style={{ objectFit: 'cover' }}
//                           sizes="80px"
//                         />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Info Section */}
//           <div style={{ flex: '1', minWidth: '0' }}>
//             <div style={{ 
//               background: '#ffffff', 
//               border: '1px solid #e7e7e7', 
//               borderRadius: '8px',
//               padding: '30px'
//             }}>
//               {/* Product Title and Rating */}
//               <div style={{ marginBottom: '20px' }}>
//                 <h1 style={{ 
//                   fontSize: '28px', 
//                   fontWeight: '500', 
//                   color: '#0f1111',
//                   marginBottom: '10px',
//                   lineHeight: '1.3'
//                 }}>
//                   {product.name}
//                 </h1>
                
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
//                   {renderStars(product.rating)}
//                   {product.sales > 0 && (
//                     <span style={{ 
//                       fontSize: '14px', 
//                       color: '#565959',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px'
//                     }}>
//                       <span style={{ color: '#ffa41c' }}>🔥</span> {product.sales}+ Sold
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Price Section */}
//               <div style={{ 
//                 padding: '20px', 
//                 background: '#fafafa', 
//                 borderRadius: '8px',
//                 marginBottom: '25px',
//                 border: '1px solid #e7e7e7'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '10px' }}>
//                   <span style={{ fontSize: '14px', color: '#565959', marginRight: '4px' }}>₹</span>
//                   <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f1111' }}>
//                     {product.price.toLocaleString()}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: '14px', color: '#565959' }}>
//                   Inclusive of all taxes
//                 </div>
//               </div>

//               {/* Product Specifications */}
//               <div style={{ marginBottom: '30px' }}>
//                 <h3 style={{ 
//                   fontSize: '18px', 
//                   fontWeight: '600', 
//                   color: '#0f1111',
//                   marginBottom: '15px',
//                   paddingBottom: '10px',
//                   borderBottom: '2px solid #ffa41c'
//                 }}>
//                   Product Specifications
//                 </h3>
                
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Wood Type</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.woodtype}</div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Size</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.size}</div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Category</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
//                       {categoryData?.displayName || category}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Product Code</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
//                       {category.toUpperCase()}-{productNumber}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               {product.desc && (
//                 <div style={{ marginBottom: '30px' }}>
//                   <h3 style={{ 
//                     fontSize: '18px', 
//                     fontWeight: '600', 
//                     color: '#0f1111',
//                     marginBottom: '15px',
//                     paddingBottom: '10px',
//                     borderBottom: '2px solid #ffa41c'
//                   }}>
//                     Description
//                   </h3>
//                   <div style={{ 
//                     fontSize: '15px', 
//                     color: '#0f1111', 
//                     lineHeight: '1.6',
//                     whiteSpace: 'pre-line'
//                   }}>
//                     {product.desc}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                 <a
//                   href={`https://wa.me/919876543210?text=${getWhatsAppBuyMessage()}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: '#25D366',
//                     color: 'white',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#128C7E';
//                     e.target.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = '#25D366';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <span>🛒</span> Buy Now on WhatsApp
//                 </a>
                
//                 <a
//                   href={`https://wa.me/919876543210?text=${getWhatsAppEnquiryMessage()}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: 'transparent',
//                     color: '#0f1111',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     border: '2px solid #ffa41c',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#fff8f6';
//                     e.target.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = 'transparent';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <span>💬</span> Enquire About This Product
//                 </a>
//               </div>

//               {/* Additional Info */}
//               <div style={{ 
//                 marginTop: '30px', 
//                 paddingTop: '20px', 
//                 borderTop: '1px solid #e7e7e7',
//                 fontSize: '13px',
//                 color: '#565959'
//               }}>
//                 <p style={{ marginBottom: '10px' }}>
//                   <strong>Note:</strong> All prices are inclusive of GST. Free installation support available.
//                 </p>
//                 <p>
//                   Need help? Our experts are available 10AM - 7PM to assist you.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Back Button */}
//         <div style={{ marginTop: '30px', textAlign: 'center' }}>
//           <button
//             onClick={() => router.back()}
//             style={{
//               background: '#f0f2f2',
//               color: '#0f1111',
//               padding: '10px 20px',
//               borderRadius: '4px',
//               border: '1px solid #d5d9d9',
//               fontSize: '14px',
//               cursor: 'pointer',
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}
//           >
//             ← Back to Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }








// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import '@/products-styles.css';
// import { categories } from '@/utils/productData';

// const StarIcon = ({ filled }) => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // Function to fetch product data
// const fetchProductData = async (categoryName, productNumber) => {
//   const categoryFolders = {
//     woodenDoor: '1_woodenDoor',
//     woodenFrame: '2_WoodenFream',
//     safetyDoors: '3_safetyDoors',
//     woodenBed: '4_woodenBed',
//     woodenMandir: '5_woodenMandir',
//     woodenWindow: '6_woodenWindow',
//     woodenArt: '7_woodenArt',
//     sofaChair: '8_sofaChair'
//   };
  
//   const folderName = categoryFolders[categoryName];
//   if (!folderName) return null;
  
//   const infoUrl = `/images/category/${folderName}/product${productNumber}/info.json`;
//   const basePath = `/images/category/${folderName}/product${productNumber}/`;
  
//   try {
//     // Fetch product info
//     const infoResponse = await fetch(infoUrl);
//     if (!infoResponse.ok) {
//       throw new Error('Product info not found');
//     }
//     const infoData = await infoResponse.json();
    
//     // Get all available images (1.webp to 4.webp)
//     const images = [];
//     for (let i = 1; i <= 4; i++) {
//       const imageUrl = `${basePath}${i}.webp`;
//       try {
//         const imgResponse = await fetch(imageUrl, { method: 'HEAD' });
//         if (imgResponse.ok) {
//           images.push(imageUrl);
//         }
//       } catch {
//         // Skip if image doesn't exist
//       }
//     }
    
//     return {
//       ...infoData,
//       images,
//       categoryName,
//       productNumber,
//       folderName
//     };
//   } catch (error) {
//     console.error('Error fetching product data:', error);
//     return null;
//   }
// };

// export default function ProductDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { category, productId } = params;
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   // ✅ FIXED: Extract product number from productId (format: product1, product2, etc.)
//   let productNumber;
//   if (productId && typeof productId === 'string') {
//     if (productId.startsWith('product')) {
//       productNumber = parseInt(productId.replace('product', ''));
//     } else {
//       productNumber = parseInt(productId);
//     }
//   } else {
//     productNumber = null;
//   }

//   useEffect(() => {
//     const loadProductData = async () => {
//       console.log('Loading product data:', { category, productId, productNumber });
      
//       if (!category || !productNumber) {
//         setError('Invalid product URL');
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       try {
//         const productData = await fetchProductData(category, productNumber);
        
//         if (!productData) {
//           setError('Product not found');
//           setProduct(null);
//         } else {
//           setProduct(productData);
//           setError(null);
//         }
//       } catch (err) {
//         console.error('Error loading product:', err);
//         setError('Failed to load product data');
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductData();
//   }, [category, productId, productNumber]);

//   // Handle image navigation
//   const nextImage = () => {
//     if (product && product.images.length > 0) {
//       setActiveImageIndex((prev) => (prev + 1) % product.images.length);
//     }
//   };

//   const prevImage = () => {
//     if (product && product.images.length > 0) {
//       setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
//     }
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
//       <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//         {stars}
//         <span style={{ marginLeft: '8px', fontSize: '16px', fontWeight: '600' }}>{rating}</span>
//       </div>
//     );
//   };

//   // WhatsApp messages
//   const getWhatsAppBuyMessage = () => {
//     if (!product) return '';
//     return `Hello, I want to BUY this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A⭐ Rating: ${product.rating}%0A${product.desc ? `📝 Description: ${encodeURIComponent(product.desc)}%0A` : ''}%0A✅ I want to proceed with purchase.`;
//   };

//   const getWhatsAppEnquiryMessage = () => {
//     if (!product) return '';
//     return `Hello, I have an ENQUIRY about this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A%0A❓ My Question: [Please specify your question here]`;
//   };

//   if (loading) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '40px 20px', textAlign: 'center' }}>
//           <div className="wood-empty-icon">⏳</div>
//           <h3>Loading Product Details...</h3>
//           <p>Please wait while we fetch the product information</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '40px 20px' }}>
//           <div className="wood-empty-state">
//             <div className="wood-empty-icon">🚫</div>
//             <h3>Product Not Found</h3>
//             <p>{error || 'The requested product could not be loaded.'}</p>
//             <Link href="/products/wooden-doors" style={{
//               marginTop: '15px',
//               padding: '10px 20px',
//               background: '#ffa41c',
//               color: '#0f1111',
//               textDecoration: 'none',
//               borderRadius: '4px',
//               display: 'inline-block',
//               fontWeight: '500'
//             }}>
//               ← Back to Products
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const categoryData = categories.find(cat => cat.name === category);

//   return (
//     <div className="wood-products-page">
//       {/* Breadcrumb Navigation */}
//       <div className="wood-container" style={{ padding: '20px 15px 0' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#565959' }}>
//           <Link href="/products/wooden-doors" style={{ color: '#007185', textDecoration: 'none' }}>
//             Products
//           </Link>
//           <span>›</span>
//           <Link href={`/products/wooden-doors`} style={{ color: '#007185', textDecoration: 'none' }}>
//             {categoryData?.displayName || category}
//           </Link>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '500' }}>{product.name}</span>
//         </div>
//       </div>

//       <div className="wood-container" style={{ padding: '20px 15px 40px' }}>
//         <div className="wood-layout-wrapper" style={{ gap: '40px' }}>
//           {/* Product Images Section */}
//           <div style={{ flex: '1', minWidth: '0' }}>
//             <div style={{ 
//               background: '#ffffff', 
//               border: '1px solid #e7e7e7', 
//               borderRadius: '8px',
//               padding: '20px',
//               marginBottom: '20px'
//             }}>
//               {/* Main Image */}
//               <div style={{ 
//                 position: 'relative', 
//                 height: '500px',
//                 marginBottom: '20px',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//                 background: '#f8f8f8'
//               }}>
//                 {product.images.length > 0 ? (
//                   <>
//                     <Image
//                       src={product.images[activeImageIndex]}
//                       alt={`${product.name} - View ${activeImageIndex + 1}`}
//                       fill
//                       style={{ objectFit: 'contain' }}
//                       sizes="100vw"
//                     />
                    
//                     {/* Navigation Arrows */}
//                     {product.images.length > 1 && (
//                       <>
//                         <button
//                           onClick={prevImage}
//                           style={{
//                             position: 'absolute',
//                             left: '15px',
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             background: 'rgba(255, 255, 255, 0.9)',
//                             border: '1px solid #ddd',
//                             borderRadius: '50%',
//                             width: '40px',
//                             height: '40px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             fontSize: '20px'
//                           }}
//                         >
//                           ‹
//                         </button>
//                         <button
//                           onClick={nextImage}
//                           style={{
//                             position: 'absolute',
//                             right: '15px',
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             background: 'rgba(255, 255, 255, 0.9)',
//                             border: '1px solid #ddd',
//                             borderRadius: '50%',
//                             width: '40px',
//                             height: '40px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             fontSize: '20px'
//                           }}
//                         >
//                           ›
//                         </button>
//                       </>
//                     )}
                    
//                     {/* Image Counter */}
//                     <div style={{
//                       position: 'absolute',
//                       bottom: '15px',
//                       right: '15px',
//                       background: 'rgba(0, 0, 0, 0.7)',
//                       color: 'white',
//                       padding: '4px 10px',
//                       borderRadius: '12px',
//                       fontSize: '12px'
//                     }}>
//                       {activeImageIndex + 1} / {product.images.length}
//                     </div>
//                   </>
//                 ) : (
//                   <div style={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     justifyContent: 'center',
//                     height: '100%',
//                     color: '#565959'
//                   }}>
//                     <div className="wood-image-placeholder">
//                       <div className="wood-icon">🚪</div>
//                       <p className="wood-image-text">No Image Available</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnail Images */}
//               {product.images.length > 1 && (
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '10px', 
//                   justifyContent: 'center',
//                   flexWrap: 'wrap'
//                 }}>
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setActiveImageIndex(index)}
//                       style={{
//                         width: '80px',
//                         height: '80px',
//                         border: activeImageIndex === index ? '2px solid #ffa41c' : '1px solid #ddd',
//                         borderRadius: '4px',
//                         overflow: 'hidden',
//                         background: '#f8f8f8',
//                         cursor: 'pointer',
//                         padding: '0'
//                       }}
//                     >
//                       <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                         <Image
//                           src={image}
//                           alt={`View ${index + 1}`}
//                           fill
//                           style={{ objectFit: 'cover' }}
//                           sizes="80px"
//                         />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Info Section */}
//           <div style={{ flex: '1', minWidth: '0' }}>
//             <div style={{ 
//               background: '#ffffff', 
//               border: '1px solid #e7e7e7', 
//               borderRadius: '8px',
//               padding: '30px'
//             }}>
//               {/* Product Title and Rating */}
//               <div style={{ marginBottom: '20px' }}>
//                 <h1 style={{ 
//                   fontSize: '28px', 
//                   fontWeight: '500', 
//                   color: '#0f1111',
//                   marginBottom: '10px',
//                   lineHeight: '1.3'
//                 }}>
//                   {product.name}
//                 </h1>
                
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
//                   {renderStars(product.rating)}
//                   {product.sales > 0 && (
//                     <span style={{ 
//                       fontSize: '14px', 
//                       color: '#565959',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px'
//                     }}>
//                       <span style={{ color: '#ffa41c' }}>🔥</span> {product.sales}+ Sold
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Price Section */}
//               <div style={{ 
//                 padding: '20px', 
//                 background: '#fafafa', 
//                 borderRadius: '8px',
//                 marginBottom: '25px',
//                 border: '1px solid #e7e7e7'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '10px' }}>
//                   <span style={{ fontSize: '14px', color: '#565959', marginRight: '4px' }}>₹</span>
//                   <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f1111' }}>
//                     {product.price.toLocaleString()}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: '14px', color: '#565959' }}>
//                   Inclusive of all taxes
//                 </div>
//               </div>

//               {/* Product Specifications */}
//               <div style={{ marginBottom: '30px' }}>
//                 <h3 style={{ 
//                   fontSize: '18px', 
//                   fontWeight: '600', 
//                   color: '#0f1111',
//                   marginBottom: '15px',
//                   paddingBottom: '10px',
//                   borderBottom: '2px solid #ffa41c'
//                 }}>
//                   Product Specifications
//                 </h3>
                
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Wood Type</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.woodtype}</div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Size</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.size}</div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Category</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
//                       {categoryData?.displayName || category}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Product Code</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
//                       {category.toUpperCase()}-{productNumber}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               {product.desc && (
//                 <div style={{ marginBottom: '30px' }}>
//                   <h3 style={{ 
//                     fontSize: '18px', 
//                     fontWeight: '600', 
//                     color: '#0f1111',
//                     marginBottom: '15px',
//                     paddingBottom: '10px',
//                     borderBottom: '2px solid #ffa41c'
//                   }}>
//                     Description
//                   </h3>
//                   <div style={{ 
//                     fontSize: '15px', 
//                     color: '#0f1111', 
//                     lineHeight: '1.6',
//                     whiteSpace: 'pre-line'
//                   }}>
//                     {product.desc}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                 <a
//                   href={`https://wa.me/919876543210?text=${getWhatsAppBuyMessage()}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: '#25D366',
//                     color: 'white',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#128C7E';
//                     e.target.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = '#25D366';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <span>🛒</span> Buy Now on WhatsApp
//                 </a>
                
//                 <a
//                   href={`https://wa.me/919876543210?text=${getWhatsAppEnquiryMessage()}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: 'transparent',
//                     color: '#0f1111',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     border: '2px solid #ffa41c',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#fff8f6';
//                     e.target.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = 'transparent';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <span>💬</span> Enquire About This Product
//                 </a>
//               </div>

//               {/* Additional Info */}
//               <div style={{ 
//                 marginTop: '30px', 
//                 paddingTop: '20px', 
//                 borderTop: '1px solid #e7e7e7',
//                 fontSize: '13px',
//                 color: '#565959'
//               }}>
//                 <p style={{ marginBottom: '10px' }}>
//                   <strong>Note:</strong> All prices are inclusive of GST. Free installation support available.
//                 </p>
//                 <p>
//                   Need help? Our experts are available 10AM - 7PM to assist you.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Back Button */}
//         <div style={{ marginTop: '30px', textAlign: 'center' }}>
//           <button
//             onClick={() => router.push('/products/wooden-doors')}
//             style={{
//               background: '#f0f2f2',
//               color: '#0f1111',
//               padding: '10px 20px',
//               borderRadius: '4px',
//               border: '1px solid #d5d9d9',
//               fontSize: '14px',
//               cursor: 'pointer',
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}
//           >
//             ← Back to Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import '@/products-styles.css';
// import { categories } from '@/utils/productData';

// const StarIcon = ({ filled }) => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
//   </svg>
// );

// // ✅ FIXED: Function to fetch product data with correct paths
// const fetchProductData = async (categoryName, productNumber) => {
//   const categoryFolders = {
//     woodenDoor: '1_woodenDoor',
//     woodenFrame: '2_WoodenFream', 
//     safetyDoors: '3_safetyDoors',
//     woodenBed: '4_woodenBed',
//     woodenMandir: '5_woodenMandir',
//     woodenWindow: '6_woodenWindow',
//     woodenArt: '7_woodenArt',
//     sofaChair: '8_sofaChair'
//   };
  
//   const folderName = categoryFolders[categoryName];
//   if (!folderName) return null;
  
//   // ✅ FIXED: Correct paths
//   const infoUrl = `/images/category/${folderName}/product${productNumber}/info.json`;
//   const basePath = `/images/category/${folderName}/product${productNumber}/`;
  
//   try {
//     // Fetch product info
//     console.log('Fetching info from:', infoUrl);
//     const infoResponse = await fetch(infoUrl);
    
//     if (!infoResponse.ok) {
//       console.error('Info not found:', infoResponse.status);
//       throw new Error('Product info not found');
//     }
    
//     const infoData = await infoResponse.json();
//     console.log('Info data loaded:', infoData);
    
//     // Get all available images (1.webp to 4.webp)
//     const images = [];
//     for (let i = 1; i <= 4; i++) {
//       const imageUrl = `${basePath}${i}.webp`;
//       console.log('Checking image:', imageUrl);
      
//       // Try to check if image exists
//       try {
//         // For images, we can't use HEAD request due to CORS sometimes
//         // So we'll just construct the URL and let Image component handle errors
//         images.push(imageUrl);
//       } catch {
//         console.log(`Image ${i} not found`);
//       }
//     }
    
//     console.log('Images array:', images);
    
//     return {
//       ...infoData,
//       images,
//       categoryName,
//       productNumber,
//       folderName
//     };
//   } catch (error) {
//     console.error('Error fetching product data:', error);
//     return null;
//   }
// };

// export default function ProductDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { category, productId } = params;
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   // ✅ FIXED: Extract product number correctly
//   let productNumber = null;
  
//   if (productId) {
//     // Remove 'product' prefix if exists
//     const numStr = productId.toString().replace('product', '');
//     productNumber = parseInt(numStr);
//   }

//   useEffect(() => {
//     console.log('Params received:', { category, productId, productNumber });
    
//     const loadProductData = async () => {
//       if (!category || !productNumber || isNaN(productNumber)) {
//         console.error('Invalid params:', { category, productNumber });
//         setError('Invalid product URL');
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       setError(null);
      
//       try {
//         console.log(`Fetching data for ${category}, product ${productNumber}...`);
//         const productData = await fetchProductData(category, productNumber);
//         console.log('Product data received:', productData);
        
//         if (!productData) {
//           setError('Product not found');
//           setProduct(null);
//         } else {
//           setProduct(productData);
//         }
//       } catch (err) {
//         console.error('Error loading product:', err);
//         setError('Failed to load product data. Please check console for details.');
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProductData();
//   }, [category, productId, productNumber]);

//   // Debug: Log when product changes
//   useEffect(() => {
//     if (product) {
//       console.log('Product state updated:', product);
//       console.log('Product images:', product.images);
//     }
//   }, [product]);

//   // Handle image navigation
//   const nextImage = () => {
//     if (product && product.images && product.images.length > 0) {
//       setActiveImageIndex((prev) => (prev + 1) % product.images.length);
//     }
//   };

//   const prevImage = () => {
//     if (product && product.images && product.images.length > 0) {
//       setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
//     }
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
//       <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//         {stars}
//         <span style={{ marginLeft: '8px', fontSize: '16px', fontWeight: '600' }}>{rating}</span>
//       </div>
//     );
//   };

//   // WhatsApp messages
//   const getWhatsAppBuyMessage = () => {
//     if (!product) return '';
//     return `Hello, I want to BUY this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A⭐ Rating: ${product.rating}%0A${product.desc ? `📝 Description: ${encodeURIComponent(product.desc)}%0A` : ''}%0A✅ I want to proceed with purchase.`;
//   };

//   const getWhatsAppEnquiryMessage = () => {
//     if (!product) return '';
//     return `Hello, I have an ENQUIRY about this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A%0A❓ My Question: [Please specify your question here]`;
//   };

//   if (loading) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '40px 20px', textAlign: 'center' }}>
//           <div className="wood-empty-icon">⏳</div>
//           <h3>Loading Product Details...</h3>
//           <p>Please wait while we fetch the product information</p>
//           <p>Category: {category}, Product: {productId}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '40px 20px' }}>
//           <div className="wood-empty-state">
//             <div className="wood-empty-icon">🚫</div>
//             <h3>Product Not Found</h3>
//             <p>{error || 'The requested product could not be loaded.'}</p>
//             <p style={{ fontSize: '12px', marginTop: '10px' }}>
//               URL: /products/{category}/{productId}<br/>
//               Product Number: {productNumber}
//             </p>
//             <Link href="/products/wooden-doors" style={{
//               marginTop: '15px',
//               padding: '10px 20px',
//               background: '#ffa41c',
//               color: '#0f1111',
//               textDecoration: 'none',
//               borderRadius: '4px',
//               display: 'inline-block',
//               fontWeight: '500'
//             }}>
//               ← Back to Products
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const categoryData = categories.find(cat => cat.name === category);

//   return (
//     <div className="wood-products-page">
//       {/* Debug info - remove in production */}
//       <div style={{ 
//         background: '#f0f0f0', 
//         padding: '10px', 
//         fontSize: '12px',
//         borderBottom: '1px solid #ddd'
//       }}>
//         Debug: Category: {category}, Product ID: {productId}, Product Number: {productNumber}
//       </div>

//       {/* Breadcrumb Navigation */}
//       <div className="wood-container" style={{ padding: '20px 15px 0' }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#565959' }}>
//           <Link href="/products/wooden-doors" style={{ color: '#007185', textDecoration: 'none' }}>
//             Products
//           </Link>
//           <span>›</span>
//           <Link href={`/products/wooden-doors`} style={{ color: '#007185', textDecoration: 'none' }}>
//             {categoryData?.displayName || category}
//           </Link>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '500' }}>{product.name}</span>
//         </div>
//       </div>

//       <div className="wood-container" style={{ padding: '20px 15px 40px' }}>
//         <div className="wood-layout-wrapper" style={{ gap: '40px' }}>
//           {/* Product Images Section */}
//           <div style={{ flex: '1', minWidth: '0' }}>
//             <div style={{ 
//               background: '#ffffff', 
//               border: '1px solid #e7e7e7', 
//               borderRadius: '8px',
//               padding: '20px',
//               marginBottom: '20px'
//             }}>
//               {/* Main Image */}
//               <div style={{ 
//                 position: 'relative', 
//                 height: '500px',
//                 marginBottom: '20px',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//                 background: '#f8f8f8'
//               }}>
//                 {product.images && product.images.length > 0 ? (
//                   <>
//                     <Image
//                       src={product.images[activeImageIndex]}
//                       alt={`${product.name} - View ${activeImageIndex + 1}`}
//                       fill
//                       style={{ objectFit: 'contain' }}
//                       sizes="100vw"
//                       priority
//                       onError={(e) => {
//                         console.error('Image failed to load:', product.images[activeImageIndex]);
//                         e.target.style.display = 'none';
//                       }}
//                       onLoad={() => console.log('Image loaded successfully')}
//                     />
                    
//                     {/* Navigation Arrows */}
//                     {product.images.length > 1 && (
//                       <>
//                         <button
//                           onClick={prevImage}
//                           style={{
//                             position: 'absolute',
//                             left: '15px',
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             background: 'rgba(255, 255, 255, 0.9)',
//                             border: '1px solid #ddd',
//                             borderRadius: '50%',
//                             width: '40px',
//                             height: '40px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             fontSize: '20px',
//                             zIndex: 10
//                           }}
//                         >
//                           ‹
//                         </button>
//                         <button
//                           onClick={nextImage}
//                           style={{
//                             position: 'absolute',
//                             right: '15px',
//                             top: '50%',
//                             transform: 'translateY(-50%)',
//                             background: 'rgba(255, 255, 255, 0.9)',
//                             border: '1px solid #ddd',
//                             borderRadius: '50%',
//                             width: '40px',
//                             height: '40px',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             cursor: 'pointer',
//                             fontSize: '20px',
//                             zIndex: 10
//                           }}
//                         >
//                           ›
//                         </button>
//                       </>
//                     )}
                    
//                     {/* Image Counter */}
//                     <div style={{
//                       position: 'absolute',
//                       bottom: '15px',
//                       right: '15px',
//                       background: 'rgba(0, 0, 0, 0.7)',
//                       color: 'white',
//                       padding: '4px 10px',
//                       borderRadius: '12px',
//                       fontSize: '12px',
//                       zIndex: 10
//                     }}>
//                       {activeImageIndex + 1} / {product.images.length}
//                     </div>
//                   </>
//                 ) : (
//                   <div style={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     justifyContent: 'center',
//                     height: '100%',
//                     color: '#565959'
//                   }}>
//                     <div className="wood-image-placeholder">
//                       <div className="wood-icon">🚪</div>
//                       <p className="wood-image-text">No Image Available</p>
//                       <p style={{ fontSize: '12px', marginTop: '5px' }}>
//                         Image path: {product.images ? product.images[0] : 'No images'}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnail Images */}
//               {product.images && product.images.length > 1 && (
//                 <div style={{ 
//                   display: 'flex', 
//                   gap: '10px', 
//                   justifyContent: 'center',
//                   flexWrap: 'wrap'
//                 }}>
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setActiveImageIndex(index)}
//                       style={{
//                         width: '80px',
//                         height: '80px',
//                         border: activeImageIndex === index ? '2px solid #ffa41c' : '1px solid #ddd',
//                         borderRadius: '4px',
//                         overflow: 'hidden',
//                         background: '#f8f8f8',
//                         cursor: 'pointer',
//                         padding: '0'
//                       }}
//                     >
//                       <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                         <Image
//                           src={image}
//                           alt={`View ${index + 1}`}
//                           fill
//                           style={{ objectFit: 'cover' }}
//                           sizes="80px"
//                         />
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Info Section */}
//           <div style={{ flex: '1', minWidth: '0' }}>
//             <div style={{ 
//               background: '#ffffff', 
//               border: '1px solid #e7e7e7', 
//               borderRadius: '8px',
//               padding: '30px'
//             }}>
//               {/* Product Title and Rating */}
//               <div style={{ marginBottom: '20px' }}>
//                 <h1 style={{ 
//                   fontSize: '28px', 
//                   fontWeight: '500', 
//                   color: '#0f1111',
//                   marginBottom: '10px',
//                   lineHeight: '1.3'
//                 }}>
//                   {product.name}
//                 </h1>
                
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
//                   {renderStars(product.rating)}
//                   {product.sales > 0 && (
//                     <span style={{ 
//                       fontSize: '14px', 
//                       color: '#565959',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '4px'
//                     }}>
//                       <span style={{ color: '#ffa41c' }}>🔥</span> {product.sales}+ Sold
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Price Section */}
//               <div style={{ 
//                 padding: '20px', 
//                 background: '#fafafa', 
//                 borderRadius: '8px',
//                 marginBottom: '25px',
//                 border: '1px solid #e7e7e7'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '10px' }}>
//                   <span style={{ fontSize: '14px', color: '#565959', marginRight: '4px' }}>₹</span>
//                   <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f1111' }}>
//                     {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: '14px', color: '#565959' }}>
//                   Inclusive of all taxes
//                 </div>
//               </div>

//               {/* Product Specifications */}
//               <div style={{ marginBottom: '30px' }}>
//                 <h3 style={{ 
//                   fontSize: '18px', 
//                   fontWeight: '600', 
//                   color: '#0f1111',
//                   marginBottom: '15px',
//                   paddingBottom: '10px',
//                   borderBottom: '2px solid #ffa41c'
//                 }}>
//                   Product Specifications
//                 </h3>
                
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Wood Type</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.woodtype}</div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Size</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.size}</div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Category</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
//                       {categoryData?.displayName || category}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Product Code</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
//                       {category?.toUpperCase() || 'PROD'}-{productNumber}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               {product.desc && (
//                 <div style={{ marginBottom: '30px' }}>
//                   <h3 style={{ 
//                     fontSize: '18px', 
//                     fontWeight: '600', 
//                     color: '#0f1111',
//                     marginBottom: '15px',
//                     paddingBottom: '10px',
//                     borderBottom: '2px solid #ffa41c'
//                   }}>
//                     Description
//                   </h3>
//                   <div style={{ 
//                     fontSize: '15px', 
//                     color: '#0f1111', 
//                     lineHeight: '1.6',
//                     whiteSpace: 'pre-line'
//                   }}>
//                     {product.desc}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                 <a
//                   href={`https://wa.me/919876543210?text=${getWhatsAppBuyMessage()}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: '#25D366',
//                     color: 'white',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#128C7E';
//                     e.target.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = '#25D366';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <span>🛒</span> Buy Now on WhatsApp
//                 </a>
                
//                 <a
//                   href={`https://wa.me/919876543210?text=${getWhatsAppEnquiryMessage()}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: 'transparent',
//                     color: '#0f1111',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     border: '2px solid #ffa41c',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.background = '#fff8f6';
//                     e.target.style.transform = 'translateY(-2px)';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.background = 'transparent';
//                     e.target.style.transform = 'translateY(0)';
//                   }}
//                 >
//                   <span>💬</span> Enquire About This Product
//                 </a>
//               </div>

//               {/* Additional Info */}
//               <div style={{ 
//                 marginTop: '30px', 
//                 paddingTop: '20px', 
//                 borderTop: '1px solid #e7e7e7',
//                 fontSize: '13px',
//                 color: '#565959'
//               }}>
//                 <p style={{ marginBottom: '10px' }}>
//                   <strong>Note:</strong> All prices are inclusive of GST. Free installation support available.
//                 </p>
//                 <p>
//                   Need help? Our experts are available 10AM - 7PM to assist you.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Back Button */}
//         <div style={{ marginTop: '30px', textAlign: 'center' }}>
//           <button
//             onClick={() => router.push('/products/wooden-doors')}
//             style={{
//               background: '#f0f2f2',
//               color: '#0f1111',
//               padding: '10px 20px',
//               borderRadius: '4px',
//               border: '1px solid #d5d9d9',
//               fontSize: '14px',
//               cursor: 'pointer',
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}
//           >
//             ← Back to Products
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import '../../wooden-doors/products-styles.css';
// import { categories } from '@/utils/productData';

// // Category folders mapping
// const categoryFolders = {
//   woodenDoor: '1_woodenDoor',
//   woodenFrame: '2_WoodenFream',
//   safetyDoors: '3_safetyDoors',
//   woodenBed: '4_woodenBed',
//   woodenMandir: '5_woodenMandir',
//   woodenWindow: '6_woodenWindow',
//   woodenArt: '7_woodenArt',
//   sofaChair: '8_sofaChair'
// };

// export default function ProductDetailPage() {
//   const params = useParams();
//   const router = useRouter();
  
//   // Get parameters
//   const category = params.category;    // e.g., 'woodenDoor'
//   const productId = params.productId;  // e.g., 'product1'
  
//   console.log('📌 URL Params:', { category, productId });

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   // Extract product number
//   const getProductNumber = () => {
//     if (!productId) return 1;
    
//     const str = productId.toString();
//     // Remove 'product' prefix if exists
//     const match = str.match(/product(\d+)/i);
//     if (match) {
//       return parseInt(match[1], 10);
//     }
    
//     // If just number
//     const num = parseInt(str, 10);
//     return isNaN(num) ? 1 : num;
//   };
  
//   const productNumber = getProductNumber();
  
//   console.log('🔢 Extracted:', { productNumber });

//   useEffect(() => {
//     const loadProduct = async () => {
//       if (!category || !productNumber) {
//         setError('Missing parameters');
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         const folderName = categoryFolders[category];
//         if (!folderName) {
//           throw new Error(`Category '${category}' not found`);
//         }

//         // Load product info
//         const infoUrl = `/images/category/${folderName}/product${productNumber}/info.json`;
//         console.log('📡 Fetching from:', infoUrl);
        
//         const response = await fetch(infoUrl);
        
//         if (!response.ok) {
//           if (response.status === 404) {
//             throw new Error(`Product ${productNumber} not found in ${category}`);
//           }
//           throw new Error(`Failed to load: ${response.status}`);
//         }
        
//         const infoData = await response.json();
//         console.log('✅ Product data:', infoData);
        
//         // Prepare images
//         const basePath = `/images/category/${folderName}/product${productNumber}/`;
//         const images = [];
//         for (let i = 1; i <= 4; i++) {
//           images.push(`${basePath}${i}.webp`);
//         }
        
//         setProduct({
//           ...infoData,
//           images: images.filter(url => url),
//           categoryName: category,
//           productNumber
//         });
        
//       } catch (err) {
//         console.error('❌ Error:', err);
//         setError(err.message);
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProduct();
//   }, [category, productNumber]);

//   // Loading State
//   if (loading) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '50px 20px', textAlign: 'center' }}>
//           <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
//           <h2>Loading Product...</h2>
//           <div style={{ 
//             background: '#f5f5f5', 
//             padding: '15px', 
//             marginTop: '20px',
//             borderRadius: '8px',
//             display: 'inline-block'
//           }}>
//             <p><strong>Category:</strong> {category}</p>
//             <p><strong>Product ID:</strong> {productId}</p>
//             <p><strong>Product #:</strong> {productNumber}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error || !product) {
//     return (
//       <div className="wood-products-page">
//         <div className="wood-container" style={{ padding: '50px 20px', textAlign: 'center' }}>
//           <div style={{ 
//             background: '#ffebee', 
//             padding: '30px', 
//             borderRadius: '8px',
//             maxWidth: '600px',
//             margin: '0 auto'
//           }}>
//             <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚫</div>
//             <h2 style={{ color: '#d32f2f' }}>Product Not Found</h2>
//             <p style={{ margin: '15px 0' }}>{error || 'The product does not exist.'}</p>
            
//             <div style={{ 
//               background: 'white', 
//               padding: '15px', 
//               margin: '20px 0',
//               borderRadius: '6px',
//               textAlign: 'left',
//               fontSize: '14px'
//             }}>
//               <strong>Debug Info:</strong>
//               <div style={{ marginTop: '10px' }}>
//                 <div><strong>Category:</strong> {category}</div>
//                 <div><strong>Product ID:</strong> {productId}</div>
//                 <div><strong>Product Number:</strong> {productNumber}</div>
//                 <div><strong>Expected Path:</strong> /products/{category}/{productId}</div>
//               </div>
//             </div>
            
//             <div style={{ marginTop: '25px' }}>
//               <Link 
//                 href="/products/wooden-doors"
//                 style={{
//                   display: 'inline-block',
//                   padding: '12px 24px',
//                   background: '#ffa41c',
//                   color: '#0f1111',
//                   textDecoration: 'none',
//                   borderRadius: '6px',
//                   fontWeight: '600',
//                   marginRight: '15px'
//                 }}
//               >
//                 ← Back to Products
//               </Link>
              
//               <button
//                 onClick={() => window.location.reload()}
//                 style={{
//                   padding: '12px 24px',
//                   background: '#f0f2f2',
//                   color: '#0f1111',
//                   border: '1px solid #d5d9d9',
//                   borderRadius: '6px',
//                   fontWeight: '600',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Success - Render Product
//   const categoryData = categories.find(cat => cat.name === category);
  
//   // WhatsApp message
//   const whatsappMessage = `Hello, I'm interested in this product:%0A%0A📦 *${product.name}*%0A💰 Price: ₹${product.price}%0A🌳 Wood: ${product.woodtype}%0A📏 Size: ${product.size}%0A${product.desc ? `📝 ${product.desc}%0A` : ''}%0APlease provide more details.`;

//   return (
//     <div className="wood-products-page">
//       {/* Debug Banner (Remove in production) */}
//       <div style={{ 
//         background: '#e3f2fd', 
//         padding: '10px 15px',
//         borderBottom: '1px solid #bbdefb',
//         fontSize: '13px'
//       }}>
//         <strong>Debug:</strong> Category: {category} | Product: {productId} | #: {productNumber}
//       </div>

//       {/* Breadcrumb */}
//       <div className="wood-container" style={{ padding: '20px 15px 0' }}>
//         <div style={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: '8px', 
//           fontSize: '14px',
//           color: '#565959',
//           marginBottom: '20px'
//         }}>
//           <Link href="/" style={{ color: '#007185', textDecoration: 'none' }}>Home</Link>
//           <span>›</span>
//           <Link href="/products/wooden-doors" style={{ color: '#007185', textDecoration: 'none' }}>
//             Products
//           </Link>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '500' }}>
//             {categoryData?.displayName || 'Product'}
//           </span>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '600' }}>
//             {product.name}
//           </span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container" style={{ padding: '0 15px 40px' }}>
//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: '1fr 1fr', 
//           gap: '40px',
//           marginTop: '20px'
//         }}>
//           {/* Left Column - Images */}
//           <div>
//             <div style={{ 
//               background: '#ffffff',
//               border: '1px solid #e7e7e7',
//               borderRadius: '8px',
//               padding: '20px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//             }}>
//               {product.images && product.images.length > 0 ? (
//                 <>
//                   {/* Main Image */}
//                   <div style={{ 
//                     position: 'relative', 
//                     height: '400px',
//                     marginBottom: '20px',
//                     borderRadius: '6px',
//                     overflow: 'hidden',
//                     background: '#f8f8f8'
//                   }}>
//                     <Image
//                       src={product.images[activeImageIndex]}
//                       alt={product.name}
//                       fill
//                       style={{ objectFit: 'contain' }}
//                       sizes="(max-width: 768px) 100vw, 50vw"
//                       priority
//                     />
//                   </div>
                  
//                   {/* Thumbnails */}
//                   {product.images.length > 1 && (
//                     <div style={{ 
//                       display: 'flex', 
//                       gap: '10px',
//                       justifyContent: 'center'
//                     }}>
//                       {product.images.map((img, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setActiveImageIndex(index)}
//                           style={{
//                             width: '70px',
//                             height: '70px',
//                             border: activeImageIndex === index ? '2px solid #ffa41c' : '1px solid #ddd',
//                             borderRadius: '6px',
//                             overflow: 'hidden',
//                             background: '#f8f8f8',
//                             cursor: 'pointer',
//                             padding: 0
//                           }}
//                         >
//                           <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                             <Image
//                               src={img}
//                               alt={`View ${index + 1}`}
//                               fill
//                               style={{ objectFit: 'cover' }}
//                               sizes="70px"
//                             />
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div style={{ 
//                   height: '400px', 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: 'center',
//                   background: '#f8f8f8',
//                   borderRadius: '6px',
//                   color: '#666'
//                 }}>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontSize: '48px', marginBottom: '15px' }}>🖼️</div>
//                     <p>No images available</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Product Info */}
//           <div>
//             <div style={{ 
//               background: '#ffffff',
//               border: '1px solid #e7e7e7',
//               borderRadius: '8px',
//               padding: '30px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//             }}>
//               {/* Product Title */}
//               <h1 style={{ 
//                 fontSize: '28px', 
//                 fontWeight: '500', 
//                 color: '#0f1111',
//                 marginBottom: '15px',
//                 lineHeight: '1.3'
//               }}>
//                 {product.name}
//               </h1>
              
//               {/* Rating */}
//               {product.rating && (
//                 <div style={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   gap: '8px',
//                   marginBottom: '20px'
//                 }}>
//                   <div style={{ 
//                     background: '#ffa41c', 
//                     color: 'white',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '4px'
//                   }}>
//                     <span>⭐</span>
//                     <span>{product.rating}</span>
//                   </div>
//                   {product.sales > 0 && (
//                     <span style={{ fontSize: '14px', color: '#565959' }}>
//                       🔥 {product.sales}+ Sold
//                     </span>
//                   )}
//                 </div>
//               )}
              
//               {/* Price */}
//               <div style={{ 
//                 padding: '20px', 
//                 background: '#fafafa', 
//                 borderRadius: '8px',
//                 marginBottom: '25px',
//                 border: '1px solid #e7e7e7'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'baseline' }}>
//                   <span style={{ fontSize: '16px', marginRight: '4px', color: '#565959' }}>₹</span>
//                   <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f1111' }}>
//                     {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: '14px', color: '#565959', marginTop: '5px' }}>
//                   Inclusive of all taxes • Free installation support
//                 </div>
//               </div>
              
//               {/* Specifications */}
//               <div style={{ marginBottom: '25px' }}>
//                 <h2 style={{ 
//                   fontSize: '20px', 
//                   fontWeight: '600', 
//                   marginBottom: '15px',
//                   paddingBottom: '10px',
//                   borderBottom: '2px solid #ffa41c'
//                 }}>
//                   Product Specifications
//                 </h2>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Wood Type</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>{product.woodtype}</div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Size</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>{product.size}</div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Category</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>
//                       {categoryData?.displayName || category}
//                     </div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Product Code</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>
//                       {category?.toUpperCase() || 'PROD'}-{productNumber}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Description */}
//               {product.desc && (
//                 <div style={{ marginBottom: '25px' }}>
//                   <h2 style={{ 
//                     fontSize: '20px', 
//                     fontWeight: '600', 
//                     marginBottom: '15px',
//                     paddingBottom: '10px',
//                     borderBottom: '2px solid #ffa41c'
//                   }}>
//                     Description
//                   </h2>
//                   <div style={{ 
//                     fontSize: '15px', 
//                     color: '#0f1111', 
//                     lineHeight: '1.6',
//                     whiteSpace: 'pre-line'
//                   }}>
//                     {product.desc}
//                   </div>
//                 </div>
//               )}
              
//               {/* Action Buttons */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                 <a
//                   href={`https://wa.me/919876543210?text=${whatsappMessage}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: '#25D366',
//                     color: 'white',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => e.target.style.opacity = '0.9'}
//                   onMouseLeave={(e) => e.target.style.opacity = '1'}
//                 >
//                   <span>🛒</span> Buy Now on WhatsApp
//                 </a>
                
//                 <button
//                   onClick={() => router.back()}
//                   style={{
//                     background: '#f0f2f2',
//                     color: '#0f1111',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     border: '1px solid #d5d9d9',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => e.target.style.background = '#e3e6e6'}
//                   onMouseLeave={(e) => e.target.style.background = '#f0f2f2'}
//                 >
//                   ← Back to Products
//                 </button>
//               </div>
              
//               {/* Additional Info */}
//               <div style={{ 
//                 marginTop: '30px', 
//                 paddingTop: '20px', 
//                 borderTop: '1px solid #e7e7e7',
//                 fontSize: '13px',
//                 color: '#565959'
//               }}>
//                 <p style={{ marginBottom: '8px' }}>
//                   <strong>✅ Guarantee:</strong> 100% quality checked | 2-year warranty
//                 </p>
//                 <p style={{ marginBottom: '8px' }}>
//                   <strong>🚚 Delivery:</strong> Free delivery in city | 5-7 days
//                 </p>
//                 <p>
//                   <strong>🛠️ Installation:</strong> Free professional installation included
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// // ✅ File के END में add करें:
// export async function generateStaticParams() {
//   const categories = [
//     'woodenDoor',
//     'woodenFrame',
//     'safetyDoors',
//     'woodenBed',
//     'woodenMandir',
//     'woodenWindow',
//     'woodenArt',
//     'sofaChair'
//   ];
  
//   const params = [];
  
//   // First 3 products of each category के लिए paths generate करें
//   categories.forEach(category => {
//     for (let i = 1; i <= 3; i++) {
//       params.push({
//         category,
//         productId: `product${i}`
//       });
//     }
//   });
  
//   console.log(`Generated ${params.length} static paths`);
//   return params;
// }


// ❌ REMOVE: 'use client';
// ✅ Keep as Server Component

// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import '../../wooden-doors/products-styles.css';
// import { categories } from '@/utils/productData';

// // Category folders mapping
// const categoryFolders = {
//   woodenDoor: '1_woodenDoor',
//   woodenFrame: '2_WoodenFream',
//   safetyDoors: '3_safetyDoors',
//   woodenBed: '4_woodenBed',
//   woodenMandir: '5_woodenMandir',
//   woodenWindow: '6_woodenWindow',
//   woodenArt: '7_woodenArt',
//   sofaChair: '8_sofaChair'
// };

// // Fetch product data function
// // async function getProductData(category, productId) {
// //   try {
// //     // Extract product number
// //     let productNumber = 1;
// //     if (productId) {
// //       const str = productId.toString();
// //       const match = str.match(/product(\d+)/i);
// //       if (match) {
// //         productNumber = parseInt(match[1], 10);
// //       } else {
// //         const num = parseInt(str, 10);
// //         if (!isNaN(num)) productNumber = num;
// //       }
// //     }

// //     const folderName = categoryFolders[category];
// //     if (!folderName) {
// //       throw new Error(`Category '${category}' not found`);
// //     }

// //     // Load product info
// //     const infoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/images/category/${folderName}/product${productNumber}/info.json`;
// //     console.log('Fetching from:', infoUrl);
    
// //     const response = await fetch(infoUrl, { cache: 'no-store' });
    
// //     if (!response.ok) {
// //       if (response.status === 404) {
// //         return null;
// //       }
// //       throw new Error(`Failed to load: ${response.status}`);
// //     }
    
// //     const infoData = await response.json();
    
// //     // Prepare images
// //     const basePath = `/images/category/${folderName}/product${productNumber}/`;
// //     const images = [];
// //     for (let i = 1; i <= 4; i++) {
// //       images.push(`${basePath}${i}.webp`);
// //     }
    
// //     return {
// //       ...infoData,
// //       images: images.filter(url => url),
// //       categoryName: category,
// //       productNumber
// //     };
    
// //   } catch (error) {
// //     console.error('Error loading product:', error);
// //     return null;
// //   }
// // }

// async function getProductData(category, productId) {
//   try {
//     // Extract product number
//     let productNumber = 1;
//     if (productId) {
//       const str = productId.toString();
//       const match = str.match(/product(\d+)/i);
//       if (match) {
//         productNumber = parseInt(match[1], 10);
//       } else {
//         const num = parseInt(str, 10);
//         if (!isNaN(num)) productNumber = num;
//       }
//     }

//     const folderName = categoryFolders[category];
//     if (!folderName) {
//       throw new Error(`Category '${category}' not found`);
//     }

//     // ✅ FIXED: Use absolute URL for fetch in Server Component
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//     const infoUrl = `${baseUrl}/images/category/${folderName}/product${productNumber}/info.json`;
    
//     console.log('📡 Fetching from:', infoUrl);
    
//     const response = await fetch(infoUrl, { 
//       cache: 'no-store',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
    
//     if (!response.ok) {
//       console.log('❌ Fetch failed:', response.status, response.statusText);
//       if (response.status === 404) {
//         return null;
//       }
//       throw new Error(`Failed to load: ${response.status}`);
//     }
    
//     const infoData = await response.json();
//     console.log('✅ Product data loaded:', infoData);
    
//     // Prepare images (relative paths for Image component)
//     const basePath = `/images/category/${folderName}/product${productNumber}/`;
//     const images = [];
//     for (let i = 1; i <= 4; i++) {
//       images.push(`${basePath}${i}.webp`);
//     }
    
//     return {
//       ...infoData,
//       images: images.filter(url => url),
//       categoryName: category,
//       productNumber
//     };
    
//   } catch (error) {
//     console.error('❌ Error loading product:', error);
//     return null;
//   }
// }

// export default async function ProductDetailPage({ params }) {
//   const { category, productId } = await params;
  
//   console.log('📌 URL Params:', { category, productId });

//   const product = await getProductData(category, productId);
  
//   if (!product) {
//     notFound();
//   }

//   const categoryData = categories.find(cat => cat.name === category);
  
//   // WhatsApp message
//   const whatsappMessage = `Hello, I'm interested in this product:%0A%0A📦 *${product.name}*%0A💰 Price: ₹${product.price}%0A🌳 Wood: ${product.woodtype}%0A📏 Size: ${product.size}%0A${product.desc ? `📝 ${product.desc}%0A` : ''}%0APlease provide more details.`;

//   return (
//     <div className="wood-products-page">
//       {/* Debug Banner */}
//       <div style={{ 
//         background: '#e3f2fd', 
//         padding: '10px 15px',
//         borderBottom: '1px solid #bbdefb',
//         fontSize: '13px'
//       }}>
//         <strong>Debug:</strong> Category: {category} | Product: {productId} | #: {product.productNumber}
//       </div>

//       {/* Breadcrumb */}
//       <div className="wood-container" style={{ padding: '20px 15px 0' }}>
//         <div style={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: '8px', 
//           fontSize: '14px',
//           color: '#565959',
//           marginBottom: '20px'
//         }}>
//           <Link href="/" style={{ color: '#007185', textDecoration: 'none' }}>Home</Link>
//           <span>›</span>
//           <Link href="/products/wooden-doors" style={{ color: '#007185', textDecoration: 'none' }}>
//             Products
//           </Link>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '500' }}>
//             {categoryData?.displayName || 'Product'}
//           </span>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '600' }}>
//             {product.name}
//           </span>
//         </div>
//       </div>

//       {/* Main Content - Same JSX as before but without useState/useEffect */}
//       <div className="wood-container" style={{ padding: '0 15px 40px' }}>
//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: '1fr 1fr', 
//           gap: '40px',
//           marginTop: '20px'
//         }}>
//           {/* Left Column - Images */}
//           <div>
//             <div style={{ 
//               background: '#ffffff',
//               border: '1px solid #e7e7e7',
//               borderRadius: '8px',
//               padding: '20px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//             }}>
//               {product.images && product.images.length > 0 ? (
//                 <div>
//                   {/* Main Image */}
//                   <div style={{ 
//                     position: 'relative', 
//                     height: '400px',
//                     marginBottom: '20px',
//                     borderRadius: '6px',
//                     overflow: 'hidden',
//                     background: '#f8f8f8'
//                   }}>
//                     <Image
//                       src={product.images[0]}
//                       alt={product.name}
//                       fill
//                       style={{ objectFit: 'contain' }}
//                       sizes="(max-width: 768px) 100vw, 50vw"
//                       priority
//                     />
//                   </div>
                  
//                   {/* Thumbnails */}
//                   {product.images.length > 1 && (
//                     <div style={{ 
//                       display: 'flex', 
//                       gap: '10px',
//                       justifyContent: 'center'
//                     }}>
//                       {product.images.map((img, index) => (
//                         <div
//                           key={index}
//                           style={{
//                             width: '70px',
//                             height: '70px',
//                             border: '1px solid #ddd',
//                             borderRadius: '6px',
//                             overflow: 'hidden',
//                             background: '#f8f8f8'
//                           }}
//                         >
//                           <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                             <Image
//                               src={img}
//                               alt={`View ${index + 1}`}
//                               fill
//                               style={{ objectFit: 'cover' }}
//                               sizes="70px"
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div style={{ 
//                   height: '400px', 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: 'center',
//                   background: '#f8f8f8',
//                   borderRadius: '6px',
//                   color: '#666'
//                 }}>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontSize: '48px', marginBottom: '15px' }}>🖼️</div>
//                     <p>No images available</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Product Info */}
//           <div>
//             <div style={{ 
//               background: '#ffffff',
//               border: '1px solid #e7e7e7',
//               borderRadius: '8px',
//               padding: '30px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//             }}>
//               {/* Product Title */}
//               <h1 style={{ 
//                 fontSize: '28px', 
//                 fontWeight: '500', 
//                 color: '#0f1111',
//                 marginBottom: '15px',
//                 lineHeight: '1.3'
//               }}>
//                 {product.name}
//               </h1>
              
//               {/* Rating */}
//               {product.rating && (
//                 <div style={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   gap: '8px',
//                   marginBottom: '20px'
//                 }}>
//                   <div style={{ 
//                     background: '#ffa41c', 
//                     color: 'white',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '4px'
//                   }}>
//                     <span>⭐</span>
//                     <span>{product.rating}</span>
//                   </div>
//                   {product.sales > 0 && (
//                     <span style={{ fontSize: '14px', color: '#565959' }}>
//                       🔥 {product.sales}+ Sold
//                     </span>
//                   )}
//                 </div>
//               )}
              
//               {/* Price */}
//               <div style={{ 
//                 padding: '20px', 
//                 background: '#fafafa', 
//                 borderRadius: '8px',
//                 marginBottom: '25px',
//                 border: '1px solid #e7e7e7'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'baseline' }}>
//                   <span style={{ fontSize: '16px', marginRight: '4px', color: '#565959' }}>₹</span>
//                   <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f1111' }}>
//                     {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: '14px', color: '#565959', marginTop: '5px' }}>
//                   Inclusive of all taxes • Free installation support
//                 </div>
//               </div>
              
//               {/* Specifications */}
//               <div style={{ marginBottom: '25px' }}>
//                 <h2 style={{ 
//                   fontSize: '20px', 
//                   fontWeight: '600', 
//                   marginBottom: '15px',
//                   paddingBottom: '10px',
//                   borderBottom: '2px solid #ffa41c'
//                 }}>
//                   Product Specifications
//                 </h2>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Wood Type</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>{product.woodtype}</div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Size</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>{product.size}</div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Category</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>
//                       {categoryData?.displayName || category}
//                     </div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Product Code</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>
//                       {category?.toUpperCase() || 'PROD'}-{product.productNumber}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Description */}
//               {product.desc && (
//                 <div style={{ marginBottom: '25px' }}>
//                   <h2 style={{ 
//                     fontSize: '20px', 
//                     fontWeight: '600', 
//                     marginBottom: '15px',
//                     paddingBottom: '10px',
//                     borderBottom: '2px solid #ffa41c'
//                   }}>
//                     Description
//                   </h2>
//                   <div style={{ 
//                     fontSize: '15px', 
//                     color: '#0f1111', 
//                     lineHeight: '1.6',
//                     whiteSpace: 'pre-line'
//                   }}>
//                     {product.desc}
//                   </div>
//                 </div>
//               )}
              
//               {/* Action Buttons */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                 <a
//                   href={`https://wa.me/919876543210?text=${whatsappMessage}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: '#25D366',
//                     color: 'white',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px'
//                   }}
//                 >
//                   <span>🛒</span> Buy Now on WhatsApp
//                 </a>
                
//                 <Link
//                   href="/products/wooden-doors"
//                   style={{
//                     background: '#f0f2f2',
//                     color: '#0f1111',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     border: '1px solid #d5d9d9',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     textDecoration: 'none',
//                     textAlign: 'center'
//                   }}
//                 >
//                   ← Back to Products
//                 </Link>
//               </div>
              
//               {/* Additional Info */}
//               <div style={{ 
//                 marginTop: '30px', 
//                 paddingTop: '20px', 
//                 borderTop: '1px solid #e7e7e7',
//                 fontSize: '13px',
//                 color: '#565959'
//               }}>
//                 <p style={{ marginBottom: '8px' }}>
//                   <strong>✅ Guarantee:</strong> 100% quality checked | 2-year warranty
//                 </p>
//                 <p style={{ marginBottom: '8px' }}>
//                   <strong>🚚 Delivery:</strong> Free delivery in city | 5-7 days
//                 </p>
//                 <p>
//                   <strong>🛠️ Installation:</strong> Free professional installation included
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ✅ Now add generateStaticParams
// export async function generateStaticParams() {
//   const categories = [
//     'woodenDoor',
//     'woodenFrame',
//     'safetyDoors',
//     'woodenBed',
//     'woodenMandir',
//     'woodenWindow',
//     'woodenArt',
//     'sofaChair'
//   ];
  
//   const params = [];
  
//   // Generate first 3 products for each category
//   for (const category of categories) {
//     for (let i = 1; i <= 3; i++) {
//       params.push({
//         category,
//         productId: `product${i}`
//       });
//     }
//   }
  
//   return params;
// }

// // ✅ Add this for dynamic behavior
// export const dynamicParams = true;
// export const revalidate = 3600; // Revalidate every hour


// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import fs from 'fs';
// import path from 'path';
// import '../../wooden-doors/products-styles.css';
// import { categories } from '@/utils/productData';

// // Category folders mapping
// const categoryFolders = {
//   woodenDoor: '1_woodenDoor',
//   woodenFrame: '2_WoodenFream',
//   safetyDoors: '3_safetyDoors',
//   woodenBed: '4_woodenBed',
//   woodenMandir: '5_woodenMandir',
//   woodenWindow: '6_woodenWindow',
//   woodenArt: '7_woodenArt',
//   sofaChair: '8_sofaChair'
// };

// // Read product data from file system
// async function getProductData(category, productId) {
//   try {
//     console.log('🔍 Getting product:', { category, productId });
    
//     // Extract product number
//     let productNumber = 1;
//     if (productId) {
//       const str = productId.toString();
//       const match = str.match(/product(\d+)/i);
//       if (match) {
//         productNumber = parseInt(match[1], 10);
//       } else {
//         const num = parseInt(str, 10);
//         if (!isNaN(num)) productNumber = num;
//       }
//     }

//     const folderName = categoryFolders[category];
//     if (!folderName) {
//       console.log('❌ Category not found:', category);
//       return null;
//     }

//     // Construct path to info.json in public folder
//     const infoPath = path.join(
//       process.cwd(), 
//       'public', 
//       'images', 
//       'category', 
//       folderName, 
//       `product${productNumber}`, 
//       'info.json'
//     );
    
//     console.log('📁 Reading from:', infoPath);
    
//     // Check if file exists
//     if (!fs.existsSync(infoPath)) {
//       console.log('❌ File does not exist:', infoPath);
//       return null;
//     }
    
//     // Read and parse JSON file
//     const fileContent = fs.readFileSync(infoPath, 'utf-8');
//     const infoData = JSON.parse(fileContent);
    
//     console.log('✅ Product data loaded');
    
//     // Check which images exist
//     const basePath = `/images/category/${folderName}/product${productNumber}/`;
//     const images = [];
    
//     // Check for images 1.webp to 4.webp
//     for (let i = 1; i <= 4; i++) {
//       const imagePath = path.join(
//         process.cwd(),
//         'public',
//         'images',
//         'category',
//         folderName,
//         `product${productNumber}`,
//         `${i}.webp`
//       );
      
//       if (fs.existsSync(imagePath)) {
//         images.push(`${basePath}${i}.webp`);
//         console.log(`🖼️ Found image ${i}: ${basePath}${i}.webp`);
//       }
//     }
    
//     return {
//       ...infoData,
//       images,
//       categoryName: category,
//       productNumber
//     };
    
//   } catch (error) {
//     console.error('💥 Error loading product:', error);
//     return null;
//   }
// }


// // Images Gallery Component (Add this before main component)
// function ImageGallery({ images, productName }) {
//   const [selectedImage, setSelectedImage] = useState(0);
  
//   if (!images || images.length === 0) {
//     return (
//       <div style={{ 
//         height: '400px', 
//         display: 'flex', 
//         alignItems: 'center', 
//         justifyContent: 'center',
//         background: '#f8f8f8',
//         borderRadius: '6px',
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
//       {/* Main Large Image */}
//       <div style={{ 
//         position: 'relative', 
//         height: '500px',
//         marginBottom: '20px',
//         borderRadius: '8px',
//         overflow: 'hidden',
//         background: '#f8f8f8',
//         border: '1px solid #e7e7e7'
//       }}>
//         <Image
//           src={images[selectedImage]}
//           alt={`${productName} - View ${selectedImage + 1}`}
//           fill
//           style={{ objectFit: 'contain' }}
//           sizes="(max-width: 768px) 100vw, 50vw"
//           priority
//         />
        
//         {/* Image Navigation Arrows */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
//               style={{
//                 position: 'absolute',
//                 left: '15px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'rgba(255, 255, 255, 0.9)',
//                 border: '1px solid #ddd',
//                 borderRadius: '50%',
//                 width: '44px',
//                 height: '44px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 cursor: 'pointer',
//                 fontSize: '20px',
//                 color: '#333',
//                 zIndex: 10,
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//               }}
//               aria-label="Previous image"
//             >
//               ←
//             </button>
//             <button
//               onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
//               style={{
//                 position: 'absolute',
//                 right: '15px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'rgba(255, 255, 255, 0.9)',
//                 border: '1px solid #ddd',
//                 borderRadius: '50%',
//                 width: '44px',
//                 height: '44px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 cursor: 'pointer',
//                 fontSize: '20px',
//                 color: '#333',
//                 zIndex: 10,
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//               }}
//               aria-label="Next image"
//             >
//               →
//             </button>
//           </>
//         )}
        
//         {/* Image Counter */}
//         <div style={{
//           position: 'absolute',
//           bottom: '15px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           background: 'rgba(0, 0, 0, 0.7)',
//           color: 'white',
//           padding: '6px 12px',
//           borderRadius: '20px',
//           fontSize: '13px',
//           fontWeight: '500',
//           zIndex: 10
//         }}>
//           {selectedImage + 1} / {images.length}
//         </div>
//       </div>
      
//       {/* Thumbnail Strip */}
//       {images.length > 1 && (
//         <div style={{ 
//           display: 'flex', 
//           gap: '12px',
//           justifyContent: 'center',
//           flexWrap: 'wrap',
//           marginTop: '15px'
//         }}>
//           {images.map((img, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedImage(index)}
//               style={{
//                 width: '80px',
//                 height: '80px',
//                 border: selectedImage === index ? '3px solid #ffa41c' : '2px solid #e7e7e7',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//                 background: '#f8f8f8',
//                 cursor: 'pointer',
//                 padding: 0,
//                 transition: 'all 0.2s ease'
//               }}
//               onMouseEnter={(e) => {
//                 if (selectedImage !== index) {
//                   e.target.style.borderColor = '#ffa41c';
//                   e.target.style.transform = 'scale(1.05)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (selectedImage !== index) {
//                   e.target.style.borderColor = '#e7e7e7';
//                   e.target.style.transform = 'scale(1)';
//                 }
//               }}
//               aria-label={`View image ${index + 1}`}
//             >
//               <div style={{ 
//                 position: 'relative', 
//                 width: '100%', 
//                 height: '100%',
//                 borderRadius: '5px',
//                 overflow: 'hidden'
//               }}>
//                 <Image
//                   src={img}
//                   alt={`${productName} thumbnail ${index + 1}`}
//                   fill
//                   style={{ objectFit: 'cover' }}
//                   sizes="80px"
//                 />
                
//                 {/* Image number badge for thumbnails */}
//                 <div style={{
//                   position: 'absolute',
//                   bottom: '4px',
//                   right: '4px',
//                   background: 'rgba(0, 0, 0, 0.6)',
//                   color: 'white',
//                   fontSize: '10px',
//                   padding: '2px 6px',
//                   borderRadius: '10px'
//                 }}>
//                   {index + 1}
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}
      
//       {/* Image Description */}
//       <div style={{
//         marginTop: '20px',
//         textAlign: 'center',
//         fontSize: '13px',
//         color: '#666'
//       }}>
//         <p>Click on thumbnails to view different angles</p>
//         <p style={{ fontSize: '12px', marginTop: '5px' }}>
//           Showing {images.length} image{images.length > 1 ? 's' : ''} • Use arrows to navigate
//         </p>
//       </div>
//     </div>
//   );
// }





// export default async function ProductDetailPage({ params }) {
//   const { category, productId } = await params;
  
//   console.log('📌 URL Params:', { category, productId });

//   const product = await getProductData(category, productId);
  
//   if (!product) {
//     console.log('❌ Product not found, showing 404');
//     notFound();
//   }

//   const categoryData = categories.find(cat => cat.name === category);
  
//   // WhatsApp message
//   const whatsappMessage = `Hello, I'm interested in this product:%0A%0A📦 *${product.name}*%0A💰 Price: ₹${product.price}%0A🌳 Wood: ${product.woodtype}%0A📏 Size: ${product.size}%0A${product.desc ? `📝 ${product.desc}%0A` : ''}%0APlease provide more details.`;

//   return (
//     <div className="wood-products-page">
//       {/* Debug Banner */}
//       <div style={{ 
//         background: '#e3f2fd', 
//         padding: '10px 15px',
//         borderBottom: '1px solid #bbdefb',
//         fontSize: '13px'
//       }}>
//         <strong>Debug:</strong> Category: {category} | Product: {productId} | #: {product.productNumber}
//       </div>

//       {/* Breadcrumb */}
//       <div className="wood-container" style={{ padding: '20px 15px 0' }}>
//         <div style={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: '8px', 
//           fontSize: '14px',
//           color: '#565959',
//           marginBottom: '20px'
//         }}>
//           <Link href="/" style={{ color: '#007185', textDecoration: 'none' }}>Home</Link>
//           <span>›</span>
//           <Link href="/products/wooden-doors" style={{ color: '#007185', textDecoration: 'none' }}>
//             Products
//           </Link>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '500' }}>
//             {categoryData?.displayName || 'Product'}
//           </span>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '600' }}>
//             {product.name}
//           </span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container" style={{ padding: '0 15px 40px' }}>
//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: '1fr 1fr', 
//           gap: '40px',
//           marginTop: '20px'
//         }}>
//           {/* Left Column - Images */}
//           <div>
//             <div style={{ 
//               background: '#ffffff',
//               border: '1px solid #e7e7e7',
//               borderRadius: '8px',
//               padding: '20px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//             }}>
//               {product.images && product.images.length > 0 ? (
//                 <div>
//                   {/* Main Image */}
//                   <div style={{ 
//                     position: 'relative', 
//                     height: '400px',
//                     marginBottom: '20px',
//                     borderRadius: '6px',
//                     overflow: 'hidden',
//                     background: '#f8f8f8'
//                   }}>
//                     <Image
//                       src={product.images[0]}
//                       alt={product.name}
//                       fill
//                       style={{ objectFit: 'contain' }}
//                       sizes="(max-width: 768px) 100vw, 50vw"
//                       priority
//                     />
//                   </div>
                  
//                   {/* Thumbnails */}
//                   {product.images.length > 1 && (
//                     <div style={{ 
//                       display: 'flex', 
//                       gap: '10px',
//                       justifyContent: 'center'
//                     }}>
//                       {product.images.map((img, index) => (
//                         <div
//                           key={index}
//                           style={{
//                             width: '70px',
//                             height: '70px',
//                             border: '1px solid #ddd',
//                             borderRadius: '6px',
//                             overflow: 'hidden',
//                             background: '#f8f8f8'
//                           }}
//                         >
//                           <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//                             <Image
//                               src={img}
//                               alt={`View ${index + 1}`}
//                               fill
//                               style={{ objectFit: 'cover' }}
//                               sizes="70px"
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div style={{ 
//                   height: '400px', 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: 'center',
//                   background: '#f8f8f8',
//                   borderRadius: '6px',
//                   color: '#666'
//                 }}>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontSize: '48px', marginBottom: '15px' }}>🖼️</div>
//                     <p>No images available</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Product Info */}
//           <div>
//             <div style={{ 
//               background: '#ffffff',
//               border: '1px solid #e7e7e7',
//               borderRadius: '8px',
//               padding: '30px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//             }}>
//               {/* Product Title */}
//               <h1 style={{ 
//                 fontSize: '28px', 
//                 fontWeight: '500', 
//                 color: '#0f1111',
//                 marginBottom: '15px',
//                 lineHeight: '1.3'
//               }}>
//                 {product.name}
//               </h1>
              
//               {/* Rating */}
//               {product.rating && (
//                 <div style={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   gap: '8px',
//                   marginBottom: '20px'
//                 }}>
//                   <div style={{ 
//                     background: '#ffa41c', 
//                     color: 'white',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '4px'
//                   }}>
//                     <span>⭐</span>
//                     <span>{product.rating}</span>
//                   </div>
//                   {product.sales > 0 && (
//                     <span style={{ fontSize: '14px', color: '#565959' }}>
//                       🔥 {product.sales}+ Sold
//                     </span>
//                   )}
//                 </div>
//               )}
              
//               {/* Price */}
//               <div style={{ 
//                 padding: '20px', 
//                 background: '#fafafa', 
//                 borderRadius: '8px',
//                 marginBottom: '25px',
//                 border: '1px solid #e7e7e7'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'baseline' }}>
//                   <span style={{ fontSize: '16px', marginRight: '4px', color: '#565959' }}>₹</span>
//                   <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f1111' }}>
//                     {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: '14px', color: '#565959', marginTop: '5px' }}>
//                   Inclusive of all taxes • Free installation support
//                 </div>
//               </div>
              
//               {/* Specifications */}
//               <div style={{ marginBottom: '25px' }}>
//                 <h2 style={{ 
//                   fontSize: '20px', 
//                   fontWeight: '600', 
//                   marginBottom: '15px',
//                   paddingBottom: '10px',
//                   borderBottom: '2px solid #ffa41c'
//                 }}>
//                   Product Specifications
//                 </h2>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Wood Type</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>{product.woodtype}</div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Size</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>{product.size}</div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Category</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>
//                       {categoryData?.displayName || category}
//                     </div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Product Code</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>
//                       {category?.toUpperCase() || 'PROD'}-{product.productNumber}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Description */}
//               {product.desc && (
//                 <div style={{ marginBottom: '25px' }}>
//                   <h2 style={{ 
//                     fontSize: '20px', 
//                     fontWeight: '600', 
//                     marginBottom: '15px',
//                     paddingBottom: '10px',
//                     borderBottom: '2px solid #ffa41c'
//                   }}>
//                     Description
//                   </h2>
//                   <div style={{ 
//                     fontSize: '15px', 
//                     color: '#0f1111', 
//                     lineHeight: '1.6',
//                     whiteSpace: 'pre-line'
//                   }}>
//                     {product.desc}
//                   </div>
//                 </div>
//               )}
              
//               {/* Action Buttons */}
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                 <a
//                   href={`https://wa.me/919876543210?text=${whatsappMessage}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     background: '#25D366',
//                     color: 'white',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     textDecoration: 'none',
//                     textAlign: 'center',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '10px'
//                   }}
//                 >
//                   <span>🛒</span> Buy Now on WhatsApp
//                 </a>
                
//                 <Link
//                   href="/products/wooden-doors"
//                   style={{
//                     background: '#f0f2f2',
//                     color: '#0f1111',
//                     padding: '16px 24px',
//                     borderRadius: '8px',
//                     border: '1px solid #d5d9d9',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     textDecoration: 'none',
//                     textAlign: 'center'
//                   }}
//                 >
//                   ← Back to Products
//                 </Link>
//               </div>
              
//               {/* Additional Info */}
//               <div style={{ 
//                 marginTop: '30px', 
//                 paddingTop: '20px', 
//                 borderTop: '1px solid #e7e7e7',
//                 fontSize: '13px',
//                 color: '#565959'
//               }}>
//                 <p style={{ marginBottom: '8px' }}>
//                   <strong>✅ Guarantee:</strong> 100% quality checked | 2-year warranty
//                 </p>
//                 <p style={{ marginBottom: '8px' }}>
//                   <strong>🚚 Delivery:</strong> Free delivery in city | 5-7 days
//                 </p>
//                 <p>
//                   <strong>🛠️ Installation:</strong> Free professional installation included
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Generate static paths
// export async function generateStaticParams() {
//   console.log('🔧 Generating static params');
  
//   const categories = [
//     'woodenDoor',
//     'woodenFrame',
//     'safetyDoors',
//     'woodenBed',
//     'woodenMandir',
//     'woodenWindow',
//     'woodenArt',
//     'sofaChair'
//   ];
  
//   const params = [];
  
//   // Generate first 5 products for each category
//   for (const category of categories) {
//     for (let i = 1; i <= 5; i++) {
//       params.push({
//         category,
//         productId: `product${i}`
//       });
//     }
//   }
  
//   console.log(`Generated ${params.length} static paths`);
//   return params;
// }

// // Optional: Add revalidation
// export const revalidate = 60; // Revalidate every 60 seconds


// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import fs from 'fs';
// import path from 'path';
// import '../../wooden-doors/products-styles.css';
// import { categories } from '@/utils/productData';
// import ProductImages from './ProductImages'; // ✅ Import the Client Component

// // Category folders mapping
// const categoryFolders = {
//   woodenDoor: '1_woodenDoor',
//   woodenFrame: '2_WoodenFream',
//   safetyDoors: '3_safetyDoors',
//   woodenBed: '4_woodenBed',
//   woodenMandir: '5_woodenMandir',
//   woodenWindow: '6_woodenWindow',
//   woodenArt: '7_woodenArt',
//   sofaChair: '8_sofaChair'
// };

// // Read product data from file system
// async function getProductData(category, productId) {
//   try {
//     console.log('🔍 Getting product:', { category, productId });
    
//     // Extract product number
//     let productNumber = 1;
//     if (productId) {
//       const str = productId.toString();
//       const match = str.match(/product(\d+)/i);
//       if (match) {
//         productNumber = parseInt(match[1], 10);
//       } else {
//         const num = parseInt(str, 10);
//         if (!isNaN(num)) productNumber = num;
//       }
//     }

//     const folderName = categoryFolders[category];
//     if (!folderName) {
//       console.log('❌ Category not found:', category);
//       return null;
//     }

//     // Construct path to info.json in public folder
//     const infoPath = path.join(
//       process.cwd(), 
//       'public', 
//       'images', 
//       'category', 
//       folderName, 
//       `product${productNumber}`, 
//       'info.json'
//     );
    
//     console.log('📁 Reading from:', infoPath);
    
//     // Check if file exists
//     if (!fs.existsSync(infoPath)) {
//       console.log('❌ File does not exist:', infoPath);
//       return null;
//     }
    
//     // Read and parse JSON file
//     const fileContent = fs.readFileSync(infoPath, 'utf-8');
//     const infoData = JSON.parse(fileContent);
    
//     console.log('✅ Product data loaded');
    
//     // Check which images exist
//     const basePath = `/images/category/${folderName}/product${productNumber}/`;
//     const images = [];
    
//     // Check for images 1.webp to 4.webp
//     for (let i = 1; i <= 4; i++) {
//       const imagePath = path.join(
//         process.cwd(),
//         'public',
//         'images',
//         'category',
//         folderName,
//         `product${productNumber}`,
//         `${i}.webp`
//       );
      
//       if (fs.existsSync(imagePath)) {
//         images.push(`${basePath}${i}.webp`);
//         console.log(`🖼️ Found image ${i}: ${basePath}${i}.webp`);
//       }
//     }
    
//     return {
//       ...infoData,
//       images,
//       categoryName: category,
//       productNumber
//     };
    
//   } catch (error) {
//     console.error('💥 Error loading product:', error);
//     return null;
//   }
// }

// export default async function ProductDetailPage({ params }) {
//   const { category, productId } = await params;
  
//   console.log('📌 URL Params:', { category, productId });

//   const product = await getProductData(category, productId);
  
//   if (!product) {
//     console.log('❌ Product not found, showing 404');
//     notFound();
//   }

//   const categoryData = categories.find(cat => cat.name === category);
  
//   // WhatsApp message
//   const whatsappMessage = `Hello, I'm interested in this product:%0A%0A📦 *${product.name}*%0A💰 Price: ₹${product.price}%0A🌳 Wood: ${product.woodtype}%0A📏 Size: ${product.size}%0A${product.desc ? `📝 ${product.desc}%0A` : ''}%0APlease provide more details.`;

//   return (
//     <div className="wood-products-page">
//       {/* Debug Banner */}
//       <div style={{ 
//         background: '#e3f2fd', 
//         padding: '10px 15px',
//         borderBottom: '1px solid #bbdefb',
//         fontSize: '13px'
//       }}>
//         <strong>Images Found:</strong> {product.images?.length || 0} images | 
//         <strong> Product:</strong> {product.name}
//       </div>

//       {/* Breadcrumb */}
//       <div className="wood-container" style={{ padding: '20px 15px 0' }}>
//         <div style={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: '8px', 
//           fontSize: '14px',
//           color: '#565959',
//           marginBottom: '20px'
//         }}>
//           <Link href="/" style={{ color: '#007185', textDecoration: 'none' }}>Home</Link>
//           <span>›</span>
//           <Link href="/products/wooden-doors" style={{ color: '#007185', textDecoration: 'none' }}>
//             Products
//           </Link>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '500' }}>
//             {categoryData?.displayName || 'Product'}
//           </span>
//           <span>›</span>
//           <span style={{ color: '#0f1111', fontWeight: '600' }}>
//             {product.name}
//           </span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="wood-container" style={{ padding: '0 15px 40px' }}>
//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: '1fr 1fr', 
//           gap: '40px',
//           marginTop: '20px'
//         }}>
//           {/* Left Column - Images Gallery */}
//           <div>
//             <div style={{ 
//               background: '#ffffff',
//               border: '1px solid #e7e7e7',
//               borderRadius: '12px',
//               padding: '25px',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
//             }}>
//               <h3 style={{ 
//                 fontSize: '18px', 
//                 fontWeight: '600', 
//                 marginBottom: '20px',
//                 color: '#0f1111',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}>
//                 <span>🖼️</span> Product Gallery ({product.images?.length || 0} images)
//               </h3>
              
//               {/* ✅ Use the ProductImages Component */}
//               <ProductImages 
//                 images={product.images} 
//                 productName={product.name}
//               />
              
//               {/* Image Details */}
//               <div style={{
//                 marginTop: '25px',
//                 paddingTop: '20px',
//                 borderTop: '1px solid #f0f0f0'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   fontSize: '14px',
//                   color: '#666'
//                 }}>
//                   <div>
//                     <span style={{ fontWeight: '500', color: '#333' }}>View Options:</span>
//                     <div style={{ marginTop: '5px', fontSize: '13px' }}>
//                       • Click thumbnails to switch views
//                       <br/>• Use arrows for navigation
//                       <br/>• Shows all available angles
//                     </div>
//                   </div>
//                   <div style={{
//                     background: '#f8f8f8',
//                     padding: '8px 12px',
//                     borderRadius: '6px',
//                     fontSize: '12px',
//                     fontWeight: '500',
//                     color: '#ffa41c'
//                   }}>
//                     {product.images?.length || 0}/4 photos
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Product Info */}
//           <div>
//             <div style={{ 
//               background: '#ffffff',
//               border: '1px solid #e7e7e7',
//               borderRadius: '12px',
//               padding: '30px',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
//             }}>
//               {/* Product Title */}
//               <h1 style={{ 
//                 fontSize: '28px', 
//                 fontWeight: '500', 
//                 color: '#0f1111',
//                 marginBottom: '15px',
//                 lineHeight: '1.3'
//               }}>
//                 {product.name}
//               </h1>
              
//               {/* Rating */}
//               {product.rating && (
//                 <div style={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   gap: '8px',
//                   marginBottom: '20px'
//                 }}>
//                   <div style={{ 
//                     background: '#ffa41c', 
//                     color: 'white',
//                     padding: '4px 8px',
//                     borderRadius: '4px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '4px'
//                   }}>
//                     <span>⭐</span>
//                     <span>{product.rating}</span>
//                   </div>
//                   {product.sales > 0 && (
//                     <span style={{ fontSize: '14px', color: '#565959' }}>
//                       🔥 {product.sales}+ Sold
//                     </span>
//                   )}
//                 </div>
//               )}
              
//               {/* Price */}
//               <div style={{ 
//                 padding: '20px', 
//                 background: '#fafafa', 
//                 borderRadius: '8px',
//                 marginBottom: '25px',
//                 border: '1px solid #e7e7e7'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'baseline' }}>
//                   <span style={{ fontSize: '16px', marginRight: '4px', color: '#565959' }}>₹</span>
//                   <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f1111' }}>
//                     {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
//                   </span>
//                 </div>
//                 <div style={{ fontSize: '14px', color: '#565959', marginTop: '5px' }}>
//                   Inclusive of all taxes • Free installation support
//                 </div>
//               </div>
              
//               {/* Specifications */}
//               <div style={{ marginBottom: '25px' }}>
//                 <h2 style={{ 
//                   fontSize: '20px', 
//                   fontWeight: '600', 
//                   marginBottom: '15px',
//                   paddingBottom: '10px',
//                   borderBottom: '2px solid #ffa41c'
//                 }}>
//                   Product Specifications
//                 </h2>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Wood Type</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>{product.woodtype}</div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Size</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>{product.size}</div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Category</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>
//                       {categoryData?.displayName || category}
//                     </div>
//                   </div>
//                   <div>
//                     <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Product Code</div>
//                     <div style={{ fontSize: '16px', fontWeight: '500' }}>
//                       {category?.toUpperCase() || 'PROD'}-{product.productNumber}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Description */}
//               {product.desc && (
//                 <div style={{ marginBottom: '25px' }}>
//                   <h2 style={{ 
//                     fontSize: '20px', 
//                     fontWeight: '600', 
//                     marginBottom: '15px',
//                     paddingBottom: '10px',
//                     borderBottom: '2px solid #ffa41c'
//                   }}>
//                     Description
//                   </h2>
//                   <div style={{ 
//                     fontSize: '15px', 
//                     color: '#0f1111', 
//                     lineHeight: '1.6',
//                     whiteSpace: 'pre-line'
//                   }}>
//                     {product.desc}
//                   </div>
//                 </div>
//               )}
              
//               {/* Action Buttons */}
//              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//   <a
//     href={`https://wa.me/919876543210?text=${whatsappMessage}`}
//     target="_blank"
//     rel="noopener noreferrer"
//     style={{
//       background: '#25D366',
//       color: 'white',
//       padding: '16px 24px',
//       borderRadius: '8px',
//       textDecoration: 'none',
//       textAlign: 'center',
//       fontSize: '16px',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '10px'
//     }}
//     className="whatsapp-button" // ✅ CSS class use करें
//   >
//     <span>🛒</span> Buy Now on WhatsApp
//   </a>
  
//   <Link
//     href="/products/wooden-doors"
//     style={{
//       background: '#f0f2f2',
//       color: '#0f1111',
//       padding: '16px 24px',
//       borderRadius: '8px',
//       border: '1px solid #d5d9d9',
//       fontSize: '16px',
//       fontWeight: '600',
//       textDecoration: 'none',
//       textAlign: 'center'
//     }}
//     className="back-button" // ✅ CSS class use करें
//   >
//     ← Back to Products
//   </Link>
// </div>
              
//               {/* Additional Info */}
//               <div style={{ 
//                 marginTop: '30px', 
//                 paddingTop: '20px', 
//                 borderTop: '1px solid #e7e7e7',
//                 fontSize: '13px',
//                 color: '#565959'
//               }}>
//                 <p style={{ marginBottom: '8px' }}>
//                   <strong>✅ Guarantee:</strong> 100% quality checked | 2-year warranty
//                 </p>
//                 <p style={{ marginBottom: '8px' }}>
//                   <strong>🚚 Delivery:</strong> Free delivery in city | 5-7 days
//                 </p>
//                 <p>
//                   <strong>🛠️ Installation:</strong> Free professional installation included
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Generate static paths
// export async function generateStaticParams() {
//   console.log('🔧 Generating static params');
  
//   const categories = [
//     'woodenDoor',
//     'woodenFrame',
//     'safetyDoors',
//     'woodenBed',
//     'woodenMandir',
//     'woodenWindow',
//     'woodenArt',
//     'sofaChair'
//   ];
  
//   const params = [];
  
//   // Generate first 5 products for each category
//   for (const category of categories) {
//     for (let i = 1; i <= 5; i++) {
//       params.push({
//         category,
//         productId: `product${i}`
//       });
//     }
//   }
  
//   console.log(`Generated ${params.length} static paths`);
//   return params;
// }

// // Optional: Add revalidation
// export const revalidate = 60; // Revalidate every 60 seconds


import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import '../../wooden-doors/products-styles.css';
import '../../wooden-doors/product-detail-styles.css'; // ✅ Import new CSS
import { categories } from '@/utils/productData';
import ProductImages from './ProductImages';
import Navbar from '@/components/Navbar';

// Category folders mapping
const categoryFolders = {
  woodenDoor: '1_woodenDoor',
  woodenFrame: '2_WoodenFream',
  safetyDoors: '3_safetyDoors',
  woodenBed: '4_woodenBed',
  woodenMandir: '5_woodenMandir',
  woodenWindow: '6_woodenWindow',
  woodenArt: '7_woodenArt',
  sofaChair: '8_sofaChair'
};

// Read product data from file system
async function getProductData(category, productId) {
  try {
    console.log('🔍 Getting product:', { category, productId });
    
    // Extract product number
    let productNumber = 1;
    if (productId) {
      const str = productId.toString();
      const match = str.match(/product(\d+)/i);
      if (match) {
        productNumber = parseInt(match[1], 10);
      } else {
        const num = parseInt(str, 10);
        if (!isNaN(num)) productNumber = num;
      }
    }

    const folderName = categoryFolders[category];
    if (!folderName) {
      console.log('❌ Category not found:', category);
      return null;
    }

    // Construct path to info.json in public folder
    const infoPath = path.join(
      process.cwd(), 
      'public', 
      'images', 
      'category', 
      folderName, 
      `product${productNumber}`, 
      'info.json'
    );
    
    console.log('📁 Reading from:', infoPath);
    
    // Check if file exists
    if (!fs.existsSync(infoPath)) {
      console.log('❌ File does not exist:', infoPath);
      return null;
    }
    
    // Read and parse JSON file
    const fileContent = fs.readFileSync(infoPath, 'utf-8');
    const infoData = JSON.parse(fileContent);
    
    console.log('✅ Product data loaded');
    
    // Check which images exist
    const basePath = `/images/category/${folderName}/product${productNumber}/`;
    const images = [];
    
    // Check for images 1.webp to 4.webp
    for (let i = 1; i <= 4; i++) {
      const imagePath = path.join(
        process.cwd(),
        'public',
        'images',
        'category',
        folderName,
        `product${productNumber}`,
        `${i}.webp`
      );
      
      if (fs.existsSync(imagePath)) {
        images.push(`${basePath}${i}.webp`);
        console.log(`🖼️ Found image ${i}: ${basePath}${i}.webp`);
      }
    }
    
    return {
      ...infoData,
      images,
      categoryName: category,
      productNumber
    };
    
  } catch (error) {
    console.error('💥 Error loading product:', error);
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { category, productId } = await params;
  
  console.log('📌 URL Params:', { category, productId });

  const product = await getProductData(category, productId);
  
  if (!product) {
    console.log('❌ Product not found, showing 404');
    notFound();
  }

  const categoryData = categories.find(cat => cat.name === category);
  
  // WhatsApp message
  const whatsappMessage = `Hello, I'm interested in this product:%0A%0A📦 *${product.name}*%0A💰 Price: ₹${product.price}%0A🌳 Wood: ${product.woodtype}%0A📏 Size: ${product.size}%0A${product.desc ? `📝 ${product.desc}%0A` : ''}%0APlease provide more details.`;

  return (
    <>



    <Navbar />
    <div className="product-detail-page"> {/* ✅ Changed class */}
      {/* Debug Banner */}
      <div className="debug-banner"> {/* ✅ Changed class */}
        <strong>Images Found:</strong> {product.images?.length || 0} images | 
        <strong> Product:</strong> {product.name}
      </div>

      {/* Breadcrumb */}
      <div className="product-detail-container"> {/* ✅ Changed class */}
        <div className="product-breadcrumb"> {/* ✅ Changed class */}
          <Link href="/" className="breadcrumb-link">Home</Link> {/* ✅ Changed class */}
          <span className="breadcrumb-separator">›</span> {/* ✅ Changed class */}
          <Link href="/products/wooden-doors" className="breadcrumb-link"> {/* ✅ Changed class */}
            Products
          </Link>
          <span className="breadcrumb-separator">›</span> {/* ✅ Changed class */}
          <span className="breadcrumb-current"> {/* ✅ Changed class */}
            {categoryData?.displayName || 'Product'}
          </span>
          <span className="breadcrumb-separator">›</span> {/* ✅ Changed class */}
          <span className="breadcrumb-current" style={{ fontWeight: '600' }}> {/* ✅ Changed class */}
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="product-detail-container"> {/* ✅ Changed class */}
        <div className="product-detail-layout"> {/* ✅ Changed class */}
          {/* Left Column - Images Gallery */}
          <div>
            <div className="image-gallery-section"> {/* ✅ Changed class */}
              <h3 className="gallery-title"> {/* ✅ Changed class */}
                <span>🖼️</span> Product Gallery ({product.images?.length || 0} images)
              </h3>
              
              {/* ✅ Use the ProductImages Component */}
              <ProductImages 
                images={product.images} 
                productName={product.name}
              />
              
              {/* Image Details */}
              <div className="image-details"> {/* ✅ Changed class */}
                <div className="details-row"> {/* ✅ Changed class */}
                  <div>
                    <span style={{ fontWeight: '500', color: '#333' }}>View Options:</span>
                    <div style={{ marginTop: '5px', fontSize: '13px' }}>
                      • Click thumbnails to switch views
                      <br/>• Use arrows for navigation
                      <br/>• Shows all available angles
                    </div>
                  </div>
                  <div className="image-count-badge"> {/* ✅ Changed class */}
                    {product.images?.length || 0}/4 photos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="product-info-section"> {/* ✅ Changed class */}
              {/* Product Title */}
              <h1 className="product-title"> {/* ✅ Changed class */}
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="rating-section"> {/* ✅ Changed class */}
                  <div className="rating-badge"> {/* ✅ Changed class */}
                    <span>⭐</span>
                    <span>{product.rating}</span>
                  </div>
                  {product.sales > 0 && (
                    <span className="sales-count"> {/* ✅ Changed class */}
                      🔥 {product.sales}+ Sold
                    </span>
                  )}
                </div>
              )}
              
              {/* Price */}
              <div className="price-section"> {/* ✅ Changed class */}
                <div className="price-amount"> {/* ✅ Changed class */}
                  <span className="price-symbol">₹</span> {/* ✅ Changed class */}
                  <span className="price-value"> {/* ✅ Changed class */}
                    {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                  </span>
                </div>
                <div className="price-note"> {/* ✅ Changed class */}
                  Inclusive of all taxes • Free installation support
                </div>
              </div>
              
              {/* Specifications */}
              <div className="specifications-section"> {/* ✅ Changed class */}
                <h2 className="section-title"> {/* ✅ Changed class */}
                  Product Specifications
                </h2>
                <div className="specs-grid"> {/* ✅ Changed class */}
                  <div className="spec-item"> {/* ✅ Changed class */}
                    <div className="spec-label">Wood Type</div> {/* ✅ Changed class */}
                    <div className="spec-value">{product.woodtype}</div> {/* ✅ Changed class */}
                  </div>
                  <div className="spec-item"> {/* ✅ Changed class */}
                    <div className="spec-label">Size</div> {/* ✅ Changed class */}
                    <div className="spec-value">{product.size}</div> {/* ✅ Changed class */}
                  </div>
                  <div className="spec-item"> {/* ✅ Changed class */}
                    <div className="spec-label">Category</div> {/* ✅ Changed class */}
                    <div className="spec-value"> {/* ✅ Changed class */}
                      {categoryData?.displayName || category}
                    </div>
                  </div>
                  <div className="spec-item"> {/* ✅ Changed class */}
                    <div className="spec-label">Product Code</div> {/* ✅ Changed class */}
                    <div className="spec-value"> {/* ✅ Changed class */}
                      {category?.toUpperCase() || 'PROD'}-{product.productNumber}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              {product.desc && (
                <div className="description-section"> {/* ✅ Changed class */}
                  <h2 className="section-title"> {/* ✅ Changed class */}
                    Description
                  </h2>
                  <div className="description-content"> {/* ✅ Changed class */}
                    {product.desc}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="action-buttons"> {/* ✅ Changed class */}
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button" /* ✅ Changed class */
                >
                  <span>🛒</span> Buy Now on WhatsApp
                </a>
                
                <Link
                  href="/products/wooden-doors"
                  className="back-button" /* ✅ Changed class */
                >
                  ← Back to Products
                </Link>
              </div>
              
              {/* Additional Info */}
              <div className="additional-info"> {/* ✅ Changed class */}
                <p className="info-item"> {/* ✅ Changed class */}
                  <strong>✅ Guarantee:</strong> 100% quality checked | 2-year warranty
                </p>
                <p className="info-item"> {/* ✅ Changed class */}
                  <strong>🚚 Delivery:</strong> Free delivery in city | 5-7 days
                </p>
                <p className="info-item"> {/* ✅ Changed class */}
                  <strong>🛠️ Installation:</strong> Free professional installation included
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

// Generate static paths
export async function generateStaticParams() {
  console.log('🔧 Generating static params');
  
  const categories = [
    'woodenDoor',
    'woodenFrame',
    'safetyDoors',
    'woodenBed',
    'woodenMandir',
    'woodenWindow',
    'woodenArt',
    'sofaChair'
  ];
  
  const params = [];
  
  // Generate first 5 products for each category
  for (const category of categories) {
    for (let i = 1; i <= 5; i++) {
      params.push({
        category,
        productId: `product${i}`
      });
    }
  }
  
  console.log(`Generated ${params.length} static paths`);
  return params;
}

// Optional: Add revalidation
export const revalidate = 60; // Revalidate every 60 seconds


