// 'use client'
// import { useState } from 'react'
// import Link from 'next/link'

// export default function Footer() {
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')

//   const handleNewsletter = (e) => {
//     e.preventDefault()
    
//     if (!validateEmail(email)) {
//       setMessage({ text: 'Please enter a valid email address', type: 'error' })
//       return
//     }

//     setMessage({ text: 'Subscribing...', type: 'loading' })
    
//     setTimeout(() => {
//       setMessage({ text: 'Thank you for subscribing!', type: 'success' })
//       setEmail('')
//       setTimeout(() => setMessage(''), 3000)
//     }, 1000)
//   }

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     return re.test(email)
//   }

//   const handleWhatsApp = () => {
//     const phoneNumber = '+919876543210'
//     const message = 'Hello Shree Doors! I would like to know more about your wooden doors.'
//     const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
//     window.open(whatsappURL, '_blank')
//   }

//   const handleCall = () => {
//     window.location.href = 'tel:+919876543210'
//   }

//   const quickLinks = [
//     { name: 'Teak Wood Doors', href: '/categories/teak-wood' },
//     { name: 'Main Entrance Doors', href: '/categories/main-entrance' },
//     { name: 'Carved Wooden Doors', href: '/categories/carved' },
//     { name: 'Luxury Collection', href: '/categories/luxury' },
//     { name: 'Custom Doors', href: '/categories/custom' }
//   ]

//   const companyLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'About Us', href: '/about' },
//     { name: 'All Categories', href: '/categories' },
//     { name: 'Best Sellers', href: '/products' },
//     { name: 'Contact Us', href: '/contact' }
//   ]

//   return (
//     <footer className="footer">
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h3>Wooden Door Categories</h3>
//             <ul>
//               {quickLinks.map(link => (
//                 <li key={link.href}>
//                   <Link href={link.href}>{link.name}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="footer-section">
//             <h3>Quick Links</h3>
//             <ul>
//               {companyLinks.map(link => (
//                 <li key={link.href}>
//                   <Link href={link.href}>{link.name}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="footer-section">
//             <h3>Contact Info</h3>
//             <p>
//               <i className="fas fa-map-marker-alt"></i>
//               123 Wood Street, Furniture City
//             </p>
//             <p>
//               <i className="fas fa-phone"></i>
//               +91 98765 43210
//             </p>
//             <p>
//               <i className="fas fa-envelope"></i>
//               info@shreedoors.com
//             </p>
//             <p>
//               <i className="fas fa-clock"></i>
//               Mon-Sat: 9AM-7PM
//             </p>

//             <div className="quick-contact">
//               <button className="contact-btn whatsapp" onClick={handleWhatsApp}>
//                 <i className="fab fa-whatsapp"></i>
//                 WhatsApp Us
//               </button>
//               <button className="contact-btn" onClick={handleCall}>
//                 <i className="fas fa-phone"></i>
//                 Call Now
//               </button>
//             </div>
//           </div>

//           <div className="footer-section">
//             <h3>Follow Us</h3>
//             <div className="social-icons">
//               <a href="#" aria-label="Facebook">
//                 <i className="fab fa-facebook-f"></i>
//               </a>
//               <a href="#" aria-label="Instagram">
//                 <i className="fab fa-instagram"></i>
//               </a>
//               <a href="#" aria-label="Pinterest">
//                 <i className="fab fa-pinterest"></i>
//               </a>
//               <a href="#" aria-label="YouTube">
//                 <i className="fab fa-youtube"></i>
//               </a>
//             </div>

//             <h4>Newsletter</h4>
//             <p>Subscribe for updates and offers</p>
//             <form className="newsletter-form" onSubmit={handleNewsletter}>
//               <input
//                 type="email"
//                 placeholder="Your email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button type="submit">Subscribe</button>
//             </form>

//             {message && (
//               <div className={`newsletter-message ${message.type}`}>
//                 {message.text}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="footer-bottom">
//           <p>&copy; 2025 Shree Doors - Premium Wooden Doors Manufacturer. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   )
// }



'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleNewsletter = (e) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' })
      return
    }

    setMessage({ text: 'Subscribing...', type: 'loading' })
    
    setTimeout(() => {
      setMessage({ text: 'Thank you for subscribing!', type: 'success' })
      setEmail('')
      setTimeout(() => setMessage(''), 3000)
    }, 1000)
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleWhatsApp = () => {
    const phoneNumber = '08007747733'
    const message = 'Hello Maa Kripa Wood Art! I would like to know more about your wooden products.'
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  const handleCall = () => {
    window.location.href = 'tel:08007747733'
  }

  const productLinks = [
    { name: 'Wooden Doors', href: '/categories/wooden-doors' },
    { name: 'Hand Carved Furniture', href: '/categories/carved-furniture' },
    { name: 'Custom Woodwork', href: '/categories/custom-woodwork' },
    { name: 'Teak Wood Products', href: '/categories/teak-wood' },
    { name: 'Home Decor Items', href: '/categories/home-decor' }
  ]

  const companyLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Products', href: '/products' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Our Products</h3>
            <ul>
              {productLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              {companyLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              Kalyan - Badlapur Rd, Ladinaka, Deepak Nagar, Ambernath, Maharashtra 421505
            </p>
            <p>
              <i className="fas fa-phone"></i>
              080077 47733
            </p>
            <p>
              <i className="fas fa-envelope"></i>
              info@maakripawoodart.com
            </p>
            <p>
              <i className="fas fa-clock"></i>
              Mon-Sat: 9AM-8PM, Sun: 10AM-6PM
            </p>

            <div className="quick-contact">
              <button className="contact-btn whatsapp" onClick={handleWhatsApp}>
                <i className="fab fa-whatsapp"></i>
                WhatsApp Us
              </button>
              <button className="contact-btn" onClick={handleCall}>
                <i className="fas fa-phone"></i>
                Call Now
              </button>
            </div>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>

            <h4>Newsletter</h4>
            <p>Subscribe for updates and offers</p>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>

            {message && (
              <div className={`newsletter-message ${message.type}`}>
                {message.text}
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 MAA KRIPA WOOD ART - Premium Wooden Art & Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}