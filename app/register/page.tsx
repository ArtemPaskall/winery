"use client"

import { useState } from "react"
import st from "./style.module.scss"
import { useSession } from "next-auth/react"
import { handleSignIn, handleSignOut } from "./actions"

export default function Register() {
  const { data: session } = useSession()
  const user = session?.user ?? null
  console.log(user)

  const [password, setPassword] = useState("")
  const [accessGranted, setAccessGranted] = useState(false)
  const [error, setError] = useState("")

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Unknown error")
      }

      const data = await res.json()
      if (data.success) {
        setAccessGranted(true)
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error"
      setError(message)
    }
  }

  return (
    <div className={st["register-block"]}>
      {!user ? (
        <div className={st["modal"]}>
          <h2 className={st["reg-header"]}>Registration</h2>

          {!accessGranted ? (
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Submit Password</button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          ) : (
            <form action={handleSignIn}>
              <button type="submit">Sign in with Google</button>
            </form>
          )}
        </div>
      ) : (
        <form action={handleSignOut}>
          <button type="submit">Sign out</button>
        </form>
      )}
    </div>
  )
}
