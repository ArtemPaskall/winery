// import { getMessages } from "next-intl/server"
import AddWineForm from "./AddWineForm/page"
import { Locale } from "../../../../types"

export default async function AddWinePage({
  // params,
}: {
  params: { locale: Locale }
}) {
  // const messages = await getMessages(params.locale)
  // console.log(messages)

  return <AddWineForm />
}
