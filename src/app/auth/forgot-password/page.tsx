import type { Metadata } from "next";
import { ForgotPasswordForm } from "../../components/PasswordForm";
import { AuthPageShell } from "../../components/AuthPageShell";

export const metadata: Metadata = {
  title: "Reset password | Euphoric",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell
      eyebrow="Account recovery"
      title="Reset your password"
      description="Enter your account email and we’ll send a secure reset link."
    >
      <ForgotPasswordForm />
    </AuthPageShell>
  );
}
