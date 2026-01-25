'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const handleWhatsApp = () => {
    const phoneNumber = '918007747733'
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
          {/* Brand Section */}
          <div className="brand-section">
            <div className="brand-header">
              <h2 className="brand-name">Maa Kripa Wood Art</h2>
              <div className="brand-divider"></div>
              <p className="brand-tagline">Premium Wooden Art & Furniture</p>
            </div>
            <p className="brand-description">
              Crafting exquisite wooden products with traditional artistry and modern design.
            </p>
            
            <div className="social-section">
              <h4 className="social-title">Follow Us</h4>
              <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links - Fixed Blue Text Issue */}
          <div className="links-section">
            <h3 className="section-title">Quick Links</h3>
            <div className="links-container">
              {companyLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="nav-button"
                >
                  <div className="nav-button-content">
                    <svg className="nav-button-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      {link.name === 'Home' && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>}
                      {link.name === 'About Us' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>}
                      {link.name === 'Contact Us' && <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>}
                    </svg>
                    <span className="nav-button-text">{link.name}</span>
                  </div>
                  <svg className="nav-button-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 6l6 6-6 6"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h3 className="section-title">Contact Info</h3>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                  </svg>
                </div>
                <p className="contact-text">
                  Kalyan - Badlapur Rd, Ladinaka, Deepak Nagar, Ambernath, Maharashtra 421505
                </p>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                  </svg>
                </div>
                <a href="tel:08007747733" className="contact-text phone-link">
                  080077 47733
                </a>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                  </svg>
                </div>
                <a href="mailto:info@maakripawoodart.com" className="contact-text email-link">
                  info@maakripawoodart.com
                </a>
              </div>
            </div>
            
            <div className="contact-actions">
              <button className="action-btn whatsapp-btn" onClick={handleWhatsApp}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.032 0c-6.627 0-12 5.373-12 12 0 2.126.554 4.125 1.527 5.853l-1.538 5.637 5.775-1.508c1.666.916 3.561 1.442 5.611 1.442 6.627 0 12-5.373 12-12s-5.373-12-12-12zm5.87 17.299c-.176.498-1.032.916-1.416.996-.384.08-.834.159-2.757-.598-2.353-.918-3.895-3.207-4.012-3.354-.117-.147-.94-1.248-.94-2.378 0-1.13.561-1.678.748-1.887.188-.208.398-.208.535-.208.138 0 .277-.001.397-.002.12-.001.304-.046.47.334.166.38.566 1.313.616 1.408.049.095.082.208.016.334-.066.126-.099.208-.198.33-.099.121-.206.269-.295.362-.098.104-.204.219-.087.428.117.208.523.895 1.124 1.45.765.707 1.407.928 1.618 1.031.212.104.334.086.448-.052.114-.138.488-.572.62-.77.131-.197.263-.173.448-.104.184.069 1.168.551 1.368.65.2.099.334.147.384.229.049.082.049.476-.127.974z"/>
                </svg>
                WhatsApp
              </button>
              <button className="action-btn call-btn" onClick={handleCall}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
                </svg>
                Call Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="hours">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm1 4h-2v7h7v-2h-5v-5z"/>
            </svg>
            <span>Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</span>
          </div>
          
          <div className="footer-info">
            <p className="copyright">
              &copy; {new Date().getFullYear()} Maa Kripa Wood Art. All rights reserved.
            </p>
            
            {/* Professional Designed By with GitHub and LinkedIn */}
            <div className="designer-section">
              <div className="designer-credit">
                <span className="credit-text">Designed by</span>
                <a 
                  href="https://github.com/sahilvishwakarma79222" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="designer-name"
                >
                  Sahil Vishwakarma
                </a>
              </div>
              
              <div className="designer-social">
                <a 
                  href="https://github.com/sahilvishwakarma79222" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="designer-social-link"
                  aria-label="GitHub"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/sahil-v-8611161a1/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="designer-social-link"
                  aria-label="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #0a0a0a;
          color: #fff;
          padding: 60px 0 25px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #c19a6b, #a67c52, #c19a6b);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 50px;
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Brand Section */
        .brand-section {
          display: flex;
          flex-direction: column;
        }

        .brand-header {
          margin-bottom: 20px;
        }

        .brand-name {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          color: #fff;
          letter-spacing: 0.5px;
          font-family: 'Georgia', serif;
        }

        .brand-divider {
          width: 50px;
          height: 2px;
          background: #c19a6b;
          margin: 15px 0;
        }

        .brand-tagline {
          color: #c19a6b;
          font-size: 0.9rem;
          margin: 0;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .brand-description {
          color: #b0b0b0;
          line-height: 1.7;
          margin: 0 0 30px 0;
          font-size: 0.95rem;
          max-width: 300px;
        }

        .social-section {
          margin-top: auto;
        }

        .social-title {
          font-size: 0.9rem;
          color: #c19a6b;
          margin: 0 0 15px 0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-icon:hover {
          background: #c19a6b;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(193, 154, 107, 0.25);
        }

        /* Quick Links - Fixed Blue Text Issue */
        .links-section {
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0 0 25px 0;
          color: #fff;
          position: relative;
          padding-bottom: 12px;
          letter-spacing: 0.5px;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: #c19a6b;
          border-radius: 2px;
        }

        .links-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: #fff !important; /* Force white color */
          text-decoration: none !important; /* Remove underline */
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        /* Remove any browser default link styles */
        .nav-button, 
        .nav-button:hover, 
        .nav-button:focus, 
        .nav-button:visited {
          color: #fff !important;
          text-decoration: none !important;
          outline: none !important;
        }

        .nav-button:hover {
          background: rgba(193, 154, 107, 0.1);
          border-color: rgba(193, 154, 107, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .nav-button-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-button-icon {
          color: #c19a6b;
          transition: all 0.3s ease;
        }

        .nav-button:hover .nav-button-icon {
          color: #fff;
          transform: scale(1.1);
        }

        .nav-button-text {
          transition: all 0.3s ease;
          color: #fff !important;
        }

        .nav-button:hover .nav-button-text {
          color: #c19a6b !important;
          font-weight: 600;
        }

        .nav-button-arrow {
          color: #c19a6b;
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.3s ease;
        }

        .nav-button:hover .nav-button-arrow {
          opacity: 1;
          transform: translateX(0);
          color: #fff;
        }

        /* Contact Section */
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }

        .contact-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .contact-icon {
          color: #c19a6b;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .contact-text {
          color: #b0b0b0;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        /* Remove blue and underline from phone and email links */
        .phone-link, 
        .email-link,
        .phone-link:hover, 
        .email-link:hover {
          color: #b0b0b0 !important;
          text-decoration: none !important;
        }

        .phone-link:hover,
        .email-link:hover {
          color: #c19a6b !important;
        }

        .contact-actions {
          display: flex;
          gap: 12px;
          margin-top: auto;
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.5px;
        }

        .whatsapp-btn {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: white;
        }

        .call-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .whatsapp-btn:hover {
          background: linear-gradient(135deg, #1DA851 0%, #0D7A6B 100%);
        }

        .call-btn:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6B46C1 100%);
        }

        /* Footer Bottom */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .hours {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #b0b0b0;
          font-size: 0.9rem;
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .hours svg {
          color: #c19a6b;
        }

        .footer-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .copyright {
          color: #888;
          font-size: 0.85rem;
          margin: 0;
        }

        /* Designer Section with Social Icons */
        .designer-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .designer-credit {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .designer-credit:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(193, 154, 107, 0.2);
        }

        .credit-text {
          color: #888;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .designer-name {
          color: #c19a6b;
          text-decoration: none !important;
          font-weight: 600;
          font-size: 0.85rem;
          transition: color 0.3s ease;
        }

        .designer-name:hover {
          color: #fff;
        }

        .designer-social {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .designer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          color: #b0b0b0;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .designer-social-link:hover {
          background: #c19a6b;
          color: white;
          transform: translateY(-2px);
        }

        /* Global fix for Next.js Link styles */
        :global(a) {
          text-decoration: none !important;
          color: inherit !important;
        }

        /* Responsive Design */
        @media (min-width: 1024px) {
          .footer-content {
            grid-template-columns: 1.2fr 1fr 1.2fr;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 40px 0 20px;
          }
          
          .footer-content {
            gap: 40px;
            margin-bottom: 40px;
            padding-bottom: 40px;
          }
          
          .brand-name {
            font-size: 1.5rem;
          }
          
          .contact-actions {
            flex-direction: column;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .hours {
            justify-content: center;
          }
          
          .footer-info {
            align-items: center;
          }
          
          .copyright {
            text-align: center;
          }
          
          .designer-section {
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 35px;
          }
          
          .brand-description {
            max-width: 100%;
          }
          
          .social-icons {
            justify-content: flex-start;
          }
          
          .nav-button {
            padding: 14px 16px;
          }
          
          .action-btn {
            padding: 12px 16px;
          }
          
          .hours {
            font-size: 0.85rem;
          }
          
          .copyright {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </footer>
  )
}