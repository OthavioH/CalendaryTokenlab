import React,{useState,useEffect} from 'react';
import {Container,Section,Form,Title,Input,Button,ErrorLabel,TextArea} from '../styles/styles';
import Navigator from '../components/Navigator/index';
import api from '../services/api';

export default function EventsForm({history}){

    const [eventName,setEventName] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [startTime,setStartTime] = useState('');
    const [endTime,setEndTime] = useState('');

    const [todayDate,setTodayDate] = useState('');

    useEffect(()=>{
        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = today.getMonth()+1;
        let dd = today.getDate().toString();

        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;
        setTodayDate(today);

    },[setTodayDate])


    async function handleSubmit(event){
        event.preventDefault();

        const errors = verifyFields();

        if(errors === undefined){
            const res = await api.post('/events/create',{
                name:eventName,
                desc:description,
                date:date,
                startTime:startTime,
                endTime:endTime,
                userEmail:localStorage.getItem("email"),
            },{
                headers:{
                    'authorization':`${localStorage.getItem("token")}`,
                    'Content-Type':'application/json'
                }
            });
    
            if(res.data.error){
                return document.getElementById("labelError").innerHTML = res.data.error;
            }
            history.push('/events');
        }
        else{
            return document.getElementById("labelError").innerHTML = errors;
        }

        
    }

    function verifyFields(){
        const endTimeSplit = endTime.split(':');
        const startTimeSplit = startTime.split(':');



        if(endTimeSplit[0] >= startTimeSplit[0]){
            if(endTimeSplit[1] < startTimeSplit[1]){
                return "End time can't be less than or equal to start time";
            }   
        }
        else{
            return "End time can't be less than or equal to start time";
        }
    }

    return(
        <Container>
            <Section>
                <Navigator/>
                <Form onSubmit={(e)=>{handleSubmit(e)}}>
                    <Title>Create new event</Title>
                    <label htmlFor="event-name">Name:</label>
                    <Input type="text" id="event-name" required onChange={(e)=>{setEventName(e.target.value)}}></Input>
                    <label htmlFor="description">Description:</label>
                    <TextArea type="text" id="description" required onChange={(e)=>{setDescription(e.target.value)}}></TextArea>
                    <label htmlFor="date">Date:</label>
                    <Input type="date" id="date" required min={todayDate} onChange={(e)=>{setDate(e.target.value)}}></Input>
                    <label htmlFor="start-time">Start time:</label>
                    <Input type="time" id="start-time" required onChange={(e)=>{setStartTime(e.target.value);}}></Input>
                    <label htmlFor="end-time">End time:</label>
                    <Input type="time" id="end-time" required onChange={(e)=>{setEndTime(e.target.value)}}></Input>
                    <ErrorLabel id="labelError"></ErrorLabel>
                    <Button type="submit" value="Create Event"></Button>
                </Form>
            </Section>
        </Container>
    );
}