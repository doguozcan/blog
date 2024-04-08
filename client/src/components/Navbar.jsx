import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="p-5 bg-neutral flex justify-center space-x-10">
      <Link to="post">Post</Link>
      <Link to="author">Author</Link>
      <Link to="author/add-author">Add Author</Link>
      <Link to="post/add-post">Add Post</Link>
    </div>
  )
}
export default Navbar
