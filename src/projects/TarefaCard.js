import {BsFillTrashFill} from 'react-icons/bs'

import LinkButton from '../layout/LinkButton'

import { useParams } from 'react-router-dom'

function TarefaCard({tarefaId ,descricao}){

    const {id} = useParams()

    function deletar(){
        fetch(`http://localhost:8080/projetos/${id}/tarefas/${tarefaId}`,{
            method:"DELETE",
            headers:{
                'Content-Type' : "application/json",
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("Ok")
        })
        .catch((err) => console.log(err))   
    }

    return (
        <div className="border border-black w-3/4 flex justify-between h-14 items-center ">
            <input type="checkbox" name={id} id={id} />
            <p className="ml-1">{descricao}</p>
            <div>
                <button className='w-6' onClick={deletar}><BsFillTrashFill/></button>
                <LinkButton text={"Editar tarefa"} to={`editarTarefa/${tarefaId}`}/>
            </div>
            
        </div>
    )
}

export default TarefaCard