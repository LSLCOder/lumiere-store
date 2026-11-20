import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

const navItems = [
  { href: "/products", label: "Shop" },
  { href: "/new-arrivals", label: "New" },
];

/**
 * Three-column bar: navigation left, wordmark centered, utilities right
 * (search and account; the bag goes here once it exists).
 */
export function Header() {
  return (
    <header className="site-header glass sticky top-0 z-50 border-b">
      <Container
        as="nav"
        size="wide"
        aria-label="Main"
        className="grid h-(--nav-height) grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-6"
      >
        <ul className="flex items-center gap-4 md:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="link-quiet label">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="text-[1.25rem] leading-none tracking-[0.3em] uppercase md:text-[1.75rem]"
        >
          Lumière
        </Link>
        {/* Account doesn't read the session, so every page stays static;
            signed-out visitors are sent to sign in by the proxy. */}
        <div className="flex items-center gap-3 justify-self-end md:gap-8">
          <UtilityLink href="/search" label="Search" icon={<SearchIcon />} />
          <UtilityLink href="/account" label="Account" icon={<AccountIcon />} />
        </div>
      </Container>
    </header>
  );
}

/**
 * A word from md up; below md, a line icon, so four links and the centered
 * wordmark still fit a 320px screen. The label stays the accessible name.
 */
function UtilityLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="link-quiet label -m-1.5 p-1.5 md:m-0 md:p-0"
    >
      <span aria-hidden="true" className="block md:hidden">
        {icon}
      </span>
      <span aria-hidden="true" className="hidden md:inline">
        {label}
      </span>
    </Link>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square",
} as const;

function SearchIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}
