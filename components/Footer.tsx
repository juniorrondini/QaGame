import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-cyan-700 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <p className="text-cyan-400">&copy; {currentYear} CyberQuiz. All rights reserved.</p>
        <nav>
          <ul className="flex space-x-4">
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
      </div>
    </footer>
  );
}
