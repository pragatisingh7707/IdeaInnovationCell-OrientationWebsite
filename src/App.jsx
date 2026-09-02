import { useState } from 'react'
import { ArrowLeft, Radio } from 'lucide-react'
import CountdownTimer from './components/CountdownTimer'
import LoginForm from './components/LoginForm'
import TicketCard from './components/TicketCard'
import './App.css'

export const orientationTitle = 'ORIENTATION NAME'
export const targetDate = '2026-10-31T09:00:00'

function App() {
  const [details, setDetails] = useState({ fullName: '', branch: '', registrationId: '', email: '' })
  const [hasGenerated, setHasGenerated] = useState(false)

  const handleGenerate = (formDetails) => {
    setDetails(formDetails)
    setHasGenerated(true)
  }

  return (
    <main className="app-shell">
      <div className="energy-grid" aria-hidden="true" />
      <div className="atmosphere atmosphere-top" aria-hidden="true" />
      <div className="atmosphere atmosphere-left" aria-hidden="true" />
      <div className="atmosphere atmosphere-right" aria-hidden="true" />
      <div className="embers" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <svg className="lightning lightning-left" viewBox="0 0 190 280" aria-hidden="true">
        <defs><filter id="bolt-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
        <polyline points="12,0 83,73 57,77 122,145 91,150 169,232 126,219 184,280" />
      </svg>
      <svg className="lightning lightning-right" viewBox="0 0 190 280" aria-hidden="true">
        <polyline points="178,0 107,73 133,77 68,145 99,150 21,232 64,219 6,280" />
      </svg>
      <svg className="lightning lightning-mid" viewBox="0 0 120 190" aria-hidden="true">
        <polyline points="90,0 48,48 66,51 28,104 48,106 7,178" />
      </svg>
      <header className="site-header">
        <div className="brand-lockup">
          <span className="brand-mark"><Radio size={15} /> LIVE EVENT SYSTEM</span>
          <span>IDEA AND INNOVATION CELL</span>
        </div>
        <span className="header-status"><i /> SYSTEM ONLINE</span>
      </header>

      {hasGenerated ? (
        <section className="ticket-screen page-content">
          <div className="ticket-watermark" aria-hidden="true">IIC</div>
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
            <p className="hero-description">Claim your place at the frontier of possibility.<br />One pass. Infinite directions.</p>
            <CountdownTimer targetDate={targetDate} />
          </div>
          <div className="logo-watermark" aria-hidden="true">IIC</div>
          <LoginForm onGenerate={handleGenerate} />
        </section>
      )}

      <footer className="site-footer"><span>© 2026 IIC // ALL SYSTEMS NOMINAL</span><span>BUILD THE UNEXPECTED <b>◆</b></span></footer>
    </main>
  )
}

export default App
