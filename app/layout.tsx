import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"; // ✅ Importação correta

const orbitron = Orbitron({ subsets: ["latin"] });

export const metadata = {
  title: "CyberQuiz",
  description: "A futuristic quiz platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={`${orbitron.className} bg-black text-cyan-400`}>
        <Providers>
          <div className="flex flex-col min-h-screen relative">
            {/* Header fixo no topo */}
            <div className="fixed top-0 left-0 w-full z-50">
              <Header />
            </div>

            {/* Conteúdo principal com padding-top e padding-bottom para não ficar atrás do Header/Footer */}
            <main className="flex-grow pt-20 pb-20 md:pt-24 md:pb-16">{children}</main>

            {/* Footer fixo no rodapé */}
            <div className="fixed bottom-0 left-0 w-full z-50">
              <Footer />
            </div>
          </div>
        </Providers>

        {/* ✅ Adiciona o Analytics da Vercel */}
      <script async src="https://appsha-prm.ctengine.io/js/script.js?wkey=t2JICZ00LK"></script>
    
        <Analytics />
      </body>
    </html>
  );
}
