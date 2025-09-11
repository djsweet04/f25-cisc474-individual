import Link from "next/link"

export default function HomePage() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold">Welcome to LMS</h1>
      <p className="mt-4 text-lg">Browse courses or sign in to continue</p>
      <div className="mt-6 space-x-4">
        <Link href="/signin" className="px-4 py-2 bg-blue-600 text-white rounded">
          Sign In
        </Link>
        <Link href="/signup" className="px-4 py-2 bg-gray-200 rounded">
          Sign Up
        </Link>
      </div>
    </main>
  )
}
