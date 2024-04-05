import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="p-5 bg-neutral flex justify-center space-x-10">
      <Link to="posts">Posts</Link>
      <Link to="authors">Authors</Link>
    </div>
  )
}
export default Navbar
