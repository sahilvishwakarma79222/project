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

    {/* Header: Product Code + Rating */}
    <div className="info-header">
      <span className="product-code">
        <span className="code-label">Product Code</span>
        <strong>{category?.toUpperCase() || 'PROD'}-{product.productNumber}</strong>
      </span>

      {product.rating && (
        <div className="rating-badge">
          <span>⭐</span>
          <span>{product.rating}</span>
          <span className="rating-reviews">({product.reviews || 0})</span>
        </div>
      )}
    </div>

    {/* Sales + Delivery — single row */}
    <div className="info-meta-row">
      {product.sales && (
        <span className="meta-chip">
          🔥 {product.sales}+ Sold
        </span>
      )}
      <span className="meta-chip">
        🚚 {product.deliveryTime || estimatedDelivery}
      </span>
      <span className="meta-chip meta-chip-light">
        {product.deliveryInfo || 'Free shipping • Pan India'}
      </span>
    </div>

    {/* WhatsApp CTA — primary action */}
    <a
      href={`https://wa.me/918007747733?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="main-whatsapp-btn"
    >
      <span className="wa-icon">💬</span>
      <div className="wa-text">
        <div className="wa-title">Enquire on WhatsApp</div>
        <div className="wa-subtitle">Get price • Check availability • Customize</div>
      </div>
      <span className="wa-arrow">→</span>
    </a>

    {/* Terms — clean card */}
    {/* Purchase Guidelines — trust friendly */}
<details className="trust-info-card">
  <summary className="trust-info-header">
    <div className="trust-info-left">
      <span className="trust-icon">🛡️</span>
      <div>
        <div className="trust-title">खरीदने से पहले जानें</div>
        <div className="trust-subtitle">ज़रूरी जानकारी • 30 सेकंड में पढ़ें</div>
      </div>
    </div>
    <span className="trust-chevron">›</span>
  </summary>

  <div className="trust-info-body">
    <ul className="trust-list">
      <li>
        <span className="trust-bullet">🔧</span>
        <span>रिपेयरिंग, पॉलिश, फिटिंग, ट्रांसपोर्ट एवं अन्य मजदूरी शुल्क अलग से लिया जाएगा।</span>
      </li>
      <li>
        <span className="trust-bullet">💳</span>
        <span>कृपया डिलीवरी से पहले पूरा भुगतान करें।</span>
      </li>
      <li>
        <span className="trust-bullet">🌳</span>
        <span>लकड़ी नैसर्गिक है, मौसम के कारण दरार या बदलाव हो सकता है — इसके लिए हमारी जिम्मेदारी नहीं।</span>
      </li>
      <li>
        <span className="trust-bullet">🔄</span>
        <span>एक बार बिक्री किया हुआ माल वापस या बदलकर नहीं दिया जाएगा।</span>
      </li>
      <li className="trust-list-thanks">
        <span className="trust-bullet">🙏</span>
        <span><strong>सहयोग अपेक्षित।</strong></span>
      </li>
    </ul>

    <div className="trust-footer">
      <span>🙏</span>
      <span><strong>MAA KRIPA WOOD ART</strong></span>
      <span className="trust-footer-tag">Trusted Since Years</span>
    </div>
  </div>
</details>

    {/* Footer note */}
    <p className="info-footer-note">
      📸 Product images shown for reference. More details coming soon.
    </p>

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