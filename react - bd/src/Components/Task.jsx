/**
 * Affichage d'une tâche
 * @param {idT:number,title:string, dateline:date, status:boolean} task 
 */

import axios from "axios";
import { Link } from "react-router-dom";

export default function Task({ task }) {

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')

        try {
            const response = await axios.delete(`htpp://localhost:8080/api/tasks/create`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            navigate('/tasks')
            showFlashMsg(`La tâche a été supprimé avez success`)
        } catch (e) {
            showFlashMsg("Une erreur s'est produit et la tâche n'a pas pu etre supprimée", "danger")
        }
    }

    return <tr>
        <td>{task.title}</td>
        <td>{task.dateline}</td>
        <td>
            <form onSubmit={handleSubmit} className="text-end gap-2">
                <Link className="btn btn-success" to='/'>update</Link>
                <button className="btn btn-warning mx-2"
                    type="submit"
                    onClick={confirm('Voulez-vous vraiment supprimer cette tâche ?')}>
                    delete
                </button>
            </form>
        </td>
    </tr>
}