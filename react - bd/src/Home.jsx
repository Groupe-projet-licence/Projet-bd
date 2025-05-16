import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFlashMessage } from "./Contexts/FlashProvider"
import { useUser } from "./Contexts/AuthProvider"



export default function Home() {

    const { user } = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        user ? navigate('/tasks') : navigate('/users/register')
    }, [])

    return null
}