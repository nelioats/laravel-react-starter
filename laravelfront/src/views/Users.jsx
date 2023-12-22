import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  useEffect(() => {
    getUsers();
  },[])

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false)
        console.log(data);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const onDelete = (u) => {
    if(!window.confirm("Deseja excluir o usuário?")){
        return
    }
    axiosClient.delete(`/users/${u.id}`)
    .then(() => {
      setNotification("Usuário deletado com sucesso!")
      getUsers();//carrega novamente os usuarios
    })
  }



  return (
    <div>
      <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
        <h1>Users</h1>
        <Link to="/users/new" className='btn-add'>Add User</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Criado em</th>
              <th>Ação</th>
            </tr>
          </thead>

          {loading && 
            <tbody>
            <tr>
              <td colSpan="5" className='text-center'>Loading...</td>
            </tr>
            </tbody>
          }
          
          {!loading &&
             <tbody>
             {users.map(u => (
               <tr>
                 <td>{u.id}</td>
                 <td>{u.name}</td>
                 <td>{u.email}</td>
                 <td>{u.created_at}</td>
                 <td>
                   <Link className='btn-edit' to={'/users/'+u.id}>Editar</Link>
                     &nbsp;
                   <button onClick={ev => onDelete(u)} className='btn-delete'>Deletar</button>
                 </td>
               </tr>
             ))}
           </tbody>
          }
       
        </table>
      </div>
    </div>
  )
}

export default Users