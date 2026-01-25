'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { Phone, Mail, Clock, Award, Users, CheckCircle } from 'lucide-react'

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Scroll animations
    const handleScroll = () => {
      const sections = ['hero', 'founders', 'process', 'contact']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section)
            break
          }
        }
      }
      
      // Animate elements on scroll
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      animateElements.forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('animated')
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  const founders = [
    {
      id: 1,
      name: 'Bablu Pal',
      title: 'Founder & Master Craftsman',
      phone: '+91 90267 89724',
      email: 'bablu@maakripawoodart.com',
      experience: '25+ Years Experience',
      specialties: ['Traditional Wood Carving', 'Fine Furniture Making', 'Antique Restoration'],
      bio: 'With over 25 years of expertise in traditional woodworking, Bablu specializes in intricate carvings and custom furniture that blend heritage techniques with modern functionality.',
      yearsWithCompany: '25 Years',
      imageSrc: '/images/profilePic/bablu.png'
    },
    {
      id: 2,
      name: 'Vivek Pal',
      title: 'Creative Director',
      phone: '+91 98765 43211',
      email: 'vivek@maakripawoodart.com',
      experience: '15+ Years Experience',
      specialties: ['Contemporary Design', 'Space Planning', 'Sustainable Materials'],
      bio: 'Vivek combines modern design principles with traditional craftsmanship, creating bespoke wooden pieces that enhance contemporary living and working spaces.',
      yearsWithCompany: '15 Years',
      imageSrc: '/images/profilePic/vivek.png'
    }
  ]
  
  const achievements = [
    { number: '28+', label: 'Years of Excellence', icon: <Clock size={24} /> },
    { number: '1000+', label: 'Projects Completed', icon: <CheckCircle size={24} /> },
    { number: '98%', label: 'Client Satisfaction', icon: <Award size={24} /> },
    { number: '1000+', label: 'Happy Families', icon: <Users size={24} /> }
  ]
  
  const processSteps = [
    { step: '01', title: 'Consultation', desc: 'Understanding your vision and requirements' },
    { step: '02', title: 'Design', desc: 'Creating detailed sketches and 3D models' },
    { step: '03', title: 'Crafting', desc: 'Precision woodworking by master artisans' },
    { step: '04', title: 'Finishing', desc: 'Applying natural, eco-friendly finishes' }
  ]
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      
    <Navbar/>
      
      {/* Hero Section */}
      <section 
        id="about"
        style={{
          minHeight: isMobile ? '60vh' : '80vh',
          padding: isMobile ? '80px 20px 40px' : '120px 40px 60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FAF5EF 0%, #FFFDFA 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ 
          maxWidth: isMobile ? '100%' : '800px',
          textAlign: 'center',
          width: '100%'
        }}>
          <div className="animate-on-scroll" style={{
            opacity: 0,
            transform: 'translateY(20px)'
          }}>
            <div style={{
              display: 'inline-block',
              padding: isMobile ? '6px 16px' : '8px 20px',
              backgroundColor: 'rgba(139, 69, 19, 0.1)',
              borderRadius: '20px',
              marginBottom: isMobile ? '16px' : '20px',
              border: '1px solid rgba(139, 69, 19, 0.2)'
            }}>
              <span style={{ 
                color: '#8B4513', 
                fontSize: isMobile ? '12px' : '14px', 
                fontWeight: '600',
                letterSpacing: '1px'
              }}>
                ESTABLISHED 1998
              </span>
            </div>
            
            <h1 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '300',
              lineHeight: '1.2',
              marginBottom: isMobile ? '20px' : '24px',
              color: '#1A1A1A',
              letterSpacing: '-0.5px'
            }}>
              Crafting <span style={{ fontWeight: '600', color: '#8B4513' }}>Timeless</span> <br />
              Wooden Masterpieces
            </h1>
            
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: '#666',
              lineHeight: '1.7',
              marginBottom: isMobile ? '32px' : '40px',
              maxWidth: isMobile ? '100%' : '600px',
              margin: '0 auto',
              fontWeight: '400'
            }}>
              For over two decades, Maa Kripa Wood Art has been creating bespoke wooden 
              craftsmanship that blends traditional techniques with contemporary design.
            </p>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section style={{
        padding: isMobile ? '40px 20px' : '60px 40px',
        backgroundColor: '#FAF5EF'
      }}>
        <div style={{
          maxWidth: isMobile ? '100%' : '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '20px' : '30px'
        }}>
          {achievements.map((stat, index) => (
            <div 
              key={index}
              className="animate-on-scroll"
              style={{
                textAlign: 'center',
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              <div style={{
                fontSize: isMobile ? '2rem' : '2.5rem',
                fontWeight: '700',
                color: '#8B4513',
                marginBottom: '8px',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '-0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <span style={{ opacity: 0.7 }}>{stat.icon}</span>
                {stat.number}
              </div>
              <div style={{
                fontSize: isMobile ? '12px' : '13px',
                color: '#666',
                fontWeight: '500',
                letterSpacing: '0.3px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Founders Section */}
      <section 
        id="founders"
        style={{
          padding: isMobile ? '60px 20px' : '80px 40px',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div style={{ 
          maxWidth: isMobile ? '100%' : '1200px', 
          margin: '0 auto' 
        }}>
          {/* Section Header */}
          <div className="animate-on-scroll" style={{
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
            opacity: 0,
            transform: 'translateY(20px)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.25rem',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#1A1A1A',
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '-0.3px'
            }}>
              Meet Our Founders
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: '#666',
              maxWidth: isMobile ? '100%' : '500px',
              margin: '0 auto',
              fontWeight: '400'
            }}>
              The master craftsmen whose expertise defines our legacy
            </p>
          </div>
          
          {/* Founders Grid with Portrait Images */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '60px' : '80px'
          }}>
            {founders.map((founder, index) => (
              <div 
                key={founder.id}
                className="animate-on-scroll"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse'),
                  alignItems: isMobile ? 'center' : 'stretch',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #E8E8E8',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Portrait Image Container - FIXED for mobile */}
                <div style={{
                  flex: isMobile ? '0 0 300px' : '0 0 40%',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#F8F5F1',
                  width: '100%',
                  minHeight: isMobile ? '300px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Image with better mobile handling */}
                  <img 
                    src={founder.imageSrc}
                    alt={founder.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block'
                    }}
                    onError={(e) => {
                      const parent = e.target.parentElement
                      parent.innerHTML = `
                        <div style="
                          width: 100%;
                          height: 100%;
                          display: flex;
                          flex-direction: column;
                          align-items: center;
                          justify-content: center;
                          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
                          color: white;
                          text-align: center;
                          padding: 20px;
                        ">
                          <div style="
                            font-size: ${isMobile ? '48px' : '64px'};
                            font-family: 'Playfair Display', serif;
                            font-weight: 300;
                            margin-bottom: 12px;
                          ">
                            ${founder.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div style="
                            font-size: ${isMobile ? '1.25rem' : '1.5rem'};
                            font-weight: 600;
                          ">
                            ${founder.name}
                          </div>
                        </div>
                      `
                    }}
                  />
                  
                  {/* Experience Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: isMobile ? '16px' : '24px',
                    left: isMobile ? '16px' : '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: isMobile ? '8px 16px' : '12px 20px',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(139, 69, 19, 0.1)'
                  }}>
                    <div style={{
                      fontSize: isMobile ? '1.25rem' : '1.5rem',
                      fontWeight: '700',
                      color: '#8B4513',
                      lineHeight: 1,
                      fontFamily: "'Playfair Display', serif"
                    }}>
                      {founder.yearsWithCompany}
                    </div>
                    <div style={{
                      fontSize: isMobile ? '10px' : '11px',
                      color: '#666',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      marginTop: '2px',
                      textTransform: 'uppercase'
                    }}>
                      Years with Company
                    </div>
                  </div>
                </div>
                
                {/* Founder Info */}
                <div style={{
                  flex: '1',
                  padding: isMobile ? '32px 20px' : '48px 40px',
                  backgroundColor: '#FFFFFF'
                }}>
                  {/* Experience Badge - Professional */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px 6px 8px',
                    backgroundColor: 'rgba(139, 69, 19, 0.08)',
                    borderRadius: '6px',
                    marginBottom: '20px',
                    border: '1px solid rgba(139, 69, 19, 0.1)'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#8B4513',
                      borderRadius: '50%'
                    }} />
                    <span style={{ 
                      fontSize: isMobile ? '11px' : '12px', 
                      color: '#8B4513', 
                      fontWeight: '600',
                      letterSpacing: '0.5px'
                    }}>
                      {founder.experience}
                    </span>
                  </div>
                  
                  <h3 style={{
                    fontSize: isMobile ? '1.5rem' : '1.75rem',
                    fontWeight: '600',
                    marginBottom: '4px',
                    color: '#1A1A1A',
                    fontFamily: "'Playfair Display', serif",
                    letterSpacing: '-0.3px'
                  }}>
                    {founder.name}
                  </h3>
                  
                  <div style={{
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    color: '#8B4513',
                    fontWeight: '500',
                    marginBottom: '20px',
                    letterSpacing: '0.3px'
                  }}>
                    {founder.title}
                  </div>
                  
                  <p style={{
                    fontSize: isMobile ? '0.9375rem' : '1.0625rem',
                    color: '#555',
                    lineHeight: '1.7',
                    marginBottom: '28px',
                    fontWeight: '400'
                  }}>
                    {founder.bio}
                  </p>
                  
                  {/* Contact Info - With Lucide Icons */}
                  <div style={{
                    backgroundColor: '#FAF7F3',
                    borderRadius: '8px',
                    padding: isMobile ? '20px' : '24px',
                    marginBottom: '28px',
                    border: '1px solid #EDE8E2'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      marginBottom: '16px' 
                    }}>
                      <div style={{
                        width: isMobile ? '36px' : '40px',
                        height: isMobile ? '36px' : '40px',
                        borderRadius: '8px',
                        backgroundColor: '#F0E6DD',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8B4513',
                        flexShrink: 0
                      }}>
                        <Phone size={isMobile ? 18 : 20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <a 
                          href={`tel:${founder.phone.replace(/\s+/g, '')}`}
                          style={{
                            fontSize: isMobile ? '1rem' : '1.125rem',
                            color: '#1A1A1A',
                            textDecoration: 'none',
                            fontWeight: '600',
                            display: 'block',
                            marginBottom: '2px',
                            letterSpacing: '0.2px'
                          }}
                          onMouseEnter={(e) => e.target.style.color = '#8B4513'}
                          onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}
                        >
                          {founder.phone}
                        </a>
                        <div style={{
                          fontSize: isMobile ? '12px' : '13px',
                          color: '#777',
                          fontWeight: '500'
                        }}>
                          Direct Contact
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: isMobile ? '36px' : '40px',
                        height: isMobile ? '36px' : '40px',
                        borderRadius: '8px',
                        backgroundColor: '#F0E6DD',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8B4513',
                        flexShrink: 0
                      }}>
                        <Mail size={isMobile ? 18 : 20} />
                      </div>
                      <a 
                        href={`mailto:${founder.email}`}
                        style={{
                          fontSize: isMobile ? '0.9375rem' : '1.0625rem',
                          color: '#1A1A1A',
                          textDecoration: 'none',
                          fontWeight: '500',
                          wordBreak: 'break-word'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#8B4513'}
                        onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}
                      >
                        {founder.email}
                      </a>
                    </div>
                  </div>
                  
                  {/* Specialties */}
                  <div>
                    <div style={{
                      fontSize: isMobile ? '13px' : '14px',
                      fontWeight: '600',
                      color: '#8B4513',
                      marginBottom: '14px',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase'
                    }}>
                      Areas of Expertise
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '8px' 
                    }}>
                      {founder.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'rgba(139, 69, 19, 0.06)',
                            borderRadius: '4px',
                            fontSize: isMobile ? '12px' : '13px',
                            color: '#8B4513',
                            fontWeight: '500',
                            border: '1px solid rgba(139, 69, 19, 0.1)'
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section 
        id="process"
        style={{
          padding: isMobile ? '60px 20px' : '80px 40px',
          backgroundColor: '#FAF7F3',
          borderTop: '1px solid #EDE8E2',
          borderBottom: '1px solid #EDE8E2'
        }}
      >
        <div style={{ 
          maxWidth: isMobile ? '100%' : '1000px', 
          margin: '0 auto' 
        }}>
          <div className="animate-on-scroll" style={{
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '60px',
            opacity: 0,
            transform: 'translateY(20px)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.25rem',
              fontWeight: '600',
              marginBottom: '12px',
              color: '#1A1A1A',
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '-0.3px'
            }}>
              Our Craftsmanship Process
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.125rem',
              color: '#666',
              maxWidth: isMobile ? '100%' : '500px',
              margin: '0 auto',
              fontWeight: '400'
            }}>
              Every piece undergoes meticulous attention through our proven process
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '20px' : '30px'
          }}>
            {processSteps.map((step, index) => (
              <div 
                key={step.step}
                className="animate-on-scroll"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  backgroundColor: 'white',
                  padding: isMobile ? '24px 20px' : '32px 28px',
                  borderRadius: '10px',
                  border: '1px solid #E8E8E8',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.borderColor = '#8B4513'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 69, 19, 0.08)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#E8E8E8'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                <div style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  fontWeight: '300',
                  color: '#8B4513',
                  marginBottom: '16px',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {step.step}
                </div>
                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#1A1A1A',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: isMobile ? '0.9375rem' : '1.0625rem',
                  color: '#666',
                  lineHeight: '1.6',
                  fontWeight: '400'
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Global Styles */}
      <style jsx global>{`
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
        
        .animate-on-scroll.animated {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        a {
          transition: all 0.3s ease;
        }
        
        /* Image loading animation */
        img {
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        
        /* Responsive typography */
        @media (max-width: 767px) {
          h1 {
            font-size: 2rem !important;
            line-height: 1.2 !important;
          }
          
          h2 {
            font-size: 1.75rem !important;
            line-height: 1.3 !important;
          }
          
          h3 {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
          }
          
          p {
            font-size: 1rem !important;
            line-height: 1.7 !important;
          }
        }
        
        /* Touch-friendly buttons */
        @media (max-width: 767px) {
          a[href^="tel:"], 
          button {
            min-height: 48px;
            min-width: 48px;
            font-size: 0.9375rem !important;
          }
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, 
                      border-color 0.3s ease, 
                      transform 0.3s ease,
                      box-shadow 0.3s ease;
        }
        
        /* Better image rendering on mobile */
        @media (max-width: 767px) {
          img {
            max-height: 400px;
            object-fit: cover;
          }
        }
      `}</style>
    </div>
  )
}