import { Link } from "react-router"
const NotFound = () => {
    return (
        <div>
            <h1>404 - Page Not found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to='/' className="NotFoundLink">Go home</Link>

        </div>
    )
}

export default NotFound