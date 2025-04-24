import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<>
						<button className="btn btn-success me-3"
						onClick= {()=> {navigate("/login")}}>Iniciar sesion</button>
						<button className="btn btn-primary"
						onClick={()=> {navigate("/register")}}>Registrate</button>

					</>
				</div>
			</div>
		</nav>
	);
};