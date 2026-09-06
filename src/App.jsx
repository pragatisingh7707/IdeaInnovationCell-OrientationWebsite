import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import CountdownTimer from './components/CountdownTimer'
import LoginForm from './components/LoginForm'
import TicketCard from './components/TicketCard'
import './App.css'

export const orientationTitle = 'ORIENTATION 2026'
export const targetDate = '2026-09-10T17:00:00'

function App() {
  const [details, setDetails] = useState({ fullName: '', branch: '', registrationId: '', email: '' })
  const [hasGenerated, setHasGenerated] = useState(false)

  const handleGenerate = (formDetails) => {
    setDetails(formDetails)
    setHasGenerated(true)
  }

  return (
    <main className="app-shell">
      <div className="orbit-field" aria-hidden="true"><i /><i /><i /><i /><b /><b /><b /></div>
      <div className="celestial-orb" aria-hidden="true"><span /></div>
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
