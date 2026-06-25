// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import fs from 'fs';
// import path from 'path';
// import '../../wooden-doors/product-view-flipkart.css';
// import { categories } from '@/utils/productData';
// import ProductImages from './ProductImages';
// import ShareProduct from './ShareProduct';
// import RelatedProducts from './RelatedProducts';
// import Navbar from '@/components/Navbar';
// import { FiShoppingCart } from "react-icons/fi";
// import { FaArrowLeft } from "react-icons/fa";
// import { IoIosArrowRoundBack } from "react-icons/io";

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
//       productNumber,
//       categoryFolder: folderName
//     };

//   } catch (error) {
//     console.error('💥 Error loading product:', error);
//     return null;
//   }
// }

// // Get related products from same category
// async function getRelatedProducts(category, currentProductNumber) {
//   try {
//     const folderName = categoryFolders[category];
//     if (!folderName) return [];

//     const categoryPath = path.join(
//       process.cwd(),
//       'public',
//       'images',
//       'category',
//       folderName
//     );

//     // Check if category folder exists
//     if (!fs.existsSync(categoryPath)) {
//       console.log('❌ Category folder not found:', categoryPath);
//       return [];
//     }

//     // Get all product folders
//     const items = fs.readdirSync(categoryPath);
//     const productFolders = items.filter(item =>
//       item.startsWith('product') && fs.statSync(path.join(categoryPath, item)).isDirectory()
//     );

//     // Filter out current product
//     const otherProducts = productFolders.filter(folder => {
//       const productNum = parseInt(folder.replace('product', ''), 10);
//       return productNum !== currentProductNumber;
//     });

//     // Shuffle array randomly
//     const shuffled = [...otherProducts].sort(() => Math.random() - 0.5);

//     // Take first 4 products
//     const selectedProducts = shuffled.slice(0, 4);

//     // Read info for each selected product
//     const relatedProducts = [];

//     for (const productFolder of selectedProducts) {
//       const productNum = parseInt(productFolder.replace('product', ''), 10);
//       const infoPath = path.join(categoryPath, productFolder, 'info.json');

//       if (fs.existsSync(infoPath)) {
//         const fileContent = fs.readFileSync(infoPath, 'utf-8');
//         const infoData = JSON.parse(fileContent);

//         // Check for first image
//         const imagePath = path.join(categoryPath, productFolder, '1.webp');
//         const imageUrl = fs.existsSync(imagePath)
//           ? `/images/category/${folderName}/${productFolder}/1.webp`
//           : null;

//         relatedProducts.push({
//           ...infoData,
//           id: `${category}-${productNum}`,
//           slug: `${category}/product${productNum}`,
//           image: imageUrl,
//           productNumber: productNum
//         });
//       }
//     }

//     console.log(`✅ Found ${relatedProducts.length} related products`);
//     return relatedProducts;

//   } catch (error) {
//     console.error('💥 Error loading related products:', error);
//     return [];
//   }
// }

// export default async function ProductDetailPage({ params, searchParams }) {
//   const { category, productId } = await params;
//   const { pageNumber } = await searchParams;

//   console.log('📌 URL Params:', { category, productId });

//   const product = await getProductData(category, productId);

//   if (!product) {
//     console.log('❌ Product not found, showing 404');
//     notFound();
//   }

//   const categoryData = categories.find(cat => cat.name === category);
//   const relatedProducts = await getRelatedProducts(category, product.productNumber);

//   // WhatsApp message using ONLY info.json data
//   const whatsappMessage = `Hello, I'm interested in this product:%0A%0A📦 *${product.name}*%0A💰 Price: ₹${product.price}%0A${product.woodtype ? `🌳 Wood: ${product.woodtype}%0A` : ''}${product.size ? `📏 Size: ${product.size}%0A` : ''}${product.desc ? `📝 ${product.desc.substring(0, 100)}...%0A` : ''}%0APlease provide more details.`;

//   return (
//     <>
//       <Navbar />

//       <div className="product-detail-page">
//         {/* Debug Banner */}
//         <div className="debug-banner">
//           <strong>Images Found:</strong> {product.images?.length || 0} images |
//           <strong> Product:</strong> {product.name}
//         </div>

//         {/* Breadcrumb */}
//         <div className="product-detail-container">
//           <div className="product-breadcrumb">
//             <Link href="/" className="breadcrumb-link">Home</Link>
//             <span className="breadcrumb-separator">›</span>
//             <Link href="/products/wooden-doors" className="breadcrumb-link">
//               Products
//             </Link>
//             <span className="breadcrumb-separator">›</span>
//             <span className="breadcrumb-current">
//               {categoryData?.displayName || 'Product'}
//             </span>
//             <span className="breadcrumb-separator">›</span>
//             <span className="breadcrumb-current" style={{ fontWeight: '600' }}>
//               {product.name}
//             </span>

//             {/* Share Button in Breadcrumb */}
//             <div className="breadcrumb-share">
//               <ShareProduct
//                 product={product}
//                 category={category}
//                 productId={productId}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="product-detail-container">
//           <div className="product-detail-layout">
//             {/* Left Column - Image Gallery */}
//             <div className="leftsideImgPart">
//               <div >
//                 <ProductImages
//                   images={product.images}
//                   productName={product.name}
//                 />

//                 {/* Action Buttons below image */}
//                 <div className="image-actions-container">
//                   <a
//                     href={`https://wa.me/918007747733?text=${whatsappMessage}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="image-action-btn btn-primary"
//                   >
//                     <span style={{ fontSize: '18px', marginTop: "8px" }}><FiShoppingCart size={26}></FiShoppingCart></span> Buy Now
//                   </a>

//                 </div>

//               </div>
//             </div>

//             {/* Right Column - Product Info - COMPACT VERSION */}
//             <div>
//               <div className="product-info-section">
//                 {/* Sticky Product Header */}
//                 <div className="sticky-product-header">
//                   <div className="product-title-row">
//                     <h1 className="product-title">
//                       {product.name}
//                     </h1>
//                     {/* Share Button Mobile */}
//                     <div className="mobile-share-btn">
//                       <ShareProduct
//                         product={product}
//                         category={category}
//                         productId={productId}
//                         mobile={true}
//                       />
//                     </div>
//                   </div>


//                 </div>

//                 {/* Rating & Sales - ONLY if exists in JSON */}
//                 {product.rating && (
//                   <div className="rating-section">
//                     <div className="rating-badge">
//                       <span>⭐</span>
//                       <span>{product.rating}</span>
//                     </div>
//                     {product.sales && (
//                       <span className="sales-count">
//                         🔥 {product.sales}+ Sold
//                       </span>
//                     )}
//                   </div>
//                 )}
//                 <div className='bluecart'>

//                   {/* Sticky Price Section */}
//                   <div className="sticky-price-section">
//                     <div className="price-amount">
//                       <span className="price-symbol">₹</span>
//                       <span className="price-value">
//                         {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
//                       </span>
//                     </div>

//                     {/* WhatsApp Button - Always visible */}

//                   </div>

//                   {/* Original Price and Discount - ONLY if exists in JSON */}
//                   {product.originalPrice && product.discount && (
//                     <div className="price-discount" style={{ marginBottom: '12px' }}>
//                       <span className="original-price">
//                         ₹{typeof product.originalPrice === 'number' ? product.originalPrice.toLocaleString() : product.originalPrice}
//                       </span>
//                       <span className="discount-badge">
//                         {product.discount} OFF
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Price Note - ONLY if exists in JSON */}
//                 {product.priceNote && (
//                   <div className="price-note" style={{ marginBottom: '15px' }}>
//                     <span className="price-note-circle">•</span> {product.priceNote}
//                   </div>
//                 )}

//                 {/* COMPACT Specifications - 3 columns on desktop */}
//                 {(product.woodtype || product.size || product.color || product.material || product.finish || product.weight || product.dimensions) && (
//                   <div className="compact-specifications">
//                     <h2 className="section-title">Key Specifications</h2>
//                     <div className="compact-specs-grid">
//                       {product.woodtype && (
//                         <div className="compact-spec-item">
//                           <div className="spec-label">Wood Type</div>
//                           <div className="spec-value">{product.woodtype}</div>
//                         </div>
//                       )}
//                       {product.size && (
//                         <div className="compact-spec-item">
//                           <div className="spec-label">Size</div>
//                           <div className="spec-value">{product.size}</div>
//                         </div>
//                       )}
//                       {product.color && (
//                         <div className="compact-spec-item">
//                           <div className="spec-label">Color</div>
//                           <div className="spec-value">{product.color}</div>
//                         </div>
//                       )}
//                       {product.material && (
//                         <div className="compact-spec-item">
//                           <div className="spec-label">Frame Thickness</div>
//                           <div className="spec-value">{product.material}</div>
//                         </div>
//                       )}
//                       {product.finish && (
//                         <div className="compact-spec-item">
//                           <div className="spec-label">Side Panel</div>
//                           <div className="spec-value">{product.finish}</div>
//                         </div>
//                       )}
//                       <div className="compact-spec-item">
//                         <div className="spec-label">Door Thickness</div>
//                         <div className="spec-value">
//                           {categoryData?.displayName || category}
//                         </div>
//                       </div>
//                       <div className="compact-spec-item">
//                         <div className="spec-label">Product Code</div>
//                         <div className="spec-value">
//                           {category?.toUpperCase() || 'PROD'}-{product.productNumber}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* COMPACT Description with Read More */}
//                 {product.desc && (
//                   <div className="compact-description">
//                     <h2 className="section-title">Description</h2>
//                     <div className="description-content-truncate">
//                       {product.desc}
//                     </div>
//                     {/* <button className="read-more-btn" data-expanded="false">
//                       Read sahil
//                     </button> */}
//                   </div>
//                 )}

//                 {/* COMPACT Features - Show only first 3 */}
//                 {product.features && Array.isArray(product.features) && product.features.length > 0 && (
//                   <div className="compact-features">
//                     <h2 className="section-title">Key Features</h2>
//                     <div className="features-grid">
//                       {product.features.slice(0, 3).map((feature, index) => (
//                         <div key={index} className="feature-badge">
//                           <span>✓</span> {feature}
//                         </div>
//                       ))}
                      
//                     </div>
//                   </div>
//                 )}

//                 {/* COMPACT Delivery Info */}
//                 {(product.deliveryTime || product.deliveryInfo || product.warranty || product.installation) && (
//                   <div className="compact-delivery-info">
//                     <div className="delivery-header">
//                       <div className="delivery-icon">🚚</div>
//                       <div>
//                         <div className="delivery-title">Delivery & Warranty</div>
//                         {product.deliveryTime && (
//                           <div className="delivery-date">{product.deliveryTime}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Additional Notes - ONLY if exists in JSON */}
//                 {product.notes && (
//                   <div className="additional-info" style={{ marginTop: '15px', marginBottom: '15px' }}>
//                     <p className="info-item" style={{
//                       background: '#fff8e1',
//                       padding: '10px',
//                       borderRadius: '6px',
//                       fontSize: '13px',
//                       border: '1px solid #ffd54f'
//                     }}>
//                       <strong style={{ color: '#ff9800' }}>📝 Note:</strong> {product.notes}
//                     </p>
//                   </div>
//                 )}

//                 {/* Main WhatsApp Section */}
//                 <div className="main-whatsapp-section">
//                   <a
//                     href={`https://wa.me/918007747733?text=${whatsappMessage}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="main-whatsapp-btn"
//                   >
//                     <span style={{ fontSize: '20px' }}>💬</span>
//                     <div className="whatsapp-text">
//                       <div className="whatsapp-title">Chat on WhatsApp</div>
//                       <div className="whatsapp-subtitle">Instant response • Customization • Bulk orders</div>
//                     </div>
//                     <span style={{ fontSize: '20px' }}>→</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
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
// import '../../wooden-doors/product-view-flipkart.css';
// import { categories } from '@/utils/productData';
// import ProductImages from './ProductImages';
// import ShareProduct from './ShareProduct';
// import Navbar from '@/components/Navbar';
// import { FiShoppingCart } from "react-icons/fi";

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
//       productNumber,
//       categoryFolder: folderName
//     };

//   } catch (error) {
//     console.error('💥 Error loading product:', error);
//     return null;
//   }
// }

// export default async function ProductDetailPage({ params, searchParams }) {
//   const { category, productId } = await params;
//   const { pageNumber } = await searchParams;

//   console.log('📌 URL Params:', { category, productId });

//   const product = await getProductData(category, productId);

//   if (!product) {
//     console.log('❌ Product not found, showing 404');
//     notFound();
//   }

//   const categoryData = categories.find(cat => cat.name === category);

//   // WhatsApp message - WITHOUT PRICE AND NAME
//   const whatsappMessage = `Hello, I'm interested in this product from your collection:%0A%0A📋 Product Code: ${category?.toUpperCase() || 'PROD'}-${product.productNumber}%0A%0APlease provide more details about price, availability, and specifications.`;

//   // Estimated delivery (hardcoded for now)
//   const estimatedDelivery = "15-20 working days";

//   return (
//     <>
//       <Navbar />

//       <div className="product-detail-page">
//         {/* Debug Banner */}
//         <div className="debug-banner">
//           <strong>Images Found:</strong> {product.images?.length || 0} images |
//           <strong> Product Code:</strong> {category?.toUpperCase() || 'PROD'}-{product.productNumber}
//         </div>

//         {/* Breadcrumb - Simplified */}
//         <div className="product-detail-container">
//           <div className="product-breadcrumb">
//             <Link href="/" className="breadcrumb-link">Home</Link>
//             <span className="breadcrumb-separator">›</span>
//             <Link href="/products/wooden-doors" className="breadcrumb-link">
//               Products
//             </Link>
//             <span className="breadcrumb-separator">›</span>
//             <span className="breadcrumb-current">
//               {categoryData?.displayName || 'Product'}
//             </span>
//             <span className="breadcrumb-separator">›</span>
//             <span className="breadcrumb-current" style={{ fontWeight: '600' }}>
//               Product #{category?.toUpperCase() || 'PROD'}-{product.productNumber}
//             </span>

//             {/* Share Button in Breadcrumb */}
//             <div className="breadcrumb-share">
//               <ShareProduct
//                 product={product}
//                 category={category}
//                 productId={productId}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="product-detail-container">
//           <div className="product-detail-layout">
//             {/* Left Column - Image Gallery */}
//             <div className="leftsideImgPart">
//               <div>
//                 <ProductImages
//                   images={product.images}
//                   productName={`Product ${category?.toUpperCase() || 'PROD'}-${product.productNumber}`}
//                 />

//                 {/* Action Buttons below image */}
//                 <div className="image-actions-container">
//                   <a
//                     href={`https://wa.me/918007747733?text=${whatsappMessage}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="image-action-btn btn-primary"
//                   >
//                     <span style={{ fontSize: '18px', marginTop: "8px" }}><FiShoppingCart size={26}></FiShoppingCart></span> Enquire Now
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - MINIMAL INFO ONLY */}
//             <div>
//               <div className="product-info-section">
//                 {/* Product Code - Only identifier shown */}
//                 <div style={{
//                   fontSize: '14px',
//                   color: '#666',
//                   marginBottom: '16px',
//                   padding: '8px 12px',
//                   background: '#f5f5f5',
//                   borderRadius: '6px',
//                   display: 'inline-block'
//                 }}>
//                   📋 Product Code: <strong>{category?.toUpperCase() || 'PROD'}-{product.productNumber}</strong>
//                 </div>

//                 {/* Rating - ONLY if exists in JSON */}
//                 {product.rating && (
//                   <div className="rating-section" style={{ marginBottom: '16px' }}>
//                     <div className="rating-badge">
//                       <span>⭐</span>
//                       <span>{product.rating}</span>
//                       <span style={{ marginLeft: '8px', color: '#666', fontSize: '14px' }}>
//                         ({product.reviews || 0} reviews)
//                       </span>
//                     </div>
//                     {product.sales && (
//                       <span className="sales-count" style={{ marginLeft: '12px' }}>
//                         🔥 {product.sales}+ Sold
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* Estimated Delivery - ALWAYS SHOW */}
//                 <div className="delivery-estimate" style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   padding: '12px 16px',
//                   background: '#f0f7ff',
//                   borderRadius: '8px',
//                   marginBottom: '20px',
//                   border: '1px solid #d0e4ff'
//                 }}>
//                   <span style={{ fontSize: '24px' }}>🚚</span>
//                   <div>
//                     <div style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '15px' }}>
//                       Estimated Delivery
//                     </div>
//                     <div style={{ color: '#0066cc', fontWeight: '500', fontSize: '14px' }}>
//                       {product.deliveryTime || estimatedDelivery}
//                     </div>
//                     <div style={{ color: '#666', fontSize: '12px' }}>
//                       {product.deliveryInfo || 'Free shipping • Pan India delivery'}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Main WhatsApp Enquiry Section */}
//                 <div className="main-whatsapp-section" style={{ marginTop: '20px' }}>
//                   <a
//                     href={`https://wa.me/918007747733?text=${whatsappMessage}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="main-whatsapp-btn"
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '12px',
//                       padding: '16px 20px',
//                       background: '#25D366',
//                       color: 'white',
//                       borderRadius: '12px',
//                       textDecoration: 'none',
//                       transition: 'all 0.3s ease',
//                       boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
//                     }}
//                   >
//                     <span style={{ fontSize: '24px' }}>💬</span>
//                     <div className="whatsapp-text" style={{ flex: 1 }}>
//                       <div className="whatsapp-title" style={{ fontWeight: '600', fontSize: '16px' }}>
//                         Enquire on WhatsApp
//                       </div>
//                       <div className="whatsapp-subtitle" style={{ fontSize: '13px', opacity: 0.9 }}>
//                         Get price • Check availability • Customize
//                       </div>
//                     </div>
//                     <span style={{ fontSize: '20px' }}>→</span>
//                   </a>
//                 </div>

//                 {/* Note: More details coming soon */}
//                 <div style={{
//                   marginTop: '16px',
//                   padding: '10px',
//                   textAlign: 'center',
//                   fontSize: '13px',
//                   color: '#999',
//                   borderTop: '1px dashed #ddd',
//                   paddingTop: '16px'
//                 }}>
//                   📸 Product images shown for reference. More details coming soon.
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
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
// import '../../wooden-doors/product-view-flipkart.css';
// import { categories } from '@/utils/productData';
// import ProductImages from './ProductImages';
// import ShareProduct from './ShareProduct';
// import Navbar from '@/components/Navbar';
// import { FiShoppingCart } from "react-icons/fi";
// import { MdInfoOutline } from "react-icons/md";

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
//       productNumber,
//       categoryFolder: folderName
//     };

//   } catch (error) {
//     console.error('💥 Error loading product:', error);
//     return null;
//   }
// }

// export default async function ProductDetailPage({ params, searchParams }) {
//   const { category, productId } = await params;
//   const { pageNumber } = await searchParams;

//   console.log('📌 URL Params:', { category, productId });

//   const product = await getProductData(category, productId);

//   if (!product) {
//     console.log('❌ Product not found, showing 404');
//     notFound();
//   }

//   const categoryData = categories.find(cat => cat.name === category);

//   // WhatsApp message - WITHOUT PRICE AND NAME
//   const whatsappMessage = `Hello, I'm interested in this product from your collection:%0A%0A📋 Product Code: ${category?.toUpperCase() || 'PROD'}-${product.productNumber}%0A%0APlease provide more details about price, availability, and specifications.`;

//   // Estimated delivery (hardcoded for now)
//   const estimatedDelivery = "15-20 working days";

//   // Terms & Conditions - Hindi
//   const termsAndConditions = [
//     "रिपेयरिंग, पॉलिश, फिटिंग, ट्रांसपोर्ट एवं अन्य मजदूरी शुल्क अलग से लिया जाएगा।",
//     "कृपया डिलीवरी से पहले पूरा भुगतान करें।",
//     "लकड़ी एक नैसर्गिक वस्तु है, इसलिए बाहरी वातावरण एवं मौसम के कारण इसमें दरार (फटने) या थोड़ा बहुत बदलाव आ सकता है। इस कारण होने वाले सामान्य बदलाव के लिए हमारी जिम्मेदारी नहीं रहेगी।",
//     "एक बार बिक्री किया हुआ माल वापस या बदलकर नहीं दिया जाएगा।",
//     "सहयोग अपेक्षित।"
//   ];

//   return (
//     <>
//       <Navbar />

//       <div className="product-detail-page">
//         {/* Debug Banner */}
//         <div className="debug-banner">
//           <strong>Images Found:</strong> {product.images?.length || 0} images |
//           <strong> Product Code:</strong> {category?.toUpperCase() || 'PROD'}-{product.productNumber}
//         </div>

//         {/* Breadcrumb - Simplified */}
//         <div className="product-detail-container">
//           <div className="product-breadcrumb">
//             <Link href="/" className="breadcrumb-link">Home</Link>
//             <span className="breadcrumb-separator">›</span>
//             <Link href="/products/wooden-doors" className="breadcrumb-link">
//               Products
//             </Link>
//             <span className="breadcrumb-separator">›</span>
//             <span className="breadcrumb-current">
//               {categoryData?.displayName || 'Product'}
//             </span>
//             <span className="breadcrumb-separator">›</span>
//             <span className="breadcrumb-current" style={{ fontWeight: '600' }}>
//               Product #{category?.toUpperCase() || 'PROD'}-{product.productNumber}
//             </span>

//             {/* Share Button in Breadcrumb */}
//             <div className="breadcrumb-share">
//               <ShareProduct
//                 product={product}
//                 category={category}
//                 productId={productId}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="product-detail-container">
//           <div className="product-detail-layout">
//             {/* Left Column - Image Gallery */}
//             <div className="leftsideImgPart">
//               <div>
//                 <ProductImages
//                   images={product.images}
//                   productName={`Product ${category?.toUpperCase() || 'PROD'}-${product.productNumber}`}
//                 />

//                 {/* Action Buttons below image */}
//                 <div className="image-actions-container">
//                   <a
//                     href={`https://wa.me/918007747733?text=${whatsappMessage}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="image-action-btn btn-primary"
//                   >
//                     <span style={{ fontSize: '18px', marginTop: "8px" }}><FiShoppingCart size={26}></FiShoppingCart></span> Enquire Now
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column - MINIMAL INFO ONLY */}
//             <div>
//               <div className="product-info-section">
//                 {/* Product Code - Only identifier shown */}
//                 <div style={{
//                   fontSize: '14px',
//                   color: '#666',
//                   marginBottom: '16px',
//                   padding: '8px 12px',
//                   background: '#f5f5f5',
//                   borderRadius: '6px',
//                   display: 'inline-block'
//                 }}>
//                   📋 Product Code: <strong>{category?.toUpperCase() || 'PROD'}-{product.productNumber}</strong>
//                 </div>

//                 {/* Rating - ONLY if exists in JSON */}
//                 {product.rating && (
//                   <div className="rating-section" style={{ marginBottom: '16px' }}>
//                     <div className="rating-badge">
//                       <span>⭐</span>
//                       <span>{product.rating}</span>
//                       <span style={{ marginLeft: '8px', color: '#666', fontSize: '14px' }}>
//                         ({product.reviews || 0} reviews)
//                       </span>
//                     </div>
//                     {product.sales && (
//                       <span className="sales-count" style={{ marginLeft: '12px' }}>
//                         🔥 {product.sales}+ Sold
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* Estimated Delivery - ALWAYS SHOW */}
//                 <div className="delivery-estimate" style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                   padding: '12px 16px',
//                   background: '#f0f7ff',
//                   borderRadius: '8px',
//                   marginBottom: '20px',
//                   border: '1px solid #d0e4ff'
//                 }}>
//                   <span style={{ fontSize: '24px' }}>🚚</span>
//                   <div>
//                     <div style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '15px' }}>
//                       Estimated Delivery
//                     </div>
//                     <div style={{ color: '#0066cc', fontWeight: '500', fontSize: '14px' }}>
//                       {product.deliveryTime || estimatedDelivery}
//                     </div>
//                     <div style={{ color: '#666', fontSize: '12px' }}>
//                       {product.deliveryInfo || 'Free shipping • Pan India delivery'}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Main WhatsApp Enquiry Section */}
//                 <div className="main-whatsapp-section" style={{ marginTop: '20px' }}>
//                   <a
//                     href={`https://wa.me/918007747733?text=${whatsappMessage}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="main-whatsapp-btn"
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '12px',
//                       padding: '16px 20px',
//                       background: '#25D366',
//                       color: 'white',
//                       borderRadius: '12px',
//                       textDecoration: 'none',
//                       transition: 'all 0.3s ease',
//                       boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
//                     }}
//                   >
//                     <span style={{ fontSize: '24px' }}>💬</span>
//                     <div className="whatsapp-text" style={{ flex: 1 }}>
//                       <div className="whatsapp-title" style={{ fontWeight: '600', fontSize: '16px' }}>
//                         Enquire on WhatsApp
//                       </div>
//                       <div className="whatsapp-subtitle" style={{ fontSize: '13px', opacity: 0.9 }}>
//                         Get price • Check availability • Customize
//                       </div>
//                     </div>
//                     <span style={{ fontSize: '20px' }}>→</span>
//                   </a>
//                 </div>

//                 {/* Terms & Conditions Section */}
//                 <div style={{
//                   marginTop: '24px',
//                   border: '1px solid #e8e8e8',
//                   borderRadius: '10px',
//                   overflow: 'hidden',
//                   background: '#fafafa'
//                 }}>
//                   {/* Header */}
//                   <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     padding: '12px 16px',
//                     background: '#fff8e1',
//                     borderBottom: '1px solid #e8e8e8',
//                     cursor: 'pointer'
//                   }}>
//                     <MdInfoOutline size={20} color="#f57c00" />
//                     <span style={{
//                       fontWeight: '600',
//                       fontSize: '15px',
//                       color: '#e65100',
//                       letterSpacing: '0.5px'
//                     }}>
//                       ⚠️ महत्वपूर्ण सूचना | Important Notice
//                     </span>
//                     <span style={{
//                       marginLeft: 'auto',
//                       fontSize: '12px',
//                       color: '#999',
//                       background: '#f5f5f5',
//                       padding: '2px 10px',
//                       borderRadius: '12px'
//                     }}>
//                       कृपया पढ़ें
//                     </span>
//                   </div>

//                   {/* Content */}
//                   <div style={{
//                     padding: '16px 20px',
//                     background: 'white'
//                   }}>
//                     <ul style={{
//                       listStyle: 'none',
//                       padding: 0,
//                       margin: 0,
//                       display: 'flex',
//                       flexDirection: 'column',
//                       gap: '10px'
//                     }}>
//                       {termsAndConditions.map((term, index) => (
//                         <li key={index} style={{
//                           display: 'flex',
//                           alignItems: 'flex-start',
//                           gap: '10px',
//                           fontSize: '14px',
//                           lineHeight: '1.6',
//                           color: '#333',
//                           padding: '8px 12px',
//                           background: index % 2 === 0 ? '#fafafa' : 'white',
//                           borderRadius: '6px',
//                           borderLeft: '3px solid #ff9800'
//                         }}>
//                           <span style={{
//                             color: '#ff9800',
//                             fontWeight: 'bold',
//                             fontSize: '16px',
//                             minWidth: '20px'
//                           }}>
//                             {index + 1}.
//                           </span>
//                           <span>{term}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     {/* Brand Name */}
//                     <div style={{
//                       marginTop: '12px',
//                       paddingTop: '12px',
//                       borderTop: '1px dashed #ddd',
//                       textAlign: 'center',
//                       fontSize: '13px',
//                       color: '#666',
//                       fontStyle: 'italic'
//                     }}>
//                       🙏 For MAA KRIPA WOOD ART
//                     </div>
//                   </div>
//                 </div>

//                 {/* Note: More details coming soon */}
//                 <div style={{
//                   marginTop: '16px',
//                   padding: '10px',
//                   textAlign: 'center',
//                   fontSize: '13px',
//                   color: '#999',
//                   borderTop: '1px dashed #ddd',
//                   paddingTop: '16px'
//                 }}>
//                   📸 Product images shown for reference. More details coming soon.
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
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
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import '../../wooden-doors/product-view-flipkart.css';
import { categories } from '@/utils/productData';
import ProductImages from './ProductImages';
import ShareProduct from './ShareProduct';
import Navbar from '@/components/Navbar';
import { FiShoppingCart } from "react-icons/fi";

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

    if (!fs.existsSync(infoPath)) {
      console.log('❌ File does not exist:', infoPath);
      return null;
    }

    const fileContent = fs.readFileSync(infoPath, 'utf-8');
    const infoData = JSON.parse(fileContent);

    console.log('✅ Product data loaded');

    const basePath = `/images/category/${folderName}/product${productNumber}/`;
    const images = [];

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
      productNumber,
      categoryFolder: folderName
    };

  } catch (error) {
    console.error('💥 Error loading product:', error);
    return null;
  }
}

// PAGE COMPONENT - FIXED
export default async function Page({ params, searchParams }) {
  // Next.js 15 - params ko resolve karna
  const resolvedParams = await params;
  const { category, productId } = resolvedParams;
  
  console.log('📌 URL Params:', { category, productId });

  const product = await getProductData(category, productId);

  if (!product) {
    console.log('❌ Product not found, showing 404');
    notFound();
  }

  const categoryData = categories?.find(cat => cat.name === category);

  // WhatsApp message
  const whatsappMessage = `Hello, I'm interested in this product from your collection:%0A%0A📋 Product Code: ${category?.toUpperCase() || 'PROD'}-${product.productNumber}%0A%0APlease provide more details about price, availability, and specifications.`;

  const estimatedDelivery = "15-20 working days";

  return (
    <>
      <Navbar />

      <div className="product-detail-page">
        {/* Breadcrumb */}
        <div className="product-detail-container">
          <div className="product-breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <Link href="/products/wooden-doors" className="breadcrumb-link">
              Products
            </Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">
              {categoryData?.displayName || category || 'Product'}
            </span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current" style={{ fontWeight: '600' }}>
              Product #{category?.toUpperCase() || 'PROD'}-{product.productNumber}
            </span>

            <div className="breadcrumb-share">
              <ShareProduct
                product={product}
                category={category}
                productId={productId}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="product-detail-container">
          <div className="product-detail-layout">
            {/* Left Column - Image Gallery */}
            <div className="leftsideImgPart">
              <div>
                <ProductImages
                  images={product.images || []}
                  productName={`Product ${category?.toUpperCase() || 'PROD'}-${product.productNumber}`}
                />

                <div className="image-actions-container">
                  <a
                    href={`https://wa.me/918007747733?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-action-btn btn-primary"
                  >
                    <span style={{ fontSize: '18px', marginTop: "8px" }}>
                      <FiShoppingCart size={26} />
                    </span> 
                    Enquire Now
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="product-info-section">
                {/* Product Code */}
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '16px',
                  padding: '8px 12px',
                  background: '#f5f5f5',
                  borderRadius: '6px',
                  display: 'inline-block'
                }}>
                  📋 Product Code: <strong>{category?.toUpperCase() || 'PROD'}-{product.productNumber}</strong>
                </div>

                {/* Rating */}
                {product.rating && (
                  <div className="rating-section" style={{ marginBottom: '16px' }}>
                    <div className="rating-badge">
                      <span>⭐</span>
                      <span>{product.rating}</span>
                      <span style={{ marginLeft: '8px', color: '#666', fontSize: '14px' }}>
                        ({product.reviews || 0} reviews)
                      </span>
                    </div>
                    {product.sales && (
                      <span className="sales-count" style={{ marginLeft: '12px' }}>
                        🔥 {product.sales}+ Sold
                      </span>
                    )}
                  </div>
                )}

                {/* Estimated Delivery */}
                <div className="delivery-estimate" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  background: '#f0f7ff',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid #d0e4ff'
                }}>
                  <span style={{ fontSize: '24px' }}>🚚</span>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '15px' }}>
                      Estimated Delivery
                    </div>
                    <div style={{ color: '#0066cc', fontWeight: '500', fontSize: '14px' }}>
                      {product.deliveryTime || estimatedDelivery}
                    </div>
                    <div style={{ color: '#666', fontSize: '12px' }}>
                      {product.deliveryInfo || 'Free shipping • Pan India delivery'}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Enquiry */}
                <div className="main-whatsapp-section" style={{ marginTop: '20px' }}>
                  <a
                    href={`https://wa.me/918007747733?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="main-whatsapp-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px 20px',
                      background: '#25D366',
                      color: 'white',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>💬</span>
                    <div className="whatsapp-text" style={{ flex: 1 }}>
                      <div className="whatsapp-title" style={{ fontWeight: '600', fontSize: '16px' }}>
                        Enquire on WhatsApp
                      </div>
                      <div className="whatsapp-subtitle" style={{ fontSize: '13px', opacity: 0.9 }}>
                        Get price • Check availability • Customize
                      </div>
                    </div>
                    <span style={{ fontSize: '20px' }}>→</span>
                  </a>
                </div>

                {/* Terms & Conditions - Simple Note */}
                <div style={{
                  marginTop: '24px',
                  padding: '12px 16px',
                  background: '#fffbf0',
                  borderRadius: '8px',
                  border: '1px solid #ffe0b2',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#5d4037'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px',
                    fontWeight: '600',
                    fontSize: '13px',
                    color: '#e65100'
                  }}>
                    <span>📌</span> महत्वपूर्ण सूचना
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#4e342e' }}>
                    • रिपेयरिंग, पॉलिश, फिटिंग, ट्रांसपोर्ट एवं अन्य मजदूरी शुल्क अलग से लिया जाएगा।
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#4e342e' }}>
                    • कृपया डिलीवरी से पहले पूरा भुगतान करें।
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#4e342e' }}>
                    • लकड़ी नैसर्गिक है, मौसम के कारण दरार या बदलाव हो सकता है - इसके लिए हमारी जिम्मेदारी नहीं।
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#4e342e' }}>
                    • एक बार बिक्री किया हुआ माल वापस या बदलकर नहीं दिया जाएगा।
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#4e342e' }}>
                    • "सहयोग अपेक्षित।"
                  </div>
                  <div style={{
                    marginTop: '6px',
                    paddingTop: '6px',
                    borderTop: '1px dashed #ffe0b2',
                    fontSize: '12px',
                    color: '#8d6e63',
                    textAlign: 'center'
                  }}>
                    🙏 MAA KRIPA WOOD ART
                  </div>
                </div>

                <div style={{
                  marginTop: '16px',
                  padding: '10px',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: '#999',
                  borderTop: '1px dashed #ddd',
                  paddingTop: '16px'
                }}>
                  📸 Product images shown for reference. More details coming soon.
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

  const categoriesList = [
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

  for (const category of categoriesList) {
    for (let i = 1; i <= 5; i++) {
      params.push({
        category: category,
        productId: `product${i}`
      });
    }
  }

  console.log(`Generated ${params.length} static paths`);
  return params;
}

export const revalidate = 60;