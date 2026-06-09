import { useState } from "react";
import { storeConfig } from "../data/watches";

const TAG_COLORS = {
  Nuevo: "#22c55e",
  Bestseller: "#c9a84c",
  Icónico: "#8b5cf6",
  Legendario: "#ef4444",
  Oferta: "#06b6d4",
};

export default function WatchModal({ watch, onClose, isFav, onToggleFav, onAddToCart }) {
  const [added, setAdded] = useState(false);

  if (!watch) return null;

  const whatsappMsg = encodeURIComponent(
    `${storeConfig.whatsappGreeting} *${watch.brand} ${watch.name}* ($${watch.price.toLocaleString()}). ¿Tienen disponibilidad?`
  );
  const whatsappUrl = `https://wa.me/${storeConfig.whatsapp}?text=${whatsappMsg}`;

  const handleAddToCart = () => {
    onAddToCart(watch);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 900);
  };

  const specs = [
    ["Movimiento", watch.movement],
    ["Reserva de marcha", watch.power_reserve],
    ["Resistencia al agua", watch.water],
    ["Tamaño de caja", watch.case],
    ["Cristal", watch.crystal],
    ["Correa / brazalete", watch.strap],
    ["Color de dial", watch.dial],
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: 3,
          maxWidth: 520, width: "100%",
          maxHeight: "92vh", overflowY: "auto",
          position: "relative",
          animation: "fadeUp 0.3s ease",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16, zIndex: 10,
            background: "#1a1a1a", border: "1px solid #2a2a2a",
            borderRadius: "50%", width: 32, height: 32,
            color: "#888", cursor: "pointer", fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          ✕
        </button>

        {/* Image */}
        <div style={{
          height: 260, background: "linear-gradient(145deg, #141414, #0d0d0d)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", borderBottom: "1px solid #1a1a1a",
          borderRadius: "3px 3px 0 0",
        }}>
          {watch.image ? (
            <img src={watch.image} alt={watch.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: 100 }}>{watch.emoji}</span>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 32px" }}>

          {/* Tag + Fav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            {watch.tag ? (
              <span style={{
                background: TAG_COLORS[watch.tag], color: "#000",
                padding: "3px 12px", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.12em", borderRadius: 1,
                fontFamily: "var(--font-ui)",
              }}>
                {watch.tag}
              </span>
            ) : <span />}
            <button
              onClick={() => onToggleFav(watch.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 22, color: isFav ? "#ef4444" : "#333",
                transition: "transform 0.2s",
              }}
            >
              {isFav ? "♥" : "♡"}
            </button>
          </div>

          {/* Brand + Name */}
          <p style={{
            fontSize: 10, color: "var(--gold)", letterSpacing: "0.2em",
            margin: "0 0 6px", fontFamily: "var(--font-ui)", fontWeight: 600,
          }}>
            {watch.brand.toUpperCase()}
          </p>
          <h2 style={{
            fontSize: 28, fontWeight: 400, margin: "0 0 16px",
            lineHeight: 1.2, fontFamily: "var(--font-display)",
          }}>
            {watch.name}
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 15, color: "#aaa", lineHeight: 1.8,
            margin: "0 0 24px", fontFamily: "var(--font-display)",
            fontStyle: "italic",
          }}>
            {watch.description}
          </p>

          {/* Specs */}
          <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: 20, marginBottom: 28 }}>
            <p style={{
              fontSize: 9, letterSpacing: "0.2em", color: "var(--text-muted)",
              fontFamily: "var(--font-ui)", marginBottom: 14,
            }}>
              ESPECIFICACIONES
            </p>
            {specs.map(([key, val]) => (
              <div key={key} style={{
                display: "flex", justifyContent: "space-between",
                padding: "9px 0", borderBottom: "1px solid #181818",
                fontSize: 13,
              }}>
                <span style={{ color: "#555", fontFamily: "var(--font-ui)", letterSpacing: "0.04em" }}>
                  {key}
                </span>
                <span style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div style={{ marginBottom: 20 }}>
            <p style={{
              fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em",
              fontFamily: "var(--font-ui)", marginBottom: 4,
            }}>
              PRECIO
            </p>
            <span style={{
              fontSize: 36, color: "var(--gold)", fontWeight: 300,
              fontFamily: "var(--font-display)",
            }}>
              ${watch.price.toLocaleString()}
            </span>
            <p style={{
              fontSize: 11, color: "#444", fontFamily: "var(--font-display)",
              fontStyle: "italic", marginTop: 4,
            }}>
              Aceptamos efectivo y transferencia bancaria
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              style={{
                width: "100%", padding: "13px",
                background: added ? "#25D36622" : "var(--gold-dim)",
                border: `1px solid ${added ? "#25D366" : "var(--gold)"}`,
                color: added ? "#25D366" : "var(--gold)",
                borderRadius: 2, cursor: "pointer",
                fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
                fontFamily: "var(--font-ui)", transition: "all 0.25s",
              }}
            >
              {added ? "✓  Agregado al carrito" : "🛍  Agregar al carrito"}
            </button>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "#25D366", color: "#fff",
                padding: "13px 22px", borderRadius: 2,
                textDecoration: "none", fontSize: 13, fontWeight: 600,
                letterSpacing: "0.06em", fontFamily: "var(--font-ui)",
                boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.25)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
