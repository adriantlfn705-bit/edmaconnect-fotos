import {
  BarChart3,
  CalendarDays,
  Camera,
  Newspaper,
  Radar,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

/**
 * Única fuente de verdad de las secciones del panel.
 * La barra lateral, el menú móvil y la portada leen de aquí:
 * para añadir una sección, se añade aquí y se crea src/app/<ruta>/page.tsx.
 */
export const navItems: NavItem[] = [
  {
    title: "Administrador de Instagram",
    href: "/instagram",
    icon: Camera,
    description: "Publicaciones, borradores, comentarios y mensajes de la cuenta.",
  },
  {
    title: "Análisis",
    href: "/analisis",
    icon: BarChart3,
    description: "Alcance, interacción, seguidores y ventas atribuidas al contenido.",
  },
  {
    title: "Calendario de contenido",
    href: "/calendario",
    icon: CalendarDays,
    description: "Planificación semanal y mensual de reels, carruseles e historias.",
  },
  {
    title: "Seguimiento de la competencia",
    href: "/competencia",
    icon: Radar,
    description: "Cuentas competidoras, sus publicaciones, precios y frecuencia.",
  },
  {
    title: "Consolidador de noticias",
    href: "/noticias",
    icon: Newspaper,
    description: "Novedades del sector reunidas en un solo lugar.",
  },
];

export function getNavItem(href: string): NavItem {
  const item = navItems.find((i) => i.href === href);
  if (!item) throw new Error(`Sección no registrada en navItems: ${href}`);
  return item;
}
