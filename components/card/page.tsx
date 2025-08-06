import { WineType } from "@/types"
import st from "./card.module.scss"
import Image from "next/image"
import { getLocale } from "next-intl/server"

export default async function WineCard({ wine }: { wine: WineType }) {
  const locale = await getLocale()
  console.log(locale)

  return (
    <div className={st["product-item"]}>
      <div className={st["product-img-wrapp"]}>
        <Image
          src={"/bottle-1.png"}
          alt="wine bottle"
          width={100}
          height={70}
          className={st["card-img"]}
        />
        <div className={st["card-tip"]}>Quick view</div>
      </div>
      <div className={st["prod-name"]}>{wine.name}</div>
      <div className={st["prod-price"]}>{wine.price} грн</div>
      <div className={st["quantity-button"]}>
        <div>-</div>
        <div>1</div>
        <div>+</div>
      </div>
      <div className={st["add-button"]}>Add To Cart</div>
    </div>
  )
}
