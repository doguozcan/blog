const AuthorExcerpt = ({ author }) => {
  return (
    <div className="border-2 border-accent p-3 rounded-lg">
      <h2 className="text-xl mb-1">{author.name}</h2>
    </div>
  )
}

export default AuthorExcerpt
