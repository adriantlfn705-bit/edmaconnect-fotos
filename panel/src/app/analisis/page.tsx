import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export default function AnalisisPage() {
  return (
    <SectionPlaceholder
      href="/analisis"
      upcoming={[
        "Alcance, guardados y compartidos por publicación",
        "Crecimiento de seguidores",
        "Ventas atribuidas a cada publicación",
      ]}
    />
  );
}
