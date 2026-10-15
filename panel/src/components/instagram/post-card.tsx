"use client";

import { AlertTriangle, CalendarClock, CheckCircle2, FilePen, Pencil, Send, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, TypeBadge } from "@/components/instagram/post-badges";
import { formatDate, isOverdue, type Post, type PostStatus } from "@/lib/instagram/types";
import { cn } from "@/lib/utils";

/** Siguiente paso del flujo para cada estado. */
const NEXT_STEP: Partial<Record<PostStatus, { to: PostStatus; label: string; icon: typeof Send }>> = {
  idea: { to: "borrador", label: "Pasar a borrador", icon: FilePen },
  borrador: { to: "programada", label: "Programar", icon: CalendarClock },
  programada: { to: "publicada", label: "Marcar publicada", icon: Send },
};

export function PostCard({
  post,
  onEdit,
  onAdvance,
  onDelete,
}: {
  post: Post;
  onEdit: (post: Post) => void;
  /** Avanza al siguiente estado. Programar sin fecha abre el editor en su lugar. */
  onAdvance: (post: Post, to: PostStatus) => void;
  onDelete: (post: Post) => void;
}) {
  const next = NEXT_STEP[post.status];
  const overdue = isOverdue(post);

  return (
    <Card className="gap-4 py-5">
      <CardHeader className="gap-3 px-5">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={post.type} />
          <StatusBadge status={post.status} />
        </div>
        <CardTitle className="leading-snug">{post.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 px-5">
        {post.caption ? (
          <p className="text-muted-foreground line-clamp-4 text-sm whitespace-pre-line">
            {post.caption}
          </p>
        ) : (
          <p className="text-muted-foreground/60 text-sm italic">Sin subtítulo todavía</p>
        )}
        <p
          className={cn(
            "flex items-center gap-1.5 text-xs",
            overdue ? "text-warning" : "text-muted-foreground"
          )}
        >
          {overdue ? (
            <AlertTriangle className="size-3.5" />
          ) : post.status === "publicada" ? (
            <CheckCircle2 className="size-3.5" />
          ) : (
            <CalendarClock className="size-3.5" />
          )}
          {formatDate(post.scheduledAt)}
          {overdue && " · atrasada"}
        </p>
      </CardContent>

      <CardFooter className="gap-2 border-t px-5 pt-4 [.border-t]:pt-4">
        {next && (
          <Button size="sm" variant="secondary" onClick={() => onAdvance(post, next.to)}>
            <next.icon />
            {next.label}
          </Button>
        )}
        <div className="ml-auto flex gap-1">
          <Button size="icon" variant="ghost" aria-label="Editar" onClick={() => onEdit(post)}>
            <Pencil />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Eliminar"
            className="hover:text-destructive"
            onClick={() => onDelete(post)}
          >
            <Trash2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
