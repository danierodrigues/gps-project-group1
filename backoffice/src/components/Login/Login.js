import './Login.css';
import React, { useState } from 'react';
import { login } from '../../services/api';
import {setUserSession} from '../../Utils/Common';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setisLogged }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const setError = (message) => {
        toast.error(message);
    }

    /* Handle inputs change */
    const handleInputChange = (e, inputName) => {
        switch(inputName) {
            case 'email': 
                setEmail(e.target.value);
                break;

            case 'password': 
                setPassword(e.target.value);
                break;
                
            default:
                break;
        }
    }
    
     // handle button click of login form
    const handleLogin = () => {
    
        let button = document.getElementById('login-btn');
        setLoading(true);
        button.disabled = true;

        /* Empty credentials */
        if(email.trim().length === 0 || password.trim().length === 0 ){
            setError('Campos não preenchidos');
            setLoading(false);
            button.disabled = false;
            return;
        }
        
        /* Else, create a body */
        let body = {
            email: email, 
            password: password
        }
        setError(null);
        
        login(body).then(response => {
            setLoading(false);
            button.disabled = false;
            
            if(response.ok){
                setUserSession(response.token);
                setisLogged(true);
            }
            
            else{
                if(response.errorMessage)
                    setError(response.errorMessage);
            }
        }).catch(error =>{
            setLoading(false);
            button.disabled = false;
            setError(error);
        });

    }

  return (
    <div className='MainContainerAuth'>
        <div className='ContainerCenter'>
            <div className='title-login'>
                <p>Login</p>
            </div>
        {/*error && <><small style={{ color: 'red' }}>{error}</small><br /></>*/}
        <div className='ContainerAuth'>
            <input className='inputAuth margin-top-s' type='text' value={email} onChange={(e) => handleInputChange(e, 'email')} autoComplete='new-password' placeholder='Email' />
        </div>
        <div className='ContainerAuth' style={{ marginTop: 10 }}>
            <input className='inputAuth' type='password' value={password} onChange={(e) => handleInputChange(e, 'password')} autoComplete='new-password' placeholder='Palavra-passe' />
        </div>
        <button id='login-btn' className='font-size-xs'  type='button' onClick={handleLogin} >{loading ? 'Carregando...' : 'Login'}</button>
        </div>
    </div>
  );
}

export default Login;
