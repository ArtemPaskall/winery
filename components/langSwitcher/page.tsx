"use client"
import { usePathname, useRouter } from "next/navigation"

export default function LangSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const currentLocale = pathname.split("/")[1]

  const toggleLocale = () => {
    const newLocale = currentLocale === "en" ? "uk" : "en"
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <button onClick={toggleLocale}>
      {currentLocale === "en" ? "🇺🇸 English" : "🇺🇦 Українська"}
    </button>
  )
}
