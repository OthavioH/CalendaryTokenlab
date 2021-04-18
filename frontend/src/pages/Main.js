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

    const [date,setDate] = useState('');

    useEffect(() => {
        
        let date = new Date();
        let yyyy = date.getFullYear();
        let mm = date.getMonth()+1;
        let dd = date.getDay();

        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        }

        date = yyyy+'-'+mm+'-'+dd;
        setDate(date);

        const isTokenValid = verifyToken();
        if(isTokenValid){
            history.push('/events');
        }
    }, [history])

    async function handleSubmit(event){
        event.preventDefault();

        await api.post('/user/register',{
            name:name,
            email:email,
            birthDate:birthDate,
            password:password,
            cfrPassword:cfrPassword
        })
        .catch((error)=>{
            return document.getElementById("labelError").innerHTML = error.response.data.error;
        })
        .then((response)=>{
            console.log(response.status);

            if(response.status === 200){
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("email",response.data.user.email);
                history.push('/events');
            }
        })
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
                    <Input type="date" id="birth_date" required max={date} onChange={(e)=>{setBirthDate(e.target.value)}}></Input>
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