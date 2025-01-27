import Link from "next/link"
import MusicPlayer from "./MusicPlayer"

export default function Header() {
  return (
    <header className="border-b border-cyan-700 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <MusicPlayer />
      </div>
      <meta name="google-adsense-account" content="ca-pub-8997726626133132"></meta>
    </header>
  )
}

