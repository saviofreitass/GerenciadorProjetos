import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import TarefaCard from "../projects/TarefaCard";
import LinkButton from "../layout/LinkButton";

function Project(){

    const {id} = useParams()
    const [projeto, setProjeto] = useState([])
    const [tarefas, setTarefas] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8080/projetos/${id}`,{
            method:"GET",
            headers: {
                "Content-Type" : "application/json",
            }  
        }).then(resp => resp.json())
        .then((data) => {
            setProjeto(data)
        })
        .catch(err => console.log(err))
    }, [id,tarefas])

    useEffect(()=>{
        fetch(`http://localhost:8080/projetos/${id}/tarefas`,{
            method:"GET",
            headers: {
                "Content-Type" : "application/json",
            }  
        }).then(resp => resp.json())
        .then((data) => {
            setTarefas(data)
        })
        .catch(err => console.log(err))
    }, [id])

    
    return(
        <div className="flex flex-col items-center w-full h-screen p-5">
            <h1 className="text-xl font-bold">Projeto: {projeto.nome}</h1>
            <h1>Data de entrega: {projeto.dataEntrega}</h1>
            <LinkButton text={"Adicionar Tarefa"} to={`/projetos/${id}/novaTarefa`}/>
            <LinkButton text={"Editar Projeto"} to={`/projetos/${id}/editarProjeto`}/>
            <div className="w-2/4 flex flex-col items-center">
                <h1 className="text-lg mt-6">Tarefas:</h1>
                {tarefas.length > 0 && tarefas.map((tarefas) => <TarefaCard projetoId={projeto.id} tarefaId={tarefas.id} key={tarefas.id} name={projeto.id} descricao={tarefas.descricao}/>)}
            </div>
        </div>
    )
}

export default Project;