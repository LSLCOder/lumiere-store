import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AuthFormSkeleton } from "@/components/auth/auth-form-skeleton";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Container } from "@/components/ui/container";
import { getSession, safeNext } from "@/lib/session";

export const metadata: Metadata = {
  title: "Create an account",
};

export default function SignUpPage({ searchParams }: PageProps<"/sign-up">) {
  return (
    <Container size="prose" className="max-w-[26rem] py-10 md:py-14">
      <h1 className="headline">Create an account</h1>
      {/* The return path and the session are request data. */}
      <Suspense
        fallback={
          <div className="mt-6">
            <AuthFormSkeleton
              fields={[
                { label: "Name" },
                { label: "Email" },
                { label: "Password", hint: "At least 8 characters." },
              ]}
              action="Create account"
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
}: Pick<PageProps<"/sign-up">, "searchParams">) {
  const next = safeNext((await searchParams).next);
  if (await getSession()) redirect(next);
  return <Form next={next} />;
}

function Form({ next }: { next: string }) {
  const signIn =
    next === "/account"
      ? "/sign-in"
      : `/sign-in?next=${encodeURIComponent(next)}`;
  return (
    <>
      <div className="mt-6">
        <SignUpForm next={next} />
      </div>
      <p className="text-caption mt-6">
        Already have an account?{" "}
        <Link href={signIn} className="link">
          Sign in
        </Link>
      </p>
    </>
  );
}
