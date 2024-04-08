import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Posts from './features/post/Posts'
import Post from './features/post/Post'
import AddPost from './features/post/AddPost'
import Authors from './features/author/Authors'
import Author from './features/author/Author'
import AddAuthor from './features/author/AddAuthor'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts />} />
          <Route path="post">
            <Route index element={<Posts />} />
            <Route path=":postId" element={<Post />} />
            <Route path="add-post" element={<AddPost />} />
          </Route>
          <Route path="author">
            <Route index element={<Authors />} />
            <Route path=":authorId" element={<Author />} />
            <Route path="add-author" element={<AddAuthor />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
export default App
