import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'


const UserForm = () => {

    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const [errors, setErrors] = useState();
    const navigate = useNavigate();
    const {setNotification} = useStateContext();

    if(id){
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        },[])
    }

    const onSubmit = (ev) =>{
        ev.preventDefault();

        if(user.id){
            // axiosClient.put(`/users/${user.id}`,user)
            //     .then(() => {
            //         setNotification("Usuário atualizado com sucesso!")
            //         navigate('/users')
            //     })
            //     .catch(err => {
            //         //console.log(err);
            //         const response = err.response;
            //           if(response && response.status === 422){
            //             //console.log(response.data.errors);
            //             setErrors(response.data.errors)
            //           }
            //       })
            axiosClient.post(`/users_update/${user.id}`,user)
                .then(() => {
                    setNotification("Usuário atualizado com sucesso!")
                    navigate('/users')
                })
                .catch(err => {
                    //console.log(err);
                    const response = err.response;
                      if(response && response.status === 422){
                        console.log(response.data.errors);
                        setErrors(response.data.errors)
                      }
                  })


        }else{

            axiosClient.post(`/users`,user)
            .then(() => {
                setNotification("Usuário criado com sucesso!")
                navigate('/users')
            })
            .catch(err => {
                //console.log(err);
                const response = err.response;
                  if(response && response.status === 422){
                    //console.log(response.data.errors);
                    setErrors(response.data.errors)
                  }
              })

        }
    }

  return (
    <>
        {user.id && <h1>Update User: {user.name}</h1>}
        {!user.id && <h1>New User</h1>}
        <div className='card animated fadeInDown'>
            {loading && (
                <div className='text-center'>Loading...</div>
            )}
            {errors && 
              <div className='alert'>
                  {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
              </div>
            }
            {!loading &&
                <form onSubmit={onSubmit}>
                    <input type='text' value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder='Name' />
                    <input type='email' value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder='Email' />
                    <input type='password' onChange={ev => setUser({...user, password: ev.target.value})} placeholder='Password' />
                    <input type='password' onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder='Passsword confirmation' />
                    <button className='btn'>Save</button>
                </form>
            }
        </div>
    </>
  )
}

export default UserForm