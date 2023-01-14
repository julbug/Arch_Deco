import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'https://producer-e8hr.onrender.com';

const UserContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn ] = useState(false);   
    const [isLoading, setIsLoading] = useState(true);
    const [theUser, setUser] = useState(null);


    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if(storedToken) {
            axios.get(
                `${API_URL}/auth/verify`, 
                { headers: { Authorization: `Bearer ${storedToken}`} }
              )
            .then((response) => {
                
                const theUser = {...response.data};
               
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(theUser);
            })
            .catch((error) => {
                setIsLoggedIn(false);
                setIsLoading(false);
                setUser(null);
            })
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

    const removeToken = () => {
        localStorage.removeItem('authToken');
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <UserContext.Provider 
            value={{ 
                isLoggedIn, 
                isLoading, 
                theUser,
                setUser,
                storeToken,
                authenticateUser,
                logOutUser
                 }}>
            {props.children}
        </UserContext.Provider>
    )
};

export { AuthProviderWrapper, UserContext };