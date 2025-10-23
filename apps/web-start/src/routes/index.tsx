import { createFileRoute } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router'
import { useAuth0 } from '@auth0/auth0-react';

export const Route = createFileRoute('/')({
  component: LoginPage,
});

export default function LoginPage() {
  const navigate = useNavigate()
  const { loginWithRedirect, isAuthenticated,} = useAuth0()

  if (isAuthenticated) {
    navigate({ to: '/dashboard' })
    return null;
  }

  return (
  <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">LMS Login</h1>

        <button
          onClick={() => loginWithRedirect()}
          className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Log in / Sign Up with Auth0
        </button>
      </div>
    </main>);
}
