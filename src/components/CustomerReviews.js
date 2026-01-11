'use client'

import { useState, useRef, useEffect } from 'react'
import './CustomerReviews.css'

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  const reviews = [
    {
      id: 1,
      name: "Rajesh Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "10 saal se customer hun. Quality exceptional hai! Solid wood jo 1996 se banate aa rahe hain. Har baar same perfection.",
      date: "15 Jan 2024",
      product: "Teak Wood Bed",
      verified: true,
      purchase: "2 months ago",
      avatarColor: "bg-gradient-1"
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Thane",
      rating: 5,
      comment: "Custom dining table perfect mila. Wood quality premium aur finishing flawless. Family ne bhi appreciate kiya.",
      date: "20 Feb 2024",
      product: "Custom Dining Table",
      verified: true,
      purchase: "1 month ago",
      avatarColor: "bg-gradient-2"
    },
    {
      id: 3,
      name: "Amit Verma",
      location: "Navi Mumbai",
      rating: 5,
      comment: "Sheesham cabinet bahut solid. Carving aur finishing world-class. 1996 se trust justified. Highly recommended!",
      date: "10 Mar 2024",
      product: "Sheesham Cabinet",
      verified: true,
      purchase: "3 weeks ago",
      avatarColor: "bg-gradient-3"
    },
    {
      id: 4,
      name: "Sunita Desai",
      location: "Kalyan",
      rating: 5,
      comment: "Complete home furniture banwaya. Budget friendly aur quality exceptional. Service timing bhi perfect thi.",
      date: "5 Apr 2024",
      product: "Home Set",
      verified: true,
      purchase: "2 weeks ago",
      avatarColor: "bg-gradient-4"
    }
  ]

  const stats = [
    { 
      number: "4.9/5", 
      label: "Average Rating", 
      subtext: "500+ Reviews" 
    },
    { 
      number: "5000+", 
      label: "Happy Families", 
      subtext: "Since 1996" 
    },
    { 
      number: "28+", 
      label: "Years Experience", 
      subtext: "Trusted Legacy" 
    },
    { 
      number: "98%", 
      label: "Repeat Customers", 
      subtext: "Loyalty Score" 
    }
  ]

  // Duplicate for infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews]

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
          scrollContainer.scrollLeft = 0
        }
      }
      requestAnimationFrame(scroll)
    }

    const animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i} 
        className={`star ${i < rating ? 'filled' : 'empty'}`}
      >
        ★
      </span>
    ))
  }

  const shareReview = (review) => {
    const text = `Check out this amazing review from ${review.name} for Maa Kripa Wood Art:\n"${review.comment}"\nRating: ${review.rating}/5\n\nVisit: maakripawoodart.com`
    
    if (navigator.share) {
      navigator.share({
        title: 'Customer Review - Maa Kripa Wood Art',
        text: text,
        url: window.location.href
      }).catch(console.error)
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => alert('Review copied to clipboard!'))
        .catch(() => {
          const textArea = document.createElement('textarea')
          textArea.value = text
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('Review copied to clipboard!')
        })
    }
  }

  const openGoogleReview = () => {
    window.open('https://g.page/r/CYxYZu6GQs5iEBM/review', '_blank')
  }

  return (
    <section className="reviews-section">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-text">CUSTOMER REVIEWS</span>
          </div>
          
          <h2 className="section-title">
            Trusted by <span className="highlight">Thousands of Families</span>
          </h2>
          
          <p className="section-description">
            Since 1996, we've built lasting relationships through quality craftsmanship and exceptional service
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-subtext">{stat.subtext}</p>
            </div>
          ))}
        </div>

      

        {/* Scrollable Reviews */}
        <div className="scroll-reviews">
          <div className="scroll-container-wrapper">
            <div 
              className="scroll-container"
              ref={scrollContainerRef}
            >
              {duplicatedReviews.map((review, index) => (
                <div 
                  key={`${review.id}-${index}`}
                  className="review-card"
                >
                  <div className="card-header">
                    <div className="reviewer">
                      <div className={`small-avatar ${review.avatarColor}`}>
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h5>{review.name}</h5>
                        <div className="location">
                          <svg className="location-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {review.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  
                  <p className="review-excerpt">
                    "{review.comment.substring(0, 80)}..."
                  </p>
                  
                  <div className="card-footer">
                    <span className="product">{review.product}</span>
                    <button
                      className="share-btn"
                      onClick={() => shareReview(review)}
                      title="Share this review"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <h3>Share Your Experience</h3>
          <p>Help others discover the quality of Maa Kripa Wood Art</p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={openGoogleReview}>
              <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                <path d="M17.64,9.204c0,0.584-0.067,1.146-0.192,1.681h-8.814v3.192h5.042c-0.293,1.531-1.163,2.829-2.479,3.701v3.115h4.012 c2.354-2.167,3.713-5.36,3.713-9.129" fill="#4285F4"/>
                <path d="M9.634,18.262c-1.698,0-3.126-0.558-4.167-1.516l-3.115,3.115c1.978,1.843,4.611,2.972,7.282,2.972 c2.192,0,4.024-0.72,5.364-1.946l-4.012-3.115C11.58,17.851,10.7,18.262,9.634,18.262" fill="#34A853"/>
                <path d="M2.762,10.945c-0.236-0.703-0.37-1.454-0.37-2.226s0.134-1.523,0.37-2.226V3.379H0.061C-0.203,4.079-0.34,4.85-0.34,5.719 s0.137,1.64,0.401,2.34l2.662,2.662l0,0L2.762,10.945z" fill="#FBBC05"/>
                <path d="M9.634,3.077c1.215,0,2.302,0.417,3.159,1.237l2.365-2.365C13.656,0.691,11.824,0,9.634,0 C6.963,0,4.33,1.129,2.352,2.972l3.115,3.115C6.508,3.635,7.936,3.077,9.634,3.077" fill="#EA4335"/>
              </svg>
              Write a Google Review
            </button>
            <button className="cta-btn secondary" onClick={() => window.open('https://wa.me/917028426042', '_blank')}>
              <svg className="whatsapp-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.677-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
              </svg>
              Share on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews