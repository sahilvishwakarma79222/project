'use client'

import { useState, useEffect, useRef } from 'react'
import { FaLeaf, FaAward, FaHeart, FaHistory, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './AboutSection.css' // CSS import करें

export default function AboutSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    
    const slides = [
        {
            icon: FaLeaf,
            title: "Natural Excellence",
            desc: "100% natural wood, zero chemicals. Pure craftsmanship that stands the test of time.",
            color: "#8B4513"
        },
        {
            icon: FaAward,
            title: "Legacy Quality",
            desc: "28+ years of uncompromising quality. Every piece carries our family legacy.",
            color: "#D4AF37"
        },
        {
            icon: FaHeart,
            title: "Art With Heart",
            desc: "\"Maa Kripa\" - Mother's Blessing guides our craftsmanship with love and care.",
            color: "#8B4513"
        }
    ]

    const autoPlayRef = useRef(null)

    // Check mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Auto-swipe functionality ONLY for mobile
    useEffect(() => {
        if (!isAutoPlaying || !isMobile) return

        autoPlayRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 3000)

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [isAutoPlaying, isMobile, slides.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    return (
        <section className="about-section">
            <div className="wood-pattern"></div>
            
            <div className="container">
                {/* Header - Same for both */}
                <div className="about-header">
                    <div className="badge">
                        <FaHistory />
                        <span>Since 1996</span>
                    </div>
                    
                    <h2>
                        Welcome to <span className="brand-name">Maa Kripa Wood Art</span>
                    </h2>
                    
                    <p className="subtitle">
                        Where <strong>heritage craftsmanship</strong> meets <strong>modern elegance</strong>. 
                        Crafting timeless wooden masterpieces for 28+ years.
                    </p>
                </div>

                {/* Desktop View - Original Grid */}
                <div className="desktop-view">
                    <div className="philosophy-grid">
                        <div className="philosophy-card">
                            <div className="icon-wrapper">
                                <FaLeaf />
                            </div>
                            <h3>Natural Excellence</h3>
                            <p>100% natural wood, zero chemicals. Pure craftsmanship that stands the test of time.</p>
                        </div>

                        <div className="philosophy-card">
                            <div className="icon-wrapper">
                                <FaAward />
                            </div>
                            <h3>Legacy Quality</h3>
                            <p>28+ years of uncompromising quality. Every piece carries our family legacy.</p>
                        </div>

                        <div className="philosophy-card">
                            <div className="icon-wrapper">
                                <FaHeart />
                            </div>
                            <h3>Art With Heart</h3>
                            <p>"Maa Kripa" - Mother's Blessing guides our craftsmanship with love and care.</p>
                        </div>
                    </div>
                </div>

                {/* Mobile View - Carousel */}
                <div className="mobile-view">
                    <div className="carousel-container">
                        <div className="carousel-header">
                            <h3></h3>
                            <div className="auto-play-indicator">
                                <div className={`indicator-dot ${isAutoPlaying ? 'active' : ''}`}></div>
                                <span></span>
                            </div>
                        </div>

                        <div className="carousel-wrapper">
                            <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous">
                                <FaChevronLeft />
                            </button>
                            
                            <div className="carousel">
                                {slides.map((slide, index) => {
                                    const Icon = slide.icon
                                    return (
                                        <div 
                                            key={index}
                                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                                        >
                                            <div className="icon-wrapper" style={{background: `linear-gradient(135deg, rgba(${slide.color === '#8B4513' ? '139, 69, 19' : '212, 175, 55'}, 0.1) 0%, rgba(${slide.color === '#8B4513' ? '212, 175, 55' : '139, 69, 19'}, 0.1) 100%)`}}>
                                                <Icon style={{color: slide.color}} />
                                            </div>
                                            <h3>{slide.title}</h3>
                                            <p>{slide.desc}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            
                            <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next">
                                <FaChevronRight />
                            </button>
                        </div>

                        <div className="dots-indicator">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                >
                                    <div className="dot-inner"></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Story Section - Same for both */}
                <div className="compact-story">
                    <div className="story-content">
                        <div className="text-content">
                            <h3>Our Journey</h3>
                            <p>
                                Founded in 1996, <strong>Maa Kripa Wood Art</strong> began as a passion project 
                                and grew into a trusted name through dedication to quality and customer 
                                satisfaction. Our name reflects the divine blessing that guides our craft.
                            </p>
                        </div>
                        
                        <div className="years-badge">
                            <div className="years-number">28+</div>
                            <div className="years-label">Years of Excellence</div>
                            <div className="years-range">1996 - Present</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}