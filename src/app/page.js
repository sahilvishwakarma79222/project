'use client'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/ProductCategories'
import Products from '@/components/Products'
import Features from '@/components/Features'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import AboutSection from '@/components/AboutSection'
import BestSeller from '@/components/BestSeller'
import FindTheRightFit from '@/components/FindTheRightFit'
import MaterialsSection from '@/components/MaterialsSection'
import { useState, useEffect, useRef } from 'react'
import { FaWhatsapp, FaPhone, FaComment, FaTimes, FaChevronRight, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import './Home.css'
import CustomerReviews from '@/components/CustomerReviews'

export default function Home() {
  const [showContactPanel, setShowContactPanel] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowContactPanel(true)
      } else {
        setShowContactPanel(false)
        setIsExpanded(false)
      }
    }

    // Click outside to close
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsExpanded(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    // Auto show notification after 5 seconds
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 5000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
      clearTimeout(timer)
    }
  }, [])

  const contactOptions = [
    {
      id: 'whatsapp',
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      subLabel: 'Instant Reply',
      color: '#25D366',
      action: () => {
        const message = encodeURIComponent('Namaste! 🙏\nMaa Kripa Wood Art se connect karna chahta/chahati hoon.')
        window.open(`https://wa.me/917028426042?text=${message}`, '_blank')
      }
    },
    {
      id: 'call',
      icon: <FaPhone />,
      label: 'Call Now',
      subLabel: 'Direct Talk',
      color: '#4CAF50',
      action: () => window.location.href = 'tel:08007747733'
    },
    {
      id: 'enquiry',
      icon: <FaComment />,
      label: 'Quick Query',
      subLabel: 'Fast Response',
      color: '#2196F3',
      action: () => {
        const message = encodeURIComponent('🌟 Maa Kripa Wood Art - Query\n\nProduct: ________\nBudget: ₹ ______\nNeed: □ Catalog □ Quote □ Visit □ Custom\n\nPlease contact.')
        window.open(`https://wa.me/917028426042?text=${message}`, '_blank')
      }
    },
    {
      id: 'email',
      icon: <FaEnvelope />,
      label: 'Email',
      subLabel: 'Detailed Info',
      color: '#FF9800',
      action: () => window.location.href = 'mailto:info@maakripawoodart.com?subject=Wood%20Art%20Enquiry'
    }
  ]

  const handleMainButtonClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
      setShowNotification(false)
    } else {
      // If already expanded, open WhatsApp
      const message = encodeURIComponent('Hello Maa Kripa Wood Art!')
      window.open(`https://wa.me/917028426042?text=${message}`, '_blank')
    }
  }

  const handleQuickMessage = (type) => {
    let message = ''

    switch (type) {
      case 'catalog':
        message = '📗 Product catalog aur price list bhej sakte ho?'
        break
      case 'quote':
        message = '💰 Custom furniture ka quote chahiye.'
        break
      case 'visit':
        message = '📍 Ambernath showroom ka timing batao.'
        break
      case 'custom':
        message = '🎨 Custom wood work portfolio dikhao.'
        break
      default:
        message = 'Maa Kripa Wood Art ke products ke bare mein janna hai.'
    }

    window.open(`https://wa.me/917028426042?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <main style={{ position: 'relative' }}>
      <Navbar />
      <Hero />
      <BestSeller />
      <Categories />
      <MaterialsSection />
      {/* <FindTheRightFit /> */}
      {/* <Products /> */}
      <AboutSection />
      <CustomerReviews />
      <Features />
      <CTA />
      <Footer />
      {/* Premium Sticky Contact Panel */}
      {showContactPanel && (
        <div className="contact-panel-wrapper" ref={panelRef}>
          <div className={`contact-floating-panel ${isExpanded ? 'expanded' : 'collapsed'}`}>

            {/* Collapsed State - Just Icon */}
            {!isExpanded ? (
              <div className="collapsed-view">
                <button
                  className="main-contact-btn facebook-logo-color"
                  // onClick={handleMainButtonClick}
                  onClick={() => {
                    const message = encodeURIComponent('Namaste! 🙏\nMaa Kripa Wood Art se connect karna chahta/chahati hoon.')
                    window.open(`https://www.facebook.com/`, '_blank')
                  }}
                  aria-label="Contact Maa Kripa Wood Art"
                >
                  <FaFacebook className="main-icon" />
                  {/* {showNotification && <span className="notification-badge">!</span>} */}
                  <div className="pulse-ring"></div>
                </button>
                <button
                  className="main-contact-btn insta-logo-color"
                  // onClick={handleMainButtonClick}
                  onClick={() => {
                    const message = encodeURIComponent('Namaste! 🙏\nMaa Kripa Wood Art se connect karna chahta/chahati hoon.')
                    window.open(`https://www.instagram.com/`, '_blank')
                  }}
                  aria-label="Contact Maa Kripa Wood Art"
                >
                  <FaInstagram className="main-icon" />
                  {/* {showNotification && <span className="notification-badge">!</span>} */}
                  <div className="pulse-ring"></div>
                </button>
                <button
                  className="main-contact-btn whatsapp-logo-color"
                  // onClick={handleMainButtonClick}
                  onClick={() => {
                    const message = encodeURIComponent('Namaste! 🙏\nMaa Kripa Wood Art se connect karna chahta/chahati hoon.')
                    window.open(`https://wa.me/917028426042?text=${message}`, '_blank')
                  }}
                  aria-label="Contact Maa Kripa Wood Art"
                >
                  <FaWhatsapp className="main-icon" />
                  {/* {showNotification && <span className="notification-badge">!</span>} */}
                  <div className="pulse-ring"></div>
                </button>
              </div>
            ) : (
              /* Expanded State - Full Panel */
              <div className="expanded-view">
                <div className="panel-header">
                  <div className="company-info">
                    <div className="company-logo">
                      <FaWhatsapp />
                    </div>
                    <div>
                      <h4>Contact Us</h4>
                      <p className="company-tagline">Maa Kripa Wood Art</p>
                    </div>
                  </div>
                  <button
                    className="close-panel-btn"
                    onClick={() => setIsExpanded(false)}
                    aria-label="Close panel"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="contact-options-grid">
                  {contactOptions.map(option => (
                    <button
                      key={option.id}
                      className="contact-option-card"
                      onClick={option.action}
                    >
                      <div className="option-icon-wrapper" style={{ backgroundColor: option.color }}>
                        {option.icon}
                      </div>
                      <div className="option-details">
                        <span className="option-label">{option.label}</span>
                        <span className="option-sublabel">{option.subLabel}</span>
                      </div>
                      <FaChevronRight className="option-arrow" />
                    </button>
                  ))}
                </div>
                <div className="quick-messages-section">
                  <p className="section-title-home">Quick Options</p>
                  <div className="quick-message-buttons">
                    <button
                      className="quick-msg-btn"
                      onClick={() => handleQuickMessage('catalog')}
                    >
                      <span>📗</span>
                      Catalog
                    </button>
                    <button
                      className="quick-msg-btn"
                      onClick={() => handleQuickMessage('quote')}
                    >
                      <span>💰</span>
                      Quote
                    </button>
                    <button
                      className="quick-msg-btn"
                      onClick={() => handleQuickMessage('visit')}
                    >
                      <span>📍</span>
                      Visit
                    </button>
                    <button
                      className="quick-msg-btn"
                      onClick={() => handleQuickMessage('custom')}
                    >
                      <span>🎨</span>
                      Custom
                    </button>
                  </div>
                </div>
                <div className="location-info">
                  <MdLocationOn className="location-icon" />
                  <div>
                    <p className="location-title">Ambernath Showroom</p>
                    <p className="location-address">
                      Kalyan - Badlapur Rd, Deepak Nagar
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}