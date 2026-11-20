import type { FieldErrors, Values } from "./auth-form";

// Client-side checks, so mistakes are caught before a request is made. They
// mirror Better Auth's own rules (8–128 character passwords), which still
// apply on the server.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkEmail(email = "") {
  if (!email) return "Enter your email address.";
  if (!EMAIL.test(email))
    return "Enter a valid email address, like name@example.com.";
}

export function validateSignIn({ email, password }: Values): FieldErrors {
  return {
    email: checkEmail(email),
    password: password ? undefined : "Enter your password.",
  };
}

export function validateSignUp({
  name,
  email,
  password = "",
}: Values): FieldErrors {
  return {
    name: name ? undefined : "Enter your name.",
    email: checkEmail(email),
    password: !password
      ? "Create a password."
      : password.length < 8
        ? "Use at least 8 characters."
        : password.length > 128
          ? "Use 128 characters or fewer."
          : undefined,
  };
}
