import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const { dispatch } = useGlobalReducer()
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
                if (data.token) {
                    localStorage.setItem("token", data.token)
                    dispatch({
                        type: "set_current_user", 
                        payload: data.user
                      })
                    navigate("/perfil");
                } else {
                    dispatch({
                        type: "set_current_user", 
                        payload: false
                      })
                    alert("Login incorrecto. Revisa tu email o contraseña.");
                }

            })
            .catch((err) => {
                dispatch({
                    type: "set_current_user", 
                    payload: false
                  })
                console.error("Error en el login:", err);
            });
    };

    return (
        <div className="text-center container">
            <h1>Inicia sesion aqui!!</h1>
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