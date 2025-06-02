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
    <>
      <div className={st["header-top"]}>
        <div className="wrapp-1200">
          <div className={st["header-top-wrapp"]}>
            <div></div>
            <div className={st["percent-wrapp"]}>
              Отримай знижку <span className={st["percent"]}>10%</span>
            </div>
            <div>
              {" "}
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
      </div>
      <div className={st["header-bottom"]}>
        <div className="wrapp-1200">
          <div className={st["header-bottom-wrapp"]}>
            <Link href={"/"}>
              <Image
                src={"/burger-menu.svg"}
                alt="Меню"
                width={50}
                height={50}
              ></Image>
            </Link>
            <Link href={"/"}>
              <Image
                src={"/winery2-removebg.png"}
                alt="головний логотип"
                width={200}
                height={100}
              />
            </Link>
            <Link href={"/"} className={st["cart-wrapp"]}>
              <Image
                src={"/cart.png"}
                alt="Меню"
                width={30}
                height={30}
                className={st["cart"]}
              ></Image>
              <div className={st["cart-fill"]}>0</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
