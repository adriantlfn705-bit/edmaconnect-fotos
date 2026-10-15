import { SectionPlaceholder } from "@/components/layout/section-placeholder";

export default function CompetenciaPage() {
  return (
    <SectionPlaceholder
      href="/competencia"
      upcoming={[
        "Lista de cuentas competidoras",
        "Sus últimas publicaciones y frecuencia",
        "Comparativa de precios de productos similares",
      ]}
    />
  );
}
