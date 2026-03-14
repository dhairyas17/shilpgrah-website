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

/* Masonry-style spans: give some cards extra height for visual interest */
const spans = [2, 1, 1, 1, 2, 1, 1, 1, 2];

const GalleryPage: React.FC = () => {
  const [selected, setSelected]   = useState<number | null>(null);
  const [visible, setVisible]     = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [filter, setFilter]       = useState("All");

  const tags = ["All", ...Array.from(new Set(images.map(i => i.tag)))];
  const filtered = filter === "All" ? images : images.filter(i => i.tag === filter);

  /* Open lightbox */
  const open = (idx: number) => {
    setSelected(idx);
    setImgLoaded(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    document.body.style.overflow = "hidden";
  };

  /* Close lightbox */
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

  /* Keyboard navigation */
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
    <div className="min-h-screen bg-stone-50 mt-[0px]">

      {/* ── BANNER ── */}
      <div
        className="relative text-center overflow-hidden"
        style={{ paddingTop: "8rem", paddingBottom: "3.5rem", background: "white", borderBottom: "1px solid #f5f0e8" }}
      >
        {/* Warm gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, #fffbf5 0%, #fff8ef 50%, #fdfaf5 100%)" }} />
        {/* Top amber line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 70%, transparent 100%)" }} />

        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-amber-700 font-semibold tracking-widest uppercase mb-2" style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}>
            Visual Stories
          </p>
          <h1 className="font-serif text-stone-900 mb-3" style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", fontWeight: 700, lineHeight: 1.1 }}>
            Our Gallery
          </h1>
          <div className="mx-auto mb-3" style={{ width: "3.5rem", height: "3px", background: "linear-gradient(90deg, #d97706, #fbbf24)", borderRadius: "2px" }} />
          <p className="text-stone-500 max-w-[800px] leading-relaxed" style={{ fontSize: "0.92rem" }}>
          See how our Rajasthani handicrafts are made, from the workshop floor to the finished piece.
          </p>
        </div>
      </div>

      {/* ── FILTER TABS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: `1.5px solid ${filter === tag ? "#d97706" : "#e7e5e4"}`,
                background: filter === tag ? "#d97706" : "white",
                color: filter === tag ? "white" : "#78716c",
                boxShadow: filter === tag ? "0 3px 12px rgba(217,119,6,0.25)" : "none",
              }}
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto text-stone-400" style={{ fontSize: "0.75rem" }}>
            {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
          </span>
        </div>
      </div>

      {/* ── MASONRY GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "220px",
            gap: "1rem",
          }}
        >
          {filtered.map((img, idx) => {
            const span = spans[idx % spans.length];
            const hovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => open(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  gridRow: `span ${span}`,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "12px",
                  cursor: "pointer",
                  boxShadow: hovered
                    ? "0 20px 48px rgba(120,80,20,0.2)"
                    : "0 2px 12px rgba(0,0,0,0.08)",
                  transform: hovered ? "translateY(-3px)" : "translateY(0)",
                  transition: "box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    transform: hovered ? "scale(1.06)" : "scale(1)",
                    transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />

                {/* Gradient veil */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(28,16,4,0.75) 0%, transparent 55%)",
                  opacity: hovered ? 1 : 0.4,
                  transition: "opacity 0.35s ease",
                }} />

                {/* Amber top strip on hover */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                  background: "linear-gradient(90deg, #d97706, #fbbf24)",
                  transform: hovered ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                }} />

                {/* Zoom icon */}
                <div style={{
                  position: "absolute", top: "0.75rem", right: "0.75rem",
                  width: "2rem", height: "2rem",
                  background: "rgba(255,255,255,0.88)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "scale(1)" : "scale(0.7)",
                  transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                }}>
                  <ZoomIn style={{ width: "0.85rem", height: "0.85rem", color: "#1c1917" }} />
                </div>

                {/* Bottom label */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "0.85rem 1rem",
                  transform: hovered ? "translateY(0)" : "translateY(6px)",
                  opacity: hovered ? 1 : 0,
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}>
                  <span style={{
                    display: "inline-block", marginBottom: "0.2rem",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "#fbbf24",
                    background: "rgba(0,0,0,0.25)", padding: "0.15rem 0.5rem", borderRadius: "3px",
                  }}>
                    {img.tag}
                  </span>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "white", fontFamily: "serif", lineHeight: 1.2 }}>
                    {img.label}
                  </p>
                </div>

                {/* Index number */}
                <div style={{
                  position: "absolute", bottom: "0.75rem", right: "0.85rem",
                  fontSize: "0.6rem", color: "rgba(255,255,255,0.45)",
                  fontWeight: 600, opacity: hovered ? 0 : 1, transition: "opacity 0.2s",
                }}>
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {selected !== null && (
        <div
          onClick={(e) => e.target === e.currentTarget && close()}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(14,10,4,0.92)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Main image */}
          <div style={{
            position: "relative",
            transform: visible ? "scale(1)" : "scale(0.94)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <img
              src={filtered[selected].src}
              alt={filtered[selected].label}
              onLoad={() => setImgLoaded(true)}
              style={{
                maxHeight: "82vh", maxWidth: "80vw",
                borderRadius: "12px",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                display: "block",
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />

            {/* Amber top line on image */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, #d97706, #fbbf24)", borderRadius: "12px 12px 0 0" }} />

            {/* Caption bar */}
            {imgLoaded && (
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "1.25rem 1.25rem 1rem",
                background: "linear-gradient(to top, rgba(14,10,4,0.85) 0%, transparent 100%)",
                borderRadius: "0 0 12px 12px",
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              }}>
                <div>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fbbf24" }}>
                    {filtered[selected].tag}
                  </span>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "white", fontFamily: "serif", marginTop: "0.15rem" }}>
                    {filtered[selected].label}
                  </p>
                </div>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                  {selected + 1} / {filtered.length}
                </span>
              </div>
            )}
          </div>

          {/* Prev */}
          <button
            onClick={prev}
            style={{
              position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)",
              width: "3rem", height: "3rem",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(217,119,6,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next */}
          <button
            onClick={next}
            style={{
              position: "absolute", right: "1.5rem", top: "50%", transform: "translateY(-50%)",
              width: "3rem", height: "3rem",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(217,119,6,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Close */}
          <button
            onClick={close}
            style={{
              position: "absolute", top: "1.25rem", right: "1.25rem",
              width: "2.5rem", height: "2.5rem",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", cursor: "pointer", transition: "background 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
          >
            <X size={16} />
          </button>

          {/* Thumbnail strip */}
          <div style={{
            position: "absolute", bottom: "1.25rem", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "0.5rem", alignItems: "center",
          }}>
            {filtered.map((img, i) => (
              <button
                key={i}
                onClick={() => { setImgLoaded(false); setSelected(i); }}
                style={{
                  width: i === selected ? "3.5rem" : "2.5rem",
                  height: i === selected ? "3.5rem" : "2.5rem",
                  borderRadius: "6px", overflow: "hidden", flexShrink: 0,
                  border: `2px solid ${i === selected ? "#d97706" : "transparent"}`,
                  opacity: i === selected ? 1 : 0.45,
                  padding: 0, cursor: "pointer", background: "none",
                  transition: "all 0.25s ease",
                  boxShadow: i === selected ? "0 0 0 2px rgba(217,119,6,0.4)" : "none",
                }}
              >
                <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;