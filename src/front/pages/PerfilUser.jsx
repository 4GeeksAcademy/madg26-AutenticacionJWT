import React, {useEffect, useState} from 'react'
import useGlobalReducer from "../hooks/useGlobalReducer";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const PerfilUser = () => {
  const { store, dispatch } = useGlobalReducer()
  const verifyIsAuth = () => {
    
    fetch(`${backend_url}/private`, {
      method: "GET",
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
  })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          if (data.user) {
            dispatch({
              type: "set_current_user", 
              payload: data.user
            })
            
          } else {
            dispatch({
              type: "set_current_user", 
              payload: false
            })
          }

      })
      .catch((err) => {
          console.error("Error en el login:", err);
          dispatch({
            type: "set_current_user", 
            payload: false
          })
      })
  }

  useEffect(() => {
    verifyIsAuth()
  }, [])
  if (store.currentUser == null){
    return <h1>Cargando...</h1>
  }
  if (store.currentUser == false){
    return <h1>No tienes permiso para estar aqui!</h1>
  }
  if (store.currentUser){
    return (
      <div>
          <h1>Este es el perfil con el id: {store.currentUser.id} y el email: {store.currentUser
            .email}</h1>
      </div>
    )
  }
  
}

export default PerfilUser