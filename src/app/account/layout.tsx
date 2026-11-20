import { Suspense } from "react";
import { AccountNav } from "@/components/account/account-nav";
import { Container } from "@/components/ui/container";
import { getSession } from "@/lib/session";

/**
 * The account area: navigation beside the section (from md) or above it.
 * Access control stays in each page (`requireUser`); the layout only reads
 * the session to decide whether to offer the admin link.
 */
export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <Container
      size="wide"
      className="grid gap-8 py-10 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-16 md:py-14 lg:grid-cols-[14rem_minmax(0,1fr)]"
    >
      <aside className="md:sticky md:top-[calc(var(--nav-height)+3.5rem)] md:self-start">
        <Suspense fallback={<AccountNav isAdmin={false} />}>
          <AccountNavForUser />
        </Suspense>
      </aside>
      <div className="max-w-[40rem] min-w-0">{children}</div>
    </Container>
  );
}

async function AccountNavForUser() {
  const session = await getSession();
  return <AccountNav isAdmin={session?.user.role === "admin"} />;
}
