import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Posts from './features/post/Posts'
import Post from './features/post/Post'
import AddPost from './features/post/AddPost'

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
        </Route>
      </Routes>
    </Router>
  )
}
export default App
