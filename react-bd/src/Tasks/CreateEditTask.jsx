/**
 * Composant permettant la creation et la modification d'une tâche
 */

import { useEffect, useMemo, useState } from "react"
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

    useEffect(() => {
        if (!user) {
            navigate('/users/register')
        }
    }, [user])

    useMemo(async () => {
        if (id) {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`htpp://localhost:8080/api/tasks/${id}/edit`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setTask(response.data)
            } catch (e) {
                navigate(-1)
                showFlashMsg("Une erreur s'est produit", "danger")
            }
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const title = e.target.title.value;
        const description = e.target.description.value;
        const dateline = e.target.dateline.value;
        const status = e.target.status?.value ?? false;
        const dataTask = { title, description, dateline, status }

        const token = localStorage.getItem('token')

        try {

            if (!task) {
                //Si c'est un nouveau produit

                //La route etant protegée (on a besoin d'etre connecté pour y accéder), 
                // on ajoute un token pour la vérification coté backend

                const response = await axios.post(`htpp://localhost:8080/api/tasks/create`,
                    dataTask, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } else {
                //Si c'est un produit à modifier
                const response = await axios.patch(`htpp://localhost:8080/api/tasks/${id}/edit`, dataTask)
            }
            navigate('/tasks')
            showFlashMsg(`tâches ${task ? 'modifier' : 'creer'} avez success`)

        } catch (e) {
            showFlashMsg("Une erreur s'est produit, veuillez réessayer!", "danger")
        }
    }


    return <div className="container">
        {!user ? null
            :
            <div className="row justify-content-center">
                <div className="col-12 col-md-9 col-xl-7 mt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="from-group">
                            <label htmlFor='title'>Titre</label>
                            <input type="text"
                                defaultValue={task?.title ?? ''}
                                name="title"
                                id='title' className="form-control" />
                        </div>
                        <div className="from-group">
                            <label htmlFor='description'>Description</label>
                            <textarea id='description' name="description"
                                className="form-control"
                                defaultValue={task?.description ?? ''}
                                style={{ minHeight: '170px' }} />
                        </div>
                        <div className="from-group">
                            <label htmlFor='date'>Date limite</label>
                            <input type="datetime-local"
                                defaultValue={task?.dateline ?? ''}
                                name="dateline"
                                id='date' className="form-control" />
                        </div>
                        {id &&
                            <div className="from-check mt-2 form-switch">
                                <input type="hidden" value={false} name="status" />
                                <input type="checkbox" name="status"
                                    id='checkbox'
                                    defaultChecked={task?.status ?? false}
                                    className="form-check-input" />
                                <label htmlFor='checkbox' className="ml-2 form-check-label">Fait ?</label>
                            </div>
                        }
                        <div className="text-center mt-2">
                            <button className="btn btn-primary" type="submit">
                                {task ? 'Modifier' : 'Enregistrer'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        }
    </div>
}