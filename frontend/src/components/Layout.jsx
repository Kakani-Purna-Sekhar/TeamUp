import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/" className="brand">
          TeamUp
        </Link>
        <nav className="nav">
          <Link to="/register">Register</Link>
          <Link to="/teammates">View Teammates</Link>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
