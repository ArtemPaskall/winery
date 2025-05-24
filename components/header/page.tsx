import st from "./header.module.scss"
import "@/app/styles/globals.scss"
import React from "react"
import Link from "next/link"

export default function Header() {
  return (
    <div className={st["header"]}>
      <div className={"wrapp-1200"}>
        <div className={st["header-wrapp"]}>
          <Link href="/add-product">+ Add product</Link>
          <Link href="/register">register</Link>
        </div>
      </div>
    </div>
  )
}
