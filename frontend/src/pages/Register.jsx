import { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerTeammate } from '../api'

const emptyForm = {
  name: '',
  college: '',
  skills: '',
  looking_for: '',
}

export function Register() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [saving, setSaving] = useState(false)

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ type: '', message: '' })
    setSaving(true)
    try {
      await registerTeammate(form)
      setForm(emptyForm)
      setStatus({
        type: 'ok',
        message: 'You are listed. Others can find you on View Teammates.',
      })
    } catch (err) {
      setStatus({ type: 'err', message: err.message || 'Could not save.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="panel">
      <h1 className="page-title">Register</h1>
      <p className="muted">
        Add your profile so teammates can discover you. No login required.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Ada Lovelace"
          />
        </label>
        <label className="field">
          <span>College</span>
          <input
            required
            value={form.college}
            onChange={(e) => updateField('college', e.target.value)}
            placeholder="Your university"
          />
        </label>
        <label className="field">
          <span>Skills</span>
          <textarea
            required
            rows={3}
            value={form.skills}
            onChange={(e) => updateField('skills', e.target.value)}
            placeholder="e.g. React, Python, UI design"
          />
        </label>
        <label className="field">
          <span>Looking for</span>
          <textarea
            required
            rows={3}
            value={form.looking_for}
            onChange={(e) => updateField('looking_for', e.target.value)}
            placeholder="e.g. Backend dev for a 24h hackathon"
          />
        </label>
        {status.message && (
          <p className={status.type === 'err' ? 'form-error' : 'form-success'}>
            {status.message}
          </p>
        )}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Submit'}
          </button>
          <Link to="/teammates" className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  )
}
