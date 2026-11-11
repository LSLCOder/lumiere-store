import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section>
      <Container size="wide">
        <h1 className="display">Nothing here.</h1>
        <p className="text-ink-muted mt-4 max-w-prose">
          This page doesn&apos;t exist or has moved. The rest of the collection
          is still in the shop.
        </p>
        <ButtonLink href="/products" className="mt-8">
          Go to the shop
        </ButtonLink>
      </Container>
    </Section>
  );
}
