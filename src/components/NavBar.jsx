import { Link } from "react-router-dom";
import { SubmitIcon } from "./nav/SubmitIcon";


function NavBar () {



    return (
        <nav className="nav-bar">
            <ul>
                <li key="home">
                    <Link to="/">Home</Link>
                </li>
                <li key="articles">
                    <Link to="/articles">View All</Link>        
                </li>
                <li key="submit">
                    <Link to="/articles/submit" className="link" aria-label="Submit article">
                    <SubmitIcon className="icon" style={{fill: "currentColor"}}/>
                    </Link> 
                        
                </li>
                <li key="users">
                     <Link to="/users"><button disabled={true}>Users</button></Link>       
                </li>
                <li key="account">
                     <Link to="/account"><button disabled={true}>Account</button></Link>       
                </li>      
            </ul>
        </nav>
    )
}

export default NavBar;