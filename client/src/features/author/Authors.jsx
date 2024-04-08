import { useGetAuthorsQuery } from '../api/apiSlice'
import AuthorExcerpt from '../author/AuthorExcerpt'

const Authors = () => {
  const {
    data: authors,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAuthorsQuery()

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (isSuccess) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {authors.map((author) => (
          <AuthorExcerpt key={author._id} author={author} />
        ))}
      </div>
    )
  }

  if (isError) {
    content = <p>{error?.data?.message || 'An error occurred.'}</p>
  }

  return <div>{content}</div>
}
export default Authors
