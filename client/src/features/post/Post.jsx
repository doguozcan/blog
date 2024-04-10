import {
  useGetPostQuery,
  useEditPostMutation,
  useDeletePostMutation,
  useGetAuthorsQuery,
} from '../api/apiSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

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

  const {
    data: authors,
    isLoading: authorsLoading,
    isError: authorsIsError,
    error: authorsError,
  } = useGetAuthorsQuery()

  const [title, setTitle] = useState('')
  const [postContent, setContent] = useState('')
  const [authorId, setAuthorId] = useState('')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setAuthorId(post.author._id)
    }
  }, [post])

  const [editPost, { editIsLoading }] = useEditPostMutation()
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

  const canSave = title && postContent && authorId && !editIsLoading

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const postToUpdate = {
        _id: postId,
        title,
        content: postContent,
        authorId,
      }

      const payload = await editPost(postToUpdate).unwrap()
      console.log('Fulfilled', payload.message)
      // Fulfilled Post with id 66139979d85335b9e7f87448 updated successfully!
      // navigate('/')
    } catch (error) {
      console.error('Rejected', error.data.message)
      // Rejected Post not found.
    }
  }

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (authorsLoading) {
    content = <p>Authors loading...</p>
  }

  if (isSuccess) {
    content = (
      <div className="flex flex-col items-center m-5">
        <div className="flex flex-col gap-2 items-center w-4/5 max-w-lg">
          <h2 className="text-xl mb-1">{post.title}</h2>
          <p className="mb-2">{post.content}</p>
          <p className="text-sm mb-3">{post.author.name}</p>
          <button
            className="btn bg-red-500 hover:bg-red-800 btn-xs mb-2"
            onClick={handleDelete}
            disabled={deleteIsLoading}
          >
            Delete post
          </button>
        </div>
        <h2 className="text-lg">Edit the post</h2>
        <form
          className="flex flex-col w-4/5 max-w-lg gap-2"
          onSubmit={handleEdit}
        >
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
          />
          <label htmlFor="content" className="text-lg">
            Content
          </label>
          <textarea
            className="p-2 rounded outline-none input input-bordered input-secondary"
            id="content"
            type="text"
            value={postContent}
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
            {authors?.map((author) => (
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

  if (isError) {
    content = <p>{error?.data?.message || 'An error occurred.'}</p>
  }

  if (authorsIsError) {
    return <p>{authorsError?.data?.message || 'An error occurred.'}</p>
  }

  return <div>{content}</div>
}
export default Post
