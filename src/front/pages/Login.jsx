import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });

    const login = () => {
        fetch(`${backend_url}/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(loginUser)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate("/perfil");

            })
            .catch((err) => {
                console.error("Error en el login:", err);
            });
    };

    return (
        <div className="text-center container">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control border border-black"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={loginUser.email}
                        onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control border border-black"
                        id="exampleInputPassword1"
                        value={loginUser.password}
                        onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={login}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;