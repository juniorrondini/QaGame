import "./globals.css"
import { Providers } from "./providers"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({ subsets: ["latin"] })

export const metadata = {
  title: "CyberQuiz",
  description: "A futuristic quiz platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.className} bg-black text-cyan-400`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow relative">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

