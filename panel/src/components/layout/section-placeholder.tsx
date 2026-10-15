import { Construction } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { getNavItem } from "@/config/nav";

/**
 * Página de marcador de posición común a todas las secciones.
 * Cuando una sección tenga contenido real, su page.tsx deja de usar este componente.
 */
export function SectionPlaceholder({
  href,
  upcoming,
}: {
  href: string;
  upcoming: string[];
}) {
  const item = getNavItem(href);

  return (
    <div className="space-y-6">
      <PageHeader title={item.title} description={item.description} icon={item.icon} />
      <Card className="border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Construction className="text-muted-foreground size-4" />
            <CardTitle>Sección en construcción</CardTitle>
            <Badge variant="secondary">Próximamente</Badge>
          </div>
          <CardDescription>Esto es lo que irá aquí:</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
            {upcoming.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
