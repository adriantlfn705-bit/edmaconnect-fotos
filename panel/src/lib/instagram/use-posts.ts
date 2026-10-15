"use client";

import { useCallback, useEffect, useState } from "react";

import { seedPosts } from "./seed";
import type { Post, PostInput } from "./types";

const STORAGE_KEY = "edma.instagram.posts.v1";

function load(): Post[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Post[]) : seedPosts;
  } catch {
    return seedPosts;
  }
}

function save(posts: Post[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // Almacenamiento bloqueado (modo privado): se sigue trabajando en memoria.
  }
}

/**
 * Estado de las publicaciones, guardado en localStorage de este navegador.
 * `posts` es null hasta leer el almacenamiento (evita desajustes de hidratación).
 */
export function usePosts() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    setPosts(load());
  }, []);

  const update = useCallback((fn: (prev: Post[]) => Post[]) => {
    setPosts((prev) => {
      const next = fn(prev ?? []);
      save(next);
      return next;
    });
  }, []);

  const addPost = useCallback(
    (input: PostInput) =>
      update((prev) => [
        { ...input, id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`, createdAt: new Date().toISOString() },
        ...prev,
      ]),
    [update]
  );

  const updatePost = useCallback(
    (id: string, patch: Partial<PostInput>) =>
      update((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))),
    [update]
  );

  const deletePost = useCallback(
    (id: string) => update((prev) => prev.filter((p) => p.id !== id)),
    [update]
  );

  return { posts, addPost, updatePost, deletePost };
}
