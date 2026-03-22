import { Link } from 'react-router-dom'

export function Home() {
  return (
    <section className="panel home-panel">
      <h1 className="page-title">TeamUp</h1>
      <p className="tagline">
        A simple place to list yourself and find teammates for hackathons and
        technical events.
      </p>
      <div className="home-actions">
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
        <Link to="/teammates" className="btn btn-ghost">
          View Teammates
        </Link>
      </div>
    </section>
  )
}
