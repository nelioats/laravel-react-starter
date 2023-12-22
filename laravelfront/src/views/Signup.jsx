import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const Signup = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const {setUser, setToken} = useStateContext();

  const [errors, setErrors] = useState();

  const onSubmit = (ev) => {
      ev.preventDefault();
      //debugger
     
      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      }
 
      axiosClient.post('/signup',payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token)
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


  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>
            Registrar conta
          </h1>
            {errors && 
              <div className='alert'>
                  {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                  ))}
              </div>
            }

          <input ref={nameRef} type="text" placeholder='Nome completo' />
          <input ref={emailRef} type="email" placeholder='Email' />
          <input ref={passwordRef} type="password" placeholder='Password' />
          <input ref={passwordConfirmationRef} type="password" placeholder='Confirme o password' />
          <button className='btn btn-block'>Registrar</button>
            <p className="message">
              Já possui conta? <Link to="/login">Login</Link>
            </p>
        </form>
      </div>
    </div>
  )
}

export default Signup