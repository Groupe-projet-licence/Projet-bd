/**
 * Affiche le formulaire d'authentification 
 */
import { useUser } from "../Contexts/AuthProvider"
import axios from "axios"
import { useFlashMessage } from "../Contexts/FlashProvider"

export default function Login() {

    const { login } = useUser()
    const { showFlashMsg } = useFlashMessage()

    const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.email.value; // récupère username, pas email
    const password = e.target.password.value;
    try {
        const response = await axios.post("http://localhost:8081/api/users/login", { email, password });
        login(response.data.token);
        navigate("/tasks");
    } catch (e) {
        showFlashMsg("N'avons pas pu vous connecter; veuillez réessayer!", "danger");
    }
}

    return <div className="container">
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
        </div>

    </div>
}