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

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import '@/products-styles.css';
import { categories } from '@/utils/productData';

const StarIcon = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#ffa41c" : "none"} stroke="#ffa41c" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// ✅ FIXED: Function to fetch product data with correct paths
const fetchProductData = async (categoryName, productNumber) => {
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
  
  const folderName = categoryFolders[categoryName];
  if (!folderName) return null;
  
  // ✅ FIXED: Correct paths
  const infoUrl = `/images/category/${folderName}/product${productNumber}/info.json`;
  const basePath = `/images/category/${folderName}/product${productNumber}/`;
  
  try {
    // Fetch product info
    console.log('Fetching info from:', infoUrl);
    const infoResponse = await fetch(infoUrl);
    
    if (!infoResponse.ok) {
      console.error('Info not found:', infoResponse.status);
      throw new Error('Product info not found');
    }
    
    const infoData = await infoResponse.json();
    console.log('Info data loaded:', infoData);
    
    // Get all available images (1.webp to 4.webp)
    const images = [];
    for (let i = 1; i <= 4; i++) {
      const imageUrl = `${basePath}${i}.webp`;
      console.log('Checking image:', imageUrl);
      
      // Try to check if image exists
      try {
        // For images, we can't use HEAD request due to CORS sometimes
        // So we'll just construct the URL and let Image component handle errors
        images.push(imageUrl);
      } catch {
        console.log(`Image ${i} not found`);
      }
    }
    
    console.log('Images array:', images);
    
    return {
      ...infoData,
      images,
      categoryName,
      productNumber,
      folderName
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return null;
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { category, productId } = params;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // ✅ FIXED: Extract product number correctly
  let productNumber = null;
  
  if (productId) {
    // Remove 'product' prefix if exists
    const numStr = productId.toString().replace('product', '');
    productNumber = parseInt(numStr);
  }

  useEffect(() => {
    console.log('Params received:', { category, productId, productNumber });
    
    const loadProductData = async () => {
      if (!category || !productNumber || isNaN(productNumber)) {
        console.error('Invalid params:', { category, productNumber });
        setError('Invalid product URL');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        console.log(`Fetching data for ${category}, product ${productNumber}...`);
        const productData = await fetchProductData(category, productNumber);
        console.log('Product data received:', productData);
        
        if (!productData) {
          setError('Product not found');
          setProduct(null);
        } else {
          setProduct(productData);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product data. Please check console for details.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [category, productId, productNumber]);

  // Debug: Log when product changes
  useEffect(() => {
    if (product) {
      console.log('Product state updated:', product);
      console.log('Product images:', product.images);
    }
  }, [product]);

  // Handle image navigation
  const nextImage = () => {
    if (product && product.images && product.images.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images && product.images.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {stars}
        <span style={{ marginLeft: '8px', fontSize: '16px', fontWeight: '600' }}>{rating}</span>
      </div>
    );
  };

  // WhatsApp messages
  const getWhatsAppBuyMessage = () => {
    if (!product) return '';
    return `Hello, I want to BUY this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A⭐ Rating: ${product.rating}%0A${product.desc ? `📝 Description: ${encodeURIComponent(product.desc)}%0A` : ''}%0A✅ I want to proceed with purchase.`;
  };

  const getWhatsAppEnquiryMessage = () => {
    if (!product) return '';
    return `Hello, I have an ENQUIRY about this product:%0A%0A📦 Product: ${encodeURIComponent(product.name)}%0A💰 Price: ₹${product.price}%0A🌳 Wood Type: ${encodeURIComponent(product.woodtype)}%0A📏 Size: ${encodeURIComponent(product.size)}%0A%0A❓ My Question: [Please specify your question here]`;
  };

  if (loading) {
    return (
      <div className="wood-products-page">
        <div className="wood-container" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <div className="wood-empty-icon">⏳</div>
          <h3>Loading Product Details...</h3>
          <p>Please wait while we fetch the product information</p>
          <p>Category: {category}, Product: {productId}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="wood-products-page">
        <div className="wood-container" style={{ padding: '40px 20px' }}>
          <div className="wood-empty-state">
            <div className="wood-empty-icon">🚫</div>
            <h3>Product Not Found</h3>
            <p>{error || 'The requested product could not be loaded.'}</p>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>
              URL: /products/{category}/{productId}<br/>
              Product Number: {productNumber}
            </p>
            <Link href="/products/wooden-doors" style={{
              marginTop: '15px',
              padding: '10px 20px',
              background: '#ffa41c',
              color: '#0f1111',
              textDecoration: 'none',
              borderRadius: '4px',
              display: 'inline-block',
              fontWeight: '500'
            }}>
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryData = categories.find(cat => cat.name === category);

  return (
    <div className="wood-products-page">
      {/* Debug info - remove in production */}
      <div style={{ 
        background: '#f0f0f0', 
        padding: '10px', 
        fontSize: '12px',
        borderBottom: '1px solid #ddd'
      }}>
        Debug: Category: {category}, Product ID: {productId}, Product Number: {productNumber}
      </div>

      {/* Breadcrumb Navigation */}
      <div className="wood-container" style={{ padding: '20px 15px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#565959' }}>
          <Link href="/products/wooden-doors" style={{ color: '#007185', textDecoration: 'none' }}>
            Products
          </Link>
          <span>›</span>
          <Link href={`/products/wooden-doors`} style={{ color: '#007185', textDecoration: 'none' }}>
            {categoryData?.displayName || category}
          </Link>
          <span>›</span>
          <span style={{ color: '#0f1111', fontWeight: '500' }}>{product.name}</span>
        </div>
      </div>

      <div className="wood-container" style={{ padding: '20px 15px 40px' }}>
        <div className="wood-layout-wrapper" style={{ gap: '40px' }}>
          {/* Product Images Section */}
          <div style={{ flex: '1', minWidth: '0' }}>
            <div style={{ 
              background: '#ffffff', 
              border: '1px solid #e7e7e7', 
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              {/* Main Image */}
              <div style={{ 
                position: 'relative', 
                height: '500px',
                marginBottom: '20px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#f8f8f8'
              }}>
                {product.images && product.images.length > 0 ? (
                  <>
                    <Image
                      src={product.images[activeImageIndex]}
                      alt={`${product.name} - View ${activeImageIndex + 1}`}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="100vw"
                      priority
                      onError={(e) => {
                        console.error('Image failed to load:', product.images[activeImageIndex]);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => console.log('Image loaded successfully')}
                    />
                    
                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          style={{
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid #ddd',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '20px',
                            zIndex: 10
                          }}
                        >
                          ‹
                        </button>
                        <button
                          onClick={nextImage}
                          style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid #ddd',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '20px',
                            zIndex: 10
                          }}
                        >
                          ›
                        </button>
                      </>
                    )}
                    
                    {/* Image Counter */}
                    <div style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      zIndex: 10
                    }}>
                      {activeImageIndex + 1} / {product.images.length}
                    </div>
                  </>
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%',
                    color: '#565959'
                  }}>
                    <div className="wood-image-placeholder">
                      <div className="wood-icon">🚪</div>
                      <p className="wood-image-text">No Image Available</p>
                      <p style={{ fontSize: '12px', marginTop: '5px' }}>
                        Image path: {product.images ? product.images[0] : 'No images'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      style={{
                        width: '80px',
                        height: '80px',
                        border: activeImageIndex === index ? '2px solid #ffa41c' : '1px solid #ddd',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        background: '#f8f8f8',
                        cursor: 'pointer',
                        padding: '0'
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                          src={image}
                          alt={`View ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="80px"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div style={{ flex: '1', minWidth: '0' }}>
            <div style={{ 
              background: '#ffffff', 
              border: '1px solid #e7e7e7', 
              borderRadius: '8px',
              padding: '30px'
            }}>
              {/* Product Title and Rating */}
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ 
                  fontSize: '28px', 
                  fontWeight: '500', 
                  color: '#0f1111',
                  marginBottom: '10px',
                  lineHeight: '1.3'
                }}>
                  {product.name}
                </h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  {renderStars(product.rating)}
                  {product.sales > 0 && (
                    <span style={{ 
                      fontSize: '14px', 
                      color: '#565959',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{ color: '#ffa41c' }}>🔥</span> {product.sales}+ Sold
                    </span>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div style={{ 
                padding: '20px', 
                background: '#fafafa', 
                borderRadius: '8px',
                marginBottom: '25px',
                border: '1px solid #e7e7e7'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px', color: '#565959', marginRight: '4px' }}>₹</span>
                  <span style={{ fontSize: '36px', fontWeight: '700', color: '#0f1111' }}>
                    {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#565959' }}>
                  Inclusive of all taxes
                </div>
              </div>

              {/* Product Specifications */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: '#0f1111',
                  marginBottom: '15px',
                  paddingBottom: '10px',
                  borderBottom: '2px solid #ffa41c'
                }}>
                  Product Specifications
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Wood Type</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.woodtype}</div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Size</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>{product.size}</div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Category</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
                      {categoryData?.displayName || category}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '14px', color: '#565959', marginBottom: '4px' }}>Product Code</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#0f1111' }}>
                      {category?.toUpperCase() || 'PROD'}-{productNumber}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product.desc && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: '#0f1111',
                    marginBottom: '15px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #ffa41c'
                  }}>
                    Description
                  </h3>
                  <div style={{ 
                    fontSize: '15px', 
                    color: '#0f1111', 
                    lineHeight: '1.6',
                    whiteSpace: 'pre-line'
                  }}>
                    {product.desc}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <a
                  href={`https://wa.me/919876543210?text=${getWhatsAppBuyMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25D366',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#128C7E';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#25D366';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <span>🛒</span> Buy Now on WhatsApp
                </a>
                
                <a
                  href={`https://wa.me/919876543210?text=${getWhatsAppEnquiryMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'transparent',
                    color: '#0f1111',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: '2px solid #ffa41c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fff8f6';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <span>💬</span> Enquire About This Product
                </a>
              </div>

              {/* Additional Info */}
              <div style={{ 
                marginTop: '30px', 
                paddingTop: '20px', 
                borderTop: '1px solid #e7e7e7',
                fontSize: '13px',
                color: '#565959'
              }}>
                <p style={{ marginBottom: '10px' }}>
                  <strong>Note:</strong> All prices are inclusive of GST. Free installation support available.
                </p>
                <p>
                  Need help? Our experts are available 10AM - 7PM to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button
            onClick={() => router.push('/products/wooden-doors')}
            style={{
              background: '#f0f2f2',
              color: '#0f1111',
              padding: '10px 20px',
              borderRadius: '4px',
              border: '1px solid #d5d9d9',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}