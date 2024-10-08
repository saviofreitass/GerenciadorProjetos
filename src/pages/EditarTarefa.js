import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function EditarTarefa(){

    const navigate = useNavigate()

    const {id,projetoId} = useParams()
    const [newTarefa, setNewTarefa] = useState([]);
    const [newDescricao, setNewDescricao] = useState("")

    useEffect(()=>{
        fetch(`http://localhost:8080/projetos/${projetoId}/tarefas/${id}`,{
            method:"GET",
            headers: {
                "Content-Type" : "application/json",
            }  
        }).then(resp => resp.json())
        .then((data) => {
            setNewTarefa(data)
            console.log(data)
        })
        .catch(err => console.log(err))
    }, [id,projetoId])


    useEffect(()=>{
        if(newTarefa.descricao){
            setNewDescricao(newTarefa.descricao)
        }
    },[newTarefa.descricao])

    function atualizarTarefa(){
        const attTarefa = {
            descricao : newDescricao
        }

        fetch(`http://localhost:8080/projetos/${projetoId}/tarefas/${id}`,{
            method:"PUT",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(attTarefa)
        }).then(resp => resp.json())
        .then((data) => {
            console.log(data)
            navigate(`/projetos/${projetoId}`)
        })
        .catch(err => console.log(err))
    }


    return(
        <div className="w-screen h-screen flex flex-col items-center">
        <h1 className="text-xl mt-3 font-bold">Edite a tarefa do seu projeto</h1>
        <div className="flex flex-col w-80 p-2">
            <label htmlFor="descricao">Descrição da tarefa:</label>
            <input 
                className="border border-black p-2"
                type="text" 
                name="descricao" 
                id="descricao" 
                onChange={(e) => setNewDescricao(e.target.value)}
                value = {newDescricao}/>
        </div>
        <button className="w-24 border border-black mt-4" onClick={atualizarTarefa}>Editar Tarefa</button>
        </div>
    )
}

export default EditarTarefa;