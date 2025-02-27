import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth/sign-in.styles.css';
import { UserContext } from "../../context/UserContext";

const SERVER_URL = "https://producer-e8hr.onrender.com";
// const SERVER_URL = "http://localhost:4200";


    const defaultFormFields = {
        email: '',
        password: '',
      };

const SignIn = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { storeToken, authenticateUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setFormFields({ ...formFields, [name]: value });
    };

    const navigate = useNavigate();

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const requestBody = { email, password };
        
        axios.post(`${SERVER_URL}/auth/login`, requestBody)
        .then((response) => {
            console.log('JWT token', response.data.authToken);

            storeToken(response.data.authToken);

            authenticateUser();

            navigate('/');

            resetFormFields();

        }).catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })
    }
    return (
        <div className="sign-in-container">
            <form onSubmit={handleLoginSubmit}>
            
                <input type="text" placeholder='Email' className="input-form" name="email" value={email} onChange={handleChange}/>

                
                <input type="password" placeholder='password' name="password" className="input-form" value={password} onChange={handleChange} />

                <button>Sign In</button>
            </form>
            { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
    )
}

export default SignIn;