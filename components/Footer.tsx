import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-cyan-700 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between p-4 text-center md:flex-row">
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
        <a 
      href="https://github.com/juniorrondini"
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 mt-2 md:mt-0 hover:text-cyan-300 transition-colors duration-200"
    >
      Developed by Junior Rondini
    </a>
      </div>
    </footer>
  );
}
