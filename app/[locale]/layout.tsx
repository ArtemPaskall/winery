import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import "./styles/globals.scss"
import { Montserrat, Inter } from "next/font/google"
import Head from "next/head"
import { SessionProvider } from "next-auth/react"

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <html lang={locale} className={`${montserrat.variable} ${inter.variable}`}>
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
      <body>
        <NextIntlClientProvider>
          <SessionProvider>{children}</SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
