export function UserCard({ user }) {
  const created =
    user.created_at &&
    new Date(user.created_at).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })

  return (
    <article className="user-card">
      <h3 className="user-card__name">{user.name}</h3>
      <p className="user-card__meta">
        <span className="label">College</span>
        {user.college}
      </p>
      <p className="user-card__block">
        <span className="label">Skills</span>
        {user.skills}
      </p>
      <p className="user-card__block">
        <span className="label">Looking for</span>
        {user.looking_for}
      </p>
      {created && (
        <p className="user-card__date">
          <span className="label">Listed</span>
          {created}
        </p>
      )}
    </article>
  )
}
