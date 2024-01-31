import { Link} from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Day la trang chu</h1>

            <Link to="/about">About</Link>
        </div>
    )
}

export default HomePage;