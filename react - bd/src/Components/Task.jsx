/**
 * Affichage d'une tache
 * @param {idT:number,title:string, dateline:date, status:boolean} task 
 */

import { Link } from "react-router-dom";

export default function Task({task}){

    return <tr>
        <td>{task.title}</td>
        <td>{task.dateline}</td>
        <td>
            <form onSubmit={()=>{}} className="text-end gap-2">
                <Link className="btn btn-success" to='/'>update</Link>
                <button className="btn btn-warning mx-2" type="submit">delete</button>
            </form>
        </td>
    </tr>
}