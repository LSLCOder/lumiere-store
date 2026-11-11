import Link from "next/link";
import { Container } from "@/components/ui/container";

const navItems = [{ href: "/products", label: "Shop" }];

/**
 * Three-column bar: navigation left, wordmark centered, utilities right
 * (account / bag slot, empty until those features exist).
 */
export function Header() {
  return (
    <header className="site-header glass sticky top-0 z-50 border-b">
      <Container
        as="nav"
        size="wide"
        aria-label="Main"
        className="grid h-(--nav-height) grid-cols-[1fr_auto_1fr] items-center gap-6"
      >
        <ul className="flex items-center gap-6 md:gap-8">
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
        <div className="justify-self-end" />
      </Container>
    </header>
  );
}
