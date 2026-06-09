import { useState } from "react";
import { storeConfig } from "../data/watches";

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function CartDrawer({ cart, onRemove, onUpdateQty, onClose, onClear }) {
  const [payment, setPayment] = useState("efectivo");

  const total = cart.reduce((sum, { watch, qty }) => sum + watch.price * qty, 0);

  const whatsappUrl = (() => {
    const lines = cart.map(
      ({ watch, qty }) =>
        `• ${watch.brand} ${watch.name} x${qty} — ₡${(watch.price * qty).toLocaleString()}`
    );
    const method = payment === "efectivo" ? "Efectivo" : "Transferencia bancaria";
    const msg = [
      "Hola! Me gustaría hacer el siguiente pedido:",
      "",
      ...lines,
      "",
      `*Total: ₡${total.toLocaleString()}*`,
      `Método de pago: ${method}`,
      "",
      "¿Cómo coordinamos?",
    ].join("\n");
    return `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
  })();

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 600,
        background: "rgba(30,25,20,0.5)",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "min(440px, 100vw)",
          background: "var(--bg-card)",
          borderLeft: "1px solid var(--border)",
          display: "flex", flexDirection: "column",
          animation: "slideInRight 0.32s cubic-bezier(.22,.68,0,1.2)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.12)",
        }}
      >
        {/* ── Header */}
        <div style={{
          padding: "24px 28px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <p style={{
              fontSize: 9, color: "var(--gold)", letterSpacing: "0.28em",
              fontFamily: "var(--font-ui)", marginBottom: 4,
            }}>
              CARRITO
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 400,
              fontSize: 22, color: "var(--text)",
            }}>
              Mi selección
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "var(--bg)", border: "1px solid var(--border)",
              borderRadius: "50%", width: 36, height: 36,
              color: "var(--text-muted)", cursor: "pointer", fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            ✕
          </button>
        </div>

        {/* ── Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>🛍</div>
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic",
                fontSize: 17, color: "var(--text-muted)",
              }}>
                Tu carrito está vacío
              </p>
            </div>
          ) : (
            cart.map(({ watch, qty }) => (
              <div key={watch.id} style={{
                display: "flex", gap: 14, padding: "16px 0",
                borderBottom: "1px solid var(--border-light)", alignItems: "flex-start",
              }}>
                {/* Thumbnail */}
                <div style={{
                  width: 64, height: 64, flexShrink: 0,
                  background: "linear-gradient(145deg, #ede8e0, #e4ddd2)",
                  border: "1px solid var(--border)", borderRadius: 2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                }}>
                  {watch.image
                    ? <img src={watch.image} alt={watch.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: 28 }}>{watch.emoji}</span>
                  }
                </div>

                {/* Info + controls */}
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: 9, color: "var(--gold)", letterSpacing: "0.15em",
                    fontFamily: "var(--font-ui)", marginBottom: 3,
                  }}>
                    {watch.brand.toUpperCase()}
                  </p>
                  <p style={{
                    fontSize: 14, color: "var(--text)",
                    fontFamily: "var(--font-display)", marginBottom: 10, lineHeight: 1.3,
                  }}>
                    {watch.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Qty */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button
                        onClick={() => qty > 1 ? onUpdateQty(watch.id, qty - 1) : onRemove(watch.id)}
                        style={qtyBtnStyle}
                      >−</button>
                      <span style={{
                        fontSize: 13, color: "var(--text)", fontFamily: "var(--font-ui)",
                        minWidth: 18, textAlign: "center",
                      }}>
                        {qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(watch.id, qty + 1)}
                        style={qtyBtnStyle}
                      >+</button>
                    </div>
                    <span style={{
                      fontSize: 16, color: "var(--gold)",
                      fontFamily: "var(--font-display)", fontWeight: 300,
                    }}>
                      ₡{(watch.price * qty).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => onRemove(watch.id)}
                  style={{
                    background: "none", border: "none", color: "var(--border)",
                    cursor: "pointer", fontSize: 15, padding: "2px 4px",
                    transition: "color 0.2s", flexShrink: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--border)")}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* ── Checkout footer */}
        {cart.length > 0 && (
          <div style={{ padding: "20px 28px 32px", borderTop: "1px solid var(--border)" }}>
            {/* Total */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "baseline", marginBottom: 22,
            }}>
              <span style={{
                fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.18em",
                fontFamily: "var(--font-ui)",
              }}>TOTAL</span>
              <span style={{
                fontSize: 30, color: "var(--gold)",
                fontFamily: "var(--font-display)", fontWeight: 300,
              }}>
                ₡{total.toLocaleString()}
              </span>
            </div>

            {/* Payment method */}
            <div style={{ marginBottom: 18 }}>
              <p style={{
                fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.18em",
                fontFamily: "var(--font-ui)", marginBottom: 10,
              }}>
                MÉTODO DE PAGO
              </p>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {[
                  { key: "efectivo", label: "💵  Efectivo" },
                  { key: "transferencia", label: "🏦  Transferencia" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setPayment(key)}
                    style={{
                      flex: 1, padding: "10px 12px",
                      background: payment === key ? "var(--gold-dim)" : "transparent",
                      border: `1px solid ${payment === key ? "var(--gold)" : "var(--border)"}`,
                      color: payment === key ? "var(--gold)" : "var(--text-muted)",
                      borderRadius: 2, cursor: "pointer",
                      fontSize: 12, fontFamily: "var(--font-ui)",
                      transition: "all 0.2s",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p style={{
                fontSize: 11, color: "var(--text-dim)", fontFamily: "var(--font-display)",
                fontStyle: "italic", lineHeight: 1.55,
              }}>
                {payment === "efectivo"
                  ? "Coordinamos punto de entrega. El pago se realiza en persona."
                  : "Te enviamos los datos bancarios por WhatsApp para completar la transferencia."}
              </p>
            </div>

            {/* WhatsApp checkout */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: "#25D366", color: "#fff",
                padding: "14px", borderRadius: 2,
                textDecoration: "none", fontSize: 13, fontWeight: 700,
                letterSpacing: "0.08em", fontFamily: "var(--font-ui)",
                boxShadow: "0 4px 24px rgba(37,211,102,0.3)",
                marginBottom: 10, transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,211,102,0.3)";
              }}
            >
              {WA_ICON}
              Finalizar pedido por WhatsApp
            </a>

            <button
              onClick={onClear}
              style={{
                width: "100%", background: "transparent", border: "none",
                color: "var(--text-muted)", cursor: "pointer", fontSize: 11,
                fontFamily: "var(--font-ui)", letterSpacing: "0.08em",
                padding: "6px", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const qtyBtnStyle = {
  width: 26, height: 26, background: "var(--bg)",
  border: "1px solid var(--border)", borderRadius: 1,
  color: "var(--text-muted)", cursor: "pointer", fontSize: 15,
  display: "flex", alignItems: "center", justifyContent: "center",
};
