import { useDeleteAuthorMutation } from '../api/apiSlice'
import { useParams, useNavigate } from 'react-router-dom'

const Author = () => {
  const navigate = useNavigate()
  const { authorId } = useParams()
  const [deleteAuthor, { isLoading }] = useDeleteAuthorMutation()

  const handleDelete = async () => {
    try {
      const payload = await deleteAuthor(authorId).unwrap()
      console.log('Fulfilled', payload.message)
      navigate('/')
    } catch (error) {
      console.error('Rejected', error.data.message)
    }
  }

  return (
    <div>
      <p>Author</p>
      <button
        className="btn bg-red-500 hover:bg-red-800 btn-xs"
        onClick={handleDelete}
      >
        Delete author
      </button>
    </div>
  )
}
export default Author
