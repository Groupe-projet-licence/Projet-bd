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


import { useEffect } from 'react';
import axios from 'axios';
import { messaging, getToken, onMessage } from './firebase-config';




function App() {

  //Pour la reception des notifiactions
  const token = localStorage.getItem('token')

  useEffect(() => {
    getToken(messaging, { vapidKey: "TA_VAPID_KEY" }).then((currentToken) => {
      if (currentToken) {
        // Appel direct au backend pour enregistrer le token
        axios.post("http://localhost:8081/api/users/token", {
          fcmToken: currentToken,
          userId: "ID_DE_LUTILISATEUR"
          // ici, récupère le vrai userId depuis le système d'auth React/JWT
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }).catch(error => {
          console.error("Erreur lors de l'enregistrement du token FCM :", error);
        });
      }
    }).catch((err) => {
      console.error("Impossible de récupérer le token FCM :", err);
    });

    // Réception des notifications en live pendant que l’app est ouverte
    onMessage(messaging, (payload) => {
      alert(payload.notification.title + "\n" + payload.notification.body);
    });
  }, []);


  return <BrowserRouter >
    <FlashProvider>
      <AuthProvider>
        <Header />
        <MyFlashMessage />
        <Routes>

          <Route path="/" element={<Home />} />

          {/* Routes pour les utilisateurs  */}

          {/* <Route path="/users" element={<Users />} /> */}
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