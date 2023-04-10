import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PostListData from './components/PostListData';
import UserListData from './components/UserListData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PostListData/>}/>
        <Route path='/userlist' element={<UserListData/>}/>
      </Routes>
    </Router>
  );
}

export default App;
