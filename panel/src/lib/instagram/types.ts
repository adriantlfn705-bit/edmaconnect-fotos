import { Camera, Clapperboard, GalleryHorizontal, CircleDashed, type LucideIcon } from "lucide-react";

export const POST_TYPES = ["reel", "carrusel", "foto", "historia"] as const;
export type PostType = (typeof POST_TYPES)[number];

/** Orden del flujo: una idea pasa a borrador, se programa y se publica. */
export const POST_STATUSES = ["idea", "borrador", "programada", "publicada"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export type Post = {
  id: string;
  title: string;
  /** Subtítulo (caption) que acompaña a la publicación en Instagram. */
  caption: string;
  type: PostType;
  status: PostStatus;
  /** Fecha y hora local en formato "YYYY-MM-DDTHH:mm" (el de <input type="datetime-local">). */
  scheduledAt: string | null;
  createdAt: string;
};

export type PostInput = Omit<Post, "id" | "createdAt">;

export const TYPE_META: Record<PostType, { label: string; icon: LucideIcon }> = {
  reel: { label: "Reel", icon: Clapperboard },
  carrusel: { label: "Carrusel", icon: GalleryHorizontal },
  foto: { label: "Foto", icon: Camera },
  historia: { label: "Historia", icon: CircleDashed },
};

/** `className` usa solo los tokens de estado definidos en globals.css. */
export const STATUS_META: Record<PostStatus, { label: string; className: string }> = {
  idea: { label: "Idea", className: "border-warning/30 bg-warning/10 text-warning" },
  borrador: { label: "Borrador", className: "border-border bg-muted text-muted-foreground" },
  programada: { label: "Programada", className: "border-info/30 bg-info/10 text-info" },
  publicada: { label: "Publicada", className: "border-success/30 bg-success/10 text-success" },
};

export const CAPTION_MAX = 2200; // límite de Instagram

export function parseLocal(value: string): Date {
  return new Date(value);
}

export function isOverdue(post: Post, now = new Date()): boolean {
  return (
    post.status !== "publicada" &&
    post.scheduledAt !== null &&
    parseLocal(post.scheduledAt).getTime() < now.getTime()
  );
}

const dateFmt = new Intl.DateTimeFormat("es-VE", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

export function formatDate(value: string | null): string {
  return value ? dateFmt.format(parseLocal(value)) : "Sin fecha";
}
