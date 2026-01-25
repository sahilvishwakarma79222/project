'use client'
import { useEffect } from 'react'

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  const handleWhatsApp = () => {
    const phoneNumber = '+918007747733'
    const message = `Hello Shree Doors! I'm interested in ${product.name}. Please share more details.`
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>

        <div className="modal-body">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="modal-price">{product.price}</div>

            <h4>Specifications</h4>
            <ul className="specs-list">
              {product.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>

            <button className="cta-button" onClick={handleWhatsApp} style={{ marginTop: '1rem' }}>
              <i className="fab fa-whatsapp"></i> Contact on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}