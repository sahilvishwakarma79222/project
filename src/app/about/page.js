'use client'
import { useEffect, useRef, useState } from 'react'

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
    setupIntersectionObserver()
  }, [])

  const setupIntersectionObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === statsRef.current) {
              startCounterAnimation()
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) observer.observe(statsRef.current)
    if (featuresRef.current) observer.observe(featuresRef.current)
  }

  const startCounterAnimation = () => {
    const counters = document.querySelectorAll('.stat-number')
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target')
      if (!target) return
      
      const duration = 2000
      const step = target / (duration / 16)
      let current = 0

      const updateCounter = () => {
        current += step
        if (current < target) {
          counter.textContent = Math.ceil(current) + '+'
          setTimeout(updateCounter, 16)
        } else {
          counter.textContent = target + '+'
        }
      }

      updateCounter()
    })
  }

  // Inline styles objects
  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    color: 'white',
    overflow: 'hidden',
    position: 'relative',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.8s ease'
  }

  const floatingShape1 = {
    position: 'absolute',
    width: '288px',
    height: '288px',
    borderRadius: '50%',
    border: '1px solid rgba(202, 138, 4, 0.2)',
    top: '10%',
    left: '5%',
    animation: 'float 6s ease-in-out infinite'
  }

  const floatingShape2 = {
    position: 'absolute',
    width: '384px',
    height: '384px',
    borderRadius: '50%',
    border: '1px solid rgba(202, 138, 4, 0.1)',
    top: '60%',
    right: '5%',
    animation: 'float 8s ease-in-out infinite 2s'
  }

  const floatingShape3 = {
    position: 'absolute',
    width: '256px',
    height: '256px',
    borderRadius: '50%',
    border: '1px solid rgba(202, 138, 4, 0.15)',
    bottom: '20%',
    left: '15%',
    animation: 'float 7s ease-in-out infinite 1s'
  }

  const badgeStyle = {
    display: 'inline-block',
    padding: '8px 16px',
    background: 'rgba(202, 138, 4, 0.2)',
    border: '1px solid rgba(202, 138, 4, 0.3)',
    borderRadius: '9999px',
    marginBottom: '24px',
    animation: 'fadeInUp 0.6s ease-out'
  }

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '24px',
    background: 'linear-gradient(to right, #fbbf24, #d97706)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'fadeInUp 0.6s ease-out 0.2s both'
  }

  const experienceBadge = {
    position: 'absolute',
    top: '24px',
    right: '24px',
    background: 'rgba(202, 138, 4, 0.9)',
    backdropFilter: 'blur(8px)',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    border: '1px solid rgba(202, 138, 4, 0.3)',
    animation: 'pulse 2s infinite'
  }

  const featureCard = {
    position: 'relative',
    background: 'rgba(55, 65, 81, 0.5)',
    backdropFilter: 'blur(8px)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(75, 85, 99, 0.5)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }

  const featureCardHover = {
    ...featureCard,
    border: '1px solid rgba(202, 138, 4, 0.3)',
    transform: 'translateY(-8px)'
  }

  const statsSection = {
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    marginBottom: '80px',
    background: 'linear-gradient(135deg, rgba(120, 53, 15, 0.3) 0%, rgba(180, 83, 9, 0.2) 100%)'
  }

  return (
    <div style={pageStyle}>
      {/* Floating Background Shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={floatingShape1}></div>
        <div style={floatingShape2}></div>
        <div style={floatingShape3}></div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 16px', position: 'relative', zIndex: 10 }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={badgeStyle}>
            <span style={{ color: '#fbbf24', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em' }}>
              ABOUT US
            </span>
          </div>
          
          <h1 style={titleStyle}>
            About Shree Doors
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#d1d5db',
            maxWidth: '32rem',
            margin: '0 auto 32px auto',
            animation: 'fadeInUp 0.6s ease-out 0.4s both'
          }}>
            Decades of excellence in crafting premium wooden doors
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            animation: 'fadeInUp 0.6s ease-out 0.6s both'
          }}>
            <div style={{ width: '48px', height: '2px', background: 'rgba(245, 158, 11, 0.5)' }}></div>
            <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></div>
            <div style={{ width: '48px', height: '2px', background: 'rgba(245, 158, 11, 0.5)' }}></div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', marginBottom: '80px' }}>
          {/* Image Section */}
          <div style={{
            animation: 'fadeInLeft 0.8s ease-out 0.8s both'
          }}>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
              <img 
                src="/images/about/showroom.jpg" 
                alt="Shree Doors Showroom" 
                style={{ 
                  width: '100%', 
                  height: '384px', 
                  objectFit: 'cover',
                  transition: 'transform 0.7s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' 
              }}></div>
              
              {/* Experience Badge */}
              <div style={experienceBadge}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>15+</div>
                <div style={{ fontSize: '12px', color: '#fef3c7', fontWeight: 500 }}>Years Experience</div>
              </div>
            </div>
          </div>
          
          {/* Text Content */}
          <div style={{
            animation: 'fadeInRight 0.8s ease-out 0.8s both'
          }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '4px 12px', 
              background: 'rgba(202, 138, 4, 0.2)',
              border: '1px solid rgba(202, 138, 4, 0.3)',
              borderRadius: '9999px',
              marginBottom: '16px'
            }}>
              <span style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></span>
              <span style={{ color: '#fbbf24', fontSize: '14px', fontWeight: 500 }}>OUR LEGACY</span>
            </div>
            
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>
              Crafting Excellence <span style={{ color: '#f59e0b' }}>Since 2008</span>
            </h2>
            
            <p style={{ fontSize: '1.125rem', color: '#d1d5db', lineHeight: '1.75', marginBottom: '24px' }}>
              With <strong style={{ color: '#fbbf24' }}>decades of expertise</strong> in woodcraft, 
              Shree Doors specializes in premium wooden doors combining{' '}
              <strong style={{ color: '#fbbf24' }}>traditional artistry</strong> with modern 
              security standards.
            </p>
            
            <div style={{ color: '#d1d5db', marginBottom: '24px' }}>
              <p style={{ marginBottom: '16px', lineHeight: '1.625' }}>
                Our journey began with a simple vision: to create doors that not only secure your space 
                but also enhance its aesthetic appeal. Today, we are one of India's most trusted 
                manufacturers of luxury wooden doors.
              </p>
              <p style={{ lineHeight: '1.625' }}>
                Every door we create tells a story of <strong style={{ color: '#fbbf24' }}>meticulous craftsmanship</strong>, 
                attention to detail, and a passion for perfection that has been passed down through 
                generations of skilled artisans.
              </p>
            </div>

            {/* Highlight Points */}
            <div style={{ paddingTop: '16px' }}>
              {[
                "100% Premium Quality Materials",
                "Skilled Artisan Craftsmanship", 
                "Modern Security Standards"
              ].map((point, index) => (
                <div 
                  key={index}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    color: '#d1d5db',
                    marginBottom: '12px',
                    animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.1}s both`
                  }}
                >
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    background: '#f59e0b', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <span style={{ color: 'white', fontSize: '12px' }}>✓</span>
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div ref={featuresRef} style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
              Why Choose <span style={{ color: '#f59e0b' }}>Shree Doors</span>
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#d1d5db' }}>
              Excellence in every detail, quality in every door
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {[
              {
                icon: '🏆',
                title: 'Premium Quality',
                desc: 'Using only the finest woods and materials for lasting durability and elegance'
              },
              {
                icon: '👨‍🔧', 
                title: 'Expert Craftsmanship',
                desc: 'Skilled artisans with generations of woodworking experience and precision'
              },
              {
                icon: '🛡️',
                title: '10 Years Warranty',
                desc: 'Comprehensive warranty ensuring long-term reliability and peace of mind'
              },
              {
                icon: '🚚',
                title: 'All India Delivery',
                desc: 'Free shipping and professional installation services across India'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={featureCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(202, 138, 4, 0.3)'
                  e.currentTarget.style.transform = 'translateY(-8px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(75, 85, 99, 0.5)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    background: 'rgba(202, 138, 4, 0.2)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '16px',
                    transition: 'background-color 0.3s ease'
                  }}>
                    <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '12px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#d1d5db', lineHeight: '1.625' }}>{feature.desc}</p>
                </div>
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to bottom right, rgba(202, 138, 4, 0.05), transparent)',
                  borderRadius: '16px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div 
          ref={statsRef}
          style={statsSection}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}></div>
          
          <div style={{ position: 'relative', zIndex: 10, padding: '64px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
              {[
                { icon: '🚪', target: 50, label: 'Door Categories' },
                { icon: '😊', target: 1000, label: 'Happy Customers' },
                { icon: '📅', target: 15, label: 'Years Experience' },
                { icon: '📍', label: 'Across India' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{stat.icon}</div>
                  <h3 
                    className="stat-number"
                    style={{ 
                      fontSize: '2.25rem', 
                      fontWeight: 'bold', 
                      color: '#fbbf24', 
                      marginBottom: '8px' 
                    }}
                    data-target={stat.target}
                  >
                    {stat.target ? '0+' : 'All'}
                  </h3>
                  <p style={{ color: '#d1d5db', fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(to right, rgba(55, 65, 81, 0.5), rgba(17, 24, 39, 0.5))',
            backdropFilter: 'blur(8px)',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid rgba(75, 85, 99, 0.5)'
          }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
              Ready to Transform Your Space?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '32px', maxWidth: '32rem', margin: '0 auto 32px auto' }}>
              Get in touch with us for a free consultation and discover the perfect door for your home
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
              <button 
                style={{
                  padding: '16px 32px',
                  background: '#d97706',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#b45309'
                  e.target.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#d97706'
                  e.target.style.transform = 'scale(1)'
                }}
              >
                <span>📞</span>
                Contact Us
              </button>
              <button 
                style={{
                  padding: '16px 32px',
                  background: 'transparent',
                  border: '1px solid #d97706',
                  color: '#fbbf24',
                  fontWeight: 600,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(217, 119, 6, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                }}
              >
                <span>🖼️</span>
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}