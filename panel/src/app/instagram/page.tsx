import { InstagramManager } from "@/components/instagram/instagram-manager";
import { PageHeader } from "@/components/layout/page-header";
import { getNavItem } from "@/config/nav";

export default function InstagramPage() {
  const item = getNavItem("/instagram");

  return (
    <div className="space-y-6">
      <PageHeader title={item.title} description={item.description} icon={item.icon} />
      <InstagramManager />
    </div>
  );
}
