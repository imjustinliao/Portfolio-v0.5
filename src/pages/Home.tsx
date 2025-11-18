import Hero from '../components/Hero'
import Resume from '../components/Resume'

export default function Home() {
  return (
    <section className="page-shell" aria-label="Home">
      <Hero />
      <Resume />
    </section>
  )
}

