import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <Link href="/"      className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/projects" className="nav-link">Projects</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
        </nav>

        <main className="main">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  )
}
