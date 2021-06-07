import './auth.css';
import React, { useState } from 'react';
import {Login} from '../../services/api';
import {setUserSession} from '../../Utils/Common';
import { useHistory } from 'react-router-dom';

function Auth({setisLogged,...props}) {
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    


     // handle button click of login form
    const HandleLogin = () => {
        let button = document.getElementById('LoginButton');
        setLoading(true);
        button.disabled = true;

        if(username.value.trim().length === 0 || password.value.trim().length === 0 ){
            setError("Obrigatório preencher os dados.");
            setTimeout(()=>{
                setError("");
            },3000)
            setLoading(false);
            button.disabled = false;
            return;
        }
        
        
        let body = {
            email: username.value, 
            password: password.value
        }
        setError(null);
        
        Login(body).then(response =>{
            setLoading(false);
            button.disabled = false;
            if(response.ok){
                setUserSession(response.token);
                //this.props.history.push('/Candidaturas');
                setisLogged(true);
            }else{
                if(response.errorMessage){
                    setError(response.errorMessage);
                    setTimeout(()=>{
                        setError("");
                    },3000)
                    
                }
            }
        }).catch(error =>{
            setLoading(false);
            button.disabled = false;
            setError("Erro");
            setTimeout(()=>{
                setError("");
            },3000)
        });

    }



  return (
    <div className="MainContainerAuth">
        <div className="ContainerCenter">
            <div className='title-login'>
                <p>Login</p>
            </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        <div className="ContainerAuth">
            <input className="inputAuth" type="text" {...username} autoComplete="new-password" placeholder="Email" />
        </div>
        <div className="ContainerAuth" style={{ marginTop: 10 }}>
            <input className="inputAuth" type="password" {...password} autoComplete="new-password" placeholder="Password" />
        </div>
        <button id="LoginButton"  type="button" onClick={HandleLogin} >{loading ? 'Carregando...' : 'Login'}</button>
        </div>
    </div>
  );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }



export default Auth;
