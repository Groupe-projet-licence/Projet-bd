/**
 * Affiche normalement la page d'accueil. 
 * Mais pour le moment, ce composant fait juste une redirection vers le formulaire d'inscription.
 */

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "./Contexts/AuthProvider"


export default function Home() {

    const { user } = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        user ? navigate('/tasks') : navigate('/users/register')
    }, [])

    return null
}