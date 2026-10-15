import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export default function InstagramPage() {
  return (
    <SectionPlaceholder
      href="/instagram"
      upcoming={[
        "Vista de la cuadrícula del perfil",
        "Borradores y publicaciones programadas",
        "Bandeja de comentarios y mensajes directos",
      ]}
    />
  );
}
