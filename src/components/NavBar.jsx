import { Link } from "react-router-dom";

function NavBar () {

    return (
        <>
        <Link to="/"><button>
            Home</button></Link>
        <Link to="/articles"><button>
        View All</button></Link>
        <Link to="/articles/submit"><button disabled={true}>
            Add New</button></Link>
         <Link to="/users"><button disabled={true}>
            Users</button></Link>
        <Link to="/account"><button disabled={true}>
            Account</button></Link>

        </>
    )
}

export default NavBar;