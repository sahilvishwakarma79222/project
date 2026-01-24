'use client'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'

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
      phone: '+91 98765 43210',
      email: 'bablu@maakripawoodart.com',
      experience: '25+ Years Experience',
      specialties: ['Traditional Wood Carving', 'Fine Furniture Making', 'Antique Restoration'],
      bio: 'With over 25 years of expertise in traditional woodworking, Bablu specializes in intricate carvings and custom furniture that blend heritage techniques with modern functionality.',
      yearsWithCompany: '25 Years',
      imageStyle: {
        backgroundColor: '#8B4513',
        backgroundImage: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
      }
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
      imageStyle: {
        backgroundColor: '#D4A76A',
        backgroundImage: 'linear-gradient(135deg, #D4A76A 0%, #E6BE8A 100%)'
      }
    }
  ]
  
  const achievements = [
    { number: '25+', label: 'Years of Excellence' },
    { number: '1000+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '500+', label: 'Happy Families' }
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
          minHeight: isMobile ? '90vh' : '100vh',
          padding: isMobile ? '100px 20px 60px' : '140px 40px 80px',
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
              marginBottom: isMobile ? '20px' : '24px',
              border: '1px solid rgba(139, 69, 19, 0.2)'
            }}>
              <span style={{ 
                color: '#8B4513', 
                fontSize: isMobile ? '12px' : '14px', 
                fontWeight: '600' 
              }}>
                ESTABLISHED 1998
              </span>
            </div>
            
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '300',
              lineHeight: '1.1',
              marginBottom: isMobile ? '20px' : '24px',
              color: '#1A1A1A'
            }}>
              Crafting <span style={{ fontWeight: '600', color: '#8B4513' }}>Timeless</span> <br />
              Wooden Masterpieces
            </h1>
            
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              color: '#666',
              lineHeight: '1.6',
              marginBottom: isMobile ? '32px' : '40px',
              maxWidth: isMobile ? '100%' : '600px',
              margin: '0 auto'
            }}>
              For over two decades, Maa Kripa Wood Art has been creating bespoke wooden 
              craftsmanship that blends traditional techniques with contemporary design.
            </p>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section style={{
        padding: isMobile ? '60px 20px' : '80px 40px',
        backgroundColor: '#FAF5EF'
      }}>
        <div style={{
          maxWidth: isMobile ? '100%' : '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '30px' : '40px'
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
                fontSize: isMobile ? '2.5rem' : '3rem',
                fontWeight: '700',
                color: '#8B4513',
                marginBottom: '8px',
                fontFamily: "'Playfair Display', serif"
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: isMobile ? '13px' : '14px',
                color: '#666',
                fontWeight: '500',
                letterSpacing: '0.5px'
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
          padding: isMobile ? '80px 20px' : '120px 40px',
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
            marginBottom: isMobile ? '60px' : '80px',
            opacity: 0,
            transform: 'translateY(20px)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#1A1A1A',
              fontFamily: "'Playfair Display', serif"
            }}>
              Meet Our Founders
            </h2>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              color: '#666',
              maxWidth: isMobile ? '100%' : '600px',
              margin: '0 auto'
            }}>
              The master craftsmen whose expertise defines our legacy
            </p>
          </div>
          
          {/* Founders Grid with Portrait Images */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '80px' : '100px'
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
                  alignItems: 'stretch',
                  minHeight: isMobile ? 'auto' : '500px',
                  backgroundColor: '#FAF9F7',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #F0F0F0'
                }}
              >
                {/* Portrait Image Container */}
                <div style={{
                  flex: isMobile ? '0 0 300px' : '0 0 40%',
                  position: 'relative',
                  overflow: 'hidden',
                  ...founder.imageStyle
                }}>
                  {/* Portrait Image Placeholder */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? '200px' : '280px',
                    height: isMobile ? '250px' : '350px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    border: '4px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '60px' : '80px',
                    fontWeight: '300',
                    color: 'white',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {founder.name.charAt(0)}
                  </div>
                  
                  {/* Experience Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: isMobile ? '20px' : '40px',
                    left: isMobile ? '20px' : '40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    padding: isMobile ? '12px 20px' : '16px 28px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{
                      fontSize: isMobile ? '1.5rem' : '2rem',
                      fontWeight: '700',
                      color: '#8B4513',
                      lineHeight: 1
                    }}>
                      {founder.yearsWithCompany}
                    </div>
                    <div style={{
                      fontSize: isMobile ? '11px' : '12px',
                      color: '#666',
                      fontWeight: '600',
                      letterSpacing: '1px',
                      marginTop: '4px'
                    }}>
                      WITH COMPANY
                    </div>
                  </div>
                </div>
                
                {/* Founder Info */}
                <div style={{
                  flex: isMobile ? '0 0 auto' : '0 0 60%',
                  padding: isMobile ? '32px 24px' : '60px'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    backgroundColor: 'rgba(139, 69, 19, 0.1)',
                    borderRadius: '4px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#8B4513',
                      borderRadius: '50%'
                    }} />
                    <span style={{ 
                      fontSize: isMobile ? '12px' : '14px', 
                      color: '#8B4513', 
                      fontWeight: '600' 
                    }}>
                      {founder.experience}
                    </span>
                  </div>
                  
                  <h3 style={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1A1A1A',
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {founder.name}
                  </h3>
                  
                  <div style={{
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    color: '#8B4513',
                    fontWeight: '500',
                    marginBottom: '24px'
                  }}>
                    {founder.title}
                  </div>
                  
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    color: '#666',
                    lineHeight: '1.7',
                    marginBottom: '32px'
                  }}>
                    {founder.bio}
                  </p>
                  
                  {/* Contact Info */}
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: isMobile ? '20px' : '24px',
                    marginBottom: '32px',
                    border: '1px solid #F0F0F0'
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
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8B4513',
                        fontSize: isMobile ? '18px' : '20px',
                        flexShrink: 0
                      }}>
                        📞
                      </div>
                      <div>
                        <a 
                          href={`tel:${founder.phone}`}
                          style={{
                            fontSize: isMobile ? '1.125rem' : '1.25rem',
                            color: '#1A1A1A',
                            textDecoration: 'none',
                            fontWeight: '600',
                            display: 'block',
                            marginBottom: '4px'
                          }}
                          onMouseEnter={(e) => e.target.style.color = '#8B4513'}
                          onMouseLeave={(e) => e.target.style.color = '#1A1A1A'}
                        >
                          {founder.phone}
                        </a>
                        <div style={{
                          fontSize: isMobile ? '14px' : '16px',
                          color: '#666',
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
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8B4513',
                        fontSize: isMobile ? '18px' : '20px',
                        flexShrink: 0
                      }}>
                        ✉️
                      </div>
                      <a 
                        href={`mailto:${founder.email}`}
                        style={{
                          fontSize: isMobile ? '1rem' : '1.125rem',
                          color: '#1A1A1A',
                          textDecoration: 'none',
                          fontWeight: '500'
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
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: '600',
                      color: '#8B4513',
                      marginBottom: '16px',
                      letterSpacing: '0.5px'
                    }}>
                      Areas of Expertise
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '10px' 
                    }}>
                      {founder.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: 'rgba(139, 69, 19, 0.08)',
                            borderRadius: '6px',
                            fontSize: isMobile ? '13px' : '14px',
                            color: '#8B4513',
                            fontWeight: '500'
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
          padding: isMobile ? '80px 20px' : '120px 40px',
          backgroundColor: '#FAF5EF'
        }}
      >
        <div style={{ 
          maxWidth: isMobile ? '100%' : '1000px', 
          margin: '0 auto' 
        }}>
          <div className="animate-on-scroll" style={{
            textAlign: 'center',
            marginBottom: isMobile ? '60px' : '80px',
            opacity: 0,
            transform: 'translateY(20px)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#1A1A1A',
              fontFamily: "'Playfair Display', serif"
            }}>
              Our Craftsmanship Process
            </h2>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              color: '#666',
              maxWidth: isMobile ? '100%' : '600px',
              margin: '0 auto'
            }}>
              Every piece undergoes meticulous attention through our proven process
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '24px' : '32px'
          }}>
            {processSteps.map((step, index) => (
              <div 
                key={step.step}
                className="animate-on-scroll"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  backgroundColor: 'white',
                  padding: isMobile ? '32px 24px' : '48px 32px',
                  borderRadius: '12px',
                  border: '1px solid #F0F0F0',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.borderColor = '#8B4513'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#F0F0F0'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                <div style={{
                  fontSize: isMobile ? '2.5rem' : '3rem',
                  fontWeight: '300',
                  color: '#8B4513',
                  marginBottom: '24px',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {step.step}
                </div>
                <h3 style={{
                  fontSize: isMobile ? '1.5rem' : '1.75rem',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#1A1A1A'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: isMobile ? '1.1rem' : '1.25rem',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section 
        id="contact"
        style={{
          padding: isMobile ? '80px 20px' : '120px 40px',
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          color: 'white'
        }}
      >
        <div style={{ 
          maxWidth: isMobile ? '100%' : '800px', 
          margin: '0 auto',
          textAlign: 'center' 
        }}>
          <div className="animate-on-scroll" style={{
            opacity: 0,
            transform: 'translateY(20px)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: '600',
              marginBottom: isMobile ? '20px' : '24px',
              fontFamily: "'Playfair Display', serif"
            }}>
              Start Your Custom Project
            </h2>
            
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              marginBottom: isMobile ? '40px' : '48px',
              opacity: 0.9,
              maxWidth: isMobile ? '100%' : '600px',
              margin: '0 auto'
            }}>
              Contact our founders directly for personalized consultations and 
              custom project discussions
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '24px' : '32px',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              {founders.map((founder) => (
                <div 
                  key={founder.id}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: isMobile ? '32px 24px' : '48px 32px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textAlign: 'center'
                  }}
                >
                  <h3 style={{
                    fontSize: isMobile ? '1.5rem' : '1.75rem',
                    fontWeight: '600',
                    marginBottom: '12px'
                  }}>
                    {founder.name}
                  </h3>
                  
                  <div style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    opacity: 0.9,
                    marginBottom: isMobile ? '24px' : '32px'
                  }}>
                    {founder.title}
                  </div>
                  
                  <a 
                    href={`tel:${founder.phone}`}
                    style={{
                      display: 'inline-block',
                      padding: isMobile ? '16px 24px' : '20px 40px',
                      backgroundColor: 'white',
                      color: '#8B4513',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: isMobile ? '1rem' : '1.125rem',
                      transition: 'all 0.3s ease',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-4px)'
                      e.target.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    📞 Contact {founder.name.split(' ')[0]}
                  </a>
                </div>
              ))}
            </div>
            
            <div style={{
              marginTop: isMobile ? '40px' : '60px',
              paddingTop: isMobile ? '24px' : '40px',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              fontSize: isMobile ? '14px' : '16px',
              opacity: 0.8,
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: '12px' }}>📍 Workshop Address: 123 Woodcraft Lane, Artisan District</div>
              <div>⏰ Working Hours: Monday to Saturday • 9:00 AM - 7:00 PM</div>
              <div style={{ marginTop: '8px', fontSize: isMobile ? '13px' : '14px' }}>
                ✨ Appointments Recommended for Detailed Consultations
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{
        padding: isMobile ? '40px 20px' : '60px 40px',
        backgroundColor: '#1A1A1A',
        color: '#999',
        textAlign: 'center'
      }}>
        <div style={{ 
          maxWidth: isMobile ? '100%' : '800px', 
          margin: '0 auto' 
        }}>
          <div style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: '600',
            color: '#D4A76A',
            marginBottom: isMobile ? '16px' : '24px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Maa Kripa Wood Art
          </div>
          
          <p style={{
            fontSize: isMobile ? '1rem' : '1.125rem',
            marginBottom: isMobile ? '24px' : '32px',
            lineHeight: '1.6',
            maxWidth: isMobile ? '100%' : '400px',
            margin: '0 auto',
            color: '#BBB'
          }}>
            Creating timeless wooden craftsmanship since 1998
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '24px' : '32px',
            marginBottom: isMobile ? '32px' : '40px',
            fontSize: isMobile ? '14px' : '16px',
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center'
          }}>
            {founders.map((founder, index) => (
              <div key={founder.id} style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <a 
                  href={`tel:${founder.phone}`}
                  style={{ 
                    color: '#D4A76A', 
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: isMobile ? '1.125rem' : '1.25rem'
                  }}
                >
                  {founder.name.split(' ')[0]}
                </a>
                <div style={{
                  fontSize: isMobile ? '13px' : '14px',
                  color: '#888'
                }}>
                  {founder.phone}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#666',
            paddingTop: isMobile ? '24px' : '40px',
            borderTop: '1px solid #333'
          }}>
            © {new Date().getFullYear()} Maa Kripa Wood Art • All Rights Reserved
          </div>
        </div>
      </footer>
      
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
        }
        
        a {
          transition: all 0.3s ease;
        }
        
        /* Responsive typography */
        @media (max-width: 767px) {
          h1 {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
          }
          
          h2 {
            font-size: 2rem !important;
            line-height: 1.3 !important;
          }
          
          h3 {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
          }
          
          p {
            font-size: 1.1rem !important;
            line-height: 1.6 !important;
          }
        }
        
        /* Touch-friendly buttons */
        @media (max-width: 767px) {
          a[href^="tel:"], 
          button {
            min-height: 56px;
            min-width: 56px;
            font-size: 1.125rem !important;
          }
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
    </div>
  )
}