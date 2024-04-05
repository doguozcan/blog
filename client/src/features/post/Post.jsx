import { useGetPostQuery } from '../api/apiSlice'
import { useParams } from 'react-router-dom'

const Post = () => {
  const { postId } = useParams()
  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId)

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (isSuccess) {
    content = post.title
  }

  if (isError) {
    content = <p>{error?.data?.message || 'An error occurred.'}</p>
  }

  return <div>{content}</div>
}
export default Post
