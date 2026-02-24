// "use client"
// import { usePathname, useRouter } from "next/navigation"
// import Image from "next/image"
// import st from "./langSwitcher.module.scss"
// import { useState, useEffect, useRef } from "react"

// export default function LangSwitcher() {
//   const router = useRouter()
//   const pathname = usePathname()
//   const currentLocale = pathname.split("/")[1]
//   const [open, setOpen] = useState(false)
//   const [selectedLang, setSelectedLang] = useState(currentLocale)
//   const ref = useRef<HTMLDivElement>(null)

//   const handleLangClick = (lang: string) => {
//     setSelectedLang(lang)
//     const newPath = pathname.replace(`/${currentLocale}`, `/${lang}`)
//     router.push(newPath)
//     setOpen(false)
//   }

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])
//   return (
//     <div
//       ref={ref}
//       className={st["lang-switcher"]}
//       onClick={() => setOpen(!open)}
//     >
//       <Image src={"/globe.svg"} width={20} height={20} alt="Мова" />
//       <div className={`${st["lang-wrapp"]} ${open ? st["open"] : ""}`}>
//         {!open ? (
//           <div>{selectedLang.toUpperCase()}</div>
//         ) : (
//           <>
//             <div onClick={() => handleLangClick("UK")}>UK</div>
//             <div onClick={() => handleLangClick("RU")}>RU</div>
//             <div onClick={() => handleLangClick("EN")}>EN</div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// "use client"
// import { useRouter, usePathname, useSearchParams } from "next/navigation"
// import { useLocale } from "next-intl"
// import { routing } from "@/i18n/routing"

// export default function LocaleSwitcher() {
//   const router = useRouter()
//   const pathname = usePathname() ?? "/"
//   const searchParams = useSearchParams()
//   const search = searchParams ? `?${searchParams.toString()}` : ""
//   const locale = useLocale() ?? routing.locales[0]

//   const stripLocaleFromPath = (path: string) => {
//     if (!path || path === "") return "/"
//     const segs = path.split("/")
//     // segs[0] === "" because leading slash
//     if (segs.length > 1 && routing.locales.includes(segs[1] as Locale)) {
//       const rest = segs.slice(2).join("/") // everything after /<locale>/
//       return rest ? `/${rest}` : "/"
//     }
//     return path.startsWith("/") ? path : `/${path}`
//   }

//   const changeLocale = (nextLocale: string) => {
//     if (nextLocale === locale) return
//     const noLocale = stripLocaleFromPath(pathname) // '/add-product' або '/'
//     const href = noLocale === "/" ? `/${nextLocale}${search}` : `/${nextLocale}${noLocale}${search}`
//     console.log("Locale switch ->", { locale, pathname, noLocale, href })
//     router.push(href) // full navigation -> next-intl підхопить нові messages
//   }

//   return (
//     <div>
//       {routing.locales.map((l) => (
//         <button
//           key={l}
//           onClick={() => changeLocale(l)}
//           disabled={l === locale}
//           style={{ marginRight: 8 }}
//         >
//           {l}
//         </button>
//       ))}
//     </div>
//   )
// }

"use client"

import { useRouter, usePathname } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import { routing } from "@/i18n/routing"

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname() // має бути без /en
  const locale = useLocale() // поточна мова

  const changeLocale = (nextLocale: string) => {
    if (nextLocale === locale) return
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <div>
      {routing.locales.map((l) => (
        <button key={l} disabled={l === locale} onClick={() => changeLocale(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
