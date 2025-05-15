import "../app/styles/globals.scss"
import { Montserrat, Inter } from "next/font/google"
import Head from "next/head"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
})

// export const metadata = {
//   description: `Пориньте у світ витонченого ремесла з нашою колекцією преміальних,
//    ручно виготовлених вин. Кожна пляшка розповідає історію відданості,
//    пристрасті та майстерності. Відкрийте для себе ексклюзивні вина,
//    що пропонують унікальні смаки та аромати.
//    Незалежно від того, чи ви досвідчений дегустатор,
//    чи просто любитель, наша колекція додасть елегантності та розкошів кожній події.`,
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <Head>
        <meta
          name="Пориньте у світ витонченого ремесла з нашою колекцією преміальних,
             ручно виготовлених вин. Кожна пляшка розповідає історію відданості,
             пристрасті та майстерності. Відкрийте для себе ексклюзивні вина,
             що пропонують унікальні смаки та аромати.
             Незалежно від того, чи ви досвідчений дегустатор,
             чи просто любитель, наша колекція додасть елегантності та розкошів кожній події."
        />
      </Head>
      <body>{children}</body>
    </html>
  )
}
