/**
 * Affiche la barre de navigation.
 */

import { Link } from "react-router-dom";
import { useUser } from "../Contexts/AuthProvider";

export default function Header() {
    const { user, logout } = useUser()

    const handleSubmit = (e) => {
        e.preventDefault()
        logout()
    }

    return <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
            <Link className="nav-link" to="/">Home</Link>

            {user && <>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks">Todos</Link>
                        </li>
                        <li className="nav-item">
                            <form onSubmit={handleSubmit}>
                                <button type="submit" className="nav-link" >Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </>
            }

            {!user &&
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/users/login">Se connecter</Link>
                    </li>
                </ul>
            }
        </div>
    </nav>
}
