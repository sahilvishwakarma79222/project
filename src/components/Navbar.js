'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './navbar.css'
import { useSearchParams } from 'next/navigation';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactPage, setIsContactPage] = useState(false)
  const mobileMenuRef = useRef(null)
  const mobileToggleRef = useRef(null)
  const router = useRouter()

// Navbar.js में menuData update करें:
// Navbar.js में menuData को ऐसे update करें:
// const menuData = {
//   categories: [
//     { 
//       name: 'Wooden Doors', 
//       href: '/products/wooden-doors?category=wooden-doors',  // Change to products route
//       icon: '🚪' 
//     },
//     { 
//       name: 'Wooden Frames', 
//       href: '/products/wooden-doors?category=wooden-frames', 
//       icon: '🖼️' 
//     },
//     { 
//       name: 'Safety Doors', 
//       href: '/products/wooden-doors?category=safety-doors', 
//       icon: '🔒' 
//     },
//     { 
//       name: 'Wooden Beds', 
//       href: '/products/wooden-doors?category=wooden-beds', 
//       icon: '🛏️' 
//     },
//     { 
//       name: 'Wooden Mandir', 
//       href: '/products/wooden-doors?category=wooden-mandir', 
//       icon: '🛕' 
//     },
//     { 
//       name: 'Wooden Windows', 
//       href: '/products/wooden-doors?category=wooden-windows', 
//       icon: '🪟' 
//     },
//     { 
//       name: 'Wooden Art', 
//       href: '/products/wooden-doors?category=wooden-art', 
//       icon: '🎨' 
//     },
//     { 
//       name: 'Sofa Chair', 
//       href: '/products/wooden-doors?category=sofa-chair', 
//       icon: '🛋️' 
//     }
//   ]
// }
const menuData = {
  categories: [
    { name: 'Wooden Doors', href: '/products/wooden-doors?category=woodenDoor', icon: '🚪' },
    { name: 'Wooden Frames', href: '/products/wooden-doors?category=woodenFrames', icon: '🖼️' },
    { name: 'Safety Doors', href: '/products/wooden-doors?category=safetyDoor', icon: '🔒' },
    { name: 'Wooden Beds', href: '/products/wooden-doors?category=woodenBeds', icon: '🛏️' },
    { name: 'Wooden Mandir', href: '/products/wooden-doors?category=woodenTemples', icon: '🛕' },
    { name: 'Wooden Windows', href: '/products/wooden-doors?category=woodenWindows', icon: '🪟' },
    { name: 'Wooden Art', href: '/products/wooden-doors?category=woodenArt', icon: '🎨' },
    { name: 'Sofa Chair', href: '/products/wooden-doors?category=sofaChairs', icon: '🛋️' }
 
  ]
};

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu clicked, current state:', isMobileOpen)
    const newState = !isMobileOpen
    setIsMobileOpen(newState)
    
    if (!newState) {
      // Closing menu
      document.body.classList.remove('no-scroll')
      setActiveDropdown(null)
    } else {
      // Opening menu
      document.body.classList.add('no-scroll')
    }
  }

  const toggleDropdown = (dropdownName) => {
    console.log('Toggle dropdown:', dropdownName)
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdownName)
    }
  }

  const closeMobileMenu = () => {
    console.log('Closing mobile menu')
    setIsMobileOpen(false)
    setActiveDropdown(null)
    document.body.classList.remove('no-scroll')
  }

  const handleLinkClick = () => {
    closeMobileMenu()
  }

  const handleGetQuoteClick = (e) => {
    e.preventDefault()
    if (window.location.pathname === '/contact') {
      // If already on contact page, go back to home
      router.push('/')
    } else {
      // Go to contact page
      router.push('/contact')
    }
    closeMobileMenu()
  }

  const handleBackButtonClick = () => {
    router.back()
  }

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  // Check if current page is contact page
  useEffect(() => {
    setIsContactPage(window.location.pathname === '/contact')
    
    const handleRouteChange = () => {
      setIsContactPage(window.location.pathname === '/contact')
    }
    
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  // Click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileOpen &&
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        mobileToggleRef.current &&
        !mobileToggleRef.current.contains(event.target)
      ) {
        closeMobileMenu()
      }
    }

    // Escape key to close menu
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileOpen) {
        closeMobileMenu()
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)
    
    // Close mobile menu on resize to desktop
    const handleResize = () => {
      if (window.innerWidth > 1023 && isMobileOpen) {
        closeMobileMenu()
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
      window.removeEventListener('resize', handleResize)
      document.body.classList.remove('no-scroll')
    }
  }, [isMobileOpen])

  return (
    <>
      <nav className={`navbar ${isMobileOpen ? 'nav-mobile-active' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
         
          <div className="nav-logo">
  <Link href="/" className="logo" onClick={handleLinkClick}>
    <div className="logo-horizontal">
      <img
        src="/images/logo/3.png"
        alt="Wood Arts Logo"
        className="logo-img logo-img-1"
        width="70"
        height="70"
      />

      <div className="logo-text-wrapper">
        <img
          src="/images/logo/2.png"
          alt="Wood Arts Logo Symbol"
          className="logo-img logo-img-2"
          width="70"
          height="63"
        />
      </div>
    </div>
  </Link>
</div>

          {/* Navigation Menu - Hidden on Mobile */}
          <div className="nav-menu">
            <ul>
              <li><Link href="/" onClick={handleLinkClick}>Home</Link></li>

              <li className="dropdown mega-dropdown">
                <a className="dropdown-toggle">Categories <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu mega-menu">
                  <div className="mega-menu-content">
                    <div className="mega-menu-header">
                      <h3>Our Premium Collection</h3>
                      <p>Explore our exclusive range of wooden craftsmanship</p>
                    </div>

                    <div className="mega-menu-grid">
                      {menuData.categories.map((item) => (
                        <Link key={item.href} href={item.href} className="mega-menu-item" onClick={handleLinkClick}>
                          <div className="category-icon-box">
                            <span className="item-icon">{item.icon}</span>
                          </div>
                          <div className="category-content">
                            <span className="category-name">{item.name}</span>
                            <span className="category-desc">Premium Quality</span>
                          </div>
                        </Link>
                      ))}
                    </div>
{/* 
                    <div className="mega-menu-footer">
                      <Link href="/all-categories" className="view-all-btn" onClick={handleLinkClick}>
                        <span>View All Products</span>
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div> */}
                  </div>
                </div>
              </li>
              
              <li><Link href="/gallery" onClick={handleLinkClick}>Gallery</Link></li>
              <li><Link href="/about" onClick={handleLinkClick}>About</Link></li>
            </ul>
          </div>

          {/* Contact Section - Hidden on Mobile */}
          <div className="nav-contact">
            <a href="tel:+918007747733" className="nav-phone">
              <i className="fas fa-phone"></i>
              <span>+91 8007747733</span>
            </a>
            
            {isContactPage ? (
              <button onClick={handleBackButtonClick} className="nav-cta back-button">
                <i className="fas fa-arrow-left"></i>
                <span>Back</span>
              </button>
            ) : (
              <button onClick={handleGetQuoteClick} className="nav-cta">
                <i className="fas fa-quote-right"></i>
                <span>Get Quote</span>
              </button>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button 
            ref={mobileToggleRef}
            className="mobile-toggle" 
            onClick={toggleMobileMenu}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`mobile-menu ${isMobileOpen ? 'active' : ''}`}
        style={{ 
          right: isMobileOpen ? '0' : '-100%',
          display: isMobileOpen ? 'flex' : 'none'
        }}
      >
        <div className="mobile-header">
          <div className="mobile-logo">
            <div className="logo-icon">🚪</div>
            <span>Wood Arts</span>
          </div>
          <button 
            className="mobile-close" 
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="mobile-phone-section">
          <a href="tel:+918007747733" className="mobile-phone">
            <i className="fas fa-phone"></i>
            <div>
              <div>Call Now</div>
              <div>+91 8007747733</div>
            </div>
          </a>
        </div>

        <nav className="mobile-nav">
          <Link href="/" onClick={handleLinkClick} className="mobile-nav-item">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>

          <div className="mobile-dropdown">
            <button 
              onClick={() => toggleDropdown('categories')} 
              aria-expanded={activeDropdown === 'categories'}
              className="mobile-nav-item"
            >
              <i className="fas fa-th-large"></i>
              <span>Categories</span>
              <i className={`fas fa-chevron-${activeDropdown === 'categories' ? 'up' : 'down'}`}></i>
            </button>
            {activeDropdown === 'categories' && (
              <div className="mobile-dropdown-menu">
                {menuData.categories.map((item) => (
                  <Link key={item.href} href={item.href} onClick={handleLinkClick} className="mobile-category-item">
                    <div className="mobile-category-icon">
                      <span>{item.icon}</span>
                    </div>
                    <div className="mobile-category-content">
                      <span className="mobile-category-name">{item.name}</span>
                      <span className="mobile-category-tag">Premium</span>
                    </div>
                  </Link>
                ))}
                
                <Link href="/all-categories" onClick={handleLinkClick} className="mobile-view-all">
                  <i className="fas fa-eye"></i>
                  <span>View All Products</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            )}
          </div>

          <Link href="/gallery" onClick={handleLinkClick} className="mobile-nav-item">
            <i className="fas fa-images"></i>
            <span>Gallery</span>
          </Link>

          <Link href="/about" onClick={handleLinkClick} className="mobile-nav-item">
            <i className="fas fa-info-circle"></i>
            <span>About</span>
          </Link>

          {isContactPage ? (
            <button onClick={handleBackButtonClick} className="mobile-nav-item mobile-back-btn">
              <i className="fas fa-arrow-left"></i>
              <span>Go Back</span>
            </button>
          ) : (
            <button onClick={handleGetQuoteClick} className="mobile-cta">
              <i className="fas fa-quote-right"></i>
              <span>Get Free Quote</span>
            </button>
          )}
        </nav>
      </div>

      {/* Backdrop - Always render but control with CSS */}
      <div 
        className={`mobile-backdrop ${isMobileOpen ? 'active' : ''}`}
        style={{ display: isMobileOpen ? 'block' : 'none' }}
        onClick={closeMobileMenu}
      ></div>
    </>
  )
}