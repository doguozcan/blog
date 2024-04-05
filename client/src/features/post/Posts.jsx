import { useGetPostsQuery } from '../api/apiSlice'

const Posts = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery()

  let content

  if (isLoading) {
    content = <p>Loading</p>
  }

  if (isSuccess) {
    content = posts.map((post) => (
      <div key={post._id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>{post.author.name}</p>
      </div>
    ))
  }

  if (isError) {
    content = <p>{error?.data?.message || 'An error occurred'}</p>
  }

  return <div>{content}</div>
}
export default Posts
