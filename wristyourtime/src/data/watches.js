// ============================================================
//  WRIST YOUR TIME — Catálogo de relojes
// ============================================================
//  Para agregar un reloj:
//  1. Copia un bloque, cambia el "id" al siguiente número
//  2. Rellena los datos
//  3. Para la foto: sube la imagen a imgbb.com (gratis),
//     copia el link directo y pégalo en "image"
//     Si no tienes foto aún deja image: null
//
//  Categorías: "Dive" | "Dress" | "Sport" | "Chrono"
//  Tags:       "Nuevo" | "Bestseller" | "Oferta" | "Icónico" | null
// ============================================================

export const watches = [
  {
    id: 1,
    name: "Pro Diver Automatic",
    brand: "Invicta",
    price: 58000,
    category: "Dive",
    dial: "Negro",
    movement: "Automático NH35A",
    power_reserve: "42h",
    water: "200m",
    case: "40mm",
    crystal: "Mineral",
    strap: "Acero chapado en oro",
    description: "Ícono del buceo asequible. Movimiento automático japonés NH35A, bisel unidireccional negro y fondo de exhibición que muestra el rotor. Caja y bracelet chapados en oro.",
    image: null, // 👈 Agrega tu foto: "https://i.ibb.co/tu-imagen.jpg"
    emoji: "🟡",
    tag: "Bestseller",
    available: true,
  },
  {
    id: 2,
    name: "Pro Diver Automatic",
    brand: "Invicta",
    price: 58000,
    category: "Dive",
    dial: "Negro",
    movement: "Automático NH35A",
    power_reserve: "42h",
    water: "200m",
    case: "40mm",
    crystal: "Mineral",
    strap: "Acero inoxidable",
    description: "El reloj de buceo más vendido del mundo. Movimiento automático japonés NH35A, bisel unidireccional negro, fondo de exhibición. Acabado en acero inoxidable cepillado.",
    image: null,
    emoji: "⚫",
    tag: null,
    available: true,
  },
  {
    id: 3,
    name: "Tsuyosa Automatic",
    brand: "Citizen",
    price: 155000,
    category: "Dress",
    dial: "Azul",
    movement: "Automático Miyota 8210",
    power_reserve: "42h",
    water: "100m",
    case: "40mm",
    crystal: "Mineral",
    strap: "Acero inoxidable",
    description: "Tsuyosa significa 'fuerza' en japonés. Dial azul brillante con índices aplicados, movimiento automático japonés Miyota. Elegancia y durabilidad en un solo reloj.",
    image: null,
    emoji: "🔵",
    tag: "Nuevo",
    available: true,
  },
  {
    id: 4,
    name: "Tsuyosa Automatic",
    brand: "Citizen",
    price: 155000,
    category: "Dress",
    dial: "Turquesa",
    movement: "Automático Miyota 8210",
    power_reserve: "42h",
    water: "100m",
    case: "40mm",
    crystal: "Mineral",
    strap: "Acero inoxidable",
    description: "Tsuyosa en su versión más llamativa. Dial turquesa brillante con textura sunray, movimiento automático japonés Miyota. El accesorio perfecto para destacar.",
    image: null,
    emoji: "🩵",
    tag: "Nuevo",
    available: true,
  },
];

// ============================================================
//  CONFIGURACIÓN DE LA TIENDA
// ============================================================
export const storeConfig = {
  name: "WRIST YOUR TIME",
  tagline: "Relojería · Costa Rica",
  whatsapp: "50687565911",
  whatsappGreeting: "Hola! Me interesa este reloj:",
  instagram: "@wristyourtime",
  email: "info@wristyourtime.com",
  currency: "₡",
};
