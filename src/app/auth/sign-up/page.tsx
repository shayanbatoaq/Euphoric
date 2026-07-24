import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "../../components/AuthForm";
import { AuthPageShell } from "../../components/AuthPageShell";

export const metadata: Metadata = {
  title: "Create account | Euphoric",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <AuthPageShell
      eyebrow="Euphoric account"
      title="Create your account"
      description="Save delivery addresses and follow your orders from confirmation to delivery."
    >
      <Suspense>
        <AuthForm mode="signup" />
      </Suspense>
    </AuthPageShell>
  );
}
