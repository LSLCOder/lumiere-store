"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * Ends the session (deleting it server-side) and returns to the homepage.
 * Styled as a `.tab`, to sit in the account navigation.
 */
export function SignOutButton() {
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await authClient.signOut();
    // A full page load on purpose: router.refresh() only clears the current
    // route, and pages prefetched while signed in must not be reused.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign("/");
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      aria-busy={pending}
      className="tab disabled:opacity-60"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
