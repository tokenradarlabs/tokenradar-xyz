import { AuthSide } from "@/components/auth/auth-side";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthSide />
      <div className="flex items-center justify-center bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </div>
  );
} 