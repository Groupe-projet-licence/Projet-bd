/**
 * Affiche le formulaire d'authentification 
 */
import { useUser } from "../Contexts/AuthProvider"
import axios from "axios"
import { useFlashMessage } from "../Contexts/FlashProvider"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const { user, login } = useUser()
    const { showFlashMsg } = useFlashMessage()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value; // récupère username, pas email
        const password = e.target.password.value;
        try {
            const response = await axios.post("http://localhost:8081/api/users/login", { email, password });
            login(response.data.token);
            navigate("/tasks");
        } catch (e) {
            console.log(e);
            showFlashMsg("N'avons pas pu vous connecter; veuillez réessayer!", "danger");
        }
    }
    useEffect(() => {
        //L'instruction suivante permet de masquer les éventuelles messages flash issues des pages précédentes
        showFlashMsg()
        if (user) {
            navigate('/tasks')
        }
    }, [user])

    return <div className="container">
        {user ? null :
            <div className="row justify-content-center">
                <div className="col-12 col-md-9 col-xl-7">
                    <form onSubmit={handleSubmit}>

                        <div className="from-group">
                            <label htmlFor='email'>Email</label>
                            <input type="email" id='email'
                                name="email"
                                className="form-control"
                                defaultValue="" />
                        </div>
                        <div className="from-group">
                            <label htmlFor='password'>Mot de passe</label>
                            <input type="password" id='password'
                                name="password"
                                className="form-control" />
                        </div>
                        <div className="text-center mt-2">
                            <button className="btn btn-primary" type="submit">
                                Se connecter
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
    </div>
}