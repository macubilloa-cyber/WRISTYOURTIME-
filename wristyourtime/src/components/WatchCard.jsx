import { useState } from "react";

const TAG_COLORS = {
  Nuevo: "#22c55e",
  Bestseller: "#c9a84c",
  Icónico: "#8b5cf6",
  Legendario: "#ef4444",
  Oferta: "#06b6d4",
};

export default function WatchCard({ watch, onSelect, onToggleFav, isFav, onToggleCompare, inCompare, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(watch);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      onClick={() => onSelect(watch)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hovered ? "#2a2a2a" : "var(--border)"}`,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease, border-color 0.2s",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 64px rgba(201,168,76,0.15)" : "0 4px 20px rgba(0,0,0,0.5)",
        animation: "fadeUp 0.4s ease both",
      }}
    >
      {/* Tag */}
      {watch.tag && (
        <div style={{
          position: "absolute", top: 12, left: 12, zIndex: 2,
          background: TAG_COLORS[watch.tag], color: "#000",
          padding: "3px 10px", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.12em", borderRadius: 1,
          fontFamily: "var(--font-ui)",
        }}>
          {watch.tag}
        </div>
      )}

      {/* Fav button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFav(watch.id); }}
        style={{
          position: "absolute", top: 10, right: 12, zIndex: 2,
          background: "none", border: "none", cursor: "pointer",
          fontSize: 20, color: isFav ? "#ef4444" : "#333",
          transition: "color 0.2s, transform 0.2s",
          transform: isFav ? "scale(1.2)" : "scale(1)",
        }}
        title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isFav ? "♥" : "♡"}
      </button>

      {/* Image / Emoji */}
      <div style={{
        height: 200,
        background: "linear-gradient(145deg, #141414, #0d0d0d)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", borderBottom: "1px solid var(--border)",
        position: "relative",
      }}>
        {watch.image ? (
          <img
            src={watch.image}
            alt={`${watch.brand} ${watch.name}`}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          <span style={{
            fontSize: 80, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.08) rotate(-5deg)" : "scale(1) rotate(0deg)",
            display: "block",
          }}>
            {watch.emoji}
          </span>
        )}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
          background: "linear-gradient(to top, #111, transparent)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px" }}>
        <p style={{
          fontSize: 10, color: "var(--gold)", letterSpacing: "0.2em",
          margin: "0 0 5px", fontFamily: "var(--font-ui)", fontWeight: 600,
        }}>
          {watch.brand.toUpperCase()}
        </p>
        <h3 style={{
          fontSize: 18, fontWeight: 400, margin: "0 0 14px",
          lineHeight: 1.25, fontFamily: "var(--font-display)",
          color: "var(--text)",
        }}>
          {watch.name}
        </h3>

        {/* Specs pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
          {[watch.category, watch.case, watch.water].map((spec) => (
            <span key={spec} style={{
              fontSize: 9, padding: "3px 8px",
              border: "1px solid #252525", borderRadius: 1,
              color: "var(--text-dim)", letterSpacing: "0.08em",
              fontFamily: "var(--font-ui)",
            }}>
              {spec}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 22, color: "var(--gold)", fontWeight: 300,
            fontFamily: "var(--font-display)", letterSpacing: "0.03em", flexShrink: 0,
          }}>
            ${watch.price.toLocaleString()}
          </span>

          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              style={{
                background: added ? "#25D36622" : "var(--gold-dim)",
                border: `1px solid ${added ? "#25D366" : "var(--gold)"}`,
                color: added ? "#25D366" : "var(--gold)",
                padding: "6px 12px", borderRadius: 2, cursor: "pointer",
                fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
                fontFamily: "var(--font-ui)", transition: "all 0.25s",
                whiteSpace: "nowrap",
              }}
            >
              {added ? "✓ Agregado" : "+ Carrito"}
            </button>

            {/* Compare */}
            <button
              onClick={(e) => { e.stopPropagation(); onToggleCompare(watch); }}
              title={inCompare ? "Quitar del comparador" : "Agregar al comparador"}
              style={{
                background: inCompare ? "var(--gold-dim)" : "transparent",
                border: `1px solid ${inCompare ? "var(--gold)" : "#2a2a2a"}`,
                borderRadius: 2, padding: "6px 10px", cursor: "pointer",
                color: inCompare ? "var(--gold)" : "#444",
                fontSize: 13, transition: "all 0.2s", flexShrink: 0,
              }}
            >
              ⚖
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
