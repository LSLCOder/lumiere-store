"use client";

import { authClient } from "@/lib/auth-client";
import { AuthField, AuthForm } from "./auth-form";
import { validateSignUp } from "./validation";

export function SignUpForm({ next }: { next: string }) {
  return (
    <AuthForm
      next={next}
      action="Create account"
      pendingAction="Creating account"
      validate={validateSignUp}
      submit={({ name, email, password }) =>
        authClient.signUp.email({ name, email, password })
      }
    >
      <AuthField name="name" label="Name" autoComplete="name" maxLength={100} />
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
        autoComplete="new-password"
        maxLength={128}
        hint="At least 8 characters."
      />
    </AuthForm>
  );
}
