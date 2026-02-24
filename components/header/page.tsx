import st from "./header.module.scss"
// import "@/app/styles/globals.scss"
import React from "react"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import LangSwitcher from "../langSwitcher/page"
import LogBlock from "@/components/logBlock/page"
import { getTranslations } from "next-intl/server"

export default async function Header() {
  const t = await getTranslations("Header")
  return (
    <header className={st["header"]}>
      <div className={st["header-top"]}>
        <div className="wrapp-1200">
          <div className={st["header-top-wrapp"]}>
            <LangSwitcher></LangSwitcher>
            <div className={st["percent-wrapp"]}>
              {t("discount")} <span className={st["percent"]}>10%</span>
            </div>
            <div>
              <LogBlock />
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
      <div className={st["header-title-wrapp"]}>
        <div className={`${"wrapp-1200"} ${"header-title-inner"}`}>
          <h1 className={st["header-1"]}>{t("main-header")}</h1>
        </div>
      </div>
    </header>
  )
}
