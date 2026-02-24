import { NextIntlClientProvider } from "next-intl"
import "./styles/globals.scss"
import { Montserrat, Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { getMessages } from "next-intl/server"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-montserrat",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "700"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Winery",
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const { locale } = params
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SessionProvider>{children}</SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
