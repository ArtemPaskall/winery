import { NextIntlClientProvider } from "next-intl"
import "./styles/globals.scss"
import { Montserrat, Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import Head from "next/head"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-montserrat",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "700"],
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

  return (
    <html lang={locale} className={`${montserrat.variable} ${inter.variable}`}>
      <Head>
        <link rel="icon" href="./favicon.png" />
      </Head>
      <body>
        <NextIntlClientProvider>
          <SessionProvider>{children}</SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
