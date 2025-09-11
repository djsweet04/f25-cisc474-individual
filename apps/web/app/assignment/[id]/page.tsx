"use client"

import { useState } from "react"

interface AssignmentPageProps {
  params: { id: string }
}

export default function AssignmentPage({ params }: AssignmentPageProps) {
  const { id } = params
  const [code, setCode] = useState("")

  function handleSubmit(){
    alert("Code submitted for Assignment " + id)
  }
  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Left Sidebar */}
        <aside className="w-1/3 p-6 border-r">
          <h1 className="text-2xl font-bold mb-4">Assignment {id}</h1>

          {/* Overview */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Overview:</h2>
            <p className="text-sm text-gray-700">
              Your task for this assignment is to do x, then y, and finally z. Complete by the due date. Cheating is mean!
            </p>
          </section>

          {/* Problems */}
          <section>
            <h2 className="text-lg font-semibold mb-2">Problems:</h2>
            <ul className="space-y-2">
              <li className="p-2 border rounded">Problem 1: Do x</li>
              <li className="p-2 border rounded">Problem 2: Do y</li>
              <li className="p-2 border rounded">Problem 3: Do z</li>
            </ul>
          </section>
        </aside>

        {/* IDE placeholder */}
        <section className="flex-1 p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Code Editor</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full border rounded p-2 font-mono text-sm"
            placeholder="// Write your solution here..."
          />
          
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Solution
          </button>
        </section>

      </div>
    </main>
  )
}
