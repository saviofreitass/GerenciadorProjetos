import {Link} from 'react-router-dom'

function LinkButton({to, text}){

    return(
        <Link to={to} className="border border-black m-1 w-32 text-center">
            {text}
        </Link>
    )
}

export default LinkButton;