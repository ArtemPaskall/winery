// import styles from "./page.module.css"
import { Metadata } from "next"
import dbConnect from "@/lib/mongoDB"
import Wine from "@/models/wine"
import { WineType } from "@/types"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Home Page",
}

export default async function Home() {
  await dbConnect()
  const wines = await Wine.find({}).lean<WineType[]>()

  console.log(wines)
  return (
    <>
      <div> hello world</div>
      <Link href="/add-product">+ Add product</Link>
      <div>
        {wines.map((wine) => {
          return <div key={wine._id}>{wine.name}</div>
        })}
      </div>
    </>
  )
}
