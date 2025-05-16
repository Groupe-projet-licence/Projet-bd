import { createContext, useContext, useState } from "react"

const flashMessageContext = createContext()

export default function FlashProvider({ children }) {

    const [msgFlash, setMessageFlash] = useState({ message: "", type: "success" })

    const showFlashMsg = (message = "", type = 'success') => {
        setMessageFlash({ message, type })
    }

    return <flashMessageContext.Provider value={{ msgFlash, showFlashMsg }} >
        {children}
    </flashMessageContext.Provider>
}

export function useFlashMessage() {
    return useContext(flashMessageContext)
}
