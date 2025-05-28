import st from "./header.module.scss"
import "@/app/styles/globals.scss"
import React from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <div className={st["header"]}>
      <div className={"wrapp-1200"}>
        <div className={st["header-wrapp"]}>
          <Link href={"/"}>
            {" "}
            <Image
              src={"/winery.png"}
              alt="головний логотип"
              width={50}
              height={50}
            />
          </Link>
          <Link href="/register">register</Link>
        </div>
      </div>
    </div>
  )
}
