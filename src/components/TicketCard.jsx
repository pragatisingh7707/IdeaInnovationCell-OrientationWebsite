import { useRef, useState } from 'react'
import { Building2, Check, Clock3, Copy, Download, IdCard, Mail, Share2, UserRound } from 'lucide-react'
import { toPng } from 'html-to-image'

const icons = { fullName: UserRound, branch: Building2, registrationId: IdCard, email: Mail }
const labels = { fullName: 'FULL NAME', branch: 'BRANCH / DEPARTMENT', registrationId: 'REGISTRATION ID', email: 'EMAIL ID' }

const getInitials = (title) => title.split(/\s+/).filter(Boolean).map((word) => word[0]).join('').slice(0, 4).toUpperCase()
const getTicketNumber = () => String(Math.floor(100000 + Math.random() * 900000))

function TicketCard({ details, orientationTitle }) {
  const ticketRef = useRef(null)
  const [notice, setNotice] = useState('')
  const [ticketNumber] = useState(getTicketNumber)
  const [generatedAt] = useState(() => new Date())
  const initials = getInitials(orientationTitle) || 'IIC'
  const passCode = `${initials}-2K26-IIC`
  const ticketId = `IIC-${initials}-${ticketNumber}`
  const date = generatedAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
  const time = generatedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  const downloadPass = async () => {
    if (!ticketRef.current) return
    const image = await toPng(ticketRef.current, { pixelRatio: 2, backgroundColor: '#111713' })
    const link = document.createElement('a')
    link.download = `${initials.toLowerCase()}-orientation-pass.png`
    link.href = image
    link.click()
    setNotice('PASS IMAGE DOWNLOADED')
  }

  const sharePass = async () => {
    const shareData = { title: `${orientationTitle} - IIC Pass`, text: `My verified pass for ${orientationTitle}.`, url: window.location.href }
    try {
      if (navigator.share) await navigator.share(shareData)
      else await navigator.clipboard.writeText(window.location.href)
      setNotice(navigator.share ? 'PASS SHARED' : 'PASS LINK COPIED')
    } catch {
      setNotice('SHARING CANCELLED')
    }
  }

  return (
    <div className="ticket-area">
      <div className="ticket-card frame-panel" ref={ticketRef}>
        <div className="panel-corner panel-corner-tl" /><div className="panel-corner panel-corner-tr" /><div className="panel-corner panel-corner-bl" /><div className="panel-corner panel-corner-br" />
        <div className="ticket-content">
          <div className="ticket-card-top"><span>IIC × {orientationTitle}</span><span>VERIFIED ENTRY</span></div>
          <div className="ticket-kicker">IIC / VERIFIED ENTRY</div>
          <h1>{orientationTitle}</h1>
          <div className="ticket-subtitle">ORIENTATION PASS</div>
          <p className="ticket-tagline">ADMIT ONE FUTURE INNOVATOR</p>
          <div className="detail-list">
            {Object.entries(details).map(([key, value]) => {
              const Icon = icons[key]
              return <div className="ticket-detail" key={key}><Icon size={16} /><span><small>{labels[key]}</small><strong>{value}</strong></span></div>
            })}
          </div>
        </div>
        <div className="ticket-right">
          <div className="pass-placeholder">
            <div className="panel-emblem" aria-hidden="true"><span /></div>
            <svg className="authorization-emblem" viewBox="0 0 120 140" role="img" aria-label="Geometric authorization emblem">
              <defs><linearGradient id="emblem-metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f4ffe8" /><stop offset=".45" stopColor="#a9d788" /><stop offset="1" stopColor="#5cff48" /></linearGradient></defs>
              <path d="M60 5 108 22v42c0 31-20 54-48 68C32 118 12 95 12 64V22L60 5Z" fill="none" stroke="url(#emblem-metal)" strokeWidth="3" />
              <path d="M60 17 96 30v33c0 24-14 42-36 54C38 105 24 87 24 63V30L60 17Z" fill="#86d95c18" stroke="#baff91" strokeWidth="1.5" />
              <circle cx="60" cy="61" r="25" fill="none" stroke="#edffdc" strokeWidth="2" />
              <circle cx="60" cy="61" r="17" fill="none" stroke="#65dd53" strokeWidth="2" />
              <path d="m60 48 4 9 10 4-10 4-4 10-4-10-10-4 10-4 4-9Z" fill="#f1ffdc" />
            </svg>
            <strong>YOUR PASS</strong><span>AUTHORIZED ACCESS</span>
          </div>
          <div className="ticket-meta">
            <div><small>PASS CODE</small><strong>{passCode}</strong></div>
            <div><small>TICKET ID</small><strong>{ticketId}</strong></div>
            <div className="meta-row"><span><small>DATE</small><strong>{date}</strong></span><span><small>TIME</small><strong><Clock3 size={13} /> {time}</strong></span></div>
          </div>
          <div className="serial">NO. {ticketNumber}</div>
        </div>
        <div className="ticket-footer">PREPARE · INNOVATE · IMPACT <span>PASS / 026</span></div>
      </div>
      <div className="verification-row"><div className="verified-badge"><Check size={16} /> VERIFIED PASS</div><p>You are all set! Get ready for {orientationTitle}.<br className="desktop-break" /> See you at the orientation.</p></div>
      <div className="ticket-actions"><button type="button" onClick={downloadPass}><Download size={16} /> DOWNLOAD PASS</button><button type="button" onClick={sharePass}><Share2 size={16} /> SHARE PASS</button></div>
      {notice && <p className="action-notice"><Copy size={13} /> {notice}</p>}
    </div>
  )
}

export default TicketCard
