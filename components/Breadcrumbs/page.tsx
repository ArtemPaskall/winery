"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import st from "./breadcrumbs.module.scss"
import Image from "next/image"

export default function Breadcrumbs() {
  const t = useTranslations("Breadcrumbs")
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const nameMap: Record<string, string> = {
    "add-product": "addProduct",
  }

  return (
    <nav className={st["nav"]}>
      <Link href="/">{t("Home")}</Link>

      {segments.map((segment, index) => {
        if (index > 0) {
          const href = "/" + segments.slice(0, index + 1).join("/")

          return (
            <span key={href} className={st["nav-span"]}>
              {/* {" > "} */}
              <Image
                src={"/arrow-right.svg"}
                width={15}
                height={15}
                alt={"arrow"}
              ></Image>
              <Link href={href} className={st["nav-link"]}>
                {t(nameMap[segment] || segment)}
              </Link>
            </span>
          )
        }
      })}
    </nav>
  )
}
