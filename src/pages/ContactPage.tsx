import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Globe, Award, ChevronRight } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', country: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', country: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1400);
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-3.5 bg-stone-50 border-b-2 rounded-t-lg text-stone-800 placeholder-stone-400 text-sm outline-none transition-all duration-300 ${
      focused === name ? 'border-amber-500 bg-amber-50/30' : 'border-stone-200 hover:border-stone-300'
    }`;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Georgia', serif" }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-stone-900 pt-32 pb-20">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="rajasthani" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="10" fill="none" stroke="white" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="3" fill="white" />
                <line x1="10" y1="30" x2="50" y2="30" stroke="white" strokeWidth="0.3" />
                <line x1="30" y1="10" x2="30" y2="50" stroke="white" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rajasthani)" />
          </svg>
        </div>

        {/* Amber glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #d97706 0%, transparent 70%)' }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Jodhpur, Rajasthan, India
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Let's Create
            <span className="block text-amber-400">Something Together</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Bring authentic Rajasthani craftsmanship to your space. Our artisans are ready to craft your vision into reality.
          </p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
      </section>



      {/* ── MAIN CONTENT ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* ── FORM (3 cols) ── */}
            <div className="lg:col-span-3">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-stone-800 mb-3">Send Us a Message</h2>
                <p className="text-stone-500 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Fill in the details below and we'll respond within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">Message Received!</h3>
                  <p className="text-stone-500 max-w-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Full Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                        required placeholder="Your full name" className={inputClass('name')} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Email Address *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                        required placeholder="your@email.com" className={inputClass('email')} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                        placeholder="+1 234 567 890" className={inputClass('phone')} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Country</label>
                      <input type="text" name="country" value={formData.country} onChange={handleChange}
                        onFocus={() => setFocused('country')} onBlur={() => setFocused(null)}
                        placeholder="United States" className={inputClass('country')} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Subject *</label>
                    <select name="subject" value={formData.subject} onChange={handleChange}
                      onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                      required className={inputClass('subject')}>
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="custom-order">Custom Order</option>
                      <option value="bulk-order">Bulk Order</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                      required rows={5} placeholder="Tell us about your requirements..."
                      className={`${inputClass('message')} resize-none`} />
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-4 px-8 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-amber-200 active:scale-[0.98]"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── CONTACT INFO (2 cols) ── */}
            <div className="lg:col-span-2 space-y-6">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-stone-800 mb-3">Contact Info</h2>
                <p className="text-stone-500 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Reach us through any of these channels.
                </p>
              </div>

              {[
                {
                  icon: MapPin, color: 'amber',
                  title: 'Factory Outlet',
                  lines: ['Plot No 12A, Khasra NO 93', 'Main Salawas Road', 'Jodhpur, Rajasthan 342001']
                },
                {
                  icon: Phone, color: 'green',
                  title: 'Call Us',
                  lines: ['+91 7014318581', '+91 9079323259 (WhatsApp)', 'Mon–Sat: 9 AM – 7 PM IST']
                },
                {
                  icon: Mail, color: 'blue',
                  title: 'Email Us',
                  lines: ['info@shilpgrah.com', 'mihir@shilpgrah.com', 'Response within 24 hours']
                },
                {
                  icon: Clock, color: 'purple',
                  title: 'Business Hours',
                  lines: ['Monday – Saturday', '9:00 AM – 7:00 PM IST', 'Sunday: By Appointment']
                },
              ].map(({ icon: Icon, color, title, lines }) => {
                const colors: Record<string, string> = {
                  amber: 'bg-amber-50 text-amber-600 border-amber-100',
                  green: 'bg-green-50 text-green-600 border-green-100',
                  blue: 'bg-blue-50 text-blue-600 border-blue-100',
                  purple: 'bg-purple-50 text-purple-600 border-purple-100',
                };
                return (
                  <div key={title} className="flex gap-4 p-5 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-sm transition-all duration-200 group bg-white">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-800 mb-1.5 text-sm">{title}</h3>
                      {lines.map((line, i) => (
                        <p key={i} className="text-stone-500 text-sm leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-2">Find Us</h2>
              <p className="text-stone-500 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                Located in the heart of Jodhpur — the Blue City of Rajasthan.
              </p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer"
              className="hidden md:flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}>
              Open in Maps <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-100" style={{ height: '460px' }}>
            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-lg z-10 pointer-events-none" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-lg z-10 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-lg z-10 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg z-10 pointer-events-none" />

            <iframe
              title="Shilpgrah Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3553.848851695594!2d72.99610891509535!3d26.238946983432337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c257e80952b%3A0x8fb336ff959cfe98!2sJodhpur%2C%20Rajasthan%20342001!5e0!3m2!1sen!2sin!4v1696248682254!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'saturate(0.85) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA STRIP ── */}
      <section className="bg-stone-900 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
            Crafted in Rajasthan · Delivered Worldwide
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to furnish your space?
          </h2>
          <p className="text-stone-400 mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>
            From a single piece to an entire collection — we handle it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917014318581"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}>
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a href="mailto:info@shilpgrah.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-stone-600 hover:border-stone-400 text-stone-300 hover:text-white rounded-xl font-semibold transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}>
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;