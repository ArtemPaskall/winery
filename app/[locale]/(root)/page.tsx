import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import st from "./page.module.scss"
import dbConnect from "@/lib/mongoDB"
import Wine from "@/models/wine"
import { WineType } from "@/types"
import "@/app/styles/globals.scss"
import WineCard from "@/components/card/page"

export const dynamic = "force-dynamic"

export async function generateMetadata() {
  const t = await getTranslations("HomePage")

  return {
    title: t("title"),
  }
}

export default async function Home() {
  const t = await getTranslations("HomePage")
  await dbConnect()
  const wines = await Wine.find({}).lean<WineType[]>()

  return (
    <main className="wrapp-1200">
      <h1>{t("title")}</h1>
      <Link href="/add-product">+ Add product</Link>
      <div className={st["main-content"]}>
        <div className={st["left-menu"]}>left-menu</div>
        <div className={st["prod-block"]}>
          {wines.map((wine) => (
            <WineCard key={wine._id.toString()} wine={wine} />
          ))}
        </div>
      </div>
    </main>
  )
}
