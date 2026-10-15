import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 px-3 font-semibold">
      <span className="bg-sidebar-primary text-sidebar-primary-foreground flex size-7 items-center justify-center rounded-md">
        <LayoutDashboard className="size-4" />
      </span>
      <span>Panel de contenido</span>
    </Link>
  );
}
