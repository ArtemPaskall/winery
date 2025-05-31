"use client"
import st from "./header.module.scss"
import "@/app/styles/globals.scss"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()
  const user = session?.user ?? null
  console.log(user)

  return (
    <div className={st["header"]}>
      <div className={"wrapp-1200"}>
        <div className={st["header-wrapp"]}>
          <Link href={"/"}>
            <Image
              src={"/winery.png"}
              alt="головний логотип"
              width={50}
              height={50}
            />
          </Link>
          {!user ? (
            <Link href="/register">Вхід</Link>
          ) : (
            <Link href={"/register"} className={st["avatar-wrapp"]}>
              <Image
                src={`${user.image}`}
                alt="головний логотип"
                width={50}
                height={50}
                className={st["user-img"]}
              />
              <p className={st["user-name"]}>{user.name}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
