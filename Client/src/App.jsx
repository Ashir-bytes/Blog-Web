
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"


import Home from "./Page/Home"
import BlogPage from "./Page/BlogPage"
import AboutPage from "./Page/AboutPage"
import ContactPage from "./Page/ContactPage"
import SinglePage from "./Page/SinglePage"
import Login from "./Page/Login"
import "./index.css"
import Signup from "./Page/SignUp"
import UserProfile from "./Page/Userprofile"
import Admin from "./Page/Admin"
import AddPost from "./Page/AddPost"
import EditPost from "./Page/EditPost"




function App() {


  return (
    <>
      <Router>
        <Navbar />
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/posts" element={<BlogPage />} />
          <Route path="/post/:id" element={<SinglePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          {/* Admin */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add" element={<AddPost /> } />
          <Route path="/admin/edit/:id" element={<EditPost /> } />
         
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
