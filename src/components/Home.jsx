import { Link } from "react-router-dom";

function Home () {

return (
    <>
    <h1> Home </h1>
    <Link to="/topics"><button>Topics</button></Link>
    </>
)
}

export default Home;