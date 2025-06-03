import st from "./page.module.scss"
import { Metadata } from "next"
import dbConnect from "@/lib/mongoDB"
import Wine from "@/models/wine"
import { WineType } from "@/types"
import Link from "next/link"
import "@/app/styles/globals.scss"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Home Page",
}

export default async function Home() {
  await dbConnect()
  const wines = await Wine.find({}).lean<WineType[]>()

  console.log(wines)
  return (
    <main className="wrapp-1200">
      <div> hello world</div>
      <Link href="/add-product">+ Add product</Link>
      <div className={st["main-content"]}>
        <div className={st["left-menu"]}>left-menu</div>
        <div className={st["prod-block"]}>
          {wines.map((wine) => {
            return (
              <div key={wine._id} className={st["product-item"]}>
                <div> {wine.name}</div>
                <div> {wine.description}</div>
                <div> {wine.price}</div>
                <div> {wine.wineType}</div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
