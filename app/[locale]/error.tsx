"use client"

import { useEffect } from "react"

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Помилка:", error)
  }, [error])

  return (
    <div>
      <h1>Щось пішло не так </h1>
      <h3>{error.message}</h3>
      <button onClick={reset}>Спробувати ще раз</button>
    </div>
  )
}
