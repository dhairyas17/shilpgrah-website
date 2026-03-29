import React, { useState } from 'react';
import { CheckCircle, Send, Package, Clock, Wrench, FileText, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useQuote } from '../contexts/QuoteContext';

// ── EmailJS credentials ── replace with your own values
const EMAILJS_SERVICE_ID  = 'service_siw4qrg';   // e.g. service_xxxxxxx
const EMAILJS_TEMPLATE_ID = 'template_zfw8twy';  // your template ID
const EMAILJS_PUBLIC_KEY  = '-do9bl4KlsBqLFuaT';   // e.g. xxxxxxxxxxxxxxxxxxxxxx

const inputBase: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem',
  border: '1.5px solid #e7e5e4', borderRadius: '8px',
  fontSize: '0.85rem', color: '#1c1917',
  background: 'white', outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.72rem', fontWeight: 700,
  letterSpacing: '0.1em', textTransform: 'uppercase',
  color: '#78716c', marginBottom: '0.45rem',
};

const perks = [
  { icon: FileText, text: 'Detailed pricing breakdown' },
  { icon: Package,  text: 'Shipping costs & timeline' },
  { icon: Wrench,   text: 'Customisation options' },
  { icon: Image,    text: 'Professional product photos' },
  { icon: Clock,    text: 'Export documentation guidance' },
];

const QuoteRequestPage: React.FC = () => {
  const { quoteItems, clearQuote } = useQuote();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', country: '',
    company: '', shippingPreference: 'sea', specialNotes: '',
  });
  const [focused, setFocused]       = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const productRows = quoteItems.length > 0
      ? quoteItems.map((item, i) => `
          <tr style="background:${i % 2 === 0 ? '#ffffff' : '#fafaf9'}; border-bottom: 1px solid #e7e5e4;">
            <td style="padding:10px 16px; color:#a8a29e; font-size:13px;">${i + 1}</td>
            <td style="padding:10px 16px; color:#1c1917; font-size:13px; font-weight:600;">${item.product.name}</td>
            <td style="padding:10px 16px; color:#1c1917; font-size:13px; text-align:center; font-weight:700;">${item.quantity}</td>
            <td style="padding:10px 16px; color:#57534e; font-size:13px;">${item.product.material}</td>
            <td style="padding:10px 16px; font-size:13px;">
              <span style="background:#fef3c7; color:#92400e; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:600;">${item.product.finish}</span>
            </td>
          </tr>`).join('')
      : `<tr><td colspan="5" style="padding:16px; text-align:center; color:#a8a29e; font-size:13px;">No products selected.</td></tr>`;

    const shippingLabel: Record<string, string> = {
      sea:     'Sea Freight — Economical (4–6 weeks)',
      air:     'Air Freight — Fast (1–2 weeks)',
      express: 'Express Courier — Fastest (3–5 days)',
      custom:  'Custom / Special Requirements',
    };

    const html_body = `
<div style="font-family: system-ui, Arial, sans-serif; font-size: 14px; max-width: 620px; margin: 0 auto; background: #ffffff;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #92400e, #d97706); padding: 36px 40px; border-radius: 12px 12px 0 0;">
    <p style="margin: 0 0 4px 0; color: #fde68a; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Shilpgrah Export</p>
    <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700;">New Quote Request</h1>
  </div>

  <!-- Body -->
  <div style="padding: 32px 40px; border: 1px solid #e7e5e4; border-top: none; border-radius: 0 0 12px 12px;">

    <p style="margin: 0 0 28px 0; color: #57534e; font-size: 14px; line-height: 1.6;">
      A new quote request has been submitted. Please review the details below and respond within 24 hours.
    </p>

    <!-- Contact Details -->
    <div style="margin-bottom: 28px;">
      <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #d97706;">Contact Details</p>
      <table style="width: 100%; border-collapse: collapse; background: #fafaf9; border-radius: 8px; overflow: hidden; border: 1px solid #e7e5e4;">
        <tr style="border-bottom: 1px solid #e7e5e4;">
          <td style="padding: 10px 16px; color: #78716c; font-size: 13px; width: 35%; font-weight: 600;">Name</td>
          <td style="padding: 10px 16px; color: #1c1917; font-size: 13px;">${formData.name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e7e5e4;">
          <td style="padding: 10px 16px; color: #78716c; font-size: 13px; font-weight: 600;">Email</td>
          <td style="padding: 10px 16px; font-size: 13px;"><a href="mailto:${formData.email}" style="color: #d97706; text-decoration: none;">${formData.email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e7e5e4;">
          <td style="padding: 10px 16px; color: #78716c; font-size: 13px; font-weight: 600;">Phone</td>
          <td style="padding: 10px 16px; color: #1c1917; font-size: 13px;">${formData.phone || 'N/A'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e7e5e4;">
          <td style="padding: 10px 16px; color: #78716c; font-size: 13px; font-weight: 600;">Country</td>
          <td style="padding: 10px 16px; color: #1c1917; font-size: 13px;">${formData.country}</td>
        </tr>
        <tr>
          <td style="padding: 10px 16px; color: #78716c; font-size: 13px; font-weight: 600;">Company</td>
          <td style="padding: 10px 16px; color: #1c1917; font-size: 13px;">${formData.company || 'N/A'}</td>
        </tr>
      </table>
    </div>

    <!-- Products -->
    <div style="margin-bottom: 28px;">
      <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #d97706;">Products Requested</p>
      <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; border: 1px solid #e7e5e4;">
        <tr style="background: #292524; color: #ffffff;">
          <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em;">#</td>
          <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em;">Product</td>
          <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-align: center;">Qty</td>
          <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em;">Material</td>
          <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; letter-spacing: 0.05em;">Finish</td>
        </tr>
        ${productRows}
      </table>
    </div>

    <!-- Shipping -->
    <div style="margin-bottom: 28px;">
      <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #d97706;">Shipping Preference</p>
      <div style="background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 12px 16px; color: #1c1917; font-size: 13px;">
        ${shippingLabel[formData.shippingPreference] ?? formData.shippingPreference}
      </div>
    </div>

    <!-- Notes -->
    <div style="margin-bottom: 32px;">
      <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #d97706;">Additional Notes</p>
      <div style="background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 12px 16px; color: #57534e; font-size: 13px; line-height: 1.6;">
        ${formData.specialNotes || 'None'}
      </div>
    </div>

    <!-- CTA -->
    <div style="text-align: center; padding: 24px; background: #fffbeb; border-radius: 10px; border: 1px solid #fde68a;">
      <p style="margin: 0 0 14px 0; color: #92400e; font-size: 13px; font-weight: 600;">Reply directly to this customer</p>
      <a href="mailto:${formData.email}" style="display: inline-block; background: #d97706; color: white; text-decoration: none; padding: 10px 28px; border-radius: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.05em;">
        Reply to ${formData.name}
      </a>
    </div>

  </div>

  <!-- Footer -->
  <p style="text-align: center; color: #a8a29e; font-size: 11px; margin-top: 20px;">
    Shilpgrah · Quote Request System · This email was auto-generated
  </p>

</div>`;

    const templateParams = {
      html_body,
      from_name : formData.name,   // used in email subject by EmailJS
      from_email: formData.email,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      clearQuote();
      setSubmitted(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const getInputStyle = (name: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === name ? '#d97706' : '#e7e5e4',
    boxShadow  : focused === name ? '0 0 0 3px rgba(217,119,6,0.1)' : 'none',
  });

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center" style={{ paddingTop: '5rem', padding: '5rem 1rem 3rem' }}>
        <div className="max-w-lg w-full text-center">
          <div className="bg-white mx-auto" style={{ padding: '3rem 2.5rem', borderRadius: '16px', border: '1.5px solid #f5f5f4', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)' }} />
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#dcfce7' }}>
              <CheckCircle className="w-8 h-8" style={{ color: '#16a34a' }} />
            </div>
            <h1 className="font-serif font-bold text-stone-900 mb-3" style={{ fontSize: '1.75rem' }}>Quote Request Sent!</h1>
            <p className="text-stone-500 leading-relaxed mb-5" style={{ fontSize: '0.88rem', lineHeight: 1.8 }}>
              Thank you for your interest. Our export team will review your request and get back to you within 24 hours with a detailed quote.
            </p>
            <div className="text-left p-4 mb-6" style={{ background: '#fffbeb', borderRadius: '8px', border: '1px solid #fde68a' }}>
              <p className="font-semibold text-amber-900 mb-1" style={{ fontSize: '0.78rem' }}>What happens next?</p>
              <p className="text-amber-800" style={{ fontSize: '0.78rem', lineHeight: 1.75 }}>
                Our team will email you a comprehensive quote including pricing, shipping costs, delivery timeline, and customisation options available for each item.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/" className="flex-1 flex items-center justify-center font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.8rem', background: '#d97706', color: 'white', fontSize: '0.82rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(217,119,6,0.3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; }}>
                Continue Shopping
              </Link>
              <Link to="/collection" className="flex-1 flex items-center justify-center font-semibold rounded-lg transition-all duration-200"
                style={{ padding: '0.8rem', background: 'white', color: '#1c1917', fontSize: '0.82rem', textDecoration: 'none', border: '1.5px solid #e7e5e4' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#d97706'; (e.currentTarget as HTMLElement).style.color = '#d97706'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e7e5e4'; (e.currentTarget as HTMLElement).style.color = '#1c1917'; }}>
                Browse Collections
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="relative bg-white border-b border-stone-100" style={{ paddingTop: '7.5rem', paddingBottom: '3rem' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #fffbf5 0%, #fff8ef 50%, #fdfaf5 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 70%, transparent 100%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-700 font-semibold tracking-widest uppercase mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}>Get a Price</p>
          <h1 className="font-serif text-stone-900 mb-3" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.1 }}>Request Your Quote</h1>
          <div className="mx-auto mb-4" style={{ width: '3.5rem', height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)', borderRadius: '2px' }} />
          <p className="text-stone-500 max-w-[700px] mx-auto leading-relaxed" style={{ fontSize: '0.9rem' }}>
            Tell us about your requirements and we'll provide a detailed quote including pricing, shipping, and timeline.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">

            <div className="bg-white p-6" style={{ borderRadius: '12px', border: '1.5px solid #f5f5f4', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)' }} />
              <h3 className="font-serif font-bold text-stone-800 mb-5" style={{ fontSize: '1.1rem' }}>Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name',             name: 'name',    type: 'text',  required: true,  span: false },
                  { label: 'Email Address',          name: 'email',   type: 'email', required: true,  span: false },
                  { label: 'Phone Number',           name: 'phone',   type: 'tel',   required: false, span: false },
                  { label: 'Country',                name: 'country', type: 'text',  required: true,  span: false },
                  { label: 'Company / Organisation', name: 'company', type: 'text',  required: false, span: true  },
                ].map(field => (
                  <div key={field.name} className={field.span ? 'sm:col-span-2' : ''}>
                    <label style={labelStyle}>{field.label}{field.required && <span style={{ color: '#d97706', marginLeft: '2px' }}>*</span>}</label>
                    <input
                      type={field.type} name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange} required={field.required}
                      onFocus={() => setFocused(field.name)} onBlur={() => setFocused(null)}
                      style={getInputStyle(field.name)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6" style={{ borderRadius: '12px', border: '1.5px solid #f5f5f4', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)' }} />
              <h3 className="font-serif font-bold text-stone-800 mb-5" style={{ fontSize: '1.1rem' }}>Shipping Preferences</h3>
              <label style={labelStyle}>Preferred Shipping Method</label>
              <select name="shippingPreference" value={formData.shippingPreference} onChange={handleChange}
                onFocus={() => setFocused('shippingPreference')} onBlur={() => setFocused(null)} style={getInputStyle('shippingPreference')}>
                <option value="sea">Sea Freight — Economical (4–6 weeks)</option>
                <option value="air">Air Freight — Fast (1–2 weeks)</option>
                <option value="express">Express Courier — Fastest (3–5 days)</option>
                <option value="custom">Custom / Special Requirements</option>
              </select>
            </div>

            <div className="bg-white p-6" style={{ borderRadius: '12px', border: '1.5px solid #f5f5f4', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)' }} />
              <h3 className="font-serif font-bold text-stone-800 mb-5" style={{ fontSize: '1.1rem' }}>Additional Information</h3>
              <label style={labelStyle}>Special Notes or Requirements</label>
              <textarea name="specialNotes" value={formData.specialNotes} onChange={handleChange} rows={4}
                onFocus={() => setFocused('specialNotes')} onBlur={() => setFocused(null)}
                placeholder="Specific requirements, customisation needs, timeline constraints, or questions…"
                style={{ ...getInputStyle('specialNotes'), resize: 'vertical' }} />
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: '8px', padding: '0.85rem 1rem', color: '#b91c1c', fontSize: '0.82rem' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={submitting}
              className="w-full flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200"
              style={{ padding: '1rem', fontSize: '0.88rem', letterSpacing: '0.06em', background: submitting ? '#e7b77b' : '#d97706', color: 'white', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', boxShadow: submitting ? 'none' : '0 4px 20px rgba(217,119,6,0.35)' }}
              onMouseEnter={e => { if (!submitting) (e.currentTarget as HTMLElement).style.background = '#b45309'; }}
              onMouseLeave={e => { if (!submitting) (e.currentTarget as HTMLElement).style.background = '#d97706'; }}>
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <span>Sending…</span>
                </>
              ) : (
                <><Send className="w-4 h-4" /><span>Submit Quote Request</span></>
              )}
            </button>
          </form>

          <div className="lg:col-span-1">
            <div className="bg-white sticky top-24" style={{ borderRadius: '12px', border: '1.5px solid #f5f5f4', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #d97706, #fbbf24)' }} />
              <div className="p-5">
                <h3 className="font-serif font-bold text-stone-800 mb-4" style={{ fontSize: '1rem' }}>Items for Quote</h3>
                {quoteItems.length > 0 ? (
                  <div className="space-y-3 mb-5 pb-5" style={{ borderBottom: '1px solid #f5f0e8', maxHeight: '260px', overflowY: 'auto' }}>
                    {quoteItems.map(item => (
                      <div key={item.product.id} className="flex gap-3 items-center">
                        <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: '#f5f0e8' }}>
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-stone-800 truncate" style={{ fontSize: '0.78rem' }}>{item.product.name}</p>
                          <p className="text-stone-400" style={{ fontSize: '0.68rem' }}>Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-stone-400 mb-5 pb-5 text-sm" style={{ borderBottom: '1px solid #f5f0e8' }}>No items selected. Browse products to add items.</p>
                )}
                <p className="font-semibold text-stone-700 mb-3" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>What you'll receive</p>
                <ul className="space-y-2.5">
                  {perks.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: '#fef3c7' }}>
                        <Icon className="w-3 h-3" style={{ color: '#d97706' }} />
                      </div>
                      <span className="text-stone-500" style={{ fontSize: '0.76rem' }}>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuoteRequestPage;