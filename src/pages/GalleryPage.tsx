import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const images = [
  { src: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",  label: "Heritage Dining Table",   tag: "Furniture" },
  { src: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",  label: "Royal Living Room",       tag: "Interior" },
  { src: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg",  label: "Carved Bedframe",         tag: "Bedroom" },
  { src: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",  label: "Artisan at Work",         tag: "Craft" },
  { src: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",    label: "Traditional Joinery",     tag: "Craft" },
  { src: "https://images.pexels.com/photos/2724746/pexels-photo-2724746.jpeg",  label: "Inlay Detail",            tag: "Detail" },
  { src: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",  label: "Sheesham Coffee Table",   tag: "Furniture" },
  { src: "https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg",  label: "Rajasthani Wardrobe",     tag: "Bedroom" },
  { src: "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg",  label: "Workshop Floor",          tag: "Interior" },
];

const spans = [2, 1, 1, 1, 2, 1, 1, 1, 2];

const GalleryPage: React.FC = () => {
  const [selected, setSelected]     = useState<number | null>(null);
  const [visible, setVisible]       = useState(false);
  const [imgLoaded, setImgLoaded]   = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [filter, setFilter]         = useState("All");
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const tags = ["All", ...Array.from(new Set(images.map(i => i.tag)))];
  const filtered = filter === "All" ? images : images.filter(i => i.tag === filter);

  const open = (idx: number) => {
    setSelected(idx); setImgLoaded(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    document.body.style.overflow = "hidden";
  };

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => { setSelected(null); document.body.style.overflow = ""; }, 300);
  }, []);

  const prev = useCallback(() => {
    if (selected === null) return;
    setImgLoaded(false);
    setSelected((selected - 1 + filtered.length) % filtered.length);
  }, [selected, filtered.length]);

  const next = useCallback(() => {
    if (selected === null) return;
    setImgLoaded(false);
    setSelected((selected + 1) % filtered.length);
  }, [selected, filtered.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, prev, next, close]);

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── BANNER ── */}
      <div className="relative text-center overflow-hidden" style={{ paddingTop: "7rem", paddingBottom: "2.5rem", background: "white", borderBottom: "1px solid #f5f0e8" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, #fffbf5 0%, #fff8ef 50%, #fdfaf5 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 70%, transparent 100%)" }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-amber-700 font-semibold tracking-widest uppercase mb-2" style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}>Visual Stories</p>
          <h1 className="font-serif text-stone-900 mb-3" style={{ fontSize: "clamp(1.8rem, 5vw, 3.75rem)", fontWeight: 700, lineHeight: 1.1 }}>Our Gallery</h1>
          <div className="mx-auto mb-3" style={{ width: "3.5rem", height: "3px", background: "linear-gradient(90deg, #d97706, #fbbf24)", borderRadius: "2px" }} />
          <p className="text-stone-500 leading-relaxed" style={{ fontSize: "0.88rem" }}>
            See how our Rajasthani handicrafts are made, from the workshop floor to the finished piece.
          </p>
        </div>
      </div>

      {/* ── FILTER TABS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map(tag => (
            <button key={tag} onClick={() => setFilter(tag)} style={{
              padding: "0.35rem 0.85rem", borderRadius: "999px",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
              cursor: "pointer", transition: "all 0.2s ease",
              border: `1.5px solid ${filter === tag ? "#d97706" : "#e7e5e4"}`,
              background: filter === tag ? "#d97706" : "white",
              color: filter === tag ? "white" : "#78716c",
              minHeight: '36px',
            }}>
              {tag}
            </button>
          ))}
          <span className="ml-auto text-stone-400" style={{ fontSize: "0.73rem" }}>{filtered.length} photos</span>
        </div>
      </div>

      {/* ── GRID — responsive: 2 cols mobile, 3 cols desktop ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gridAutoRows: isMobile ? "140px" : "220px",
          gap: "0.75rem",
        }}>
          {filtered.map((img, idx) => {
            const span = isMobile ? 1 : spans[idx % spans.length];
            const hovered = hoveredIdx === idx;
            return (
              <div key={idx} onClick={() => open(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  gridRow: `span ${span}`, position: "relative",
                  overflow: "hidden", borderRadius: "10px", cursor: "pointer",
                  boxShadow: hovered ? "0 20px 48px rgba(120,80,20,0.2)" : "0 2px 12px rgba(0,0,0,0.08)",
                  transform: hovered ? "translateY(-3px)" : "translateY(0)",
                  transition: "box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}>
                <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,16,4,0.75) 0%, transparent 55%)", opacity: hovered ? 1 : 0.4, transition: "opacity 0.35s ease" }} />
                <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", width: "1.75rem", height: "1.75rem", background: "rgba(255,255,255,0.88)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.7)", transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)" }}>
                  <ZoomIn style={{ width: "0.75rem", height: "0.75rem", color: "#1c1917" }} />
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.6rem 0.75rem", transform: hovered ? "translateY(0)" : "translateY(4px)", opacity: hovered ? 1 : 0, transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "white", fontFamily: "serif", lineHeight: 1.2 }}>{img.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {selected !== null && (
        <div onClick={e => e.target === e.currentTarget && close()}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(14,10,4,0.92)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
          <div style={{ position: "relative", transform: visible ? "scale(1)" : "scale(0.94)", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", maxWidth: '90vw' }}>
            <img src={filtered[selected].src} alt={filtered[selected].label} onLoad={() => setImgLoaded(true)}
              style={{ maxHeight: "80vh", maxWidth: "88vw", borderRadius: "10px", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", display: "block", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.3s ease" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #d97706, #fbbf24)", borderRadius: "10px 10px 0 0" }} />
            {imgLoaded && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", background: "linear-gradient(to top, rgba(14,10,4,0.85) 0%, transparent 100%)", borderRadius: "0 0 10px 10px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "white", fontFamily: "serif" }}>{filtered[selected].label}</p>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{selected + 1} / {filtered.length}</span>
              </div>
            )}
          </div>

          <button onClick={prev} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "2.75rem", height: "2.75rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "2.75rem", height: "2.75rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}>
            <ChevronRight size={18} />
          </button>
          <button onClick={close} style={{ position: "absolute", top: "1rem", right: "1rem", width: "2.25rem", height: "2.25rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}>
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;