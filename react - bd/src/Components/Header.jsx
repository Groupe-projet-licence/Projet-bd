import { Link } from "react-router-dom";
import { useUser } from "../Contexts/AuthProvider";

export default function Header() {
    const { user } = useUser()


    return <>

        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container-fluid">
                <Link className="nav-link" to="/">Home</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks">Todos</Link>
                        </li>
                        {user &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/users/logout">Logout</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>

    </>
}
