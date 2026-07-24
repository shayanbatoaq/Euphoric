import type { Metadata } from "next";
import { UpdatePasswordForm } from "../../components/PasswordForm";
import { AuthPageShell } from "../../components/AuthPageShell";

export const metadata: Metadata = {
  title: "Choose a new password | Euphoric",
  robots: { index: false, follow: false },
};

export default function UpdatePasswordPage() {
  return (
    <AuthPageShell
      eyebrow="Account recovery"
      title="Choose a new password"
      description="Use at least eight characters and keep your password private."
    >
      <UpdatePasswordForm />
    </AuthPageShell>
  );
}
