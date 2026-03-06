import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import st from "./page.module.scss"
import dbConnect from "@/lib/mongoDB"
import Wine from "@/models/wine"
import { WineType } from "@/types"
import WineCard from "@/components/Card/page"
import Image from "next/image"
import Breadcrumbs from "@/components/Breadcrumbs/page"

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
      <Breadcrumbs></Breadcrumbs>
      <div className={st["main-content"]}>
        <div className={st["left-menu"]}>
          <Link href="/add-product" className={st["add-product-button"]}>
            <Image
              src={"/add-plus.png"}
              width={20}
              height={20}
              alt={"add wine"}
            ></Image>
            {t("add-product")}
          </Link>
          <div>left-menu 1</div>
          <div>left-menu 2</div>
          <div>left-menu 3</div>
        </div>
        <div className={st["card-block"]}>
          {wines.map((wine) => (
            <WineCard key={wine._id.toString()} wine={wine} />
          ))}
        </div>
      </div>
    </main>
  )
}
