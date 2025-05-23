/**
 * Affiche un message flash
 * @param {message:string, type:string} msgFlash
 */

import { useEffect } from 'react'
import { useFlashMessage } from "../Contexts/FlashProvider"


export default function MyFlashMessage() {
    const { msgFlash, showFlashMsg } = useFlashMessage()

    useEffect(() => {
        if (msgFlash.message) {
            const timer = setTimeout(() => {
                showFlashMsg()
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [msgFlash])

    return <div className="container">
        {
            msgFlash.message ?
                (<div className={`alert alert-${msgFlash.type}`} >
                    {msgFlash.message}
                </div >)
                :
                null
        }
    </div >
}
