"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CAPTION_MAX,
  POST_STATUSES,
  POST_TYPES,
  STATUS_META,
  TYPE_META,
  type PostInput,
  type PostStatus,
  type PostType,
} from "@/lib/instagram/types";

const EMPTY: PostInput = {
  title: "",
  caption: "",
  type: "reel",
  status: "idea",
  scheduledAt: null,
};

function nowLocal(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

/**
 * Formulario para crear o editar una publicación.
 * Se monta de nuevo cada vez que se abre (ver `key` en InstagramManager),
 * así el estado inicial siempre parte de `initial`.
 */
export function PostFormDialog({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** null = nueva idea. */
  initial: PostInput | null;
  onSubmit: (input: PostInput) => void;
}) {
  const [form, setForm] = useState<PostInput>(initial ?? EMPTY);
  const [error, setError] = useState<string | null>(null);
  const editing = initial !== null;

  const set = <K extends keyof PostInput>(key: K, value: PostInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) return setError("Ponle un título a la publicación.");
    if (form.status === "programada" && !form.scheduledAt)
      return setError("Para programarla necesita fecha y hora.");
    onSubmit({
      ...form,
      title,
      caption: form.caption.trim(),
      scheduledAt:
        form.status === "publicada" && !form.scheduledAt ? nowLocal() : form.scheduledAt,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar publicación" : "Nueva idea de publicación"}</DialogTitle>
            <DialogDescription>
              Guarda la idea ahora y complétala cuando la vayas a programar.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="post-title">Título</Label>
            <Input
              id="post-title"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Ej.: Reel de forros MagSafe"
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="post-caption">Subtítulo (caption)</Label>
              <span className="text-muted-foreground text-xs tabular-nums">
                {form.caption.length}/{CAPTION_MAX}
              </span>
            </div>
            <Textarea
              id="post-caption"
              value={form.caption}
              maxLength={CAPTION_MAX}
              onChange={(e) => set("caption", e.target.value)}
              placeholder="Texto que acompaña la publicación, con emojis y hashtags"
              className="min-h-28"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Tipo</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v as PostType)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POST_TYPES.map((t) => {
                    const Icon = TYPE_META[t].icon;
                    return (
                      <SelectItem key={t} value={t}>
                        <Icon />
                        {TYPE_META[t].label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Estado</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v as PostStatus)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POST_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_META[s].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="post-date">
              {form.status === "publicada" ? "Fecha de publicación" : "Fecha programada"}
            </Label>
            <Input
              id="post-date"
              type="datetime-local"
              value={form.scheduledAt ?? ""}
              onChange={(e) => set("scheduledAt", e.target.value || null)}
              className="[color-scheme:dark]"
            />
          </div>

          {error && (
            <p role="alert" className="text-destructive text-sm">
              {error}
            </p>
          )}

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{editing ? "Guardar cambios" : "Añadir idea"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
