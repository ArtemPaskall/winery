"use client"
import { useSession } from "next-auth/react"
import { Link } from "@/i18n/navigation"
import st from "./logInBlock.module.scss"
import Image from "next/image"

export default function LogInBlock() {
  const { data: session } = useSession()
  const user = session?.user ?? null

  return (
    <div>
      {!user ? (
        <Link href="/register" className={st["enter-text"]}>
          Вхід
        </Link>
      ) : (
        <Link href="/register" className={st["avatar-wrapp"]}>
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
  )
}
