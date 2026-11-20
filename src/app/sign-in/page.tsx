import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AuthFormSkeleton } from "@/components/auth/auth-form-skeleton";
import { SignInForm } from "@/components/auth/sign-in-form";
import { Container } from "@/components/ui/container";
import { getSession, safeNext } from "@/lib/session";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  return (
    <Container size="prose" className="max-w-[26rem] py-10 md:py-14">
      <h1 className="headline">Sign in</h1>
      {/* The return path and the session are request data. */}
      <Suspense
        fallback={
          <div className="mt-6">
            <AuthFormSkeleton
              fields={[{ label: "Email" }, { label: "Password" }]}
              action="Sign in"
            />
          </div>
        }
      >
        <SignedInRedirect searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

async function SignedInRedirect({
  searchParams,
}: Pick<PageProps<"/sign-in">, "searchParams">) {
  const next = safeNext((await searchParams).next);
  if (await getSession()) redirect(next);
  return <Form next={next} />;
}

function Form({ next }: { next: string }) {
  const signUp =
    next === "/account"
      ? "/sign-up"
      : `/sign-up?next=${encodeURIComponent(next)}`;
  return (
    <>
      <div className="mt-6">
        <SignInForm next={next} />
      </div>
      <p className="text-caption mt-6">
        New here?{" "}
        <Link href={signUp} className="link">
          Create an account
        </Link>
      </p>
    </>
  );
}
