import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container h-[calc(100vh-160px)] mt-8 text-center">Oops, you are way of the track, <Link to='/' className="text-blue-700">Go Home</Link></div>
    )
}
export default NotFound