import { useCallback, useEffect, useState } from 'react'
import { fetchUsers, searchBySkill } from '../api'
import { UserCard } from '../components/UserCard'

export function Teammates() {
  const [users, setUsers] = useState([])
  const [skillQuery, setSkillQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (e) {
      setError(e.message || 'Failed to load teammates.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  async function handleSearch(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await searchBySkill(skillQuery)
      setUsers(data)
    } catch (e) {
      setError(e.message || 'Search failed.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="teammates-page">
      <div className="panel teammates-intro">
        <h1 className="page-title">Teammates</h1>
        <p className="muted">Browse everyone who has registered, or filter by skill.</p>
        <form className="search-row" onSubmit={handleSearch}>
          <label className="search-field">
            <span className="sr-only">Search by skill</span>
            <input
              value={skillQuery}
              onChange={(e) => setSkillQuery(e.target.value)}
              placeholder="Search by skill (e.g. Python)"
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setSkillQuery('')
              loadAll()
            }}
          >
            Show all
          </button>
        </form>
      </div>

      {error && <p className="banner-error">{error}</p>}
      {loading && <p className="muted center">Loading…</p>}

      {!loading && !error && users.length === 0 && (
        <p className="muted center">No teammates yet. Be the first to register.</p>
      )}

      {!loading && users.length > 0 && (
        <div className="card-grid">
          {users.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}
    </section>
  )
}
