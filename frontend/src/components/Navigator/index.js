import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {NavRow,NavButton,NavLogout} from '../../styles/styles';

export default function Navigator(){

    const [token, setToken] = useState('');

    useEffect(() => {
        (()=>{
            setToken(localStorage.getItem("token"));
        })();
    }, [token])

    return(
        <NavRow>
            {!token ?(
                <>
                    <Link to="/"><NavButton>Register</NavButton></Link>
                    <Link to="/login"><NavButton>Login</NavButton></Link>
                </>
            ):(
                <>
                    <Link to="/user/logout"><NavLogout>Logout</NavLogout></Link>
                    <Link to="/users"><NavButton>Users</NavButton></Link>
                    <Link to="/events/create"><NavButton>Create Event</NavButton></Link>
                </>
            )}
        </NavRow>
    );
}