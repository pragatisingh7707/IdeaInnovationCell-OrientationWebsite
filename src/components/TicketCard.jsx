import { useRef, useState } from 'react'
import {
  Building2,
  Calendar,
  Check,
  Clock3,
  Download,
  IdCard,
  Mail,
  MapPin,
  Share2,
  Sparkles,
  UserRound
} from 'lucide-react'
import { toPng } from 'html-to-image'

const icons = { fullName: UserRound, branch: Building2, registrationId: IdCard, email: Mail }
const labels = { fullName: 'ATTENDEE NAME', branch: 'BRANCH / DEPARTMENT', registrationId: 'REGISTRATION ID', email: 'OFFICIAL EMAIL' }

const EVENT_DATE = '10 Sept 2026'
const EVENT_TIME = '5:00 PM onwards'
const EVENT_VENUE = 'Sir Visveswaraya Auditorium'

const getInitials = (title) => title.split(/\s+/).filter(Boolean).map((word) => word[0]).join('').slice(0, 4).toUpperCase()
const getTicketNumber = () => String(Math.floor(100000 + Math.random() * 900000))

function TicketCard({ details, orientationTitle }) {
  const ticketRef = useRef(null)
  const [notice, setNotice] = useState('')
  const [ticketNumber] = useState(getTicketNumber)
  const initials = getInitials(orientationTitle) || 'IIC'
  const passCode = `${initials}-2K26-IIC`
  const ticketId = `IIC-${initials}-${ticketNumber}`

  const downloadPass = async () => {
    if (!ticketRef.current) return
    try {
      const image = await toPng(ticketRef.current, { pixelRatio: 3, backgroundColor: '#07100c' })
      const link = document.createElement('a')
      link.download = `${initials.toLowerCase()}-orientation-pass-${ticketNumber}.png`
      link.href = image
      link.click()
      setNotice('PASS DOWNLOADED IN HIGH RESOLUTION')
    } catch {
      setNotice('FAILED TO DOWNLOAD PASS')
    }
  }

  const sharePass = async () => {
    const shareData = {
      title: `${orientationTitle} - IIC Entry Pass`,
      text: `My verified pass for ${orientationTitle} at ${EVENT_VENUE} on ${EVENT_DATE} (${EVENT_TIME}).`,
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setNotice('PASS SHARED SUCCESSFULLY')
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setNotice('PASS LINK COPIED TO CLIPBOARD')
      }
    } catch {
      setNotice('SHARING CANCELLED')
    }
  }

  return (
    <div className="ticket-area">
      <div className="ticket-card frame-panel landscape-ticket" ref={ticketRef}>
        {/* Left: Main Ticket Section */}
        <div className="ticket-main">
          <div className="ticket-header-strip">
            <div className="ticket-cell-tag">
              <span className="cell-dot" />
              <strong>IIC × {orientationTitle}</strong>
            </div>
            <div className="ticket-status-pill">VERIFIED ENTRY</div>
          </div>

          <div className="ticket-title-block">
            <div className="ticket-kicker">IDEA & INNOVATION CELL PRESENTS</div>
            <h1 className="ticket-title">{orientationTitle}</h1>
            <div className="ticket-pass-badge">
              <span>ORIENTATION PASS</span>
              <small>ADMIT ONE</small>
            </div>
          </div>

          {/* Attendee Details Grid */}
          <div className="ticket-details-grid">
            {Object.entries(details).map(([key, value]) => {
              const Icon = icons[key] || UserRound
              return (
                <div className="ticket-detail-item" key={key}>
                  <Icon size={13} className="detail-icon" />
                  <div className="detail-content">
                    <small>{labels[key] || key.toUpperCase()}</small>
                    <strong>{value || '—'}</strong>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Event Logistics (Date, Time, Venue) */}
          <div className="ticket-event-bar">
            <div className="event-pill">
              <Calendar size={12} className="pill-icon" />
              <div>
                <small>DATE</small>
                <strong>{EVENT_DATE}</strong>
              </div>
            </div>
            <div className="event-pill">
              <Clock3 size={12} className="pill-icon" />
              <div>
                <small>TIME</small>
                <strong>{EVENT_TIME}</strong>
              </div>
            </div>
            <div className="event-pill venue-pill">
              <MapPin size={12} className="pill-icon" />
              <div>
                <small>VENUE</small>
                <strong>{EVENT_VENUE}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Perforation Tear Line with Notches */}
        <div className="ticket-perforation" aria-hidden="true">
          <span className="notch notch-top" />
          <div className="dashed-divider" />
          <span className="notch notch-bottom" />
        </div>

        {/* Right: Ticket Stub / Access Matrix */}
        <div className="ticket-stub">
          <div className="stub-emblem-wrap">
            <svg className="authorization-emblem" viewBox="0 0 120 140" role="img" aria-label="Geometric authorization emblem">
              <defs>
                <linearGradient id="emblem-metal" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f4ffe8" />
                  <stop offset=".45" stopColor="#a9d788" />
                  <stop offset="1" stopColor="#5cff48" />
                </linearGradient>
              </defs>
              <path d="M60 5 108 22v42c0 31-20 54-48 68C32 118 12 95 12 64V22L60 5Z" fill="none" stroke="url(#emblem-metal)" strokeWidth="3" />
              <path d="M60 17 96 30v33c0 24-14 42-36 54C38 105 24 87 24 63V30L60 17Z" fill="#86d95c18" stroke="#baff91" strokeWidth="1.5" />
              <circle cx="60" cy="61" r="25" fill="none" stroke="#edffdc" strokeWidth="2" />
              <circle cx="60" cy="61" r="17" fill="none" stroke="#65dd53" strokeWidth="2" />
              <path d="m60 48 4 9 10 4-10 4-4 10-4-10-10-4 10-4 4-9Z" fill="#f1ffdc" />
            </svg>
            <div className="stub-auth-text">
              <strong>AUTHORIZED</strong>
              <small>ACCESS PASS</small>
            </div>
          </div>

          <div className="stub-meta">
            <div className="stub-meta-item">
              <small>PASS CODE</small>
              <strong>{passCode}</strong>
            </div>
            <div className="stub-meta-item">
              <small>TICKET ID</small>
              <strong>{ticketId}</strong>
            </div>
          </div>

          {/* Futuristic Barcode / Scanning Pattern */}
          <div className="stub-barcode-zone">
            <div className="barcode-bars" aria-hidden="true">
              <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
            </div>
            <div className="stub-serial">NO. {ticketNumber}</div>
          </div>
        </div>

        {/* Watermark / Micro Footer Line */}
        <div className="ticket-bottom-strip">
          <span>MAKE · BREAK · CREATE</span>
          <span>PASS / 2026</span>
        </div>
      </div>

      {/* Verification & Sharing Controls */}
      <div className="verification-row">
        <div className="verified-badge">
          <Check size={16} /> VERIFIED PASS
        </div>
        <p>
          You are all set! Present this pass at <strong>{EVENT_VENUE}</strong> on <strong>{EVENT_DATE}</strong> ({EVENT_TIME}).
        </p>
      </div>

      <div className="ticket-actions">
        <button type="button" onClick={downloadPass} className="action-btn download-btn">
          <Download size={16} /> DOWNLOAD PASS
        </button>
        <button type="button" onClick={sharePass} className="action-btn share-btn">
          <Share2 size={16} /> SHARE PASS
        </button>
      </div>

      {notice && (
        <p className="action-notice" role="status">
          <Sparkles size={14} /> {notice}
        </p>
      )}
    </div>
  )
}

export default TicketCard
