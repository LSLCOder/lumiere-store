"use client";

import { authClient } from "@/lib/auth-client";
import { AuthField, AuthForm } from "./auth-form";
import { validateSignIn } from "./validation";

export function SignInForm({ next }: { next: string }) {
  return (
    <AuthForm
      next={next}
      action="Sign in"
      pendingAction="Signing in"
      validate={validateSignIn}
      submit={({ email, password }) =>
        authClient.signIn.email({ email, password })
      }
    >
      <AuthField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        maxLength={254}
      />
      <AuthField
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        maxLength={128}
      />
    </AuthForm>
  );
}
