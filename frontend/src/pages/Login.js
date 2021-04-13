import React,{useState, useEffect} from 'react';
import api from '../services/api';
import verifyToken from '../services/verifyToken';

import GlobalStyle from '../styles/global';
import {Container,Section,Form,Title,Input,Button,ErrorLabel} from '../styles/styles';
import Navigator from '../components/Navigator/index';

export default function Login({history}){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    useEffect(() => {
        const isTokenValid = verifyToken();
        if(isTokenValid){
            history.push('/events');
        }
    }, [history])

    async function handleSubmit(event){
        event.preventDefault();

        const res = await api.post('/sign_in',{
            email:email,
            password:password
        });

        if(res.data.error){
            return document.getElementById("labelError").innerHTML = res.data.error;
        }

        localStorage.setItem('token',res.data.token);
        localStorage.setItem('email',res.data.user.email);
        history.push('/events');
    }

    return(
        <Container>
            <Section>
                <Navigator/>
                <Form onSubmit={(e)=>{handleSubmit(e)}}>
                    <Title>Login</Title>
                    <label htmlFor="email">Email:</label>
                    <Input type="text" id="email" required onChange={(e)=>{setEmail(e.target.value)}}></Input>
                    <label htmlFor="password">Password:</label>
                    <Input type="password" id="password" minLength="6" required onChange={(e)=>{setPassword(e.target.value)}}></Input>
                    <ErrorLabel id="labelError"></ErrorLabel>
                    <Button type="submit" value="Login"></Button>
                </Form>
            </Section>
            <GlobalStyle/>
        </Container>
    );
}