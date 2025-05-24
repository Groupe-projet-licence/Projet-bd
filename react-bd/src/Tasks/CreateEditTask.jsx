/**
 * Composant permettant la creation et la modification d'une tâche
 */

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../Contexts/AuthProvider"
import { useFlashMessage } from "../Contexts/FlashProvider"
import axios from "axios"

export default function CreateEditTask() {
    const [task, setTask] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useUser()
    const { showFlashMsg } = useFlashMessage()

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!user) {
            navigate('/users/register')
        }
        if (id) {
            const fetchTask = async () => {
                try {
                    const response = await axios.get(`http://localhost:8082/api/tasks/${id}/edit`, {
                        headers: { Authorization:` Bearer ${token} `}
                    })
                    setTask(response.data)
                } catch (e) {
                    showFlashMsg("Erreur lors du chargement de la tâche", "danger")
                }
            }
            fetchTask()
        }
    }, [id, user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const title = e.target.title.value;
        const description = e.target.description.value;
        const deadline = e.target.deadline.value;
        const status = e.target.status?.checked ? "DONE" : "EN_COURS";
        const dataTask = { title, description, deadline, status }

        if (!title.trim() || !description.trim() || !deadline) {
    showFlashMsg("Veuillez remplir tous les champs obligatoires.", "danger");
    return; //validation des donnees
}

        try {
            if (!task) {
                await axios.post("http://localhost:8082/api/tasks/create", dataTask, {
                    headers: { Authorization: `Bearer ${token} `}
                })
                showFlashMsg("Tâche créée avec succès", "success")
            } else {
                await axios.patch(`http://localhost:8082/api/tasks/${id}/edit`, dataTask, {
                    headers: { Authorization:`Bearer ${token}`}
                })
                showFlashMsg("Tâche modifiée avec succès", "success")
            }
            navigate('/tasks')
        } catch (e) {
            showFlashMsg("Erreur lors de l'enregistrement de la tâche", "danger")
        }
    }

    return (
        <div className="container">
            {!user ? null : (
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9 col-xl-7 mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor='title'>Titre</label>
                                <input type="text" name="title" id="title" className="form-control"
                                    defaultValue={task?.title ?? ''} required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor='description'>Description</label>
                                <textarea id='description' name="description" className="form-control"
                                    defaultValue={task?.description ?? ''} rows={4} required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor='deadline'>Date limite</label>
                                <input type="datetime-local" name="deadline" id="deadline" className="form-control"
                                    defaultValue={task?.deadline ?? ''} required />
                            </div>
                            {id && (
                                <div className="form-check mt-3">
                                    <input type="checkbox" name="status" id="status" className="form-check-input"
                                        defaultChecked={task?.status === "DONE"} />
                                    <label htmlFor="status" className="form-check-label">Tâche accomplie ?</label>
                                </div>
                            )}
                            <div className="text-center mt-4">
                                <button className="btn btn-primary" type="submit">
                                    {task ? 'Modifier' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}