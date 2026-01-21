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
//     const phoneNumber = '08007747733'
//     const message = 'Hello Maa Kripa Wood Art! I would like to know more about your wooden products.'
//     const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
//     window.open(whatsappURL, '_blank')
//   }

//   const handleCall = () => {
//     window.location.href = 'tel:08007747733'
//   }

//   const productLinks = [
//     { name: 'Wooden Doors', href: '/categories/wooden-doors' },
//     { name: 'Hand Carved Furniture', href: '/categories/carved-furniture' },
//     { name: 'Custom Woodwork', href: '/categories/custom-woodwork' },
//     { name: 'Teak Wood Products', href: '/categories/teak-wood' },
//     { name: 'Home Decor Items', href: '/categories/home-decor' }
//   ]

//   const companyLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'About Us', href: '/about' },
//     { name: 'Our Products', href: '/products' },
//     { name: 'Gallery', href: '/gallery' },
//     { name: 'Contact Us', href: '/contact' }
//   ]

//   return (
//     <footer className="footer">
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h3>Our Products</h3>
//             <ul>
//               {productLinks.map(link => (
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
//               Kalyan - Badlapur Rd, Ladinaka, Deepak Nagar, Ambernath, Maharashtra 421505
//             </p>
//             <p>
//               <i className="fas fa-phone"></i>
//               080077 47733
//             </p>
//             <p>
//               <i className="fas fa-envelope"></i>
//               info@maakripawoodart.com
//             </p>
//             <p>
//               <i className="fas fa-clock"></i>
//               Mon-Sat: 9AM-8PM, Sun: 10AM-6PM
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
//           <p>&copy; 2025 MAA KRIPA WOOD ART - Premium Wooden Art & Furniture. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   )
// }

'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const handleWhatsApp = () => {
    const phoneNumber = '08007747733'
    const message = 'Hello Maa Kripa Wood Art! I would like to know more about your wooden products.'
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  const handleCall = () => {
    window.location.href = 'tel:08007747733'
  }

  const companyLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h2>Maa Kripa Wood Art</h2>
              <p className="tagline">Premium Wooden Art & Furniture</p>
            </div>
            <p className="description">
              Crafting exquisite wooden products with traditional artistry and modern design.
            </p>
            
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
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>Kalyan - Badlapur Rd, Ladinaka, Deepak Nagar, Ambernath, Maharashtra 421505</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <p>080077 47733</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <p>info@maakripawoodart.com</p>
              </div>
            </div>
            
            <div className="quick-contact">
              <button className="contact-btn whatsapp" onClick={handleWhatsApp}>
                <i className="fab fa-whatsapp"></i>
                WhatsApp
              </button>
              <button className="contact-btn call" onClick={handleCall}>
                <i className="fas fa-phone"></i>
                Call Now
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p><i className="fas fa-clock"></i> Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</p>
          <p>&copy; {new Date().getFullYear()} MAA KRIPA WOOD ART. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
          color: #fff;
          padding: 40px 0 20px;
          border-top: 4px solid #c19a6b;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-bottom: 30px;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-logo h2 {
          font-size: 1.5rem;
          margin-bottom: 5px;
          color: #fff;
          font-weight: 600;
        }

        .tagline {
          color: #c19a6b;
          font-size: 0.85rem;
          margin-bottom: 15px;
          font-style: italic;
        }

        .description {
          color: #b0b0b0;
          line-height: 1.5;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .footer-section h3 {
          font-size: 1.1rem;
          margin-bottom: 15px;
          color: #fff;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-section h3::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 30px;
          height: 2px;
          background: #c19a6b;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section ul li {
          margin-bottom: 10px;
        }

        .footer-section ul li a {
          color: #b0b0b0;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .footer-section ul li a:hover {
          color: #c19a6b;
          padding-left: 5px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #b0b0b0;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .contact-item i {
          color: #c19a6b;
          margin-top: 3px;
          min-width: 14px;
          font-size: 0.9rem;
        }

        .contact-item p {
          margin: 0;
        }

        .social-icons {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }

        .social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .social-icons a:hover {
          background: #c19a6b;
          transform: translateY(-2px);
        }

        .quick-contact {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        .contact-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          color: white;
          flex: 1;
          min-height: 40px;
        }

        .contact-btn.whatsapp {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        }

        .contact-btn.call {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .contact-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .footer-bottom {
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          color: #888;
          font-size: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-bottom i {
          color: #c19a6b;
          margin-right: 6px;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 30px 0 20px;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .quick-contact {
            margin-top: 15px;
          }
          
          .footer-bottom {
            text-align: left;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 15px;
          }
          
          .footer-logo h2 {
            font-size: 1.3rem;
          }
          
          .quick-contact {
            flex-direction: column;
          }
          
          .contact-btn {
            width: 100%;
          }
          
          .social-icons {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  )
}