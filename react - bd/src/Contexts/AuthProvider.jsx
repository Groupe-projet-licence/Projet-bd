import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFlashMessage } from "./FlashProvider"

const AuthContext = createContext()


export default function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const { showFlashMsg } = useFlashMessage()
    const navigate = useNavigate()

    const login = async (credentials) => {
        try {
            //const response = await axios.post("https://localhost:8080/api/users/login", credentials)

            setUser(credentials)
            navigate("/tasks")
        } catch (e) {
            showFlashMsg("La connexion a echoué, veuillez réessayer!", "danger")
        }
    }

    const logout = async () => {
        try {
            const response = await axios.delete("https://localhost:8080/api/users/logout")

            setUser(null)
        } catch (e) {
            showFlashMsg("Une erreur s'est produit, veuillez réessayer !", "danger")
        }

    }
    return <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export function useUser() {
    return useContext(AuthContext)
}

