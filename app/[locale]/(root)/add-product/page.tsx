// import { getMessages } from "next-intl/server"
// import AddWineForm from "./AddWineForm/page"

// export default async function AddWinePage({
//   params,
// }: {
//   params: Promise<{ locale: string }>
// }) {
//   const { locale } = await params

//   const messages = await getMessages({ locale })
//   console.log(messages)

//   return <AddWineForm />
// }

import AddWineForm from "./AddWineForm/page"

export default function AddWinePage() {
  return <AddWineForm />
}
