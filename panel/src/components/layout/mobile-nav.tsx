"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Brand } from "@/components/layout/brand";
import { NavLinks } from "@/components/layout/nav-links";

/** Cabecera con botón de menú, solo visible por debajo de md. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background/95 sticky top-0 z-40 flex h-14 items-center gap-2 border-b px-4 backdrop-blur md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Abrir menú">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-sidebar text-sidebar-foreground w-72 p-0 pt-4">
          <SheetTitle className="sr-only">Navegación</SheetTitle>
          <Brand />
          <div className="px-2">
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
      <span className="font-semibold">Panel de contenido</span>
    </header>
  );
}
