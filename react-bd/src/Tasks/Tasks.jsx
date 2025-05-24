/**
 * Affiche un tableau contenant l'ensemble des tâches enregistées
 */
import { useEffect, useState } from "react"
import axios from "axios"
import { useFlashMessage } from "../Contexts/FlashProvider"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../Contexts/AuthProvider"

export default function Tasks() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user } = useUser()
    const { msgFlash, showFlashMsg } = useFlashMessage()

    const [notDone, setNotDone] = useState(false)
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/tasks', {
                headers: { Authorization: ` Bearer ${token} ` }
            })
            setTasks(response.data)
        } catch (e) {
            console.log(e);
            showFlashMsg("Une erreur s'est produite et les tâches n'ont pas pu être récupérées", "danger")
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette tâche ?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8082/api/tasks/${id}`, {
                headers: { Authorization: ` Bearer ${token}` }
            })
            showFlashMsg("Tâche supprimée avec succès.", "success")
            fetchTasks()
        } catch (e) {
            console.log(e);
            showFlashMsg("Erreur lors de la suppression.", "danger")
        }
    }

    // const tasks = [
    //     { idT: 1, title: "Ma tâche 1", dateline: "15-05-2025", status: false },
    //     { idT: 2, title: "Ma tâche 2", dateline: "15-05-2025", status: true },
    // ]

    useEffect(() => {
        if (!user) {
            navigate('/users/register')
        } else {
            fetchTasks()
        }
    }, [user])

    const visibleTasks = tasks.filter(t => !(notDone && t.status === "DONE"))

    return (
        <div className="container">
            {!user ? null : (
                <div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="form-check form-switch">
                            <input type="checkbox"
                                className="form-check-input"
                                checked={notDone}
                                id="checkbox"
                                onChange={() => setNotDone(!notDone)} />
                            <label htmlFor="checkbox" className="form-check-label">
                                Cacher les tâches faites ?
                            </label>
                        </div>
                        <Link to="/tasks/create" className="btn btn-primary btn-sm">Ajouter</Link>
                    </div>
                    <table className="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Date limite</th>
                                <th>Date de creation</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleTasks.map(t => (
                                <tr key={t.id}>
                                    <td>{t.title}</td>
                                    <td>{t.deadline}</td>
                                    <td>{new Date(t.createdAt).toLocaleString('fr-FR')}</td>
                                    <td className="text-end">
                                        <Link to={`/tasks/${t.id}/edit`} className="btn btn-sm btn-warning me-2">Modifier</Link>
                                        <button onClick={() => handleDelete(t.id)} className="btn btn-sm btn-danger">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}