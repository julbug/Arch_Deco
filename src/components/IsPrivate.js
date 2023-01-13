import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

function IsPrivate ({ children }) {
    
    const { isLoggedIn, isLoading } = useContext(UserContext);

    if(isLoading) return <p>Loading ...</p>;

    if(!isLoggedIn) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}

export default IsPrivate;