/**
 * Contexte pour la gestion de l'état d'authentification de l'utilisateur
 */

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) setUser({ token })
    }, [])

    const login = async (token) => {
        localStorage.setItem('token', token)
        setUser({ token })
    }

    const logout = async () => {
        localStorage.removeItem('token')
        setUser(null)
    }
    return <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export function useUser() {
    return useContext(AuthContext)
}

