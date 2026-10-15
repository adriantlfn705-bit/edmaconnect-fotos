import type { Post } from "./types";

/**
 * Datos de ejemplo tomados del plan de la semana 1 (12–18 oct 2026).
 * Solo se cargan la primera vez; después manda lo guardado en el navegador.
 */
export const seedPosts: Post[] = [
  {
    id: "seed-1",
    title: "Reel de presentación",
    caption: "Tu teléfono, tu estilo 🫵 Forros para iPhone en Lechería. Escríbenos por DM 📲",
    type: "reel",
    status: "publicada",
    scheduledAt: "2026-10-12T19:00",
    createdAt: "2026-10-11T10:00:00.000Z",
  },
  {
    id: "seed-2",
    title: "Carrusel de catálogo",
    caption: "Desliza y escoge el tuyo 👉 Modelos del iPhone 11 al 17. ¿Cuál te llevas?",
    type: "carrusel",
    status: "publicada",
    scheduledAt: "2026-10-13T19:00",
    createdAt: "2026-10-11T10:00:00.000Z",
  },
  {
    id: "seed-3",
    title: "Historias: cómo comprar",
    caption: "",
    type: "historia",
    status: "publicada",
    scheduledAt: "2026-10-14T12:00",
    createdAt: "2026-10-11T10:00:00.000Z",
  },
  {
    id: "seed-4",
    title: "Reel unboxing",
    caption: "Así llega tu forro 📦 Empaque, protección y delivery en Lechería, PLC y Barcelona.",
    type: "reel",
    status: "programada",
    scheduledAt: "2026-10-16T19:00",
    createdAt: "2026-10-11T10:00:00.000Z",
  },
  {
    id: "seed-5",
    title: "Carrusel del sábado",
    caption: "Los favoritos de la semana ⭐ ¿Ya tienes el tuyo?",
    type: "carrusel",
    status: "programada",
    scheduledAt: "2026-10-17T19:00",
    createdAt: "2026-10-11T10:00:00.000Z",
  },
  {
    id: "seed-6",
    title: "Post del sorteo",
    caption: "🎁 SORTEO: gana un forro para tu iPhone. 1) Sigue a @edmaconnect 2) Dale like 3) Etiqueta a 2 amigos.",
    type: "foto",
    status: "borrador",
    scheduledAt: "2026-10-18T12:00",
    createdAt: "2026-10-11T10:00:00.000Z",
  },
  {
    id: "seed-7",
    title: "Antes y después: fondo limpio",
    caption: "",
    type: "carrusel",
    status: "idea",
    scheduledAt: null,
    createdAt: "2026-10-15T10:00:00.000Z",
  },
];
