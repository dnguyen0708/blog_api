import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import BlogList from './BlogList';
import Blog from './Blog';
import BlogForm from './BlogForm';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm/>} />
          <Route path="/blogs" element={<BlogList/>} />
          <Route path="/blogs/:blogId" element={<Blog/>}/>
          <Route path="/blogs/newblog" element={<BlogForm/>}/>
          <Route path="/blogs/:blogId/editblog" element={<BlogForm/>}/>
          <Route path="*" element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
           }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
