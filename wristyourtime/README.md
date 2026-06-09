# ⌚ Wrist Your Time — Catálogo Online

Catálogo interactivo de relojes de colección con WhatsApp integrado.

---

## 🚀 Cómo publicar en Netlify (primera vez)

### 1. Instalar dependencias
```bash
npm install
```

### 2. Correr en local (para ver cambios antes de publicar)
```bash
npm run dev
```
Abre http://localhost:5173

### 3. Publicar en Netlify
Netlify lo hace automático cada vez que haces push a GitHub.
Solo conecta este repo en app.netlify.com → "Add new site" → "Import from GitHub".

---

## ➕ Cómo agregar un reloj nuevo

Abre el archivo: `src/data/watches.js`

Copia este bloque y pégalo dentro del array `watches`:

```js
{
  id: 9,                         // ← Número único. Solo sube 1 del último
  name: "Nombre del modelo",
  brand: "Marca",
  price: 1500,                   // ← Solo números, sin $ ni comas
  category: "Dress",             // ← Dress | Sport | Dive | Chrono | Pilot | Field
  dial: "Azul",
  movement: "Automático ETA 2824",
  power_reserve: "42h",
  water: "100m",
  case: "40mm",
  crystal: "Zafiro",
  strap: "Acero inoxidable",
  description: "Descripción del reloj. Máximo 2-3 oraciones.",
  image: "https://res.cloudinary.com/TU_CUENTA/image/upload/foto.jpg", // ← URL de Cloudinary
  emoji: "🔵",                   // ← Se muestra si no hay imagen
  tag: "Nuevo",                  // ← Nuevo | Bestseller | Icónico | Legendario | Oferta | null
  available: true,
},
```

Guarda el archivo → GitHub → Netlify publica automático en ~1 minuto.

---

## 🖼️ Cómo subir fotos (Cloudinary)

1. Crear cuenta gratis en https://cloudinary.com
2. En el Dashboard → "Media Library" → Upload
3. Sube la foto del reloj
4. Click derecho en la imagen → "Copy URL"
5. Pega esa URL en el campo `image:` del reloj correspondiente

**Tip:** Cloudinary optimiza las imágenes automáticamente. Tus fotos cargarán rápido.

---

## ⚙️ Configuración de la tienda

En `src/data/watches.js`, al final del archivo está `storeConfig`:

```js
export const storeConfig = {
  name: "WRIST YOUR TIME",
  tagline: "Relojería de Colección · Costa Rica",
  whatsapp: "50687565911",         // ← Tu número con código de país
  whatsappGreeting: "Hola! Me interesa este reloj del catálogo:",
  instagram: "@wristyourtime",
  email: "info@wristyourtime.com",
};
```

---

## 📁 Estructura del proyecto

```
wristyourtime/
├── public/
│   └── images/          ← Fotos locales (opcional, Cloudinary es mejor)
├── src/
│   ├── components/
│   │   ├── WatchCard.jsx    ← Tarjeta de cada reloj
│   │   ├── WatchModal.jsx   ← Popup de detalle
│   │   └── CompareDrawer.jsx ← Comparador
│   ├── data/
│   │   └── watches.js   ← ⭐ AQUÍ editas tus relojes
│   ├── App.jsx          ← Página principal
│   ├── main.jsx
│   └── index.css
├── netlify.toml         ← Config de Netlify (no tocar)
├── vite.config.js
└── package.json
```

---

## 🛠️ Tecnologías

- React 18 + Vite
- Deploy: Netlify
- Imágenes: Cloudinary
- Fuentes: Cormorant Garamond + Josefin Sans (Google Fonts)
