import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Register from './Auth/Register'
import Login from './Auth/Login'
import FlashProvider from './Contexts/FlashProvider'
import MyFlashMessage from './Components/MyFlashMessage'
import Header from './Components/Header'
import AuthProvider from './Contexts/AuthProvider'
import Home from './Home'
import Users from './users/Users'
import CreateEditTask from './Tasks/CreateEditTask'
import Tasks from './Tasks/Tasks'



function App() {
  return <BrowserRouter >
    <FlashProvider>
      <AuthProvider>
        <Header />
        <MyFlashMessage />
        <Routes>

          <Route path="/" element={<Home />} />

          {/* Routes pour les utilisateurs  */}

          <Route path="/users" element={<Users />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/:id/edit" element={<Register />} />

          {/* Routes pour les tâches  */}

          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/create" element={<CreateEditTask />} />
          <Route path="/tasks/:id/edit" element={<CreateEditTask />} />

        </Routes>

      </AuthProvider>
    </FlashProvider>
  </BrowserRouter>
}

export default App