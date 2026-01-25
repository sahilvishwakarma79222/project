'use client'
import Link from 'next/link'

export default function CTA() {
  const handleCall = () => {
    window.location.href = 'tel:+919876543210'
  }

  return (
    <section className="cta">
      <div className="container">
        <h2>Ready to Transform Your Space?</h2>
        <p>Get expert consultation for your wooden door requirements</p>
        <div className="cta-buttons">
          <Link href="/contact" className="cta-button">
            Get Free Consultation
          </Link>
          <button className="cta-button secondary" onClick={handleCall}>
            Call Now: +91 80077 47733
          </button>
        </div>
      </div>
    </section>
  )
}