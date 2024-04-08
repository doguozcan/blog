import { useGetPostQuery } from '../api/apiSlice'
import { useParams } from 'react-router-dom'
import { useDeletePostMutation } from '../api/apiSlice'
import { useNavigate } from 'react-router-dom'

const Post = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId)

  const [deletePost, { isLoading: deleteIsLoading }] = useDeletePostMutation()

  const handleDelete = async () => {
    try {
      const payload = await deletePost(postId).unwrap()
      console.log('Fulfilled', payload.message)
      // Fulfilled Post with id 66139120d85335b9e7f87419 deleted successfully!'
      navigate('/')
    } catch (error) {
      console.error('Rejected', error.data.message)
      // Rejected Post not found so it cannot be deleted.
    }
  }

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (isSuccess) {
    content = (
      <div className="border-2 border-secondary p-3 m-2 rounded-lg flex flex-col justify-between">
        <h2 className="text-xl mb-1">{post.title}</h2>
        <p className="mb-2">{post.content}</p>
        <p className="text-sm mb-3">{post.author.name}</p>
        <button
          className="btn btn-warning"
          onClick={handleDelete}
          disabled={deleteIsLoading}
        >
          Delete post
        </button>
      </div>
    )
  }

  if (isError) {
    content = <p>{error?.data?.message || 'An error occurred.'}</p>
  }

  return <div>{content}</div>
}
export default Post
