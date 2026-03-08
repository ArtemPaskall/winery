import AddWineForm from "./AddWineForm/page"
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("AddWine")

  return {
    title: t("pageTitle"),
  }
}

export default function AddWinePage() {
  return (
    <>
      <AddWineForm />
    </>
  )
}
