import { useEffect, useState } from "react"
import { useId } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../Contexts/AuthProvider"
import { useFlashMessage } from "../Contexts/FlashProvider"
import axios from "axios"

export default function CreateEditTask() {
    const id1 = useId()
    const id2 = useId()
    const id3 = useId()
    const id4 = useId()

    const [task, setTask] = useState(null)
    const { id } = useParams()

    const navigate = useNavigate()
    const { user } = useUser()
    const { showFlashMsg } = useFlashMessage()

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`htpp://localhost:8080/api/tasks/${id}/edit`)
                setTask(response.data)
            } catch (e) {
                navigate(-1)
                showFlashMsg("Une erreur s'est produit, veuillez réessayer!", "danger")
            }
        }
        if (!user) {
            navigate('/users/login')
        }
        if (id) {
            fetchTask()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const description = e.target.description.value;
        const dateline = e.target.dateline.value;
        const status = e.target.status.value;

        try {
            if (!task) {
                const response = await axios.post(`htpp://localhost:8080/api/tasks/create`, { title: title, description, dateline, status })
            } else {
                const response = await axios.patch(`htpp://localhost:8080/api/tasks/${id}/edit`, { title: title, description, dateline, status })
            }
            navigate('/tasks')
            showFlashMsg(`Taches ${task ? 'modifier' : 'creer'} avez success`)

        } catch (e) {
            showFlashMsg("Une erreur s'est produit, veuillez réessayer!", "danger")
        }
    }


    return <div className="container">
        {!user ? null
            :
            <div className="row justify-content-center">
                <div className="col-12 col-md-9 col-xl-7 mt-5">
                    <form onSubmit={handleSubmit} method="post">
                        <div className="from-group">
                            <label htmlFor={id1}>Titre</label>
                            <input type="text"
                                defaultValue={task?.title ?? ''}
                                name="title"
                                id={id1} className="form-control" />
                        </div>
                        <div className="from-group">
                            <label htmlFor={id2}>Description</label>
                            <textarea id={id2} name="description"
                                className="form-control"
                                defaultValue={task?.description ?? ''}
                                style={{ minHeight: '170px' }} />
                        </div>
                        <div className="from-group">
                            <label htmlFor={id3}>Date limite</label>
                            <input type="date"
                                defaultValue={task?.dateline ?? ''}
                                name="dateline"
                                id={id3} className="form-control" />
                        </div>
                        <div className="from-check mt-2 form-switch">
                            <input type="hidden" value={false} name="status" />
                            <input type="checkbox" name="status"
                                id={id4}
                                defaultChecked={task?.status ?? false}
                                className="form-check-input" />
                            <label htmlFor={id4} className="ml-2 form-check-label">Fait ?</label>
                        </div>
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