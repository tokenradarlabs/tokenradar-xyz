import { AuthSide } from '@/components/auth/auth-side';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className='grid min-h-screen lg:grid-cols-2'>
      <AuthSide />
      <main className='flex items-center justify-center bg-blue-100 px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mx-auto w-full max-w-md'>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
