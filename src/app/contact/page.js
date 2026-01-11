// 'use client'
// import { useState } from 'react'

// const contactStyles = `
//   .contact-page {
//     padding: 80px 0 30px;
//     background: var(--light-gray);
//     min-height: 100vh;
//   }

//   .contact-header {
//     text-align: center;
//     margin-bottom: 2rem;
//   }

//   .contact-header h1 {
//     color: var(--primary-black);
//     font-size: var(--text-3xl);
//     margin-bottom: 0.5rem;
//     font-weight: 700;
//   }

//   .contact-header p {
//     color: var(--dark-gray);
//     font-size: var(--text-base);
//     max-width: 500px;
//     margin: 0 auto;
//   }

//   .contact-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 2rem;
//     margin-bottom: 2rem;
//   }

//   .contact-info {
//     background: var(--white);
//     padding: 1.5rem;
//     border-radius: 10px;
//     box-shadow: 0 3px 15px rgba(0,0,0,0.08);
//     border: 1px solid rgba(200, 169, 126, 0.1);
//   }

//   .contact-info h2 {
//     color: var(--primary-black);
//     font-size: var(--text-xl);
//     margin-bottom: 1.5rem;
//     font-weight: 700;
//     position: relative;
//     padding-bottom: 0.5rem;
//   }

//   .contact-info h2::after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 50px;
//     height: 2px;
//     background: linear-gradient(90deg, var(--primary-gold), var(--secondary-gold));
//     border-radius: 1px;
//   }

//   .contact-item {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     margin-bottom: 1.2rem;
//     padding: 1rem;
//     border-radius: 8px;
//     transition: all 0.3s ease;
//     border: 1px solid transparent;
//   }

//   .contact-item:hover {
//     background: var(--light-gray);
//     border-color: rgba(200, 169, 126, 0.2);
//     transform: translateY(-1px);
//   }

//   .contact-icon {
//     width: 45px;
//     height: 45px;
//     background: linear-gradient(135deg, var(--primary-gold), var(--secondary-gold));
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: var(--primary-black);
//     font-size: 1.1rem;
//     flex-shrink: 0;
//     transition: transform 0.3s ease;
//   }

//   .contact-item:hover .contact-icon {
//     transform: scale(1.05);
//   }

//   .contact-item h3 {
//     color: var(--primary-black);
//     font-size: var(--text-base);
//     margin-bottom: 0.3rem;
//     font-weight: 600;
//   }

//   .contact-item p {
//     color: var(--dark-gray);
//     font-size: var(--text-sm);
//     margin: 0;
//     line-height: 1.4;
//   }

//   .contact-form {
//     background: var(--white);
//     padding: 1.5rem;
//     border-radius: 10px;
//     box-shadow: 0 3px 15px rgba(0,0,0,0.08);
//     border: 1px solid rgba(200, 169, 126, 0.1);
//   }

//   .contact-form h2 {
//     color: var(--primary-black);
//     font-size: var(--text-xl);
//     margin-bottom: 1.5rem;
//     font-weight: 700;
//     position: relative;
//     padding-bottom: 0.5rem;
//   }

//   .contact-form h2::after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 50px;
//     height: 2px;
//     background: linear-gradient(90deg, var(--primary-gold), var(--secondary-gold));
//     border-radius: 1px;
//   }

//   .form-group {
//     margin-bottom: 1.2rem;
//   }

//   .form-group label {
//     display: block;
//     margin-bottom: 0.5rem;
//     font-weight: 600;
//     color: var(--primary-black);
//     font-size: var(--text-sm);
//   }

//   .form-group input,
//   .form-group select,
//   .form-group textarea {
//     width: 100%;
//     padding: 10px 12px;
//     border: 1px solid var(--medium-gray);
//     border-radius: 6px;
//     font-size: var(--text-sm);
//     transition: all 0.3s ease;
//     background: var(--white);
//     font-family: inherit;
//   }

//   .form-group input:focus,
//   .form-group select:focus,
//   .form-group textarea:focus {
//     outline: none;
//     border-color: var(--primary-gold);
//     box-shadow: 0 0 0 2px rgba(200, 169, 126, 0.1);
//   }

//   .form-group textarea {
//     height: 100px;
//     resize: vertical;
//     line-height: 1.4;
//   }

//   .submit-btn {
//     background: linear-gradient(135deg, var(--primary-gold), var(--secondary-gold));
//     color: var(--primary-black);
//     border: none;
//     padding: 12px 24px;
//     border-radius: 6px;
//     cursor: pointer;
//     font-weight: 600;
//     width: 100%;
//     font-size: var(--text-base);
//     transition: all 0.3s ease;
//     position: relative;
//     overflow: hidden;
//   }

//   .submit-btn:hover {
//     transform: translateY(-1px);
//     box-shadow: 0 4px 12px rgba(200, 169, 126, 0.3);
//   }

//   .submit-btn:active {
//     transform: translateY(0);
//   }

//   .map-container {
//     margin-top: 2rem;
//     border-radius: 10px;
//     overflow: hidden;
//     box-shadow: 0 3px 15px rgba(0,0,0,0.08);
//     border: 1px solid rgba(200, 169, 126, 0.1);
//   }

//   .map-placeholder {
//     height: 300px;
//     background: linear-gradient(135deg, var(--light-gray), var(--medium-gray));
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: var(--dark-gray);
//     font-size: var(--text-base);
//     font-weight: 500;
//   }

//   @media (max-width: 768px) {
//     .contact-page {
//       padding: 70px 0 20px;
//     }

//     .contact-grid {
//       grid-template-columns: 1fr;
//       gap: 1.5rem;
//     }

//     .contact-info,
//     .contact-form {
//       padding: 1.2rem;
//     }

//     .contact-item {
//       padding: 0.8rem;
//       gap: 0.8rem;
//       margin-bottom: 1rem;
//     }

//     .contact-icon {
//       width: 40px;
//       height: 40px;
//       font-size: 1rem;
//     }

//     .contact-header h1 {
//       font-size: var(--text-2xl);
//     }

//     .contact-header p {
//       font-size: var(--text-sm);
//     }
//   }

//   @media (max-width: 480px) {
//     .contact-info,
//     .contact-form {
//       padding: 1rem;
//     }

//     .contact-item {
//       flex-direction: column;
//       text-align: center;
//       gap: 0.5rem;
//       padding: 0.8rem 0.5rem;
//     }

//     .form-group input,
//     .form-group select,
//     .form-group textarea {
//       padding: 8px 10px;
//     }

//     .map-placeholder {
//       height: 250px;
//       font-size: var(--text-sm);
//     }

//     .submit-btn {
//       padding: 10px 20px;
//     }
//   }
// `

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     category: '',
//     message: ''
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
    
//     // Simulate form submission
//     try {
//       await new Promise(resolve => setTimeout(resolve, 800))
//       console.log('Form submitted:', formData)
//       alert('Thank you for your inquiry! We will contact you soon.')
//       setFormData({ name: '', email: '', phone: '', category: '', message: '' })
//     } catch (error) {
//       console.error('Error submitting form:', error)
//       alert('There was an error submitting your form. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   return (
//     <>
//       <style jsx>{contactStyles}</style>
//       <div className="contact-page">
//         <div className="container">
//           <div className="contact-header">
//             <h1>Contact Us</h1>
//             <p>Get in touch with our door experts for personalized consultation</p>
//           </div>

//           <div className="contact-grid">
//             {/* Contact Information */}
//             <div className="contact-info">
//               <h2>Get In Touch</h2>

//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <i className="fas fa-map-marker-alt"></i>
//                 </div>
//                 <div>
//                   <h3>Visit Our Showroom</h3>
//                   <p>123 Wood Street, Furniture District, Mumbai</p>
//                 </div>
//               </div>

//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <i className="fas fa-phone"></i>
//                 </div>
//                 <div>
//                   <h3>Call Us</h3>
//                   <p>+91 98765 43210</p>
//                 </div>
//               </div>

//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <i className="fas fa-envelope"></i>
//                 </div>
//                 <div>
//                   <h3>Email Us</h3>
//                   <p>info@shreedoors.com</p>
//                 </div>
//               </div>

//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <i className="fas fa-clock"></i>
//                 </div>
//                 <div>
//                   <h3>Working Hours</h3>
//                   <p>Mon-Sat: 9AM-7PM</p>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="contact-form">
//               <h2>Send Inquiry</h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="name">Full Name *</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your full name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email Address *</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your email"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number *</label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your phone number"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="category">Door Category</label>
//                   <select 
//                     id="category"
//                     name="category" 
//                     value={formData.category} 
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Category</option>
//                     <option value="teak">Teak Wood Doors</option>
//                     <option value="sagwan">Sagwan Wood Doors</option>
//                     <option value="main-entrance">Main Entrance Doors</option>
//                     <option value="room">Room Doors</option>
//                     <option value="custom">Custom Doors</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="message">Message *</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Tell us about your requirements..."
//                     required
//                   ></textarea>
//                 </div>

//                 <button 
//                   type="submit" 
//                   className="submit-btn"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Sending...' : 'Send Inquiry'}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Map Section */}
//           <div className="map-container">
//             <div className="map-placeholder">
//               <div style={{ textAlign: 'center' }}>
//                 <i className="fas fa-map" style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary-gold)' }}></i>
//                 <p>Google Maps<br /><small>Our Showroom Location</small></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }



// 'use client'
// import Navbar from '@/components/Navbar'
// import { useState } from 'react'

// const contactStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Tenor+Sans&display=swap');

//   :root {
//     --gold: #D4AF37;
//     --gold-glow: rgba(212, 175, 55, 0.3);
//     --bg-dark: #0a0a0a;
//     --card-bg: #111111;
//     --text-gray: #a0a0a0;
//   }

//   .main-wrapper {
//     background-color: var(--bg-dark);
//     color: white;
//     font-family: 'Tenor Sans', sans-serif;
//     min-height: 100vh;
//     padding: 60px 20px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .glass-container {
//     max-width: 1200px;
//     width: 100%;
//     display: grid;
//     grid-template-columns: 1fr 1.2fr;
//     background: var(--card-bg);
//     border-radius: 40px;
//     overflow: hidden;
//     box-shadow: 0 50px 100px rgba(0,0,0,0.5);
//     border: 1px solid rgba(255,255,255,0.05);
//   }

//   /* Left Side: Luxury Info */
//   .contact-details {
//     padding: 60px;
//     background: linear-gradient(135deg, #161616 0%, #0a0a0a 100%);
//     border-right: 1px solid rgba(212, 175, 55, 0.2);
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//   }

//   .contact-details h1 {
//     font-family: 'Marcellus', serif;
//     font-size: 3.5rem;
//     margin-bottom: 20px;
//     line-height: 1;
//   }

//   .gold-line {
//     width: 60px;
//     height: 3px;
//     background: var(--gold);
//     margin-bottom: 40px;
//     box-shadow: 0 0 15px var(--gold-glow);
//   }

//   .info-block {
//     margin-bottom: 30px;
//     transition: 0.3s;
//   }

//   .info-block:hover {
//     transform: translateX(10px);
//   }

//   .info-label {
//     color: var(--gold);
//     text-transform: uppercase;
//     letter-spacing: 2px;
//     font-size: 0.75rem;
//     margin-bottom: 5px;
//   }

//   .info-value {
//     font-size: 1.1rem;
//     color: #e0e0e0;
//   }

//   /* Right Side: Interactive Form */
//   .contact-form-section {
//     padding: 60px;
//     background: #111111;
//   }

//   .input-box {
//     position: relative;
//     margin-bottom: 35px;
//   }

//   .input-box input, 
//   .input-box select, 
//   .input-box textarea {
//     width: 100%;
//     background: transparent;
//     border: none;
//     border-bottom: 1px solid #333;
//     padding: 12px 0;
//     color: white;
//     font-size: 1rem;
//     outline: none;
//     transition: 0.4s;
//     font-family: inherit;
//   }

//   .input-box label {
//     position: absolute;
//     top: 12px;
//     left: 0;
//     color: var(--text-gray);
//     pointer-events: none;
//     transition: 0.4s;
//     text-transform: uppercase;
//     font-size: 0.8rem;
//     letter-spacing: 1px;
//   }

//   /* Label animation when typing */
//   .input-box input:focus ~ label,
//   .input-box input:valid ~ label,
//   .input-box textarea:focus ~ label,
//   .input-box textarea:valid ~ label,
//   .input-box select:focus ~ label,
//   .input-box select:valid ~ label {
//     top: -15px;
//     font-size: 0.7rem;
//     color: var(--gold);
//   }

//   .input-box input:focus, 
//   .input-box textarea:focus {
//     border-bottom: 1px solid var(--gold);
//     box-shadow: 0 1px 0 var(--gold);
//   }

//   .submit-luxury {
//     background: transparent;
//     border: 1px solid var(--gold);
//     color: var(--gold);
//     padding: 15px 40px;
//     font-size: 0.9rem;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: 0.5s;
//     width: 100%;
//     margin-top: 20px;
//     position: relative;
//     overflow: hidden;
//   }

//   .submit-luxury:hover {
//     background: var(--gold);
//     color: black;
//     box-shadow: 0 0 30px var(--gold-glow);
//   }

//   @media (max-width: 992px) {
//     .glass-container { grid-template-columns: 1fr; }
//     .contact-details { padding: 40px; }
//     .contact-form-section { padding: 40px; }
//     .contact-details h1 { font-size: 2.5rem; }
//   }
// `

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '', email: '', phone: '', category: '', message: ''
//   })

//   const [isSent, setIsSent] = useState(false)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setIsSent(true)
//     setTimeout(() => {
//       alert("Inquiry Sent Successfully")
//       setIsSent(false)
//       setFormData({ name: '', email: '', phone: '', category: '', message: '' })
//     }, 1500)
//   }

//   return (
//     <>
//     <Navbar /> 
//     <div className="main-wrapper">
//       <style jsx>{contactStyles}</style>

//       <div className="glass-container">
//         {/* Left Side */}
//         <div className="contact-details">
//           <div className="info-label" style={{marginBottom: '10px'}}>Est. 1995</div>
//           <h1>Shree<br /><span style={{color: 'var(--gold)'}}>Doors</span></h1>
//           <div className="gold-line"></div>
          
//           <div className="info-block">
//             <div className="info-label">Corporate Address</div>
//             <div className="info-value">Plot 45, Industrial Estate,<br />Mumbai, Maharashtra</div>
//           </div>

//           <div className="info-block">
//             <div className="info-label">Direct Line</div>
//             <div className="info-value">+91 98765 43210</div>
//           </div>

//           <div className="info-block">
//             <div className="info-label">Email</div>
//             <div className="info-value">inquiry@shreedoors.com</div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="contact-form-section">
//           <form onSubmit={handleSubmit}>
//             <div className="input-box">
//               <input 
//                 type="text" 
//                 name="name" 
//                 required 
//                 value={formData.name}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//               />
//               <label>Full Name</label>
//             </div>

//             <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
//               <div className="input-box">
//                 <input 
//                   type="email" 
//                   name="email" 
//                   required 
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 />
//                 <label>Email Address</label>
//               </div>
//               <div className="input-box">
//                 <input 
//                   type="tel" 
//                   name="phone" 
//                   required 
//                   value={formData.phone}
//                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                 />
//                 <label>Phone Number</label>
//               </div>
//             </div>

//             <div className="input-box">
//               <select 
//                 name="category" 
//                 required 
//                 value={formData.category}
//                 onChange={(e) => setFormData({...formData, category: e.target.value})}
//                 style={{color: formData.category ? 'white' : 'transparent'}}
//               >
//                 <option value="" disabled></option>
//                 <option value="teak">Premium Teak Wood</option>
//                 <option value="main">Grand Entrance Doors</option>
//                 <option value="veneer">Modern Veneer Doors</option>
//               </select>
//               <label>Category Interest</label>
//             </div>

//             <div className="input-box">
//               <textarea 
//                 rows="3" 
//                 name="message" 
//                 required
//                 value={formData.message}
//                 onChange={(e) => setFormData({...formData, message: e.target.value})}
//               ></textarea>
//               <label>Your Message</label>
//             </div>

//             <button type="submit" className="submit-luxury">
//               {isSent ? 'SENDING...' : 'SEND INQUIRY'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }

// 'use client'
// import Navbar from '@/components/Navbar'
// import { useState } from 'react'

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     doorType: '',
//     message: ''
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 800))
//       console.log('Form submitted:', formData)
//       alert('Thank you for your inquiry! We will contact you within 24 hours.')
//       setFormData({ name: '', email: '', phone: '', doorType: '', message: '' })
//     } catch (error) {
//       console.error('Error submitting form:', error)
//       alert('There was an error. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const doorTypes = [
//     'Teak Wood Doors',
//     'Sagwan Wood Doors',
//     'Main Entrance Doors',
//     'Room Doors',
//     'French Doors',
//     'Sliding Doors',
//     'Custom Design',
//     'Door Repair/Service'
//   ]

//   return (
//     <>
//     < Navbar/>
//       <style jsx>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         body {
//           background: #f9f7f3;
//         }
        
//         .contact-wrapper {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 40px 20px;
//           background-color: #f9f7f3;
//         }
        
//         .contact-container {
//           width: 100%;
//           max-width: 1200px;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 50px;
//           align-items: center;
//         }
        
//         /* Left Side - Information */
//         .contact-info {
//           padding: 40px;
//         }
        
//         .shop-name {
//           font-size: 42px;
//           font-weight: 700;
//           color: #5c4033;
//           margin-bottom: 20px;
//           letter-spacing: 1px;
//         }
        
//         .shop-name span {
//           color: #8b5a2b;
//           font-weight: 800;
//         }
        
//         .tagline {
//           font-size: 18px;
//           color: #666;
//           margin-bottom: 40px;
//           line-height: 1.6;
//           padding-bottom: 20px;
//           border-bottom: 1px solid #e0d6cc;
//         }
        
//         .contact-details {
//           margin-top: 30px;
//         }
        
//         .detail-item {
//           display: flex;
//           align-items: flex-start;
//           margin-bottom: 30px;
//           padding: 20px;
//           background: white;
//           border-radius: 10px;
//           box-shadow: 0 3px 15px rgba(139, 90, 43, 0.08);
//           border-left: 4px solid #8b5a2b;
//         }
        
//         .detail-icon {
//           width: 50px;
//           height: 50px;
//           background: #f5efe6;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-right: 20px;
//           flex-shrink: 0;
//           color: #8b5a2b;
//           font-size: 22px;
//         }
        
//         .detail-content h3 {
//           font-size: 18px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 5px;
//         }
        
//         .detail-content p {
//           font-size: 15px;
//           color: #666;
//           line-height: 1.5;
//         }
        
//         .working-hours {
//           margin-top: 30px;
//           padding: 20px;
//           background: #f5efe6;
//           border-radius: 10px;
//           border: 1px solid #e0d6cc;
//         }
        
//         .hours-title {
//           font-size: 16px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 10px;
//         }
        
//         .hours-details {
//           font-size: 15px;
//           color: #666;
//         }
        
//         /* Right Side - Form */
//         .contact-form-container {
//           padding: 50px;
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 10px 40px rgba(139, 90, 43, 0.1);
//         }
        
//         .form-title {
//           font-size: 28px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 10px;
//         }
        
//         .form-subtitle {
//           font-size: 15px;
//           color: #777;
//           margin-bottom: 30px;
//           line-height: 1.5;
//         }
        
//         .form-group {
//           margin-bottom: 25px;
//         }
        
//         .form-label {
//           display: block;
//           font-size: 14px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 8px;
//         }
        
//         .form-label span {
//           color: #d9534f;
//         }
        
//         .form-input {
//           width: 100%;
//           padding: 14px;
//           font-size: 15px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           background: #fafafa;
//           transition: all 0.3s ease;
//           color: #333;
//         }
        
//         .form-input:focus {
//           outline: none;
//           border-color: #8b5a2b;
//           background: white;
//           box-shadow: 0 0 0 2px rgba(139, 90, 43, 0.1);
//         }
        
//         .form-input::placeholder {
//           color: #999;
//         }
        
//         .form-select {
//           appearance: none;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235c4033' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 14px center;
//           background-size: 16px;
//           padding-right: 40px;
//         }
        
//         .form-textarea {
//           min-height: 120px;
//           resize: vertical;
//           line-height: 1.5;
//           font-family: inherit;
//         }
        
//         .submit-btn {
//           width: 100%;
//           padding: 16px;
//           font-size: 16px;
//           font-weight: 600;
//           background: #8b5a2b;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-top: 10px;
//         }
        
//         .submit-btn:hover:not(:disabled) {
//           background: #5c4033;
//           transform: translateY(-1px);
//           box-shadow: 0 5px 15px rgba(139, 90, 43, 0.2);
//         }
        
//         .submit-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }
        
//         .loading-spinner {
//           display: inline-block;
//           width: 18px;
//           height: 18px;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           border-radius: 50%;
//           border-top-color: white;
//           animation: spin 0.8s linear infinite;
//           margin-right: 8px;
//           vertical-align: middle;
//         }
        
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
        
//         /* Door Types Grid */
//         .door-types-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 10px;
//           margin-top: 15px;
//         }
        
//         .door-type-option {
//           padding: 12px;
//           background: #fafafa;
//           border: 1px solid #ddd;
//           border-radius: 6px;
//           font-size: 14px;
//           color: #555;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-align: center;
//         }
        
//         .door-type-option:hover {
//           background: #f5efe6;
//           border-color: #8b5a2b;
//         }
        
//         .door-type-option.selected {
//           background: #f5efe6;
//           border-color: #8b5a2b;
//           color: #5c4033;
//           font-weight: 600;
//         }
        
//         /* Responsive Design */
//         @media (max-width: 992px) {
//           .contact-container {
//             grid-template-columns: 1fr;
//             gap: 40px;
//           }
          
//           .contact-info {
//             padding: 30px;
//           }
          
//           .contact-form-container {
//             padding: 40px;
//           }
//         }
        
//         @media (max-width: 768px) {
//           .shop-name {
//             font-size: 32px;
//           }
          
//           .form-title {
//             font-size: 24px;
//           }
          
//           .door-types-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .detail-item {
//             flex-direction: column;
//             align-items: flex-start;
//           }
          
//           .detail-icon {
//             margin-bottom: 15px;
//           }
//         }
        
//         @media (max-width: 480px) {
//           .contact-wrapper {
//             padding: 20px 15px;
//           }
          
//           .contact-info,
//           .contact-form-container {
//             padding: 25px;
//           }
//         }
//       `}</style>

//       <div className="contact-wrapper">
//         <div className="contact-container">
//           {/* Left Side - Information */}
//           <div className="contact-info">
//             <h1 className="shop-name">
//               Shree <span>Doors</span>
//             </h1>
            
//             <p className="tagline">
//               Premium quality wooden doors with traditional craftsmanship and modern designs. 
//               We create door solutions that stand the test of time.
//             </p>
            
//             <div className="contact-details">
//               <div className="detail-item">
//                 <div className="detail-icon">📍</div>
//                 <div className="detail-content">
//                   <h3>Visit Our Showroom</h3>
//                   <p>Plot 45, Industrial Estate<br />Mumbai, Maharashtra</p>
//                 </div>
//               </div>
              
//               <div className="detail-item">
//                 <div className="detail-icon">📞</div>
//                 <div className="detail-content">
//                   <h3>Call for Consultation</h3>
//                   <p>+91 98765 43210<br />Available 9AM - 7PM</p>
//                 </div>
//               </div>
              
//               <div className="detail-item">
//                 <div className="detail-icon">📧</div>
//                 <div className="detail-content">
//                   <h3>Email Us</h3>
//                   <p>info@shreedoors.com<br />We reply within 24 hours</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="working-hours">
//               <div className="hours-title">Working Hours</div>
//               <div className="hours-details">
//                 Monday - Saturday: 9:00 AM to 7:00 PM<br />
//                 Sunday: Closed
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Form */}
//           <div className="contact-form-container">
//             <h2 className="form-title">Get a Quote</h2>
//             <p className="form-subtitle">
//               Tell us about your door requirements and we'll provide you with a detailed quote.
//             </p>
            
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="name">
//                   Your Name <span>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter your full name"
//                   required
//                 />
//               </div>
              
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                 <div className="form-group">
//                   <label className="form-label" htmlFor="email">
//                     Email <span>*</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="your@email.com"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label className="form-label" htmlFor="phone">
//                     Phone <span>*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="+91 98765 43210"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">
//                   Door Type Interest
//                 </label>
//                 <div className="door-types-grid">
//                   {doorTypes.map((type, index) => (
//                     <div
//                       key={index}
//                       className={`door-type-option ${formData.doorType === type ? 'selected' : ''}`}
//                       onClick={() => setFormData({...formData, doorType: type})}
//                     >
//                       {type}
//                     </div>
//                   ))}
//                 </div>
//                 <input
//                   type="hidden"
//                   name="doorType"
//                   value={formData.doorType}
//                   onChange={handleChange}
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label" htmlFor="message">
//                   Requirements <span>*</span>
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="form-input form-textarea"
//                   placeholder="Tell us about your door requirements, measurements, budget, timeline..."
//                   required
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 className="submit-btn"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="loading-spinner"></span>
//                     Sending...
//                   </>
//                 ) : (
//                   'Get Free Quote'
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// 'use client'
// import Navbar from '@/components/Navbar'
// import { useState } from 'react'

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     doorType: '',
//     message: ''
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 800))
//       console.log('Form submitted:', formData)
//       alert('Thank you for your inquiry! We will contact you within 24 hours.')
//       setFormData({ name: '', email: '', phone: '', doorType: '', message: '' })
//     } catch (error) {
//       console.error('Error submitting form:', error)
//       alert('There was an error. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const doorTypes = [
//     'Teak Wood Doors',
//     'Sagwan Wood Doors',
//     'Main Entrance Doors',
//     'Room Doors',
//     'French Doors',
//     'Sliding Doors',
//     'Custom Design',
//     'Door Repair/Service'
//   ]

//   return (
//     <>
//       <Navbar />
//       <style jsx global>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         body {
//           background: #f9f7f3;
//           overflow-x: hidden;
//         }
//       `}</style>
      
//       <style jsx>{`
//         .contact-wrapper {
//           min-height: 100vh;
//           padding: 80px 20px 40px;
//           background-color: #f9f7f3;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .contact-container {
//           width: 100%;
//           max-width: 1200px;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 50px;
//           align-items: start;
//         }
        
//         /* Left Side - Information */
//         .contact-info {
//           padding: 40px;
//         }
        
//         .shop-name {
//           font-size: 42px;
//           font-weight: 700;
//           color: #5c4033;
//           margin-bottom: 20px;
//           letter-spacing: 1px;
//           line-height: 1.2;
//         }
        
//         .shop-name span {
//           color: #8b5a2b;
//           font-weight: 800;
//         }
        
//         .tagline {
//           font-size: 18px;
//           color: #666;
//           margin-bottom: 40px;
//           line-height: 1.6;
//           padding-bottom: 20px;
//           border-bottom: 1px solid #e0d6cc;
//         }
        
//         .contact-details {
//           margin-top: 30px;
//         }
        
//         .detail-item {
//           display: flex;
//           align-items: flex-start;
//           margin-bottom: 30px;
//           padding: 20px;
//           background: white;
//           border-radius: 10px;
//           box-shadow: 0 3px 15px rgba(139, 90, 43, 0.08);
//           border-left: 4px solid #8b5a2b;
//         }
        
//         .detail-icon {
//           width: 50px;
//           height: 50px;
//           background: #f5efe6;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-right: 20px;
//           flex-shrink: 0;
//           color: #8b5a2b;
//           font-size: 22px;
//         }
        
//         .detail-content h3 {
//           font-size: 18px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 5px;
//         }
        
//         .detail-content p {
//           font-size: 15px;
//           color: #666;
//           line-height: 1.5;
//         }
        
//         .working-hours {
//           margin-top: 30px;
//           padding: 20px;
//           background: #f5efe6;
//           border-radius: 10px;
//           border: 1px solid #e0d6cc;
//         }
        
//         .hours-title {
//           font-size: 16px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 10px;
//         }
        
//         .hours-details {
//           font-size: 15px;
//           color: #666;
//         }
        
//         /* Right Side - Form */
//         .contact-form-container {
//           padding: 50px;
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 10px 40px rgba(139, 90, 43, 0.1);
//           margin-top: 0;
//         }
        
//         .form-title {
//           font-size: 28px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 10px;
//         }
        
//         .form-subtitle {
//           font-size: 15px;
//           color: #777;
//           margin-bottom: 30px;
//           line-height: 1.5;
//         }
        
//         .form-group {
//           margin-bottom: 25px;
//         }
        
//         .form-label {
//           display: block;
//           font-size: 14px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 8px;
//         }
        
//         .form-label span {
//           color: #d9534f;
//         }
        
//         .form-input {
//           width: 100%;
//           padding: 14px;
//           font-size: 15px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           background: #fafafa;
//           transition: all 0.3s ease;
//           color: #333;
//         }
        
//         .form-input:focus {
//           outline: none;
//           border-color: #8b5a2b;
//           background: white;
//           box-shadow: 0 0 0 2px rgba(139, 90, 43, 0.1);
//         }
        
//         .form-input::placeholder {
//           color: #999;
//         }
        
//         .form-select {
//           appearance: none;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235c4033' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 14px center;
//           background-size: 16px;
//           padding-right: 40px;
//         }
        
//         .form-textarea {
//           min-height: 120px;
//           resize: vertical;
//           line-height: 1.5;
//           font-family: inherit;
//         }
        
//         .submit-btn {
//           width: 100%;
//           padding: 16px;
//           font-size: 16px;
//           font-weight: 600;
//           background: #8b5a2b;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-top: 10px;
//         }
        
//         .submit-btn:hover:not(:disabled) {
//           background: #5c4033;
//           transform: translateY(-1px);
//           box-shadow: 0 5px 15px rgba(139, 90, 43, 0.2);
//         }
        
//         .submit-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }
        
//         .loading-spinner {
//           display: inline-block;
//           width: 18px;
//           height: 18px;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           border-radius: 50%;
//           border-top-color: white;
//           animation: spin 0.8s linear infinite;
//           margin-right: 8px;
//           vertical-align: middle;
//         }
        
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
        
//         /* Door Types Grid */
//         .door-types-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 10px;
//           margin-top: 15px;
//         }
        
//         .door-type-option {
//           padding: 12px;
//           background: #fafafa;
//           border: 1px solid #ddd;
//           border-radius: 6px;
//           font-size: 14px;
//           color: #555;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-align: center;
//         }
        
//         .door-type-option:hover {
//           background: #f5efe6;
//           border-color: #8b5a2b;
//         }
        
//         .door-type-option.selected {
//           background: #f5efe6;
//           border-color: #8b5a2b;
//           color: #5c4033;
//           font-weight: 600;
//         }
        
//         /* Responsive Design */
//         @media (max-width: 1100px) {
//           .contact-container {
//             gap: 30px;
//           }
          
//           .contact-info,
//           .contact-form-container {
//             padding: 30px;
//           }
//         }
        
//         @media (max-width: 992px) {
//           .contact-container {
//             grid-template-columns: 1fr;
//             gap: 40px;
//             max-width: 800px;
//           }
          
//           .contact-info {
//             padding: 30px;
//           }
          
//           .contact-form-container {
//             padding: 40px;
//           }
          
//           .shop-name {
//             font-size: 36px;
//           }
//         }
        
//         @media (max-width: 768px) {
//           .contact-wrapper {
//             padding: 70px 15px 30px;
//           }
          
//           .shop-name {
//             font-size: 32px;
//           }
          
//           .tagline {
//             font-size: 16px;
//           }
          
//           .form-title {
//             font-size: 24px;
//           }
          
//           .door-types-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .detail-item {
//             flex-direction: row;
//             align-items: flex-start;
//             padding: 15px;
//           }
          
//           .detail-icon {
//             margin-right: 15px;
//             width: 45px;
//             height: 45px;
//             font-size: 20px;
//           }
          
//           .form-input-group {
//             display: flex;
//             flex-direction: column;
//             gap: 20px;
//           }
//         }
        
//         @media (max-width: 576px) {
//           .contact-wrapper {
//             padding: 60px 12px 20px;
//           }
          
//           .contact-info,
//           .contact-form-container {
//             padding: 20px;
//           }
          
//           .shop-name {
//             font-size: 28px;
//           }
          
//           .detail-item {
//             flex-direction: column;
//             align-items: flex-start;
//           }
          
//           .detail-icon {
//             margin-bottom: 15px;
//             margin-right: 0;
//           }
          
//           .door-types-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .form-group {
//             margin-bottom: 20px;
//           }
          
//           .form-input {
//             padding: 12px;
//           }
          
//           .submit-btn {
//             padding: 14px;
//             font-size: 15px;
//           }
//         }
        
//         @media (max-width: 400px) {
//           .contact-wrapper {
//             padding: 50px 10px 15px;
//           }
          
//           .shop-name {
//             font-size: 24px;
//           }
          
//           .contact-info,
//           .contact-form-container {
//             padding: 15px;
//           }
          
//           .detail-item {
//             padding: 12px;
//           }
//         }
//       `}</style>

//       <div className="contact-wrapper">
//         <div className="contact-container">
//           {/* Left Side - Information */}
//           <div className="contact-info">
//             <h1 className="shop-name">
//               Shree <span>Doors</span>
//             </h1>
            
//             <p className="tagline">
//               Premium quality wooden doors with traditional craftsmanship and modern designs. 
//               We create door solutions that stand the test of time.
//             </p>
            
//             <div className="contact-details">
//               <div className="detail-item">
//                 <div className="detail-icon">📍</div>
//                 <div className="detail-content">
//                   <h3>Visit Our Showroom</h3>
//                   <p>Plot 45, Industrial Estate<br />Mumbai, Maharashtra</p>
//                 </div>
//               </div>
              
//               <div className="detail-item">
//                 <div className="detail-icon">📞</div>
//                 <div className="detail-content">
//                   <h3>Call for Consultation</h3>
//                   <p>+91 98765 43210<br />Available 9AM - 7PM</p>
//                 </div>
//               </div>
              
//               <div className="detail-item">
//                 <div className="detail-icon">📧</div>
//                 <div className="detail-content">
//                   <h3>Email Us</h3>
//                   <p>info@shreedoors.com<br />We reply within 24 hours</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="working-hours">
//               <div className="hours-title">Working Hours</div>
//               <div className="hours-details">
//                 Monday - Saturday: 9:00 AM to 7:00 PM<br />
//                 Sunday: Closed
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Form */}
//           <div className="contact-form-container">
//             <h2 className="form-title">Get a Quote</h2>
//             <p className="form-subtitle">
//               Tell us about your door requirements and we'll provide you with a detailed quote.
//             </p>
            
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="name">
//                   Your Name <span>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter your full name"
//                   required
//                 />
//               </div>
              
//               <div className="form-input-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                 <div className="form-group">
//                   <label className="form-label" htmlFor="email">
//                     Email <span>*</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="your@email.com"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label className="form-label" htmlFor="phone">
//                     Phone <span>*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="+91 98765 43210"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">
//                   Door Type Interest
//                 </label>
//                 <div className="door-types-grid">
//                   {doorTypes.map((type, index) => (
//                     <div
//                       key={index}
//                       className={`door-type-option ${formData.doorType === type ? 'selected' : ''}`}
//                       onClick={() => setFormData({...formData, doorType: type})}
//                     >
//                       {type}
//                     </div>
//                   ))}
//                 </div>
//                 <input
//                   type="hidden"
//                   name="doorType"
//                   value={formData.doorType}
//                   onChange={handleChange}
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label" htmlFor="message">
//                   Requirements <span>*</span>
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="form-input form-textarea"
//                   placeholder="Tell us about your door requirements, measurements, budget, timeline..."
//                   required
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 className="submit-btn"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="loading-spinner"></span>
//                     Sending...
//                   </>
//                 ) : (
//                   'Get Free Quote'
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }








// 'use client'
// import { useState } from 'react'

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     doorType: '',
//     message: ''
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 800))
//       console.log('Form submitted:', formData)
//       alert('Thank you for your inquiry! We will contact you within 24 hours.')
//       setFormData({ name: '', email: '', phone: '', doorType: '', message: '' })
//     } catch (error) {
//       console.error('Error submitting form:', error)
//       alert('There was an error. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const doorTypes = [
//     'Teak Wood Doors',
//     'Sagwan Wood Doors',
//     'Main Entrance Doors',
//     'Room Doors',
//     'French Doors',
//     'Sliding Doors',
//     'Custom Design',
//     'Door Repair/Service'
//   ]

//   return (
//     <>
//       <style jsx>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         body {
//           background: #f9f7f3;
//         }
        
//         .contact-wrapper {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 20px;
//           background-color: #f9f7f3;
//         }
        
//         .contact-container {
//           width: 100%;
//           max-width: 1200px;
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 40px;
//           align-items: center;
//         }
        
//         /* Left Side - Information */
//         .contact-info {
//           padding: 30px 25px;
//           background: white;
//           border-radius: 15px;
//           box-shadow: 0 5px 20px rgba(139, 90, 43, 0.08);
//         }
        
//         .shop-name {
//           font-size: 32px;
//           font-weight: 700;
//           color: #5c4033;
//           margin-bottom: 15px;
//           letter-spacing: 0.5px;
//           line-height: 1.2;
//         }
        
//         .shop-name span {
//           color: #8b5a2b;
//           font-weight: 800;
//           display: block;
//         }
        
//         .tagline {
//           font-size: 16px;
//           color: #666;
//           margin-bottom: 30px;
//           line-height: 1.5;
//           padding-bottom: 20px;
//           border-bottom: 1px solid #e0d6cc;
//         }
        
//         .contact-details {
//           margin-top: 25px;
//         }
        
//         .detail-item {
//           display: flex;
//           align-items: flex-start;
//           margin-bottom: 20px;
//           padding: 15px;
//           background: #faf9f6;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(139, 90, 43, 0.05);
//           border-left: 3px solid #8b5a2b;
//         }
        
//         .detail-icon {
//           width: 44px;
//           height: 44px;
//           min-width: 44px;
//           background: #f5efe6;
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-right: 15px;
//           color: #8b5a2b;
//           font-size: 20px;
//         }
        
//         .detail-content h3 {
//           font-size: 16px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 4px;
//         }
        
//         .detail-content p {
//           font-size: 14px;
//           color: #666;
//           line-height: 1.4;
//         }
        
//         .working-hours {
//           margin-top: 25px;
//           padding: 15px;
//           background: #f5efe6;
//           border-radius: 8px;
//           border: 1px solid #e0d6cc;
//         }
        
//         .hours-title {
//           font-size: 15px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 8px;
//         }
        
//         .hours-details {
//           font-size: 14px;
//           color: #666;
//           line-height: 1.4;
//         }
        
//         /* Right Side - Form */
//         .contact-form-container {
//           padding: 30px 25px;
//           background: white;
//           border-radius: 15px;
//           box-shadow: 0 10px 30px rgba(139, 90, 43, 0.1);
//         }
        
//         .form-title {
//           font-size: 26px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 8px;
//         }
        
//         .form-subtitle {
//           font-size: 14px;
//           color: #777;
//           margin-bottom: 25px;
//           line-height: 1.5;
//         }
        
//         .form-group {
//           margin-bottom: 20px;
//         }
        
//         .form-label {
//           display: block;
//           font-size: 13px;
//           font-weight: 600;
//           color: #5c4033;
//           margin-bottom: 6px;
//         }
        
//         .form-label span {
//           color: #d9534f;
//         }
        
//         .form-input {
//           width: 100%;
//           padding: 12px 14px;
//           font-size: 14px;
//           border: 1px solid #ddd;
//           border-radius: 6px;
//           background: #fafafa;
//           transition: all 0.3s ease;
//           color: #333;
//           -webkit-appearance: none;
//         }
        
//         .form-input:focus {
//           outline: none;
//           border-color: #8b5a2b;
//           background: white;
//           box-shadow: 0 0 0 2px rgba(139, 90, 43, 0.1);
//         }
        
//         .form-input::placeholder {
//           color: #999;
//         }
        
//         .form-select {
//           appearance: none;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235c4033' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 14px center;
//           background-size: 14px;
//           padding-right: 40px;
//         }
        
//         .form-textarea {
//           min-height: 100px;
//           resize: vertical;
//           line-height: 1.4;
//           font-family: inherit;
//         }
        
//         .submit-btn {
//           width: 100%;
//           padding: 14px;
//           font-size: 15px;
//           font-weight: 600;
//           background: #8b5a2b;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-top: 5px;
//         }
        
//         .submit-btn:hover:not(:disabled) {
//           background: #5c4033;
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(139, 90, 43, 0.2);
//         }
        
//         .submit-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//         }
        
//         .loading-spinner {
//           display: inline-block;
//           width: 16px;
//           height: 16px;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           border-radius: 50%;
//           border-top-color: white;
//           animation: spin 0.8s linear infinite;
//           margin-right: 8px;
//           vertical-align: middle;
//         }
        
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
        
//         /* Door Types Grid */
//         .door-types-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 8px;
//           margin-top: 12px;
//         }
        
//         .door-type-option {
//           padding: 10px;
//           background: #fafafa;
//           border: 1px solid #ddd;
//           border-radius: 5px;
//           font-size: 13px;
//           color: #555;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-align: center;
//           word-break: break-word;
//         }
        
//         .door-type-option:hover {
//           background: #f5efe6;
//           border-color: #8b5a2b;
//         }
        
//         .door-type-option.selected {
//           background: #f5efe6;
//           border-color: #8b5a2b;
//           color: #5c4033;
//           font-weight: 600;
//         }
        
//         /* Responsive Design */
//         /* Small phones */
//         @media (max-width: 360px) {
//           .contact-wrapper {
//             padding: 15px 12px;
//           }
          
//           .contact-info,
//           .contact-form-container {
//             padding: 20px 18px;
//           }
          
//           .shop-name {
//             font-size: 28px;
//           }
          
//           .form-title {
//             font-size: 22px;
//           }
          
//           .door-types-grid {
//             grid-template-columns: 1fr;
//           }
          
//           .detail-item {
//             flex-direction: column;
//           }
          
//           .detail-icon {
//             margin-bottom: 10px;
//             margin-right: 0;
//           }
//         }
        
//         /* Tablets */
//         @media (min-width: 768px) {
//           .contact-container {
//             grid-template-columns: 1fr 1fr;
//             gap: 30px;
//           }
          
//           .contact-info {
//             padding: 35px;
//             box-shadow: none;
//             background: transparent;
//           }
          
//           .shop-name {
//             font-size: 36px;
//           }
          
//           .shop-name span {
//             display: inline;
//           }
          
//           .tagline {
//             font-size: 17px;
//           }
          
//           .detail-item {
//             padding: 20px;
//           }
          
//           .detail-content h3 {
//             font-size: 17px;
//           }
          
//           .detail-content p {
//             font-size: 15px;
//           }
          
//           .contact-form-container {
//             padding: 40px;
//           }
          
//           .form-title {
//             font-size: 28px;
//           }
          
//           .form-subtitle {
//             font-size: 15px;
//           }
          
//           .door-types-grid {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 10px;
//           }
//         }
        
//         /* Desktop */
//         @media (min-width: 992px) {
//           .contact-wrapper {
//             padding: 40px 30px;
//           }
          
//           .contact-container {
//             gap: 50px;
//           }
          
//           .contact-info {
//             padding: 50px;
//           }
          
//           .shop-name {
//             font-size: 42px;
//           }
          
//           .tagline {
//             font-size: 18px;
//             margin-bottom: 40px;
//           }
          
//           .contact-form-container {
//             padding: 50px;
//           }
          
//           .form-title {
//             font-size: 32px;
//           }
          
//           .form-group {
//             margin-bottom: 25px;
//           }
          
//           .form-input {
//             padding: 14px 16px;
//             font-size: 15px;
//           }
          
//           .submit-btn {
//             padding: 16px;
//             font-size: 16px;
//           }
          
//           .door-types-grid {
//             gap: 12px;
//           }
          
//           .door-type-option {
//             padding: 12px;
//             font-size: 14px;
//           }
//         }
        
//         /* Large Desktop */
//         @media (min-width: 1200px) {
//           .contact-container {
//             gap: 60px;
//           }
//         }
        
//         /* Form fields grid for larger screens */
//         @media (min-width: 480px) {
//           .form-fields-grid {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 20px;
//           }
//         }
        
//         /* Adjust form grid on small screens */
//         @media (max-width: 479px) {
//           .form-fields-grid {
//             display: block;
//           }
          
//           .form-fields-grid > div {
//             margin-bottom: 20px;
//           }
          
//           .form-fields-grid > div:last-child {
//             margin-bottom: 0;
//           }
//         }
//       `}</style>

//       <div className="contact-wrapper">
//         <div className="contact-container">
//           {/* Left Side - Information */}
//           <div className="contact-info">
//             <h1 className="shop-name">
//               Shree <span>Doors</span>
//             </h1>
            
//             <p className="tagline">
//               Premium quality wooden doors with traditional craftsmanship and modern designs. 
//               We create door solutions that stand the test of time.
//             </p>
            
//             <div className="contact-details">
//               <div className="detail-item">
//                 <div className="detail-icon">📍</div>
//                 <div className="detail-content">
//                   <h3>Visit Our Showroom</h3>
//                   <p>Plot 45, Industrial Estate<br />Mumbai, Maharashtra</p>
//                 </div>
//               </div>
              
//               <div className="detail-item">
//                 <div className="detail-icon">📞</div>
//                 <div className="detail-content">
//                   <h3>Call for Consultation</h3>
//                   <p>+91 98765 43210<br />Available 9AM - 7PM</p>
//                 </div>
//               </div>
              
//               <div className="detail-item">
//                 <div className="detail-icon">📧</div>
//                 <div className="detail-content">
//                   <h3>Email Us</h3>
//                   <p>info@shreedoors.com<br />We reply within 24 hours</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="working-hours">
//               <div className="hours-title">Working Hours</div>
//               <div className="hours-details">
//                 Monday - Saturday: 9:00 AM to 7:00 PM<br />
//                 Sunday: Closed
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Form */}
//           <div className="contact-form-container">
//             <h2 className="form-title">Get a Quote</h2>
//             <p className="form-subtitle">
//               Tell us about your door requirements and we'll provide you with a detailed quote.
//             </p>
            
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="name">
//                   Your Name <span>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter your full name"
//                   required
//                 />
//               </div>
              
//               <div className="form-fields-grid">
//                 <div className="form-group">
//                   <label className="form-label" htmlFor="email">
//                     Email <span>*</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="your@email.com"
//                     required
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label className="form-label" htmlFor="phone">
//                     Phone <span>*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="+91 98765 43210"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">
//                   Door Type Interest
//                 </label>
//                 <div className="door-types-grid">
//                   {doorTypes.map((type, index) => (
//                     <div
//                       key={index}
//                       className={`door-type-option ${formData.doorType === type ? 'selected' : ''}`}
//                       onClick={() => setFormData({...formData, doorType: type})}
//                     >
//                       {type}
//                     </div>
//                   ))}
//                 </div>
//                 <input
//                   type="hidden"
//                   name="doorType"
//                   value={formData.doorType}
//                   onChange={handleChange}
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label" htmlFor="message">
//                   Requirements <span>*</span>
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="form-input form-textarea"
//                   placeholder="Tell us about your door requirements, measurements, budget, timeline..."
//                   required
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 className="submit-btn"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className="loading-spinner"></span>
//                     Sending...
//                   </>
//                 ) : (
//                   'Get Free Quote'
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }


'use client'
import { useState } from 'react'
import './style.css' // CSS import
import Navbar from '@/components/Navbar'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doorType: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      console.log('Form submitted:', formData)
      alert('Thank you for your inquiry! We will contact you within 24 hours.')
      setFormData({ name: '', email: '', phone: '', doorType: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const doorTypes = [
    'Teak Wood Doors',
    'Sagwan Wood Doors',
    'Main Entrance Doors',
    'Room Doors',
    'French Doors',
    'Sliding Doors',
    'Custom Design',
    'Door Repair/Service'
  ]

  return (
    <>
    <Navbar />
    <div className="contact-wrapper">
      <div className="contact-container">
        {/* Left Side - Information */}
        <div className="contact-info">
          <h1 className="shop-name">
            MAA KRIPA <span>WOODS ART</span>
          </h1>
          
          <p className="tagline">
            Premium quality wooden doors with traditional craftsmanship and modern designs. 
            We create door solutions that stand the test of time.
          </p>
          
          <div className="contact-details">
            <div className="detail-item">
              <div className="detail-icon">📍</div>
              <div className="detail-content">
                <h3>Visit Our Showroom</h3>
                <p>Plot 45, Industrial Estate<br />Mumbai, Maharashtra</p>
              </div>
            </div>
            
            <div className="detail-item">
              <div className="detail-icon">📞</div>
              <div className="detail-content">
                <h3>Call for Consultation</h3>
                <p>+91 98765 43210<br />Available 9AM - 7PM</p>
              </div>
            </div>
            
            <div className="detail-item">
              <div className="detail-icon">📧</div>
              <div className="detail-content">
                <h3>Email Us</h3>
                <p>info@shreedoors.com<br />We reply within 24 hours</p>
              </div>
            </div>
          </div>
          
          <div className="working-hours">
            <div className="hours-title">Working Hours</div>
            <div className="hours-details">
              Monday - Saturday: 9:00 AM to 7:00 PM<br />
              Sunday: Closed
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="contact-form-container">
          <h2 className="form-title">Get a Quote</h2>
          <p className="form-subtitle">
            Tell us about your door requirements and we'll provide you with a detailed quote.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Your Name <span>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-fields-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Phone <span>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Door Type Interest
              </label>
              <div className="door-types-grid">
                {doorTypes.map((type, index) => (
                  <div
                    key={index}
                    className={`door-type-option ${formData.doorType === type ? 'selected' : ''}`}
                    onClick={() => setFormData({...formData, doorType: type})}
                  >
                    {type}
                  </div>
                ))}
              </div>
              <input
                type="hidden"
                name="doorType"
                value={formData.doorType}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="message">
                Requirements <span>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Tell us about your door requirements, measurements, budget, timeline..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending...
                </>
              ) : (
                'Get Free Quote'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}