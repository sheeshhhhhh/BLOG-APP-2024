import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { useAuthContext } from './Context/AuthContext'
import { Toaster } from 'react-hot-toast'

import Profile from './Pages/Profile'
import Blog from './Pages/Blog'
import CreateBlog from './Pages/CreateBlog'
import Setting from './Pages/Setting'
import Nav from './Components/Nav'
import Explore from './Pages/Explore'
import ForgetPassword from './Pages/ForgetPassword'

function App() {


  // We should add a blog app where it desplay the Blogs
  // and blog dynamic where we could access the blogs when click
  
  const { user, loading} = useAuthContext()

  if (loading) return null
  // why do we need loading? because we are stil waiting for the fetch on user if we did not do loading then 
  // they will redirect immidietly without the results

  return (
    <div>
      {user?.user?._id && <Nav />}
      <Routes>
        <Route path='/' element={user?.user?._id ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={!user?.user?._id ? <Login /> : <Navigate to={'/'} />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/signup' element={!user?.user?._id ? <SignUp /> : <Navigate to={'/'} />} />
        <Route path='/createBlog' element={user?.user?._id ? <CreateBlog /> : <Navigate to={'/login'} />} />
        <Route path='/settings/*' element={user?.user?._id ? <Setting /> : <Navigate to={'/login'} />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/Blog/:id' element={<Blog />} />
        <Route path='/error' element={<Error />} />
        <Route path='/explore' element={<Explore /> } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
