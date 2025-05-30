"use client"

import { useState } from "react"
import st from "./register.module.scss"
import { useSession, signOut } from "next-auth/react"
import { handleSignIn, handleSignOut } from "./actions"
import Image from "next/image"
import Link from "next/link"

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
          <h2 className={st["reg-header"]}>Зареєструватися</h2>

          {!accessGranted ? (
            <form onSubmit={handlePasswordSubmit} className={st["form"]}>
              <input
                type="password"
                placeholder="Пароль реєстрації"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ height: "20px" }}>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
              <button type="submit">Ввести пароль</button>
            </form>
          ) : (
            <form action={handleSignIn}>
              <button type="submit" className={st["google-button"]}>
                <Image src="/Google.webp" alt="Google" width={50} height={50} />
                Зареєструватися через Google
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className={st["modal"]}>
          <h2 className={st["reg-header"]}>Вийти</h2>
          <form action={handleSignOut}>
            <button
              onClick={() => signOut({ redirect: false })}
              className={st["google-button"]}
            >
              <Image src="/Google.webp" alt="Google" width={50} height={50} />
              Вийти з Google
            </button>
          </form>
        </div>
      )}
      <Link href="/" className={st["home-link"]}>
        <Image
          src="/arrow-home-page.svg"
          alt="Google"
          width={20}
          height={50}
          className={st["arrow-img"]}
        />
        На головну
      </Link>
    </div>
  )
}
