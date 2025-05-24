/**
 * Affiche le formulaire d'inscription 
 */

import { useEffect, useState } from "react"
import { useUser } from "../Contexts/AuthProvider"
import { useNavigate } from "react-router-dom"
import { useFlashMessage } from "../Contexts/FlashProvider"
import axios from "axios"

export default function Register() {
    // Pour manipuler les contextes pour l'aiuthentification et le message flash.
    const { user, login } = useUser()
    const { showFlashMsg } = useFlashMessage()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const role = 'USER';
        const credentials = { username, email, password, role };
        console.log("Données envoyées :", credentials);

        try {
            const response = await axios.post("http://localhost:8081/api/users/register", credentials);
            login(response.data.token);
            navigate("/tasks");
        } catch (e) {
            console.error("Erreur serveur :", e.response?.data || e.message);
            showFlashMsg(
                "Une erreur s'est produite et nous n'avons pas pu vous inscrire ; veuillez réessayer !",
                "danger"
            );
        }
    };

    useEffect(() => {
        //L'instruction suivante permet de masquer les éventuelles messages flash issues des pages précédentes
        showFlashMsg()
        if (user) {
            navigate('/tasks')
        }
    }, [user])


    return <div className="container">
        {user ? null :
            (<div className="row justify-content-center">
                <div className="col-12 col-md-9 col-xl-7">
                    <form onSubmit={handleSubmit}>
                        <div className="from-group">
                            <label htmlFor='name'>Nom</label>
                            <input type="text" id='name' className="form-control"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className="from-group">
                            <label htmlFor='email'>Email</label>
                            <input type="email" id='email' className="form-control"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="from-group">
                            <label htmlFor='password'>Mot de passe</label>
                            <input type="password" id='password' className="form-control"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="text-center mt-2">
                            <button className="btn btn-primary" type="submit">
                                S'inscrire
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            )}
    </div>
}