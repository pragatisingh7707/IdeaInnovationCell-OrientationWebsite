import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import CountdownTimer from './components/CountdownTimer'
import LoginForm from './components/LoginForm'
import TicketCard from './components/TicketCard'
import './App.css'

export const orientationTitle = 'ORIENTATION 2026'
export const targetDate = '2026-09-10T17:00:00'

const backgroundParticles = Array.from({ length: 32 }, (_, index) => ({
  '--particle-left': `${(index * 47) % 97}%`,
  '--particle-top': `${(index * 29) % 97}%`,
  '--particle-size': `${1.5 + (index % 3) * 0.75}px`,
  '--particle-delay': `${-((index * 1.7) % 18)}s`,
  '--particle-duration': `${16 + (index % 7)}s`,
  '--particle-drift-x': `${18 + (index % 5) * 12}px`,
  '--particle-drift-y': `${-12 - (index % 4) * 9}px`,
}))

function App() {
  const [details, setDetails] = useState({ fullName: '', branch: '', registrationId: '', email: '' })
  const [hasGenerated, setHasGenerated] = useState(false)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 769px) and (pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!desktopQuery.matches || reducedMotionQuery.matches) return undefined

    let frameId = 0
    const handlePointerMove = (event) => {
      if (frameId) return
      frameId = window.requestAnimationFrame(() => {
        const x = ((event.clientX / window.innerWidth) - 0.5) * 10
        const y = ((event.clientY / window.innerHeight) - 0.5) * 8
        document.documentElement.style.setProperty('--parallax-x', `${x.toFixed(2)}px`)
        document.documentElement.style.setProperty('--parallax-y', `${y.toFixed(2)}px`)
        frameId = 0
      })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frameId) window.cancelAnimationFrame(frameId)
      document.documentElement.style.removeProperty('--parallax-x')
      document.documentElement.style.removeProperty('--parallax-y')
    }
  }, [])

  const handleGenerate = (formDetails) => {
    setDetails(formDetails)
    setHasGenerated(true)
  }

  return (
    <main className="app-shell">
      <div className="animated-background" aria-hidden="true">
        <div className="background-stars">
          {backgroundParticles.map((particle, index) => <i className="background-particle" key={index} style={particle} />)}
        </div>
        <div className="background-fog" />
        <div className="background-aurora" />
        <div className="background-planet"><span /></div>
        <div className="background-grid" />
        <div className="background-radar" />
        <div className="background-meteors">
          <i className="background-meteor" />
          <i className="background-meteor" />
          <i className="background-meteor" />
        </div>
        <div className="background-energy" />
        <div className="background-scan" />
        <div className="background-grain" />
        <div className="background-vignette" />
      </div>
      <header className="site-header">
        <div className="brand-lockup">
          <strong>IIC</strong>
          <span>IDEA AND<br />INNOVATION CELL</span>
        </div>
        <div className="header-tagline">SAME MINDS<br /><em>GREATER WORLDS</em></div>
      </header>

      <div className="side-words side-words-left" aria-hidden="true">IDEAS / PEOPLE / TECHNOLOGY / A BETTER TOMORROW</div>
      <div className="side-words side-words-right" aria-hidden="true">INNOVATE / COLLABORATE / BUILD / BEYOND</div>

      {hasGenerated ? (
        <section className="ticket-screen page-content">
          <button className="back-button" type="button" onClick={() => setHasGenerated(false)}>
            <ArrowLeft size={16} /> EDIT DETAILS
          </button>
          <TicketCard details={details} orientationTitle={orientationTitle} />
        </section>
      ) : (
        <section className="landing-screen page-content">
          <div className="hero-copy">
            <p className="eyebrow">THE NEXT CHAPTER STARTS HERE</p>
            <h1>{orientationTitle}</h1>
            <div className="hero-subtitle"><span /> ORIENTATION PASS <span /></div>
            <p className="hero-description">Claim your place at the frontier of possibility. One pass. Infinite directions.</p>
            <CountdownTimer targetDate={targetDate} />
          </div>
          <LoginForm onGenerate={handleGenerate} orientationTitle={orientationTitle} />
        </section>
      )}

      <footer className="site-footer"><span /> MAKE · BREAK · CREATE <span /><b>+</b></footer>
    </main>
  )
}

export default App
