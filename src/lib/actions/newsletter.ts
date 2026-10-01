"use server";

export interface NewsletterState {
  status: "idle" | "success" | "error";
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = formData.get("email")?.toString().trim() ?? "";

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  // TODO: send `email` to the email provider (e.g. Resend, Mailchimp) once it is chosen.

  return { status: "success", message: "You're on the list. Look out for the brief on Monday." };
}
