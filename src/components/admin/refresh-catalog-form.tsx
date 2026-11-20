"use client";

import { useActionState } from "react";
import { refreshCatalog, type RefreshState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export function RefreshCatalogForm() {
  const [state, action, pending] = useActionState<RefreshState>(
    refreshCatalog,
    { refreshedAt: null },
  );

  return (
    <form action={action} className="flex flex-wrap items-center gap-4">
      <Button type="submit" variant="secondary" disabled={pending}>
        {pending ? "Refreshing…" : "Refresh catalog"}
      </Button>
      <p role="status" className="text-caption text-ink-muted">
        {state.refreshedAt ? `Refreshed at ${state.refreshedAt}.` : null}
      </p>
    </form>
  );
}
