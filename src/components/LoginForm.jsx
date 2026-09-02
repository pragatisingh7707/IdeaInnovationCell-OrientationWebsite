import { useState } from 'react'
import { Building2, IdCard, Mail, Sparkles, UserRound } from 'lucide-react'

const fields = [
  { name: 'fullName', label: 'FULL NAME', placeholder: 'ENTER YOUR FULL NAME', icon: UserRound, type: 'text' },
  { name: 'branch', label: 'BRANCH / DEPARTMENT', placeholder: 'E.G. COMPUTER SCIENCE', icon: Building2, type: 'text' },
  { name: 'registrationId', label: 'REGISTRATION ID', placeholder: 'ENTER YOUR ID NUMBER', icon: IdCard, type: 'text' },
  { name: 'email', label: 'EMAIL ID', placeholder: 'YOUR.NAME@COLLEGE.EDU', icon: Mail, type: 'email' },
]

function LoginForm({ onGenerate }) {
  const [form, setForm] = useState({ fullName: '', branch: '', registrationId: '', email: '' })
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (Object.values(form).some((value) => !value.trim())) {
      setError('ALL FIELDS ARE REQUIRED TO GENERATE YOUR PASS.')
      return
    }
    setError('')
    onGenerate(form)
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-card-top"><span>IDENTITY VERIFICATION</span><span className="form-code">IIC / 026 <b className="live-status"><i /> LIVE</b></span></div>
      <div className="form-fields">
        {fields.map(({ name, label, placeholder, icon: Icon, type }) => (
          <label className="input-group" key={name}>
            <span className="input-label"><Icon size={15} /> {label}</span>
            <input
              type={type}
              value={form[name]}
              placeholder={placeholder}
              onChange={(event) => setForm({ ...form, [name]: event.target.value })}
              autoComplete={name === 'email' ? 'email' : 'off'}
            />
          </label>
        ))}
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="generate-button" type="submit">GENERATE PASS <Sparkles size={17} /></button>
      <p className="form-note"><span /> YOUR DATA REMAINS WITHIN THE CELL NETWORK</p>
    </form>
  )
}

export default LoginForm
