import { useEffect, useState } from 'react'

const getRemaining = (targetDate) => {
  const difference = Math.max(0, new Date(targetDate).getTime() - Date.now())
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

const pad = (value) => String(value).padStart(2, '0')

function CountdownTimer({ targetDate }) {
  const [remaining, setRemaining] = useState(() => getRemaining(targetDate))

  useEffect(() => {
    const interval = window.setInterval(() => setRemaining(getRemaining(targetDate)), 1000)
    return () => window.clearInterval(interval)
  }, [targetDate])

  return (
    <div className="countdown-wrap" aria-label="Time remaining until orientation">
      <div className="countdown-heading"><span /> COUNTDOWN TO LAUNCH <span /></div>
      <div className="countdown-digits">
        {Object.entries(remaining).map(([unit, value]) => (
          <div className="time-unit" key={unit}>
            <strong>{pad(value)}</strong>
            <small>{unit.slice(0, 3).toUpperCase()}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountdownTimer
