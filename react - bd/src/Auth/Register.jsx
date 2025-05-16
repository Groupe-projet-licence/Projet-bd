import { useState } from "react"
import { useId } from "react"
import Header from "../Components/Header"
import { useUser } from "../Contexts/AuthProvider"
import { useNavigate } from "react-router-dom"
import Tasks from "../Tasks/Tasks"

export default function Register() {
    const [name, setName] = useState("")
    const id1 = useId()

    const [email, setEmail] = useState("")
    const id2 = useId()

    const [password, setPassword] = useState("")
    const id3 = useId()

    const { user } = useUser()
    const navigate = useNavigate()


    return <>
        {user ? navigate('/tasks') :
            (<div className="row justify-content-center container">
                <div className="col-12 col-md-9 col-xl-7">
                    <form onSubmit={() => { }} method="post">
                        <div className="from-group">
                            <label htmlFor={id1}>Nom</label>
                            <input type="text" id={id1} className="form-control"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="from-group">
                            <label htmlFor={id2}>Email</label>
                            <input type="email" id={id2} className="form-control"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="from-group">
                            <label htmlFor={id3}>Mot de passe</label>
                            <input type="password" id={id3} className="form-control"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="text-center mt-2">
                            <button className="btn btn-primary" type="submit">
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            </div>)}
    </>
}