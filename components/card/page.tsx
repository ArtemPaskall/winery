import { WineType } from "@/types"
import st from "./card.module.scss"
import Image from "next/image"
import { getLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { getTranslations } from "next-intl/server"

export default async function WineCard({ wine }: { wine: WineType }) {
  const rawLocale = await getLocale()
  const locale =
    routing.locales.find((loc) => loc === rawLocale) ?? routing.defaultLocale

  const t = await getTranslations("WineCard")

  return (
    <div className={st["product-item"]}>
      <div className={st["product-img-wrapp"]}>
        <Image
          src="/bottle-1.png"
          alt="wine bottle"
          width={100}
          height={70}
          className={st["card-img"]}
        />
        <div className={st["card-tip"]}>{t("quick-view")}</div>
      </div>
      <div className={st["prod-name"]}>{wine.title[locale]}</div>
      <div className={st["prod-price"]}>{wine.price} грн</div>
      <div className={st["quantity-button"]}>
        <div>-</div>
        <div>1</div>
        <div>+</div>
      </div>
      <div className={st["add-button"]}>{t("add-to-cart")}</div>
    </div>
  )
}
