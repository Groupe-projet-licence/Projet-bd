import { useState } from "react"
import { useId } from "react"
import Header from "../Components/Header"
import { useUser } from "../Contexts/AuthProvider"

export default function Login() {

    const {user, login}= useUser()
    const id2 = useId()
    const id1 = useId()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        login({email, password})
    } 

    return <div className="container">
        <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-xl-7">
                <form onSubmit={handleSubmit}>

                    <div className="from-group">
                        <label htmlFor={id2}>Email</label>
                        <input type="email" id={id2}
                        name="email"
                            className="form-control"
                            defaultValue="" />
                    </div>
                    <div className="from-group">
                        <label htmlFor={id1}>Mot de passe</label>
                        <input type="password" id={id1} 
                        name="password"
                        className="form-control" />
                    </div>
                    <div className="text-center mt-2">
                        <button className="btn btn-primary" type="submit">
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>
}