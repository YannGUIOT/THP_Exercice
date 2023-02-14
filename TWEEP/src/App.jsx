
import './App.css';
import { Navbar } from './components/Navbar/Navbar';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import {Home} from './pages/home/home';
import {Register} from './pages/register/register';
import {LogIn} from './pages/login/login';
import {LogOut} from './components/LogOut/LogOut';
import {EditProfile} from './pages/profile/editProfile';
import {ViewProfile} from './pages/profile/viewProfile';
import { NewPost } from './pages/Post/NewPost';
import {NotFound} from './pages/notfound/notFound';

function App() {

  return (
    <Router>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/profile/:profileSlug" element={<ViewProfile />} />
        <Route path="/create" element={<NewPost />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  </Router>
  )
}

export default App
