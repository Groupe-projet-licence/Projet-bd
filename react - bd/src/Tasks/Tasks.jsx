/**
 * Affiche un tableau contenant l'ensemble des taches enregistées
 */

import { useEffect, useState } from "react"
import Task from "../Components/Task"
import axios from "axios"
import { useFlashMessage } from "../Contexts/FlashProvider"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../Contexts/AuthProvider"

export default function Tasks() {
    //On recupere le token cree au moment de la connection et de l'inscription
    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    const { user } = useUser()
    const { msgFlash, showFlashMsg } = useFlashMessage()

    const [notDone, setNotDone] = useState(false)
    const [tasks, setTasks] = useState([])

    // const tasks = [
    //     { idT: 1, title: "Ma tache 1", dateline: "15-05-2025", status: false },
    //     { idT: 2, title: "Ma tache 2", dateline: "15-05-2025", status: true },
    // ]

    useEffect(() => {
        const fetchTascks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tasks', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setTasks(response.data)
            } catch (error) {
                showFlashMsg("Une erreur s'est produit et les taches n'ont pas pu etre recuperées", "danger")
            }
        }
        if (!user) {
            navigate('/users/register')
        }
        fetchTascks()

    }, [user])

    const visibleTasks = tasks.filter(t => {
        if (notDone && t.status) {
            return false
        }
        return true
    })

    const TasksToDisplay = visibleTasks.map(t =>
        (<Task key={t.idT} task={t} />)
    )

    return <div className="container">
        {!user ?
            null
            :
            (<div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check form-switch">
                        <input type="checkbox"
                            className="form-check-input"
                            value={notDone}
                            id="checkbox"
                            onChange={() => { setNotDone(!notDone) }} />
                        <label htmlFor="checkbox"
                            className="form-check-label">
                            Afficher les taches non faite ?
                        </label>
                    </div>
                    <Link to="/tasks/create"
                        className="btn btn-primary btn-sm" >Ajouter</Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Titre</td>
                            <td>Date limite</td>
                            <td className="text-end">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {TasksToDisplay}
                    </tbody>
                </table>
            </div>)
        }
    </div>
}