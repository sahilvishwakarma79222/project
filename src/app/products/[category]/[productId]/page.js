import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import '../../wooden-doors/product-view-flipkart.css';
import { categories } from '@/utils/productData';
import ProductImages from './ProductImages';
import ShareProduct from './ShareProduct';
import RelatedProducts from './RelatedProducts';
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
      productNumber,
      categoryFolder: folderName
    };
    
  } catch (error) {
    console.error('💥 Error loading product:', error);
    return null;
  }
}

// Get related products from same category
async function getRelatedProducts(category, currentProductNumber) {
  try {
    const folderName = categoryFolders[category];
    if (!folderName) return [];
    
    const categoryPath = path.join(
      process.cwd(),
      'public',
      'images',
      'category',
      folderName
    );
    
    // Check if category folder exists
    if (!fs.existsSync(categoryPath)) {
      console.log('❌ Category folder not found:', categoryPath);
      return [];
    }
    
    // Get all product folders
    const items = fs.readdirSync(categoryPath);
    const productFolders = items.filter(item => 
      item.startsWith('product') && fs.statSync(path.join(categoryPath, item)).isDirectory()
    );
    
    // Filter out current product
    const otherProducts = productFolders.filter(folder => {
      const productNum = parseInt(folder.replace('product', ''), 10);
      return productNum !== currentProductNumber;
    });
    
    // Shuffle array randomly
    const shuffled = [...otherProducts].sort(() => Math.random() - 0.5);
    
    // Take first 4 products
    const selectedProducts = shuffled.slice(0, 4);
    
    // Read info for each selected product
    const relatedProducts = [];
    
    for (const productFolder of selectedProducts) {
      const productNum = parseInt(productFolder.replace('product', ''), 10);
      const infoPath = path.join(categoryPath, productFolder, 'info.json');
      
      if (fs.existsSync(infoPath)) {
        const fileContent = fs.readFileSync(infoPath, 'utf-8');
        const infoData = JSON.parse(fileContent);
        
        // Check for first image
        const imagePath = path.join(categoryPath, productFolder, '1.webp');
        const imageUrl = fs.existsSync(imagePath) 
          ? `/images/category/${folderName}/${productFolder}/1.webp`
          : null;
        
        relatedProducts.push({
          ...infoData,
          id: `${category}-${productNum}`,
          slug: `${category}/product${productNum}`,
          image: imageUrl,
          productNumber: productNum
        });
      }
    }
    
    console.log(`✅ Found ${relatedProducts.length} related products`);
    return relatedProducts;
    
  } catch (error) {
    console.error('💥 Error loading related products:', error);
    return [];
  }
}

export default async function ProductDetailPage({ params, searchParams }) {
  const { category, productId } = await params;
  const { pageNumber } = await searchParams;
  
  console.log('📌 URL Params:', { category, productId });

  const product = await getProductData(category, productId);
  
  if (!product) {
    console.log('❌ Product not found, showing 404');
    notFound();
  }

  const categoryData = categories.find(cat => cat.name === category);
  const relatedProducts = await getRelatedProducts(category, product.productNumber);
  
  // WhatsApp message using ONLY info.json data
  const whatsappMessage = `Hello, I'm interested in this product:%0A%0A📦 *${product.name}*%0A💰 Price: ₹${product.price}%0A${product.woodtype ? `🌳 Wood: ${product.woodtype}%0A` : ''}${product.size ? `📏 Size: ${product.size}%0A` : ''}${product.desc ? `📝 ${product.desc.substring(0, 100)}...%0A` : ''}%0APlease provide more details.`;

  return (
    <>
      <Navbar />
      
      <div className="product-detail-page">
        {/* Debug Banner */}
        <div className="debug-banner">
          <strong>Images Found:</strong> {product.images?.length || 0} images | 
          <strong> Product:</strong> {product.name}
        </div>

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
              {categoryData?.displayName || 'Product'}
            </span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current" style={{ fontWeight: '600' }}>
              {product.name}
            </span>
            
            {/* Share Button in Breadcrumb */}
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
              <div >
                <ProductImages 
                  images={product.images} 
                  productName={product.name}
                />
                
                {/* Action Buttons below image */}
                <div className="image-actions-container">
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image-action-btn btn-primary"
                  >
                    <span style={{ fontSize: '18px',marginTop:"8px" }}><FiShoppingCart size={26}></FiShoppingCart></span> Buy Now 
                  </a>
        
                </div>
                
           
              </div>
            </div>

            {/* Right Column - Product Info - COMPACT VERSION */}
            <div>
              <div className="product-info-section">
                {/* Sticky Product Header */}
                <div className="sticky-product-header">
                  <div className="product-title-row">
                    <h1 className="product-title">
                      {product.name}
                    </h1>
                    {/* Share Button Mobile */}
                    <div className="mobile-share-btn">
                      <ShareProduct 
                        product={product}
                        category={category}
                        productId={productId}
                        mobile={true}
                      />
                    </div>
                  </div>
                  
                  
                </div>
                
                {/* Rating & Sales - ONLY if exists in JSON */}
                {product.rating && (
                  <div className="rating-section">
                    <div className="rating-badge">
                      <span>⭐</span>
                      <span>{product.rating}</span>
                    </div>
                    {product.sales && (
                      <span className="sales-count">
                        🔥 {product.sales}+ Sold
                      </span>
                    )}
                  </div>
                )}
               <div className='bluecart'>

                   {/* Sticky Price Section */}
                <div className="sticky-price-section">
                    <div className="price-amount">
                      <span className="price-symbol">₹</span>
                      <span className="price-value">
                        {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                      </span>
                    </div>
                    
                    {/* WhatsApp Button - Always visible */}
                   
                  </div>
                
                {/* Original Price and Discount - ONLY if exists in JSON */}
                {product.originalPrice && product.discount && (
                  <div className="price-discount" style={{ marginBottom: '12px' }}>
                    <span className="original-price">
                      ₹{typeof product.originalPrice === 'number' ? product.originalPrice.toLocaleString() : product.originalPrice}
                    </span>
                    <span className="discount-badge">
                      {product.discount} OFF
                    </span>
                  </div>
                )}
               </div>
                
                {/* Price Note - ONLY if exists in JSON */}
                {product.priceNote && (
                  <div className="price-note" style={{ marginBottom: '15px' }}>
                    <span className="price-note-circle">•</span> {product.priceNote}
                  </div>
                )}
                
                {/* COMPACT Specifications - 3 columns on desktop */}
                {(product.woodtype || product.size || product.color || product.material || product.finish || product.weight || product.dimensions) && (
                  <div className="compact-specifications">
                    <h2 className="section-title">Key Specifications</h2>
                    <div className="compact-specs-grid">
                      {product.woodtype && (
                        <div className="compact-spec-item">
                          <div className="spec-label">Wood Type</div>
                          <div className="spec-value">{product.woodtype}</div>
                        </div>
                      )}
                      {product.size && (
                        <div className="compact-spec-item">
                          <div className="spec-label">Size</div>
                          <div className="spec-value">{product.size}</div>
                        </div>
                      )}
                      {product.color && (
                        <div className="compact-spec-item">
                          <div className="spec-label">Color</div>
                          <div className="spec-value">{product.color}</div>
                        </div>
                      )}
                      {product.material && (
                        <div className="compact-spec-item">
                          <div className="spec-label">Material</div>
                          <div className="spec-value">{product.material}</div>
                        </div>
                      )}
                      {product.finish && (
                        <div className="compact-spec-item">
                          <div className="spec-label">Finish</div>
                          <div className="spec-value">{product.finish}</div>
                        </div>
                      )}
                      <div className="compact-spec-item">
                        <div className="spec-label">Category</div>
                        <div className="spec-value">
                          {categoryData?.displayName || category}
                        </div>
                      </div>
                      <div className="compact-spec-item">
                        <div className="spec-label">Product Code</div>
                        <div className="spec-value">
                          {category?.toUpperCase() || 'PROD'}-{product.productNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* COMPACT Description with Read More */}
                {product.desc && (
                  <div className="compact-description">
                    <h2 className="section-title">Description</h2>
                    <div className="description-content-truncate">
                      {product.desc}
                    </div>
                    <button className="read-more-btn" data-expanded="false">
                      Read More
                    </button>
                  </div>
                )}
                
                {/* COMPACT Features - Show only first 3 */}
                {product.features && Array.isArray(product.features) && product.features.length > 0 && (
                  <div className="compact-features">
                    <h2 className="section-title">Key Features</h2>
                    <div className="features-grid">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="feature-badge">
                          <span>✓</span> {feature}
                        </div>
                      ))}
                      {product.features.length > 3 && (
                        <div className="feature-badge more-features">
                          +{product.features.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* COMPACT Delivery Info */}
                {(product.deliveryTime || product.deliveryInfo || product.warranty || product.installation) && (
                  <div className="compact-delivery-info">
                    <div className="delivery-header">
                      <div className="delivery-icon">🚚</div>
                      <div>
                        <div className="delivery-title">Delivery & Warranty</div>
                        {product.deliveryTime && (
                          <div className="delivery-date">{product.deliveryTime}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Additional Notes - ONLY if exists in JSON */}
                {product.notes && (
                  <div className="additional-info" style={{ marginTop: '15px', marginBottom: '15px' }}>
                    <p className="info-item" style={{ 
                      background: '#fff8e1', 
                      padding: '10px', 
                      borderRadius: '6px',
                      fontSize: '13px',
                      border: '1px solid #ffd54f'
                    }}>
                      <strong style={{ color: '#ff9800' }}>📝 Note:</strong> {product.notes}
                    </p>
                  </div>
                )}
                
                {/* Main WhatsApp Section */}
                <div className="main-whatsapp-section">
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="main-whatsapp-btn"
                  >
                    <span style={{ fontSize: '20px' }}>💬</span>
                    <div className="whatsapp-text">
                      <div className="whatsapp-title">Chat on WhatsApp</div>
                      <div className="whatsapp-subtitle">Instant response • Customization • Bulk orders</div>
                    </div>
                    <span style={{ fontSize: '20px' }}>→</span>
                  </a>
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