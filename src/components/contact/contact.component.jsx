import { useState } from 'react';
import axios from 'axios';
import './contact.styles.css'

const API_URI = "https://producer-e8hr.onrender.com";

const defaultFormFields = {
    name: '',
    email: '',
    message: ''
  };


const Contact = () => {

    

    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { name, email, message } = formFields;
    const [successMessage, setSuccessMessage] = useState(undefined);


    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      }; 


    const handleContactSubmit = (event) => {
        event.preventDefault();
        const requestBody = { name, email, message };

        axios.post(`${API_URI}/contact`, requestBody)
        .then((response) => {
            console.log(response)
            setSuccessMessage(response.data);
            resetFormFields();
        })
        .catch((error) => {
            console.log(error);
        })
        
    } 


    return (
        <>
        <div className='contact-page'>

            <div className='contact-text'>
                <h1>Want to work? Get in touch!</h1>
                <img src={'https://i.imgur.com/pnrJDv0.jpg'} alt='contact'></img>
            </div>

            <div className='sign-up-container'>
                

                <form onSubmit={handleContactSubmit}>
                    <h2>Contact me here</h2>

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
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={handleChange}
                    />
    
                    
                    <textarea 
                    type="text" 
                    className="input-form-message" 
                    name="message" 
                    placeholder='Message'
                    value={message} 
                    onChange={handleChange}
                    />
    
                    <button type='submit'>Submit</button>

                    { successMessage && <h3 className="success-message">{successMessage}</h3> }
                </form>
    

            </div>

        </div>
        

        </>
    )
}

export default Contact;