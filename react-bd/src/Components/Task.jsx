/**
 * Affichage d'une tâche
 * @param {id:number,title:string, dateline:date, status:string} task 
 */

import axios from "axios";
import { Link } from "react-router-dom";
import { useFlashMessage } from "../Contexts/FlashProvider";

export default function Task({ task }) {
    const {showFlashMsg}=useFlashMessage()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')

        try {
            const response = await axios.delete(`http://localhost:8082/api/tasks/${task.id}`)
            //navigate('/tasks')
            showFlashMsg(`La tâche a été supprimé avez success`)
        } catch (e) {
            console.log(e);
            showFlashMsg("Une erreur s'est produit et la tâche n'a pas pu etre supprimée", "danger")
        }
    }    

    return <tr>
        <td>{task.title}</td>
        <td>{task.dateline}</td>
        <td>
            <form onSubmit={handleSubmit} className="text-end gap-2">
                <Link className="btn btn-success" to={`/tasks/${task.id}/edit`}>update</Link>
                <button className="btn btn-warning mx-2"
                    type="submit"
                    onClick={()=>{confirm('Voulez-vous vraiment supprimer cette tâche ?')}}>
                    delete
                </button>
            </form>
        </td>
    </tr>
}