import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="bg-surface text-caption text-ink-muted border-t">
      <Container
        size="wide"
        className="flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between md:py-16"
      >
        <div className="stack">
          <p className="text-ink text-[1.25rem] leading-none tracking-[0.3em] uppercase">
            Lumière
          </p>
          <p>Linen, stoneware and candles for the home.</p>
        </div>
        <nav aria-label="Footer" className="flex gap-8">
          <Link href="/products" className="link-quiet label text-ink">
            Shop
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
