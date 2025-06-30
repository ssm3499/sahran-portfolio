import Link from 'next/link'

export default function Home() {
  return (
    <section className="card">
      <h1 className="heading-large">Hi, I’m Sahran Saleem Merchant 👋</h1>
      <p className="subheading">
        Motivated computer science student with a passion for problem-solving and a keen interest in software development.
      </p>
      <div className="button-group">
        <Link href="/about"><button className="btn">About</button></Link>
        <Link href="/projects"><button className="btn">Projects</button></Link>
        <Link href="/contact"><button className="btn">Contact</button></Link>
      </div>
      
      
    </section>
  )
}
