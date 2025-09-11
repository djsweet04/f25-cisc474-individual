import Link from "next/link"

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <form className="bg-white shadow-md rounded p-6 w-80">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <input type="email" placeholder="Email" className="w-full border p-2 mb-3" />
        <input type="password" placeholder="Password" className="w-full border p-2 mb-3" />
        <button className="w-full bg-blue-600 text-white py-2 rounded mb-3">Sign In</button>
        <p className="text-sm text-center">
          Don’t have an account? <Link href="/signup" className="text-blue-600">Sign up</Link>
        </p>
      </form>
    </main>
  )
}