'use client';
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './ProductCategories.css'

const productCategories = [
  {
    id: 'wooden-doors',
    name: 'Wooden Doors',
    href: '/products/wooden-doors?category=woodenDoor',
    image: '/images/products/wooden-doors.webp',
    description: 'Premium handcrafted doors with exquisite finishes',
    badge: 'Bestseller',
    icon: '🚪'
  },
  {
    id: 'safety-doors',
    name: 'Safety Doors',
    href: '/products/wooden-doors?category=safetyDoors',
    image: '/images/category/3_safetyDoors/product1/1.webp',
    description: 'Advanced security meets elegant design',
    badge: 'Secure',
    icon: '🔒'
  },
  {
    id: 'wooden-frames',
    name: 'Wooden Frames',
    href: '/products/wooden-doors?category=woodenFrame',
    image: '/images/category/2_WoodenFream/product1/1.webp',
    description: 'Custom frames for timeless elegance',
    badge: 'Essential',
    icon: '🖼️'
  },
  {
    id: 'wooden-windows',
    name: 'Wooden Windows',
    href: '/products/wooden-doors?category=woodenWindow',
    image: '/images/products/wooden-windows.png',
    description: 'Crafted windows for natural beauty',
    badge: 'Premium',
    icon: '🪟'
  },
  {
    id: 'wooden-beds',
    name: 'Wooden Beds',
    href: '/products/wooden-doors?category=woodenBed',
    image: '/images/category/4_woodenBed/product1/1.webp',
    description: 'Luxurious sleep sanctuaries',
    badge: 'Luxury',
    icon: '🛏️'
  },
  {
    id: 'sofa-chairs',
    name: 'Sofa & Chairs',
    href: '/products/wooden-doors?category=sofaChair',
    image: '/images/category/8_sofaChair/product1/1.webp',
    description: 'Comfort redefined in wood and fabric',
    badge: 'Comfort',
    icon: '🛋️'
  },
  {
    id: 'wooden-mandir',
    name: 'Wooden Mandir',
    href: '/products/wooden-doors?category=woodenMandir',
    image: '/images/products/wooden-mandir.webp',
    description: 'Sacred spaces for spiritual harmony',
    badge: 'Spiritual',
    icon: '🛕'
  },
  {
    id: 'wooden-art',
    name: 'Wooden Art',
    href: '/products/wooden-doors?category=woodenArt',
    image: '/images/products/wooden-art.png',
    description: 'Sculptures that tell stories',
    badge: 'Artistic',
    icon: '🎨'
  }
]

export default function ProductCategories() {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="product-categories" className="product-categories-section">
      <div className="product-categories-container">
        {/* Premium Header */}
        <div className="categories-header">
          <span className="section-label">COLLECTIONS</span>
          <h2 className="section-title">
            Crafted with <span className="highlight">Precision</span>,
            Designed for <span className="highlight">Perfection</span>
          </h2>

        </div>

        {/* Premium Grid */}
        <div className={`product-categories-grid ${showAll ? 'show-all' : ''}`}>
          {productCategories.map((category, index) => (
            <div key={category.id} className="category-card-wrapper">
              <div className="category-card">
                {/* Image with Overlay */}
                <div className="image-container">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={500}
                    height={600}
                    className="product-image"
                    priority={index < 4}
                  />
                  <div className="image-overlay"></div>

                  {/* Badge */}
                  <div className="premium-badge">
                    <span className="badge-icon">{category.icon}</span>
                    <span className="badge-text">{category.badge}</span>
                  </div>

                  {/* Hover Content - Mobile पर CSS automatically visible कर देगा */}
                  <div className="hover-content">
                    <div className="hover-inner">
                      <span className="hover-number">0{index + 1}</span>
                      <h3 className="hover-title">{category.name}</h3>
                      {/* Description hide on mobile via CSS */}
                      <p className="hover-description">{category.description}</p>

                      {/* Premium Button - Mobile friendly छोटा */}
                      <Link href={category.href} className="premium-button">
                        <span className="button-text">Explore</span>
                        <div className="button-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Static Content - Mobile पर CSS hide कर देगा */}
                <div className="static-content">
                  <h3 className="category-name">{category.name}</h3>
                  <div className="category-line"></div>
                  <p className="category-description">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button - Mobile Only */}
        <div className="show-more-container">
          <button
            className={`show-more-button ${showAll ? 'active' : ''}`}
            onClick={toggleShowAll}
          >
            <span className="button-text">Show {showAll ? 'Less' : 'More'}</span>
            <div className="show-more-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 9L12 16L5 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

      </div>
    </section>
  )
}