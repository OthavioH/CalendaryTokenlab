import React, { useEffect } from 'react';

export default function Logout({history}){
    const token = localStorage.getItem("token");
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        history.push('/');
    }, [token,history])

    return(
        <></>
    );
}