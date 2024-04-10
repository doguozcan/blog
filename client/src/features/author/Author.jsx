import { useDeleteAuthorMutation, useEditAuthorMutation } from '../api/apiSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetAuthorQuery } from '../api/apiSlice'
import PostExcerpt from '../post/PostExcerpt'
import { useState } from 'react'

const Author = () => {
  const navigate = useNavigate()
  const { authorId } = useParams()
  const [name, setName] = useState('')
  const [deleteAuthor, { isLoading }] = useDeleteAuthorMutation()
  const {
    data: author,
    isLoading: authorIsLoading,
    isSuccess,
    isError,
    error,
  } = useGetAuthorQuery(authorId)
  const [editAuthor, { isLoading: editAuthorIsLoading }] =
    useEditAuthorMutation()

  const handleDelete = async () => {
    try {
      const payload = await deleteAuthor(authorId).unwrap()
      console.log('Fulfilled', payload.message)
      navigate('/')
    } catch (error) {
      console.error('Rejected', error.data.message)
    }
  }

  let content

  if (authorIsLoading) {
    content = <p>Loading...</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const authorToUpdate = {
        _id: authorId,
        name,
      }

      const payload = await editAuthor(authorToUpdate).unwrap()
      console.log('Fulfilled', payload.message)
    } catch (error) {
      console.error('Rejected', error.data.message)
    }
  }

  const canSave = name && !editAuthorIsLoading

  if (isSuccess) {
    content = (
      <>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-center m-2">Name: {author.author.name}</p>
          <p className="text-sm text-center m-2 text-accent">
            id: {author.author._id}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-2 p-2">
          {author.posts.map((post) => (
            <PostExcerpt key={post._id} post={post} />
          ))}
        </div>
        <div className="flex flex-col items-center my-4 gap-2">
          <h2 className="text-lg">Edit the author</h2>
          <form
            className="flex flex-col w-4/5 max-w-lg gap-2"
            onSubmit={handleEdit}
          >
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <input
              className="p-2 rounded outline-none input input-bordered input-secondary"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={editAuthorIsLoading}
            />
            <button
              className="btn btn-outline btn-accent btn-sm mb-2"
              disabled={!canSave}
            >
              Send
            </button>
          </form>
        </div>
        <div className="flex justify-center">
          <button
            className="btn bg-red-500 hover:bg-red-800 btn-xs"
            onClick={handleDelete}
          >
            Delete author
          </button>
        </div>
      </>
    )
  }

  if (isError) {
    content = <p>{error?.data?.message || 'An error occurred.'}</p>
  }

  return content
}
export default Author
