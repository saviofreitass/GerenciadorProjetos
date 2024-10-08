import { Link } from "react-router-dom";

function Navbar(){

    return(<div className="bg-blue-800 w-screen h-20 flex items-center justify-around"> 
        <Link className="text-white text-xl font-bold" to={"/"}>Inicio</Link>
        <h1 className="text-white text-3xl font-bold">GERENCIADOR DE PROJETOS</h1>
        <Link className="text-white text-xl font-bold" to={"/projetos"}>Projetos</Link>
    </div>
    )
}

export default Navbar;