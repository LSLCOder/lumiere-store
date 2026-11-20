"use server";

import { updateTag } from "next/cache";
import { assertAdmin } from "@/lib/session";

export type RefreshState = { refreshedAt: string | null };

/**
 * Drops the cached catalog so a price, stock or category edit made in the
 * database shows on the next request instead of within about a minute.
 * Admin only: the role is checked here, not just on the page.
 */
export async function refreshCatalog(): Promise<RefreshState> {
  await assertAdmin();
  updateTag("products");
  updateTag("categories");
  return {
    refreshedAt: new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    }).format(new Date()),
  };
}
