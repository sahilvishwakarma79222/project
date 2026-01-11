'use client'
import { useState } from 'react'
import ProductModal from './ProductModal'

const productsData = [
  {
    id: 1,
    name: 'Royal Teak Entrance Door',
    image: '/images/best-selling-product/1.png',
    category: 'Teak Wood | Main Entrance',
    price: '₹25,999',
    description: 'Premium Burma Teak main entrance door with intricate hand carvings and superior finish. Perfect for luxury homes seeking traditional elegance with modern security features.',
    specs: ['Wood Type: Burma Teak', 'Usage: Main Entrance', 'Thickness: 45mm', 'Size Options: 3\'x7\', 3.5\'x7\', 4\'x7\'', 'Finish: Matte, Gloss, Natural Polish', 'Warranty: 10 Years'],
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Sheesham Carved Door',
    image: '/images/best-selling-product/2.png',
    category: 'Sheesham Wood | Carved',
    price: '₹18,499',
    description: 'Elegant Sheesham wood door with traditional Indian carvings. Known for its durability and rich grain patterns that add warmth to any entrance.',
    specs: ['Wood Type: Solid Sheesham', 'Usage: Main Entrance/Bedroom', 'Thickness: 40mm', 'Size Options: 2.5\'x7\', 3\'x7\', 3.5\'x7\'', 'Finish: Natural, Dark Walnut, Honey', 'Warranty: 7 Years'],
    badge: 'Popular'
  },
  {
    id: 3,
    name: 'Modern Sagwan Door',
    image: '/images/best-selling-product/3.png',
    category: 'Sagwan Wood | Modern',
    price: '₹15,999',
    description: 'Contemporary Sagwan wood door with minimalist design. Perfect for modern homes and offices seeking clean lines and natural wood beauty.',
    specs: ['Wood Type: Sagwan Wood', 'Usage: Living Room/Office', 'Thickness: 35mm', 'Size Options: 2\'x7\', 2.5\'x7\', 3\'x7\'', 'Finish: Matte, Satin, Natural', 'Warranty: 5 Years'],
    badge: 'New'
  },
  {
    id: 4,
    name: 'Classic Sal Wood Door',
    image: '/images/best-selling-product/4.png',
    category: 'Sal Wood | Traditional',
    price: '₹22,999',
    description: 'Durable Sal wood door with classic design elements. Excellent for areas with high humidity and temperature variations.',
    specs: ['Wood Type: Solid Sal Wood', 'Usage: Main Entrance', 'Thickness: 42mm', 'Size Options: 3\'x7\', 3.5\'x7\', 4\'x7\'', 'Finish: Natural, Teak Polish', 'Warranty: 8 Years'],
    badge: 'Strong'
  },
  {
    id: 5,
    name: 'Designer Glass Panel Door',
    image: '/images/best-selling-product/5.png',
    category: 'Sagwan Wood | Glass Panel',
    price: '₹19,999',
    description: 'Elegant combination of wood and glass creating a sophisticated look. Perfect for modern interiors with ample natural light.',
    specs: ['Wood Type: Sagwan Wood', 'Usage: Living Room/Office', 'Thickness: 38mm', 'Size Options: 2.5\'x7\', 3\'x7\'', 'Finish: Matte, Gloss', 'Warranty: 6 Years'],
    badge: 'Elegant'
  },
  {
    id: 6,
    name: 'Traditional Carved Door',
    image: '/images/best-selling-product/6.png',
    category: 'Sheesham Wood | Carved',
    price: '₹27,999',
    description: 'Exquisite hand-carved traditional door featuring intricate patterns and motifs. A masterpiece of Indian craftsmanship.',
    specs: ['Wood Type: Sheesham Wood', 'Usage: Main Entrance', 'Thickness: 45mm', 'Size Options: 3\'x7\', 3.5\'x7\', 4\'x7\'', 'Finish: Antique, Natural', 'Warranty: 10 Years'],
    badge: 'Luxury'
  }
]

export default function Products() {
  const [currentPosition, setCurrentPosition] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextSlide = () => {
    setCurrentPosition(prev => (prev + 1) % (productsData.length - 2))
  }

  const prevSlide = () => {
    setCurrentPosition(prev => (prev - 1 + (productsData.length - 2)) % (productsData.length - 2))
  }

  const openModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <section id="products" className="best-selling">
      <div className="products-pattern"></div>
      <div className="container">
        <h2>Best Selling Wooden Doors</h2>
        <div className="product-carousel">
          <div className="carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(-${currentPosition * (320 + 32)}px)` }}>
              {productsData.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.badge && (
                      <span className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <span className="price">{product.price}</span>
                  <button
                    className="view-details"
                    onClick={() => openModal(product)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-nav prev" onClick={prevSlide}>‹</button>
          <button className="carousel-nav next" onClick={nextSlide}>›</button>
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  )
}