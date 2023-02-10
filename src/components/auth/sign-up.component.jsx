import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sign-up.styles.css'

// const SERVER_URL = https://producer-e8hr.onrender.com;
const SERVER_URL = "http://localhost:4200";


const defaultFormFields = {
    name: '',
    email: '',
    password: '',
    location: ''
  };

  

const SignUp = () => {

    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { name, location, email, password } = formFields;


    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      }; 

    const navigate = useNavigate();


    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        const requestBody = { name, location, email, password };

        axios.post(`${SERVER_URL}/auth/signup`, requestBody)
        .then((response) => {
            console.log(response)
            navigate('/');
            resetFormFields();
        })
        .catch((error) => {
            console.log(error);
        })
        
    }  

    return (
        <>
        
        <div className='sign-up-container'>

            <form onSubmit={handleSignUpSubmit}>
                    
                    <input 
                    type='text' 
                    className='input-form' 
                    name='name' 
                    placeholder='Name'
                    value={name} 
                    onChange={handleChange}
                    />

                    <input
                    type="text"
                    className='input-form'
                    name='location'
                    placeholder='Location'
                    value={location}
                    onChange={handleChange}
                    />
    
                    
                    <input 
                    type="text" 
                    className="input-form" 
                    name="email" 
                    placeholder='Email'
                    value={email} 
                    onChange={handleChange}
                    />
    
                    
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Password'
                    className="input-form" 
                    value={password} 
                    onChange={handleChange} 
                    />
    
                    <button type='submit'>Sign Up</button>
                </form>
    

        </div>

            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
        </>

    )
}

export default SignUp;