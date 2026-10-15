import { Separator } from "@/components/ui/separator";
import { Brand } from "@/components/layout/brand";
import { NavLinks } from "@/components/layout/nav-links";

/** Barra lateral fija para pantallas md+. En móvil se usa MobileNav. */
export function AppSidebar() {
  return (
    <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border sticky top-0 hidden h-svh w-72 shrink-0 flex-col gap-4 border-r py-4 md:flex">
      <Brand />
      <Separator className="bg-sidebar-border" />
      <div className="flex-1 overflow-y-auto px-2">
        <NavLinks />
      </div>
      <p className="text-muted-foreground px-5 text-xs">EDMA Connect</p>
    </aside>
  );
}
