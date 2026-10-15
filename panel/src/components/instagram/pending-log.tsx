"use client";

import { AlertTriangle, CalendarClock, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, TypeBadge } from "@/components/instagram/post-badges";
import { formatDate, isOverdue, type Post } from "@/lib/instagram/types";
import { cn } from "@/lib/utils";

/**
 * Registro de lo que falta por publicar (ideas, borradores y programadas),
 * ordenado por fecha: primero lo atrasado, al final lo que aún no tiene fecha.
 */
export function PendingLog({ posts, onEdit }: { posts: Post[]; onEdit: (post: Post) => void }) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b px-5 py-4 [.border-b]:pb-4">
        <CardTitle>Registro de pendientes</CardTitle>
        <CardDescription>
          Todo lo que aún no se ha publicado, en orden de fecha.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {posts.length === 0 ? (
          <p className="text-muted-foreground px-5 py-8 text-center text-sm">
            No hay nada pendiente. 🎉
          </p>
        ) : (
          <ul className="divide-y">
            {posts.map((post) => {
              const overdue = isOverdue(post);
              return (
                <li key={post.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
                  <div
                    className={cn(
                      "flex w-52 shrink-0 items-center gap-1.5 text-sm whitespace-nowrap tabular-nums",
                      overdue ? "text-warning" : "text-muted-foreground"
                    )}
                  >
                    {overdue ? <AlertTriangle className="size-4" /> : <CalendarClock className="size-4" />}
                    {formatDate(post.scheduledAt)}
                  </div>
                  <p className="min-w-0 flex-1 truncate text-sm font-medium">{post.title}</p>
                  <div className="flex items-center gap-2">
                    <TypeBadge type={post.type} />
                    <StatusBadge status={post.status} />
                    <Button size="icon" variant="ghost" aria-label="Editar" onClick={() => onEdit(post)}>
                      <Pencil />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
