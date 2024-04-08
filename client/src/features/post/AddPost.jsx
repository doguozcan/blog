import { useState } from 'react'
import { useAddPostMutation } from '../api/apiSlice'
import { useGetAuthorsQuery } from '../api/apiSlice'

const AddPost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorId, setAuthorId] = useState('')

  const [addPost, { isLoading }] = useAddPostMutation()

  const {
    data: authors,
    isLoading: authorsLoading,
    isError: authorsError,
    error,
  } = useGetAuthorsQuery()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addPost({ title, content, authorId })
    setTitle('')
    setContent('')
    setAuthorId('')
  }

  const canSave = title && content && authorId && !isLoading

  if (authorsLoading) {
    return <p>Authors loading...</p>
  }

  if (authorsError) {
    return <p>{error?.data?.message || 'An error occurred.'}</p>
  }

  return (
    <div className="flex justify-center mb-5">
      <form className="flex flex-col w-4/5 max-w-lg" onSubmit={handleSubmit}>
        <label htmlFor="title" className="text-lg">
          Title
        </label>
        <input
          className="p-2 rounded outline-none input input-bordered input-secondary"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        ></input>
        <label htmlFor="content" className="text-lg">
          Content
        </label>
        <textarea
          className="p-2 rounded outline-none input input-bordered input-secondary"
          id="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="author" className="text-lg">
          Author
        </label>
        <select
          className="p-2 rounded outline-none mb-5 input input-bordered input-secondary"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          disabled={isLoading}
        >
          <option></option>
          {authors.map((author) => (
            <option key={author._id} value={author._id}>
              {author.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-outline btn-accent btn-sm mb-2"
          disabled={!canSave}
        >
          Send
        </button>
      </form>
    </div>
  )
}
export default AddPost
