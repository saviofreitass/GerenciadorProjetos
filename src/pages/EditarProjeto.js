import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"


function EditarProjeto(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState([])
    const [newNome, setNewNome] = useState("")
    const [newData, setNewData] = useState("")

    useEffect(()=>{
        fetch(`http://localhost:8080/projetos/${id}`,{
            method:"GET",
            headers:{
                'Content-Type' : "application/json",
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
        })
        .catch((err) => console.log(err))
    },[id])
    

    useEffect(() => {
        if (project.nome) {
          setNewNome(project.nome);
        }
        if (project.dataEntrega) {
          setNewData(project.dataEntrega); 
        }
      }, [project]);

    function atualizar(){

        const AttProjeto ={
            nome: newNome,
            dataEntrega: newData
        }

        fetch(`http://localhost:8080/projetos/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(AttProjeto)
        }).then((resp) => resp.json())
        .then((data)=>{
            console.log(data)
            navigate(`/projetos/${id}`)
        }).catch(err => console.log(err))
    }

    return(
        <div className="flex items-center justify-center flex-col h-screen">
            <h1>Crie seu projeto:</h1>
            <div className="border border-black w-64 p-2">
                <label htmlFor="nome">Nome do Projeto:</label>
                <input 
                    className="w-full border border-black p-1" 
                    type="text" 
                    name="nome" 
                    id="nome"
                    onChange={(e) => setNewNome(e.target.value)}
                    value={newNome}/>
            </div>
            <div className="border border-black w-64 p-2">
                <label htmlFor="dataEntrega">Data de entrega:</label>
                <input 
                    className="w-full border border-black p-1" 
                    type="text" 
                    name="dataEntrega" 
                    id="dataEntrega"
                    onChange={(e) => setNewData(e.target.value)}
                    value={newData}/>
            </div>
            <button onClick={atualizar} className="m-2 border border-black w-20">Atualizar</button>
        </div>
    )
}

export default EditarProjeto