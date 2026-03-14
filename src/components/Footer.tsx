import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#1c1410', color: '#e7e5e4' }}>

      {/* Amber top accent line */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 70%, transparent 100%)' }} />

      {/* ── MAIN FOOTER — full width with internal padding ── */}
      <div style={{ padding: '4rem 5vw 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: '3rem', maxWidth: '1400px', margin: '0 auto' }}>

          {/* ── Company Info ── */}
          <div>
            <h3 style={{ fontSize: '1.6rem', fontFamily: 'Georgia, serif', fontWeight: 700, color: '#fbbf24', marginBottom: '1rem', lineHeight: 1 }}>
              Shilpgrah
            </h3>
            <p style={{ color: '#a8a29e', fontSize: '0.82rem', lineHeight: 1.85, marginBottom: '1.25rem', fontFamily: 'system-ui, sans-serif', maxWidth: '280px' }}>
              Exporting the finest Rajasthani handicrafts to the world. Our artisans create masterpieces that carry the heritage and soul of Rajasthan.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { href: '#', Icon: Facebook },
                { href: '#', Icon: Instagram },
                { href: '#', Icon: Twitter },
                { href: '#', Icon: Linkedin },
              ].map(({ href, Icon }, i) => (
                <a key={i} href={href}
                  style={{ width: '2.2rem', height: '2.2rem', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(217,119,6,0.2)'; (e.currentTarget as HTMLElement).style.color = '#fbbf24'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,119,6,0.4)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = '#a8a29e'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <Icon style={{ width: '0.9rem', height: '0.9rem' }} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fbbf24', marginBottom: '1.25rem', fontFamily: 'system-ui, sans-serif' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Home',         to: '/' },
                { label: 'Products',     to: '/shop' },
                { label: 'Collections',  to: '/collection' },
                { label: 'About Us',     to: '/about' },
                { label: 'Gallery',      to: '/gallery' },
                { label: 'Get a Quote',  to: '/quote-request' },
                { label: 'Contact',      to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}
                    style={{ color: '#a8a29e', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'system-ui, sans-serif', transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fbbf24'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#a8a29e'; }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#d97706', flexShrink: 0, display: 'inline-block' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Catalogues ── */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fbbf24', marginBottom: '1.25rem', fontFamily: 'system-ui, sans-serif' }}>
              Catalogues
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Rajasthan Furniture Catalogue', file: '/assets/Rajasthan-catalogue.pdf' },
                { label: 'Export Collection 2024',        file: '/assets/Furniture-catalog.pdf' },
                { label: 'Export Collection 2025',        file: '/assets/Furniture-catalog.pdf' },
              ].map(({ label, file }) => (
                <a key={label} href={file} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.7rem 0.85rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(217,119,6,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(217,119,6,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  <div style={{ width: '2rem', height: '2rem', borderRadius: '6px', background: 'rgba(217,119,6,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileDown style={{ width: '0.85rem', height: '0.85rem', color: '#fbbf24' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e7e5e4', fontFamily: 'system-ui, sans-serif', margin: 0, lineHeight: 1.3 }}>{label}</p>
                    <p style={{ fontSize: '0.62rem', color: '#78716c', fontFamily: 'system-ui, sans-serif', margin: 0 }}>PDF Download</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fbbf24', marginBottom: '1.25rem', fontFamily: 'system-ui, sans-serif' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin style={{ width: '1rem', height: '1rem', color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#a8a29e', fontSize: '0.8rem', lineHeight: 1.65, fontFamily: 'system-ui, sans-serif' }}>
                  Plot No 12A, Khasra NO 93,<br />
                  Main Salawas Road,<br />
                  Jodhpur, Rajasthan 342001
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone style={{ width: '1rem', height: '1rem', color: '#d97706', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <a href="tel:+917014318581" style={{ color: '#a8a29e', fontSize: '0.8rem', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', transition: 'color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fbbf24'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#a8a29e'; }}>
                    +91 7014318581
                  </a>
                  <a href="tel:+919079323259" style={{ color: '#a8a29e', fontSize: '0.8rem', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', transition: 'color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fbbf24'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#a8a29e'; }}>
                    +91 9079323259
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Mail style={{ width: '1rem', height: '1rem', color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {['info@shilpgrah.com', 'mihir@shilpgrah.com'].map(email => (
                    <a key={email} href={`mailto:${email}`}
                      style={{ color: '#a8a29e', fontSize: '0.8rem', textDecoration: 'none', fontFamily: 'system-ui, sans-serif', transition: 'color 0.15s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fbbf24'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#a8a29e'; }}>
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '1.25rem 5vw' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#57534e', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
            © {new Date().getFullYear()} Shilpgrah. All rights reserved.
          </p>
          <p style={{ fontSize: '0.72rem', color: '#57534e', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
            Handicrafts Export Council Member · Jodhpur, Rajasthan, India
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;