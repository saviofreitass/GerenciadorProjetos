import LinkButton from "../layout/LinkButton";

function ProjectCard({id, name, dataEntrega, handleSubmit}){


    return(
        <div className="w-1/4 h-44 flex flex-col items-center justify-center border border-black m-2">
            <h1 className="font-bold text-xl">Projeto:{id}</h1>
            <h2 className="text-xl">{name}</h2>
            <p className="text-sm">Data de Entrega: {dataEntrega}</p>
            <LinkButton text="Ver projeto" to={`/projetos/${id}`}/>
            <button className="border border-black w-20 m-1" onClick={() => handleSubmit(id)}>Deletar</button>
        </div>
    )
}

export default ProjectCard;