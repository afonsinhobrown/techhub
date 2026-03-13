import { getAllDiscussionsAdmin } from "@/lib/discussions";
import { AdminDiscussoesClient } from "@/components/admin/AdminDiscussoesClient";

export default async function AdminDiscussoesPage() {
  const discussions = await getAllDiscussionsAdmin();

  return <AdminDiscussoesClient initialDiscussions={discussions} />;
}
