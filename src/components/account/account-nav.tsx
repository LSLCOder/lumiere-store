"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";

/** Account sections. Add new ones (orders, addresses) here. */
const sections = [{ href: "/account", label: "Account information" }];

/**
 * The account area's navigation, built from `.tab`: a row above the content
 * on small screens, a column beside it from md. The current section is marked
 * with `aria-current`, which `.tab` styles bold and uppercase.
 */
export function AccountNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const items = isAdmin
    ? [...sections, { href: "/admin", label: "Admin" }]
    : sections;

  return (
    <nav aria-label="Account">
      <ul className="flex flex-wrap gap-x-6 gap-y-3 border-b pb-4 md:flex-col md:flex-nowrap md:border-b-0 md:pb-0">
        {items.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="tab"
            >
              {label}
            </Link>
          </li>
        ))}
        <li className="ml-auto md:mt-3 md:ml-0 md:border-t md:pt-4">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
