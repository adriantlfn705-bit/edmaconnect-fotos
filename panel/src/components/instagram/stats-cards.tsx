import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Stat = { label: string; value: number; icon: LucideIcon; hint?: string; tone?: string };


export function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="py-4">
          <CardContent className="flex items-center gap-3 px-4">
            <span className={cn("bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg", s.tone)}>
              <s.icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-2xl leading-none font-semibold tabular-nums">{s.value}</p>
              <p className="text-muted-foreground mt-1 truncate text-xs">{s.label}</p>
              {s.hint && <p className="text-warning truncate text-xs">{s.hint}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
