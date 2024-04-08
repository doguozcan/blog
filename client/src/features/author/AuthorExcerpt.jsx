import { FaArrowAltCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AuthorExcerpt = ({ author }) => {
  return (
    <div className="border-2 border-accent p-3 rounded-lg flex justify-between items-center">
      <h2 className="text-xl mb-1">{author.name}</h2>
      <Link to={`/author/${author._id}`}>
        <FaArrowAltCircleRight className="text-lg text-accent" />
      </Link>
    </div>
  )
}

export default AuthorExcerpt
