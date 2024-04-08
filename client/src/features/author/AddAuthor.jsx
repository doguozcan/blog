import { useState } from 'react'
import { useAddAuthorMutation } from '../api/apiSlice'

const AddPost = () => {
  const [name, setName] = useState('')

  const [addAuthor, { isLoading }] = useAddAuthorMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addAuthor({ name })
    setName('')
  }

  const canSave = name && !isLoading

  return (
    <div className="flex justify-center">
      <form className="flex flex-col w-4/5 max-w-lg" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-lg">
          Name
        </label>
        <input
          className="p-2 rounded outline-none input input-bordered input-secondary"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
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
