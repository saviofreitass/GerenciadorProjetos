import LinkButton from "../layout/LinkButton";

function Home(){

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <LinkButton to={"/projetos"} text={"Ver projetos"}/>
        </div>
    )
}

export default Home;