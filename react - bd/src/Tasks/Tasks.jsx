import { useEffect, useState } from "react"
import Task from "../Components/Task"
import axios from "axios"
import { useFlashMessage } from "../Contexts/FlashProvider"
import { useNavigate } from "react-router-dom"
import { useUser } from "../Contexts/AuthProvider"

export default function Tasks() {
    const navigate = useNavigate()
    const { user } = useUser()
    const [notDone, setNotDone] = useState(false)
    const [tasks, setTasks] = useState([])
    const { msgFlash, showFlashMsg } = useFlashMessage()
    Tasks
    // const tasks = [
    //     { idT: 1, title: "Ma tache 1", dateline: "15-05-2025", status: false },
    //     { idT: 2, title: "Ma tache 2", dateline: "15-05-2025", status: true },
    // ]
    useEffect(() => {

        const fetchTascks = async () => {
            try {

                const response = await axios.get('http://localhost:8080/api/tasks')
                setTasks(response.data)
            } catch (error) {
                showFlashMsg("Une erreur s'est produit et les taches n'ont pas pu etre recuperer", "danger")
            }
        }
        if (!user) {
            navigate('/users/login')
        }
        fetchTascks()

    }, [])

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
                <div className="form-check form-switch">
                    <input type="checkbox"
                        className="form-check-input"
                        value={notDone}
                        id="checkbox"
                        onChange={() => { setNotDone(!notDone) }} />
                    <label htmlFor="checkbox"
                        className="form-check-label">
                        Afficher uniquement les taches non faite ?
                    </label>
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
            </div> )
        }
    </div>
}