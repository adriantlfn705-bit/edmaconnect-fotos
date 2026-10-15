import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export default function CalendarioPage() {
  return (
    <SectionPlaceholder
      href="/calendario"
      upcoming={[
        "Vista semanal y mensual",
        "Estado de cada pieza: idea, en diseño, lista, publicada",
        "Arrastrar y soltar para reprogramar",
      ]}
    />
  );
}
