import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '917014318581'; // country code + number, no +
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello! I came across Shilpgrah and I\'m interested in your handcrafted furniture. Could you please help me?'
);

const WhatsAppButton: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleClick = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <>
      {/* Tooltip / Chat bubble */}
      <div
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          right: '1.25rem',
          zIndex: 9998,
          background: 'white',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          maxWidth: '220px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
          transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: hovered ? 'auto' : 'none',
          border: '1px solid #e7e5e4',
        }}
      >
        {/* Small arrow pointing down-right */}
        <div style={{
          position: 'absolute', bottom: '-7px', right: '1.75rem',
          width: '14px', height: '14px',
          background: 'white',
          transform: 'rotate(45deg)',
          borderRight: '1px solid #e7e5e4',
          borderBottom: '1px solid #e7e5e4',
        }} />

        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1c1917', marginBottom: '2px', fontFamily: 'Georgia, serif' }}>
          Chat with us!
        </p>
        <p style={{ fontSize: '0.7rem', color: '#78716c', lineHeight: 1.45, fontFamily: 'system-ui, sans-serif' }}>
          We usually reply within a few minutes.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'waPulse 2s infinite' }} />
          <span style={{ fontSize: '0.62rem', color: '#22c55e', fontWeight: 600, fontFamily: 'system-ui, sans-serif' }}>Online now</span>
        </div>
      </div>

      {/* Main WhatsApp button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.25rem',
          zIndex: 9999,
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          background: hovered
            ? 'linear-gradient(135deg, #16a34a, #22c55e)'
            : 'linear-gradient(135deg, #25D366, #128C7E)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered
            ? '0 8px 28px rgba(37,211,102,0.55), 0 2px 8px rgba(0,0,0,0.15)'
            : '0 4px 20px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.12)',
          transform: hovered ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)',
          transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* WhatsApp SVG logo */}
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.003 3C9.376 3 4 8.373 4 14.997c0 2.18.587 4.22 1.607 5.972L4 29l8.23-1.582A12.94 12.94 0 0 0 16.003 28C22.627 28 28 22.626 28 15.997 28 9.373 22.627 3 16.003 3zm0 23.6a10.74 10.74 0 0 1-5.478-1.496l-.393-.233-4.078.784.818-3.976-.255-.41A10.72 10.72 0 0 1 5.4 15.002c0-5.85 4.754-10.602 10.603-10.602 5.85 0 10.603 4.753 10.603 10.602 0 5.85-4.753 10.598-10.603 10.598zm5.82-7.944c-.32-.16-1.888-.93-2.18-1.035-.295-.107-.51-.16-.724.16-.213.32-.827 1.035-1.014 1.248-.187.213-.374.24-.694.08-.32-.16-1.35-.497-2.572-1.587-.95-.847-1.59-1.893-1.776-2.213-.187-.32-.02-.493.14-.653.145-.143.32-.373.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.724-1.748-.99-2.39-.26-.627-.527-.54-.724-.55-.187-.008-.4-.01-.614-.01-.213 0-.56.08-.853.4-.294.32-1.12 1.094-1.12 2.668s1.147 3.094 1.307 3.308c.16.213 2.26 3.454 5.48 4.847.765.33 1.362.527 1.827.673.768.244 1.468.21 2.02.127.616-.09 1.888-.772 2.154-1.518.267-.746.267-1.386.187-1.52-.08-.134-.293-.213-.613-.373z" />
        </svg>

        {/* Ping ring animation */}
        <span style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid rgba(37,211,102,0.5)',
          animation: 'waRing 2.5s ease-out infinite',
          pointerEvents: 'none',
        }} />
      </button>

      <style>{`
        @keyframes waRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes waPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;