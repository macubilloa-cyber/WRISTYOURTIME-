import { storeConfig } from "../data/watches";

export default function CompareDrawer({ watches, onRemove, onClear }) {
  if (watches.length === 0) return null;

  const specKeys = [
    ["Precio", (w) => `₡${w.price.toLocaleString()}`],
    ["Categoría", (w) => w.category],
    ["Movimiento", (w) => w.movement],
    ["Reserva", (w) => w.power_reserve],
    ["Caja", (w) => w.case],
    ["Cristal", (w) => w.crystal],
    ["Agua", (w) => w.water],
    ["Correa", (w) => w.strap],
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 400,
      background: "rgba(30,25,20,0.55)", backdropFilter: "blur(10px)",
      overflowY: "auto", padding: "40px 24px",
      animation: "fadeIn 0.2s ease",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400,
              letterSpacing: "0.05em", color: "var(--text)",
            }}>
              Comparador
            </h2>
            <p style={{ fontSize: 12, color: "var(--text-dim)", fontFamily: "var(--font-ui)", marginTop: 4 }}>
              {watches.length}/3 relojes seleccionados
            </p>
          </div>
          <button
            onClick={onClear}
            style={{
              background: "transparent", border: "1px solid var(--border)",
              color: "var(--text-dim)", padding: "8px 20px", borderRadius: 2,
              cursor: "pointer", fontSize: 12, letterSpacing: "0.08em",
              fontFamily: "var(--font-ui)",
            }}
          >
            ✕ Cerrar comparador
          </button>
        </div>

        {/* Cards row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${watches.length}, 1fr)`,
          gap: 16, marginBottom: 0,
        }}>
          {watches.map((w) => (
            <div key={w.id} style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: 2, overflow: "hidden",
            }}>
              {/* Image */}
              <div style={{
                height: 160, background: "linear-gradient(145deg, #ede8e0, #e4ddd2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", borderBottom: "1px solid var(--border)",
              }}>
                {w.image
                  ? <img src={w.image} alt={w.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontSize: 64 }}>{w.emoji}</span>
                }
              </div>

              <div style={{ padding: "16px 16px 0" }}>
                <p style={{
                  fontSize: 9, color: "var(--gold)", letterSpacing: "0.2em",
                  fontFamily: "var(--font-ui)", fontWeight: 600, marginBottom: 4,
                }}>
                  {w.brand.toUpperCase()}
                </p>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400,
                  marginBottom: 12, lineHeight: 1.2, color: "var(--text)",
                }}>
                  {w.name}
                </h3>

                {/* Specs */}
                <div>
                  {specKeys.map(([label, fn]) => (
                    <div key={label} style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "7px 0", borderBottom: "1px solid var(--border-light)",
                      fontSize: 12,
                    }}>
                      <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-ui)" }}>{label}</span>
                      <span style={{
                        color: label === "Precio" ? "var(--gold)" : "var(--text)",
                        fontFamily: "var(--font-display)",
                        fontWeight: label === "Precio" ? 400 : 300,
                      }}>
                        {fn(w)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 8 }}>
                  <a
                    href={`https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(`${storeConfig.whatsappGreeting} *${w.brand} ${w.name}* (₡${w.price.toLocaleString()}). ¿Tienen disponibilidad?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      background: "#25D366", color: "#fff", textDecoration: "none",
                      padding: "9px", borderRadius: 2, fontSize: 11,
                      fontFamily: "var(--font-ui)", fontWeight: 600, letterSpacing: "0.06em",
                    }}
                  >
                    💬 Cotizar
                  </a>
                  <button
                    onClick={() => onRemove(w.id)}
                    style={{
                      background: "transparent", border: "1px solid var(--border)",
                      color: "#ef4444", padding: "7px", borderRadius: 2,
                      cursor: "pointer", fontSize: 11, fontFamily: "var(--font-ui)",
                    }}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
