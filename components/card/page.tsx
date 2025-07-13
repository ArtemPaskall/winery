import { WineType } from "@/types"
import st from "./card.module.scss"

export default function WineCard({ wine }: { wine: WineType }) {
  return (
    <div className={st["product-item"]}>
      <div> {wine.name}</div>
      <div> {wine.description}</div>
      <div> {wine.price}</div>
      <div> {wine.wineType}</div>
    </div>
  )
}
