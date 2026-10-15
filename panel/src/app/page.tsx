import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { navItems } from "@/config/nav";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Panel de contenido"
        description="Elige una sección para empezar."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="group">
              <Card className="hover:bg-accent/40 h-full transition-colors">
                <CardHeader>
                  <Icon className="text-muted-foreground mb-2 size-5" />
                  <CardTitle className="flex items-center justify-between gap-2">
                    {item.title}
                    <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
