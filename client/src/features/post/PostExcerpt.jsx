import { Link } from 'react-router-dom'

const PostExcerpt = ({ post }) => {
  return (
    <div className="border-2 border-accent p-3 rounded-lg">
      <h2 className="text-xl mb-1">{post.title}</h2>
      <p className="mb-2">{post.content}</p>
      <p className="text-sm mb-3">{post.author.name}</p>
      <button className="btn btn-outline btn-accent btn-sm">
        <Link to={`/post/${post._id}`}>View post</Link>
      </button>
    </div>
  )
}
export default PostExcerpt
