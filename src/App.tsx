import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Explore from './components/Explore';
import PostList from './pages/PostList';
import PostList2 from './pages/PostList2';
import Post from './pages/Post';
import New from './pages/New';
import PostListPaginated from './pages/PostListPaginated';
import { PostListInfinite } from './pages/PostListInfinite';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/new" element={<New />} />
        <Route path="/paginated" element={<PostListPaginated />} />
        <Route path="/infinite" element={<PostListInfinite />} />
        <Route path="/list2" element={<PostList2 />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App
