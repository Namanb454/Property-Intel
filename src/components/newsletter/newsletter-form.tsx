"use client";

import { useActionState, useId } from "react";
import { subscribeToNewsletter, type NewsletterState } from "@/lib/actions/newsletter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

const INITIAL: NewsletterState = { status: "idle" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, INITIAL);
  const id = useId();

  return (
    <>
      <form action={formAction} className="mt-2 flex w-full max-w-[32.5rem] flex-wrap gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          aria-describedby={state.message ? `${id}-status` : undefined}
          className="box-content h-[3.25rem] min-w-[13.75rem] grow rounded-control border border-line-strong bg-fill-input px-[1.125rem] text-[0.9375rem] text-ink"
        />
        <Button type="submit" size="xl" disabled={pending}>
          {pending ? "Subscribing…" : "Subscribe free"}
        </Button>
      </form>
      <span
        id={`${id}-status`}
        role="status"
        className={cn(
          "text-xs",
          state.status === "error"
            ? "text-accent-strong"
            : state.status === "success"
              ? "text-positive"
              : "text-text-muted",
        )}
      >
        {state.message ?? "No spam. Unsubscribe anytime."}
      </span>
    </>
  );
}
