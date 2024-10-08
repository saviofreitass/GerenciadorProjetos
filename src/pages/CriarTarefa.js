import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function CriarTarefa(){

    const {id} = useParams()
    const navigate = useNavigate();
    const [descricao, setDescricao] = useState();

    function criarT(){

        const tarefa ={
            descricao: descricao
        }

        fetch(`http://localhost:8080/projetos/${id}/tarefas`,{
            method: "POST",
            headers:{
                'Content-Type': "application/json",
            },
            body: JSON.stringify(tarefa)
        }).then((resp)=>resp.json())
        .then((data)=>{
            console.log("Ok")
            navigate(`/projetos/${id}`)
        }).catch(err => console.log(err))
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center">
        <h1 className="text-xl mt-3 font-bold">Crie uma tarefa para seu projeto</h1>
        <div className="flex flex-col w-80 p-2">
            <label htmlFor="descricao">Descrição da tarefa:</label>
            <input 
                className="border border-black p-2"
                type="text" 
                name="descricao" 
                id="descricao" 
                onChange={(e) => setDescricao(e.target.value)}/>
        </div>
        <button className="w-24 border border-black mt-4" onClick={criarT}>Criar Tarefa</button>
        </div>
    )
}

export default CriarTarefa