import { WineType } from "@/types"
import st from "./card.module.scss"
import Image from "next/image"

export default function WineCard({ wine }: { wine: WineType }) {
  return (
    <div className={st["product-item"]}>
      <Image
        src={"/bottle-1.png"}
        alt="wine bottle"
        width={100}
        height={70}
        className={st["card-img"]}
      />
      <div> {wine.name}</div>
      <div> {wine.price}</div>
      <div> {wine.price}</div>
      <div> {wine.price}</div>
    </div>
  )
}
