import { useMemo } from 'react'
import { useGetPostsQuery } from '../api/apiSlice'
import PostExcerpt from '../post/PostExcerpt'

const Posts = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery()

  const sortedPosts = useMemo(() => {
    return posts.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }, [posts])

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (isSuccess) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 m-2">
        {sortedPosts.map((post) => (
          <PostExcerpt key={post._id} post={post} />
        ))}
      </div>
    )
  }

  if (isError) {
    content = <p>{error?.data?.message || 'An error occurred.'}</p>
  }

  return <div>{content}</div>
}
export default Posts
