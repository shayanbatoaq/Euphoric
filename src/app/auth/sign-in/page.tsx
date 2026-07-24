import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "../../components/AuthForm";
import { AuthPageShell } from "../../components/AuthPageShell";

export const metadata: Metadata = {
  title: "Sign in | Euphoric",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <AuthPageShell
      eyebrow="Euphoric account"
      title="Welcome back"
      description="Sign in to view your orders, profile, and saved delivery addresses."
    >
      <Suspense>
        <AuthForm mode="signin" />
      </Suspense>
    </AuthPageShell>
  );
}
