import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Posts from './features/post/Posts'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="post">
            <Route index element={<Posts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
export default App
