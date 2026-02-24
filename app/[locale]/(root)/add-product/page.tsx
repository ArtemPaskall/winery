import { getMessages } from "next-intl/server"
import AddWineForm from "./AddWineForm/page"

export default async function AddWinePage({
  params,
}: {
  params: { locale: string }
}) {
  const messages = await getMessages(params.locale)
  console.log(messages)

  return <AddWineForm />
}
