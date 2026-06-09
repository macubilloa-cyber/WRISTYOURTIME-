import { useState, useMemo } from "react";
import { watches as allWatches, storeConfig } from "./data/watches";
import WatchCard from "./components/WatchCard";
import WatchModal from "./components/WatchModal";
import CompareDrawer from "./components/CompareDrawer";
import CartDrawer from "./components/CartDrawer";

const BRANDS = ["Todas las marcas", ...new Set(allWatches.map((w) => w.brand))];
const CATEGORIES = ["Todas", ...new Set(allWatches.map((w) => w.category))];
const MAX_PRICE = Math.max(...allWatches.map((w) => w.price));

const WA_SVG = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function App() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("Todas las marcas");
  const [category, setCategory] = useState("Todas");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [compare, setCompare] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    return allWatches.filter((w) => {
      const q = search.toLowerCase();
      const matchSearch = w.name.toLowerCase().includes(q) || w.brand.toLowerCase().includes(q);
      const matchBrand = brand === "Todas las marcas" || w.brand === brand;
      const matchCat = category === "Todas" || w.category === category;
      const matchPrice = w.price <= maxPrice;
      const matchFav = !showOnlyFavs || favorites.includes(w.id);
      return matchSearch && matchBrand && matchCat && matchPrice && matchFav;
    });
  }, [search, brand, category, maxPrice, showOnlyFavs, favorites]);

  const toggleFav = (id) =>
    setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);

  const toggleCompare = (w) => {
    setCompare((c) => {
      if (c.find((x) => x.id === w.id)) return c.filter((x) => x.id !== w.id);
      if (c.length >= 3) return c;
      return [...c, w];
    });
  };

  const addToCart = (watch) => {
    setCart((c) => {
      const existing = c.find((x) => x.watch.id === watch.id);
      if (existing) return c.map((x) => x.watch.id === watch.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { watch, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart((c) => c.filter((x) => x.watch.id !== id));
  const updateQty = (id, qty) => setCart((c) => c.map((x) => x.watch.id === id ? { ...x, qty } : x));
  const clearCart = () => { setCart([]); setCartOpen(false); };

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  const resetFilters = () => {
    setSearch("");
    setBrand("Todas las marcas");
    setCategory("Todas");
    setMaxPrice(MAX_PRICE);
    setShowOnlyFavs(false);
  };

  const hasActiveFilters = search || brand !== "Todas las marcas" || category !== "Todas" || maxPrice < MAX_PRICE || showOnlyFavs;

  const waBaseUrl = `https://wa.me/${storeConfig.whatsapp}?text=${encodeURIComponent("Hola! Me gustaría consultar sobre sus relojes.")}`;
  const igUrl = `https://www.instagram.com/${storeConfig.instagram.replace("@", "")}`;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── HEADER ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 1px 16px rgba(0,0,0,0.06)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 70,
        }}>
          {/* Logo */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--gold)", fontSize: 12 }}>◆</span>
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: 18, fontWeight: 600,
                letterSpacing: "0.22em", color: "var(--text)",
              }}>
                {storeConfig.name}
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic",
              fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: 2,
            }}>
              {storeConfig.tagline}
            </p>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Favorites toggle */}
            <button
              onClick={() => setShowOnlyFavs((v) => !v)}
              style={{
                background: showOnlyFavs ? "#ef444422" : "transparent",
                border: `1px solid ${showOnlyFavs ? "#ef4444" : "var(--border)"}`,
                color: showOnlyFavs ? "#ef4444" : "var(--text-muted)",
                padding: "7px 14px", borderRadius: 2, cursor: "pointer",
                fontSize: 13, transition: "all 0.2s",
              }}
              title="Mis favoritos"
            >
              ♥ {favorites.length}
            </button>

            {/* Compare button */}
            <button
              onClick={() => setShowCompare(true)}
              disabled={compare.length === 0}
              style={{
                background: compare.length > 0 ? "var(--gold)" : "transparent",
                border: `1px solid ${compare.length > 0 ? "var(--gold)" : "var(--border)"}`,
                color: compare.length > 0 ? "#000" : "var(--text-muted)",
                padding: "7px 16px", borderRadius: 2, cursor: compare.length > 0 ? "pointer" : "not-allowed",
                fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
                transition: "all 0.2s", fontFamily: "var(--font-ui)",
              }}
            >
              ⚖ Comparar {compare.length > 0 ? `(${compare.length})` : ""}
            </button>

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: cartCount > 0 ? "var(--gold)" : "transparent",
                border: `1px solid ${cartCount > 0 ? "var(--gold)" : "var(--border)"}`,
                color: cartCount > 0 ? "#000" : "#555",
                padding: "7px 16px", borderRadius: 2, cursor: "pointer",
                fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
                transition: "all 0.2s", fontFamily: "var(--font-ui)",
                display: "flex", alignItems: "center", gap: 6,
              }}
              title="Ver carrito"
            >
              🛍 {cartCount > 0 ? cartCount : ""}
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <div style={{
        background: "linear-gradient(180deg, #ebe5d9 0%, var(--bg) 100%)",
        borderBottom: "1px solid var(--border)",
        padding: "48px 32px 40px",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.3em",
          color: "var(--gold)", marginBottom: 12,
        }}>
          CATÁLOGO EXCLUSIVO
        </p>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 300, letterSpacing: "0.06em", margin: "0 0 12px",
          lineHeight: 1.1,
        }}>
          Relojes de Colección
        </h1>
        <p style={{
          fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: 16, color: "var(--text-muted)", letterSpacing: "0.05em",
        }}>
          Suizo. Preciso. Eterno.
        </p>
      </div>

      {/* ── FILTERS ── */}
      <div style={{
        position: "sticky", top: 70, zIndex: 99,
        background: "rgba(244,240,232,0.97)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        padding: "14px 32px",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center",
        }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <span style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              color: "var(--text-muted)", fontSize: 16, pointerEvents: "none",
            }}>
              ⌕
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar reloj o marca..."
              style={{
                width: "100%", background: "var(--bg-card)",
                border: "1px solid var(--border)", borderRadius: 2,
                padding: "9px 12px 9px 34px", color: "var(--text)",
                fontSize: 13, boxSizing: "border-box",
              }}
            />
          </div>

          {/* Brand */}
          <select
            value={brand} onChange={(e) => setBrand(e.target.value)}
            style={{
              background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 2,
              padding: "9px 14px", color: "var(--text)", fontSize: 13, cursor: "pointer",
            }}
          >
            {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>

          {/* Category */}
          <select
            value={category} onChange={(e) => setCategory(e.target.value)}
            style={{
              background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 2,
              padding: "9px 14px", color: "var(--text)", fontSize: 13, cursor: "pointer",
            }}
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Price range */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 170 }}>
            <span style={{ fontSize: 10, color: "var(--gold)", fontFamily: "var(--font-ui)", letterSpacing: "0.1em" }}>
              HASTA ${maxPrice.toLocaleString()}
            </span>
            <input
              type="range" min={500} max={MAX_PRICE} step={100}
              value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ accentColor: "var(--gold)", cursor: "pointer" }}
            />
          </div>

          {/* Reset + count */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                style={{
                  background: "transparent", border: "1px solid var(--border)",
                  color: "var(--text-dim)", padding: "6px 12px", borderRadius: 2,
                  cursor: "pointer", fontSize: 11, fontFamily: "var(--font-ui)",
                }}
              >
                ✕ Limpiar
              </button>
            )}
            <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-ui)", letterSpacing: "0.08em" }}>
              {filtered.length} {filtered.length === 1 ? "reloj" : "relojes"}
            </span>
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>⌚</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontStyle: "italic" }}>
              No hay relojes con esos filtros
            </p>
            <button onClick={resetFilters} style={{
              marginTop: 20, background: "transparent", border: "1px solid var(--border)",
              color: "var(--gold)", padding: "10px 24px", borderRadius: 2,
              cursor: "pointer", fontSize: 12, fontFamily: "var(--font-ui)", letterSpacing: "0.1em",
            }}>
              Ver todos
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {filtered.map((w, i) => (
              <div key={w.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <WatchCard
                  watch={w}
                  onSelect={setSelected}
                  onToggleFav={toggleFav}
                  isFav={favorites.includes(w.id)}
                  onToggleCompare={toggleCompare}
                  inCompare={!!compare.find((x) => x.id === w.id)}
                  onAddToCart={addToCart}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "36px 32px",
        textAlign: "center",
        background: "var(--bg-card)",
      }}>
        {/* Social links */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 20 }}>
          {/* WhatsApp */}
          <a
            href={waBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              color: "#25D366", textDecoration: "none",
              fontSize: 13, fontFamily: "var(--font-ui)", letterSpacing: "0.06em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {storeConfig.whatsapp.replace("506", "+506 ")}
          </a>

          <span style={{ color: "var(--border)" }}>|</span>

          {/* Instagram */}
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              color: "#c9a84c", textDecoration: "none",
              fontSize: 13, fontFamily: "var(--font-ui)", letterSpacing: "0.06em",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            {storeConfig.instagram}
          </a>
        </div>

        <div style={{ borderTop: "1px solid #141414", paddingTop: 16 }}>
          <p style={{
            fontFamily: "var(--font-ui)", fontSize: 9,
            letterSpacing: "0.25em", color: "var(--text-muted)",
          }}>
            ◆ {storeConfig.name} · {storeConfig.tagline} · {new Date().getFullYear()} ◆
          </p>
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: 11, color: "var(--text-muted)", marginTop: 6, letterSpacing: "0.04em",
          }}>
            Aceptamos efectivo y transferencia bancaria
          </p>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {selected && (
        <WatchModal
          watch={selected}
          onClose={() => setSelected(null)}
          isFav={favorites.includes(selected.id)}
          onToggleFav={toggleFav}
          onAddToCart={addToCart}
        />
      )}

      {/* ── COMPARE DRAWER ── */}
      {showCompare && (
        <CompareDrawer
          watches={compare}
          onRemove={(id) => setCompare((c) => c.filter((x) => x.id !== id))}
          onClear={() => { setCompare([]); setShowCompare(false); }}
        />
      )}

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onClose={() => setCartOpen(false)}
          onClear={clearCart}
        />
      )}

      {/* ── COMPARE FAB ── */}
      {compare.length > 0 && !showCompare && (
        <button
          onClick={() => setShowCompare(true)}
          style={{
            position: "fixed", bottom: 28, right: 28, zIndex: 300,
            background: "var(--gold)", color: "#000",
            border: "none", borderRadius: 2,
            padding: "14px 20px", cursor: "pointer",
            fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
            fontFamily: "var(--font-ui)",
            boxShadow: "0 8px 32px rgba(201,168,76,0.4)",
            animation: "fadeUp 0.3s ease",
          }}
        >
          ⚖ Comparar ({compare.length})
        </button>
      )}

      {/* ── FLOATING WHATSAPP ── */}
      <a
        href={waBaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Contáctanos por WhatsApp"
        style={{
          position: "fixed", bottom: 28, left: 28, zIndex: 300,
          width: 56, height: 56, borderRadius: "50%",
          background: "#25D366", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(37,211,102,0.45)",
          animation: "fadeUp 0.3s ease",
          transition: "transform 0.25s, box-shadow 0.25s",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,211,102,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.45)";
        }}
      >
        {WA_SVG}
      </a>
    </div>
  );
}
