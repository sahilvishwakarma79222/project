'use client'

import { FaLeaf, FaAward, FaHeart, FaHistory } from 'react-icons/fa'

export default function AboutSection() {
    return (
        <>
            <section className="about-section">
                {/* Background Pattern */}
                <div className="wood-pattern"></div>
                
                <div className="container">
                    {/* Premium Header */}
                    <div className="about-header" style={{
                        textAlign: 'center',
                        marginBottom: '50px',
                        position: 'relative'
                    }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                            padding: '8px 25px',
                            borderRadius: '25px',
                            marginBottom: '20px',
                            border: '1px solid rgba(139, 69, 19, 0.15)'
                        }}>
                            <FaHistory style={{ color: '#8B4513', fontSize: '14px' }} />
                            <span style={{
                                color: '#8B4513',
                                fontSize: '12px',
                                fontWeight: '600',
                                letterSpacing: '2px',
                                textTransform: 'uppercase'
                            }}>
                                Since 1996
                            </span>
                        </div>
                        
                        <h2 style={{
                            fontSize: '36px',
                            fontWeight: '700',
                            color: '#1F2937',
                            marginBottom: '15px',
                            lineHeight: '1.2'
                        }}>
                            Welcome to <span style={{ 
                                color: '#8B4513',
                                position: 'relative',
                                display: 'inline-block'
                            }}>
                                <span style={{
                                    background: 'linear-gradient(135deg, #8B4513 0%, #D4AF37 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>Maa Kripa Wood Art</span>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: '0',
                                    width: '100%',
                                    height: '2px',
                                    background: 'linear-gradient(90deg, #8B4513, #D4AF37, #8B4513)',
                                    borderRadius: '2px'
                                }}></div>
                            </span>
                        </h2>
                        
                        <p style={{
                            fontSize: '16px',
                            color: '#6B7280',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Where <strong>heritage craftsmanship</strong> meets <strong>modern elegance</strong>. 
                            Crafting timeless wooden masterpieces for 28+ years.
                        </p>
                    </div>

                    {/* Core Philosophy Cards */}
                    <div className="philosophy-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '25px',
                        marginBottom: '50px'
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '30px',
                            borderRadius: '15px',
                            boxShadow: '0 10px 30px rgba(139, 69, 19, 0.08)',
                            border: '1px solid rgba(139, 69, 19, 0.1)',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                color: '#8B4513',
                                fontSize: '24px'
                            }}>
                                <FaLeaf />
                            </div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#1F2937',
                                marginBottom: '10px'
                            }}>
                                Natural Excellence
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#6B7280',
                                lineHeight: '1.6'
                            }}>
                                100% natural wood, zero chemicals. Pure craftsmanship that stands the test of time.
                            </p>
                        </div>

                        <div style={{
                            background: 'white',
                            padding: '30px',
                            borderRadius: '15px',
                            boxShadow: '0 10px 30px rgba(139, 69, 19, 0.08)',
                            border: '1px solid rgba(139, 69, 19, 0.1)',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                color: '#8B4513',
                                fontSize: '24px'
                            }}>
                                <FaAward />
                            </div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#1F2937',
                                marginBottom: '10px'
                            }}>
                                Legacy Quality
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#6B7280',
                                lineHeight: '1.6'
                            }}>
                                28+ years of uncompromising quality. Every piece carries our family legacy.
                            </p>
                        </div>

                        <div style={{
                            background: 'white',
                            padding: '30px',
                            borderRadius: '15px',
                            boxShadow: '0 10px 30px rgba(139, 69, 19, 0.08)',
                            border: '1px solid rgba(139, 69, 19, 0.1)',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px',
                                color: '#8B4513',
                                fontSize: '24px'
                            }}>
                                <FaHeart />
                            </div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                color: '#1F2937',
                                marginBottom: '10px'
                            }}>
                                Art With Heart
                            </h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#6B7280',
                                lineHeight: '1.6'
                            }}>
                                "Maa Kripa" - Mother's Blessing guides our craftsmanship with love and care.
                            </p>
                        </div>
                    </div>

                    {/* Compact Story */}
                    <div style={{
                        background: 'linear-gradient(135deg, #FDF8F3 0%, #FFFFFF 100%)',
                        borderRadius: '15px',
                        padding: '40px',
                        marginBottom: '50px',
                        border: '1px solid rgba(139, 69, 19, 0.1)',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-15px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'white',
                            padding: '5px 25px',
                            borderRadius: '20px',
                            border: '2px solid #8B4513',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#8B4513'
                        }}>
                            Our Story in Brief
                        </div>
                        
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '30px',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#1F2937',
                                    marginBottom: '15px'
                                }}>
                                    From Humble Beginnings to Legacy Brand
                                </h3>
                                <p style={{
                                    fontSize: '15px',
                                    lineHeight: '1.7',
                                    color: '#4B5563'
                                }}>
                                    Founded in 1996, <strong>Maa Kripa Wood Art</strong> began as a passion project 
                                    and grew into a trusted name through dedication to quality and customer 
                                    satisfaction. Our name reflects the divine blessing that guides our craft.
                                </p>
                            </div>
                            
                            <div style={{
                                background: 'white',
                                padding: '25px',
                                borderRadius: '12px',
                                border: '1px solid rgba(139, 69, 19, 0.1)',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    fontSize: '48px',
                                    fontWeight: '800',
                                    color: '#8B4513',
                                    marginBottom: '10px',
                                    lineHeight: '1'
                                }}>
                                    28+
                                </div>
                                <div style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#1F2937',
                                    marginBottom: '5px'
                                }}>
                                    Years of Excellence
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#6B7280'
                                }}>
                                    1996 - Present
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Styles */}
            <style jsx global>{`
                .about-section {
                    padding: 80px 20px;
                    position: relative;
                    background: #FFFFFF;
                    overflow: hidden;
                }

                .wood-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%238B4513' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
                    opacity: 0.3;
                    pointer-events: none;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .philosophy-grid > div:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(139, 69, 19, 0.12) !important;
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .about-section {
                        padding: 60px 20px;
                    }
                    
                    .about-header h2 {
                        font-size: 32px !important;
                    }
                    
                    .philosophy-grid {
                        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important;
                        gap: 20px !important;
                    }
                }

                @media (max-width: 768px) {
                    .about-section {
                        padding: 50px 15px;
                    }
                    
                    .about-header h2 {
                        font-size: 28px !important;
                    }
                    
                    .philosophy-grid {
                        grid-template-columns: 1fr !important;
                        max-width: 400px;
                        margin: 0 auto 40px !important;
                    }
                    
                    .about-header p {
                        font-size: 14px !important;
                    }
                    
                    .about-story {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                }

                @media (max-width: 480px) {
                    .about-section {
                        padding: 40px 10px;
                    }
                    
                    .about-header h2 {
                        font-size: 24px !important;
                    }
                    
                    .philosophy-grid > div {
                        padding: 25px !important;
                    }
                    
                    .about-story > div {
                        padding: 25px !important;
                    }
                }

                /* Animation */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .about-section > .container > * {
                    animation: fadeIn 0.6s ease-out;
                }

                .philosophy-grid > div {
                    animation: fadeIn 0.6s ease-out;
                }

                .philosophy-grid > div:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .philosophy-grid > div:nth-child(3) {
                    animation-delay: 0.4s;
                }
            `}</style>
        </>
    )
}