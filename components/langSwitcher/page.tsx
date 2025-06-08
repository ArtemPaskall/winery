"use client"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import st from "./langSwitcher.module.scss"
import { useState, useEffect, useRef } from "react"

export default function LangSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = pathname.split("/")[1]
  const [open, setOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState(currentLocale)
  const ref = useRef<HTMLDivElement>(null)

  const handleLangClick = (lang: string) => {
    setSelectedLang(lang)
    const newPath = pathname.replace(`/${currentLocale}`, `/${lang}`)
    router.push(newPath)
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <div
      ref={ref}
      className={st["lang-switcher"]}
      onClick={() => setOpen(!open)}
    >
      <Image src={"/globe.svg"} width={20} height={20} alt="Мова" />
      <div className={`${st["lang-wrapp"]} ${open ? st["open"] : ""}`}>
        {!open ? (
          <div>{selectedLang.toUpperCase()}</div>
        ) : (
          <>
            <div onClick={() => handleLangClick("UK")}>UK</div>
            <div onClick={() => handleLangClick("RU")}>RU</div>
            <div onClick={() => handleLangClick("EN")}>EN</div>
          </>
        )}
      </div>
    </div>
  )
}
