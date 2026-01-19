"use client";
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './ProductCategories.css'

const productCategories = [
  {
    id: 'wooden-doors',
    name: 'Wooden Doors',
    href: '/products/wooden-doors?category=woodenDoor', // Only change href
    image: '/images/products/wooden-doors.jpg',
    description: 'Premium handcrafted doors',
    badge: 'Bestseller',
    stats: '200+ Designs',
    icon: '🚪'
  },
  {
    id: 'safety-doors',
    name: 'Safety Doors',
    href: '/products/wooden-doors?category=safetyDoors', // Same page, different category
    image: '/images/products/safety-doors.jpg',
    description: 'Advanced security doors',
    badge: 'Secure',
    stats: '100+ Models',
    icon: '🔒'
  },
  {
    id: 'wooden-frames',
    name: 'Wooden Frames',
    href: '/products/wooden-doors?category=woodenFrame', // Same page, different category
    image: '/images/products/wooden-frames.jpg',
    description: 'Elegant door frames',
    badge: 'Essential',
    stats: '50+ Styles',
    icon: '🖼️'
  },
  {
    id: 'wooden-windows',
    name: 'Wooden Windows',
    href: '/products/wooden-doors?category=woodenWindow', // Same page, different category
    image: '/images/products/wooden-windows.jpg',
    description: 'Beautiful wooden windows',
    badge: 'Premium',
    stats: '50+ Designs',
    icon: '🪟'
  },
  {
    id: 'wooden-beds',
    name: 'Wooden Beds',
    href: '/products/wooden-doors?category=woodenBed', // Same page, different category
    image: '/images/products/wooden-beds.jpg',
    description: 'Handcrafted wooden beds',
    badge: 'Luxury',
    stats: '50+ Designs',
    icon: '🛏️'
  },
  {
    id: 'sofa-chairs',
    name: 'Sofa & Chairs',
    href: '/products/wooden-doors?category=sofaChair', // Same page, different category
    image: '/images/products/sofa-chairs.jpg',
    description: 'Comfortable seating',
    badge: 'Comfort',
    stats: '100+ Designs',
    icon: '🛋️'
  },
  {
    id: 'wooden-mandir',
    name: 'Wooden Mandir',
    href: '/products/wooden-doors?category=woodenMandir', // Same page, different category
    image: '/images/products/wooden-mandir.jpg',
    description: 'Sacred home temples',
    badge: 'Spiritual',
    stats: '50+ Designs',
    icon: '🛕'
  },
  {
    id: 'wooden-art',
    name: 'Wooden Art',
    href: '/products/wooden-doors?category=woodenArt', // Same page, different category
    image: '/images/products/wooden-art.jpg',
    description: 'Exquisite sculptures',
    badge: 'Artistic',
    stats: '100+ Pieces',
    icon: '🎨'
  }
]

export default function ProductCategories() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <section id="product-categories" className="product-categories-section">
      {/* Background Elements */}
      <div className="bg-wood-texture"></div>
      <div className="floating-wood-chips">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="wood-chip" style={{
            '--delay': `${i * 0.2}s`,
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
            '--rotation': `${Math.random() * 360}deg`
          }} />
        ))}
      </div>

      <div className="product-categories-container">
        {/* Header Section - Minimal */}
        <div className="categories-header">
          <div className="title-wrapper">
            <span className="section-tag">OUR PRODUCT RANGE</span>
            <h2 className="section-title">
              Explore Our <span className="highlight-text">Premium Collection</span>
            </h2>
            <div className="title-decoration">
              <div className="deco-line"></div>
              <div className="deco-dot"></div>
              <div className="deco-line"></div>
            </div>
          </div>
        </div>

        {/* Product Categories Grid */}
        <div className="product-categories-grid">
          {productCategories.map((category, index) => (
            <Link 
              key={category.id} 
              href={category.href} 
              className="product-category-card"
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              data-index={index}
            >
              {/* Card Glow Effect */}
              <div className="card-glow"></div>
              
              {/* Category Badge */}
              {category.badge && (
                <div className="category-badge">
                  <span className="badge-icon">{category.icon}</span>
                  <span className="badge-text">{category.badge}</span>
                </div>
              )}

              {/* Card Image - BIG SIZE */}
              <div className="category-image-container">
                <div className="image-wrapper">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={600}
                    height={400}
                    className="product-image"
                    priority={index < 2}
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="image-shine"></div>
              </div>

              {/* Card Content - MINIMAL */}
              <div className="card-content">
                <div className="card-header">
                  <div className="category-stats">
                    <span className="stats-icon">📊</span>
                    <span className="stats-text">{category.stats}</span>
                  </div>
                  <div className="product-number">
                    <span className="number-text">#{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                
                <h3 className="product-category-name">{category.name}</h3>
                <p className="product-category-description">{category.description}</p>
                
                <div className="card-footer">
                  <button className="explore-products-btn">
                    View Collection
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>

              {/* Card Hover Effect */}
              <div className="card-hover-effect"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}