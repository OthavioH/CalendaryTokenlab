import React,{useState, useEffect} from 'react';
import api from '../services/api';
import verifyToken from '../services/verifyToken';

import GlobalStyle from '../styles/global';
import {Container,Section,Form,Title,Input,Button,ErrorLabel} from '../styles/styles';
import Navigator from '../components/Navigator/index';


export default function Main({history}){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [birthDate,setBirthDate] = useState('');
    const [password,setPassword] = useState('');
    const [cfrPassword,setCfrPassword] = useState('');

    useEffect(() => {
        
        const isTokenValid = verifyToken();
        if(isTokenValid){
            history.push('/events');
        }
    }, [history])

    async function handleSubmit(event){
        event.preventDefault();

        const res = await api.post('/user/register',{
            name:name,
            email:email,
            birthDate:birthDate,
            password:password,
            cfrPassword:cfrPassword
        });

        if(res.data.error){
            return document.getElementById("labelError").innerHTML = res.data.error;
        }

        localStorage.setItem("token",res.data.token);
        localStorage.setItem("email",res.data.user.email);
        history.push('/events');
    }

    return(
        <Container>
            <Section>
                <Navigator/>
                <Form onSubmit={(e)=>{handleSubmit(e)}}>
                    <Title>Register</Title>
                    <label htmlFor="name">Name:</label>
                    <Input type="text" id="name" required onChange={(e)=>{setName(e.target.value)}}></Input>
                    <label htmlFor="email">Email:</label>
                    <Input type="text" id="email" required onChange={(e)=>{setEmail(e.target.value)}}></Input>
                    <label htmlFor="birth_date">Birth date:</label>
                    <Input type="date" id="birth_date" required max="2021-03-31" onChange={(e)=>{setBirthDate(e.target.value)}}></Input>
                    <label htmlFor="password">Password:</label>
                    <Input type="password" id="password" minLength="6" required onChange={(e)=>{setPassword(e.target.value)}}></Input>
                    <label htmlFor="cfpassword">Confirm password:</label>
                    <Input type="password" id="cfrpassword" minLength="6" required onChange={(e)=>{setCfrPassword(e.target.value)}}></Input>
                    <ErrorLabel id="labelError"></ErrorLabel>
                    <Button type="submit" value="Register"></Button>
                </Form>
            </Section>
            <GlobalStyle/>
        </Container>
    );
}