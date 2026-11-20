import type { Metadata } from "next";
import { Suspense } from "react";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Account information",
};

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const dayMonthYear = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export default function AccountPage() {
  return (
    <>
      <h1 className="headline">Account information</h1>
      {/* The session is request data; everything that reads it streams. */}
      <Suspense fallback={<AccountInformationSkeleton />}>
        <AccountInformation />
      </Suspense>
    </>
  );
}

async function AccountInformation() {
  const { user, session } = await requireUser("/account");
  const firstName = user.name.split(" ")[0];

  return (
    <>
      <p className="text-ink-muted mt-3">
        Hello, {firstName}. This is the information on your account.
      </p>

      <Details
        heading="Personal details"
        rows={[
          { term: "Name", value: user.name },
          { term: "Email", value: user.email },
          { term: "Member since", value: monthYear.format(user.createdAt) },
        ]}
      />

      <Details
        heading="Signing in"
        rows={[
          { term: "Method", value: "Email and password" },
          {
            term: "Signed in",
            value: `Since ${dayMonthYear.format(session.createdAt)}`,
          },
          {
            term: "Stays signed in",
            value: `Until ${dayMonthYear.format(session.expiresAt)}, or until you sign out. Using the site extends it.`,
          },
        ]}
      />
    </>
  );
}

type Row = { term: string; value: string };

/** A titled details table, as on the product page. */
function Details({ heading, rows }: { heading: string; rows: Row[] }) {
  return (
    <section className="mt-10">
      <h2 className="label">{heading}</h2>
      <dl className="text-caption mt-3 border-b">
        {rows.map(({ term, value }) => (
          <div
            key={term}
            className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-t py-3"
          >
            <dt className="text-ink-muted">{term}</dt>
            <dd className="break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Same shape as the loaded page, so nothing jumps when it arrives. */
function AccountInformationSkeleton() {
  return (
    <div aria-busy="true">
      <p className="sr-only">Loading your account…</p>
      <div aria-hidden="true">
        <p className="mt-3">&nbsp;</p>
        {[3, 3].map((count, section) => (
          <div key={section} className="mt-10">
            <p className="label">&nbsp;</p>
            <div className="text-caption mt-3 border-b">
              {Array.from({ length: count }, (_, row) => (
                <div key={row} className="border-t py-3">
                  &nbsp;
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
