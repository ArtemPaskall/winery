"use client"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

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
    <div onClick={toggleLocale}>
      <Image src={"/globe.svg"} width={20} height={20} alt="Мова"></Image>
      <div>UK</div>
      <div>EN</div>
    </div>
  )
}
