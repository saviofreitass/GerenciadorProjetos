import ProjectCard from "../projects/ProjectCard";
import LinkButton from "../layout/LinkButton";

import { useState, useEffect } from "react";

function Projects(){

    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/projetos",{
            method:"GET",
            headers:{
                'Content-Type' : "application/json",
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(data)
        })
        .catch((err) => console.log(err))
    },[projects])

    function deletar(id){
        fetch(`http://localhost:8080/projetos/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type' : "application/json",
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(projects.filter((project) => project.id !== id))
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className="w-screen flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl">Lista de Projetos</h1>
            <LinkButton text={"Adicionar projeto"} to={"/novoProjeto"}/>
            <div className="flex w-full items-center justify-center">
                {projects.length > 0 && projects.map((projeto) => <ProjectCard id={projeto.id} key={projeto.id} name={projeto.nome} dataEntrega={projeto.dataEntrega} handleSubmit={deletar}/>)}
            </div>
        </div>
    )
}

export default Projects;