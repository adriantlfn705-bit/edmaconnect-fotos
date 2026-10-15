import { Badge } from "@/components/ui/badge";
import { STATUS_META, TYPE_META, type PostStatus, type PostType } from "@/lib/instagram/types";
import { cn } from "@/lib/utils";

export function TypeBadge({ type }: { type: PostType }) {
  const { label, icon: Icon } = TYPE_META[type];
  return (
    <Badge variant="outline" className="text-muted-foreground">
      <Icon />
      {label}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: PostStatus }) {
  const { label, className } = STATUS_META[status];
  return (
    <Badge variant="outline" className={cn(className)}>
      {label}
    </Badge>
  );
}
