import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CriarProjeto(){

    const navigate = useNavigate();

    const [nome, setNome] = useState();
    const [data, setData] = useState();

    function criar(){

        const NovoProjeto = {
            nome: nome,
            dataEntrega: data
        }

        fetch("http://localhost:8080/projetos",{
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(NovoProjeto)
        }).then((resp) => resp.json())
        .then((data)=>{
            console.log(data)
            console.log("OK")
            navigate("/projetos")
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
                    onChange={(e) => setNome(e.target.value)}/>
            </div>
            <div className="border border-black w-64 p-2">
                <label htmlFor="dataEntrega">Data de entrega:</label>
                <input 
                    className="w-full border border-black p-1" 
                    type="text" 
                    name="dataEntrega" 
                    id="dataEntrega"
                    onChange={(e) => setData(e.target.value)}/>
            </div>
            <button onClick={criar} className="m-2 border border-black w-20">Criar</button>
        </div>
    )
}

export default CriarProjeto;