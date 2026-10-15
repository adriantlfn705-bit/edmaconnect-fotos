"use client";

import { useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, FilePen, Hourglass, Lightbulb, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingLog } from "@/components/instagram/pending-log";
import { PostCard } from "@/components/instagram/post-card";
import { PostFormDialog } from "@/components/instagram/post-form-dialog";
import { StatsCards } from "@/components/instagram/stats-cards";
import { isOverdue, type Post, type PostInput, type PostStatus } from "@/lib/instagram/types";
import { usePosts } from "@/lib/instagram/use-posts";

const byDateAsc = (a: Post, b: Post) => {
  if (!a.scheduledAt && !b.scheduledAt) return b.createdAt.localeCompare(a.createdAt);
  if (!a.scheduledAt) return 1;
  if (!b.scheduledAt) return -1;
  return a.scheduledAt.localeCompare(b.scheduledAt);
};
const byDateDesc = (a: Post, b: Post) => byDateAsc(b, a);

type Editor = { key: number; id: string | null; initial: PostInput | null };

export function InstagramManager() {
  const { posts, addPost, updatePost, deletePost } = usePosts();
  const [editor, setEditor] = useState<Editor | null>(null);

  const groups = useMemo(() => {
    const list = posts ?? [];
    const of = (s: PostStatus) => list.filter((p) => p.status === s);
    return {
      programadas: of("programada").sort(byDateAsc),
      borradores: of("borrador").sort(byDateAsc),
      ideas: of("idea").sort(byDateAsc),
      publicadas: of("publicada").sort(byDateDesc),
      pendientes: list.filter((p) => p.status !== "publicada").sort(byDateAsc),
    };
  }, [posts]);

  if (posts === null) {
    return <div className="bg-muted/40 h-96 animate-pulse rounded-xl" aria-busy="true" />;
  }

  const overdueCount = groups.pendientes.filter((p) => isOverdue(p)).length;

  const openNew = () => setEditor({ key: Date.now(), id: null, initial: null });
  const openEdit = (post: Post, patch: Partial<PostInput> = {}) => {
    const { title, caption, type, status, scheduledAt } = post;
    setEditor({
      key: Date.now(),
      id: post.id,
      initial: { title, caption, type, status, scheduledAt, ...patch },
    });
  };

  const handleAdvance = (post: Post, to: PostStatus) => {
    if (to === "programada" && !post.scheduledAt) return openEdit(post, { status: to });
    updatePost(post.id, { status: to });
  };

  const handleDelete = (post: Post) => {
    if (window.confirm(`¿Eliminar «${post.title}»?`)) deletePost(post.id);
  };

  const handleSubmit = (input: PostInput) => {
    if (editor?.id) updatePost(editor.id, input);
    else addPost(input);
  };

  const grid = (list: Post[], empty: string) =>
    list.length === 0 ? (
      <p className="text-muted-foreground rounded-xl border border-dashed px-5 py-12 text-center text-sm">
        {empty}
      </p>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={openEdit}
            onAdvance={handleAdvance}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      <StatsCards
        stats={[
          { label: "Programadas", value: groups.programadas.length, icon: CalendarClock, tone: "text-info" },
          {
            label: "En preparación",
            value: groups.borradores.length + groups.ideas.length,
            icon: FilePen,
          },
          { label: "Publicadas", value: groups.publicadas.length, icon: CheckCircle2, tone: "text-success" },
          {
            label: "Pendientes",
            value: groups.pendientes.length,
            icon: Hourglass,
            tone: "text-warning",
            hint: overdueCount > 0 ? `${overdueCount} atrasada${overdueCount > 1 ? "s" : ""}` : undefined,
          },
        ]}
      />

      <Tabs defaultValue="programadas" className="gap-4">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <TabsList>
              <TabsTrigger value="programadas">Programadas ({groups.programadas.length})</TabsTrigger>
              <TabsTrigger value="borradores">Borradores ({groups.borradores.length})</TabsTrigger>
              <TabsTrigger value="ideas">Ideas ({groups.ideas.length})</TabsTrigger>
              <TabsTrigger value="publicadas">Publicadas ({groups.publicadas.length})</TabsTrigger>
              <TabsTrigger value="pendientes">Pendientes ({groups.pendientes.length})</TabsTrigger>
            </TabsList>
          </div>
          <Button onClick={openNew} className="sm:w-auto">
            <Plus />
            Nueva idea
          </Button>
        </div>

        <TabsContent value="programadas">
          {grid(groups.programadas, "No hay publicaciones programadas.")}
        </TabsContent>
        <TabsContent value="borradores">
          {grid(groups.borradores, "No hay borradores.")}
        </TabsContent>
        <TabsContent value="ideas">
          {groups.ideas.length === 0 ? (
            <button
              onClick={openNew}
              className="text-muted-foreground hover:bg-accent/40 flex w-full flex-col items-center gap-2 rounded-xl border border-dashed px-5 py-12 text-sm transition-colors"
            >
              <Lightbulb className="size-5" />
              Aún no hay ideas. Añade la primera.
            </button>
          ) : (
            grid(groups.ideas, "")
          )}
        </TabsContent>
        <TabsContent value="publicadas">
          {grid(groups.publicadas, "Todavía no hay nada publicado.")}
        </TabsContent>
        <TabsContent value="pendientes">
          <PendingLog posts={groups.pendientes} onEdit={openEdit} />
        </TabsContent>
      </Tabs>

      {editor && (
        <PostFormDialog
          key={editor.key}
          open
          onOpenChange={(open) => !open && setEditor(null)}
          initial={editor.initial}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
