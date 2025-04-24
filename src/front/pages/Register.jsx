import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';   
const backend_url = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState()
    const [register, setRegister] = useState({
        email : "",
        password : ""
    })
    const registerUser = () => {
        fetch(`${backend_url}/register`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(register)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.msg){
                navigate("/login")}
                else {
                    alert ("Usuario ya existe")
                }
            })
            .catch((err) => {return err});
    }

    return (
        <div className="text-center container">
            <h1>Crea tu usuario</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control border border-black"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={register.email}
                        onChange={(e) => setRegister({ ... register, email: e.target.value })}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control border border-black"
                        id="exampleInputPassword1"
                        value={register.password}
                        onChange={(e) => setRegister({ ...register, password: e.target.value })}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={registerUser}
                >
                    Crear usuario!
                </button>
            </form>
        </div>
    )
}

export default Register