"use client";

import {
  createContext,
  use,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type ReactNode,
  type SubmitEvent,
} from "react";
import { Button } from "@/components/ui/button";

export type Values = Record<string, string>;
export type FieldErrors = Partial<Record<string, string>>;

/** What Better Auth's client returns on failure. */
type AuthError = { code?: string; message?: string; status?: number };
type Result = { error: AuthError | null };

type AuthFormProps = {
  /** Checks the values before anything is sent; returns errors by field. */
  validate: (values: Values) => FieldErrors;
  /** Sends the (trimmed) values to Better Auth. */
  submit: (values: Values) => Promise<Result>;
  /** Where to go once it succeeds. */
  next: string;
  /** The button text, e.g. "Sign in", and its pending form, "Signing in". */
  action: string;
  pendingAction: string;
  children: ReactNode;
};

type FieldContext = {
  errors: FieldErrors;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const AuthFormContext = createContext<FieldContext | null>(null);

function readValues(form: HTMLFormElement): Values {
  const values: Values = {};
  for (const [key, value] of new FormData(form)) {
    if (typeof value !== "string") continue;
    // Passwords are sent exactly as typed; everything else is trimmed.
    values[key] = key === "password" ? value : value.trim();
  }
  return values;
}

/** Turns a Better Auth failure into messages a shopper can act on. */
function describeError(error: AuthError): {
  fields?: FieldErrors;
  /** For the whole form, not one field. */
  message?: string;
  /** Field to focus (and select) so the shopper can try again. */
  retry?: string;
} {
  switch (error.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return {
        message: "That email and password don't match an account.",
        retry: "password",
      };
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      // The "Already have an account? Sign in" link sits right below.
      return { fields: { email: "An account already uses this email." } };
    case "INVALID_EMAIL":
      return { fields: { email: "Enter a valid email address." } };
    case "PASSWORD_TOO_SHORT":
      return { fields: { password: "Use at least 8 characters." } };
    case "PASSWORD_TOO_LONG":
      return { fields: { password: "Use 128 characters or fewer." } };
  }
  if (error.status === 429) {
    return { message: "Too many attempts. Wait a minute and try again." };
  }
  if (!error.status || error.status >= 500) {
    return {
      message:
        "We couldn't reach the server. Check your connection and try again.",
    };
  }
  return { message: error.message ?? "Something went wrong. Try again." };
}

/**
 * Shared behaviour for the sign-in and sign-up forms.
 *
 * Validation runs on submit; after that, and once a field has been left with
 * a value in it, each field re-checks as it is edited, so errors clear as soon
 * as they are fixed. While sending, the whole form is disabled. Server errors
 * land on the field they concern where possible.
 */
export function AuthForm({
  validate,
  submit,
  next,
  action,
  pendingAction,
  children,
}: AuthFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function checkField(input: HTMLInputElement) {
    if (!input.form) return;
    const fieldError = validate(readValues(input.form))[input.name];
    setErrors((current) => ({ ...current, [input.name]: fieldError }));
  }

  const context: FieldContext = {
    errors,
    onBlur: (event) => {
      if (submitted || event.currentTarget.value !== "") {
        checkField(event.currentTarget);
      }
    },
    onChange: (event) => {
      if (errors[event.currentTarget.name]) checkField(event.currentTarget);
    },
  };

  function focusFirstError(fieldErrors: FieldErrors) {
    const first = Object.keys(fieldErrors).find((name) => fieldErrors[name]);
    if (first) {
      formRef.current
        ?.querySelector<HTMLInputElement>(`[name="${first}"]`)
        ?.focus();
    }
  }

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = readValues(event.currentTarget);
    const fieldErrors = validate(values);
    setSubmitted(true);
    setErrors(fieldErrors);
    setMessage(null);

    if (Object.values(fieldErrors).some(Boolean)) {
      focusFirstError(fieldErrors);
      return;
    }

    setPending(true);
    let result: Result;
    try {
      result = await submit(values);
    } catch {
      result = { error: {} };
    }

    if (result.error) {
      const described = describeError(result.error);
      setErrors(described.fields ?? {});
      setMessage(described.message ?? null);
      setPending(false);
      // Re-enable the inputs before moving focus back into the form.
      requestAnimationFrame(() => {
        if (described.fields) {
          focusFirstError(described.fields);
        } else if (described.retry) {
          const input = formRef.current?.querySelector<HTMLInputElement>(
            `[name="${described.retry}"]`,
          );
          input?.focus();
          input?.select();
        }
      });
      return;
    }

    // Success: keep the form disabled and do a full page load. The router
    // may hold pages prefetched while signed out (e.g. /account as a redirect
    // to sign-in). `next` was already checked by `safeNext` on the server.
    window.location.assign(next);
  }

  return (
    <AuthFormContext value={context}>
      <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={pending}>
        <fieldset disabled={pending} className="stack">
          {children}
          {message ? (
            <p role="alert" className="text-caption border-t pt-4">
              {message}
            </p>
          ) : null}
          <Button type="submit" block>
            {pending ? `${pendingAction}…` : action}
          </Button>
        </fieldset>
      </form>
    </AuthFormContext>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  autoComplete: string;
  maxLength: number;
  /** Always-visible guidance; replaced by the error while there is one. */
  hint?: string;
};

/**
 * A labelled input using the design system's `.field`, wired to the form's
 * validation. Password fields get a Show/Hide toggle.
 */
export function AuthField({
  name,
  label,
  type = "text",
  autoComplete,
  maxLength,
  hint,
}: FieldProps) {
  const form = use(AuthFormContext);
  const [revealed, setRevealed] = useState(false);
  if (!form) throw new Error("AuthField must be inside AuthForm.");

  const id = `auth-${name}`;
  const error = form.errors[name];
  const note = error ?? hint;
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          name={name}
          type={isPassword && revealed ? "text" : type}
          autoComplete={autoComplete}
          maxLength={maxLength}
          spellCheck={false}
          autoCapitalize={type === "text" ? "words" : "none"}
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={note ? `${id}-note` : undefined}
          onBlur={form.onBlur}
          onChange={form.onChange}
          className={isPassword ? "field pr-16" : "field"}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setRevealed((shown) => !shown)}
            aria-controls={id}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="link-quiet label absolute inset-y-0 right-0 px-4"
          >
            {revealed ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
      {note ? (
        <p
          id={`${id}-note`}
          className={
            error ? "text-caption mt-2" : "text-caption text-ink-muted mt-2"
          }
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}
