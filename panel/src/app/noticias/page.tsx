import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export default function NoticiasPage() {
  return (
    <SectionPlaceholder
      href="/noticias"
      upcoming={[
        "Fuentes RSS y sitios del sector",
        "Lanzamientos de nuevos teléfonos y accesorios",
        "Resumen diario de titulares",
      ]}
    />
  );
}
