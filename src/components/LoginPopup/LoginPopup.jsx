import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from './../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import Home from '../../pages/Home/Home'; // Import the Home component
import ExploreMenu from '../ExploreMenu/ExploreMenu';

const LoginPopup = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const { login, register, setToken, setUserName } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState('Login');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (currentState === 'Login') {
                response = await login(data.email, data.password);
            } else {
                response = await register(data.name, data.email, data.password);
            }

            if (response.success) {
                setToken(response.token);
                setUserName(currentState === 'Login' ? response.name : data.name);
                localStorage.setItem("token", response.token);
                localStorage.setItem("userName", currentState === 'Login' ? response.name : data.name);
                setShowLogin(true);
                navigate(assets.Home); // Redirect to the Home component
            } else {
                alert(response.message);
            }
        } catch (error) {
            navigate('/ExploreMenu');
            //alert(error.message || "An error occurred");
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                { currentState==='Login'?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
               
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>

            <button type='submit'>{currentState==='Sign Up'?'Create account':'Login'}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            {currentState==='Login'?
             <p>Create a new account? <span onClick={()=> setCurrentState('Sign Up')}>Click here</span></p>
             :<p>Already have an account? <span onClick={()=> setCurrentState('Login')}>Login here</span></p>}
            
            
        </form>
    </div>
  )
}

export default LoginPopup