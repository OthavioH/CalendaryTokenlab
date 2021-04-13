import React,{useState,useEffect} from 'react';
import moment from 'moment';
import {useLocation} from 'react-router-dom';

import { Container, Section, EventsList, EventItemTitle, EventItem,NoData, EventSpan,EventDiv, Input,TextArea} from '../styles/styles';
import Navigator from '../components/Navigator/index';
import UsersInvite from '../components/UsersInvite/index';
import api from '../services/api';
import verifyToken from '../services/verifyToken';

import crossMark from '../assets/cross_mark.png';
import checkMark from '../assets/check_mark.png';
import del from '../assets/delete.svg';
import edit from '../assets/edit.png';
import addPeople from '../assets/add_people.png';

export default function Event({history}){
    const [eventData,setEventData] = useState(undefined);
    const [onEditMode,setOnEditMode] = useState(false);
    const [showInvite,setShowInvite] = useState(false);

    const [eventName,setEventName] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [startTime,setStartTime] = useState('');
    const [endTime,setEndTime] = useState('');

    const query = useQuery();

    function useQuery(){
        return new URLSearchParams(useLocation().search);
    }

    console.log(query.get("id"));

    useEffect(() => {
        const isTokenValid = verifyToken();
        if(!isTokenValid){
            history.push('/');
        }
        else{
            getEvent();
        }

        async function getEvent(){
            await api.get(`/event/?eventId=${query.get("id")}`,{
                headers:{
                    'authorization':`${localStorage.getItem("token")}`,
                    'Content-Type':'application/json'
                }
            })
            .then((res)=>{
                setEventData(res.data);
            });
        }
    }, [eventData,query,history])


    async function updateEvent(){
        const res = await api.put('/event/update',{
            id:query.get("id"),
            name:eventName,
            date:date,
            description:description,
            startTime:startTime,
            endTime:endTime
        },{headers:{
            'authorization':`${localStorage.getItem("token")}`,
            'Content-Type':'application/json'
        }});
        if(res.data.error){
            console.log(res.data.error);
        }
        setOnEditMode(false);
    }

    async function confirmDelete(event){
        var r = window.confirm("Você tem certeza que quer excluir este personagem?");
        if(r===true){
            const res = await api.delete(`/events/delete/${event._id}`,
                {headers:{
                        'authorization':`${localStorage.getItem("token")}`,
                        'Content-Type':'application/json'
                    }
                }
            );
            if(res.data.error){
                return console.log(res.data.error);
            }
            history.push('/');
        }
    }

    function setInputValues(event){
        setEventName(event.name);
        setDescription(event.description);
        setDate(event.date);
        setStartTime(event.startTime);
        setEndTime(event.endTime);
    }

    const iconStyle = {
        width:'30px',
        height:'30px',
        float:'right',
        marginRight:'10px',
        cursor:'pointer',
    }

    return(
        <Container>
            <Section>
                <Navigator/>
                <EventsList id="events-list">
                    {eventData === undefined ? (
                        <NoData>Event not found</NoData>
                    ) : (
                        <EventDiv key={eventData._id}>
                            <EventSpan>
                                <div style={{float:'left'}}>
                                    <p>{eventData.name}</p>
                                </div>
                                <div style={{float:'right', paddingTop:10,flex:1}}>
                                    <span>
                                        <img id="img-add" src={addPeople} style={iconStyle} alt="invite people" onClick={()=>{setShowInvite(!showInvite);}}/>
                                        {!onEditMode ? (
                                            <>
                                                <img id="img1" src={del} style={iconStyle} alt="delete" onClick={()=>{confirmDelete(eventData);}}/>
                                                <img id="img2" src={edit} style={iconStyle} alt="edit" onClick={(e)=>{setOnEditMode(true);setInputValues(eventData);}}/>
                                            </>
                                        ) : (
                                            <>
                                                <img id="img1" src={crossMark} style={iconStyle} alt="cancel" onClick={(e)=>{setOnEditMode(false)}}/>
                                                <img id="img2" src={checkMark} style={iconStyle} alt="confirm" onClick={(e)=>{updateEvent()}}/>
                                            </>
                                        )}
                                    </span>
                                </div>
                                
                            </EventSpan>
                            <EventItem id={`event${eventData._id}`}>

                                {
                                    !onEditMode ? (
                                        <>
                                            <EventItemTitle>Name: {eventData.name}</EventItemTitle>
                                            <EventItemTitle>Date: {moment(eventData.date).format('DD/MM/YYYY')}</EventItemTitle>
                                            <EventItemTitle>Description: {eventData.description}</EventItemTitle>
                                            <EventItemTitle>Start time: {eventData.startTime}</EventItemTitle>
                                            <EventItemTitle>End time: {eventData.endTime}</EventItemTitle>
                                        </>
                                    ) : (
                                        <>
                                            Name: <Input type="text" id="event-name" required onChange={(e)=>{setEventName(e.target.value)}} value={eventName}></Input>
                                            Date: <Input type="date" onChange={(e)=>{setDate(e.target.value)}} value={moment(date).format('YYYY-MM-DD')}></Input>
                                            Description: <TextArea type="text" onChange={(e)=>{setDescription(e.target.value)}} value={description}></TextArea>
                                            Start time: <Input type="time" onChange={(e)=>{setStartTime(e.target.value)}} value={startTime}></Input>
                                            End time: <Input type="time" onChange={(e)=>{setEndTime(e.target.value)}} value={endTime}></Input> 
                                        </> 
                                    )
                                }
                            </EventItem>
                        </EventDiv>
                    )}
                    
                </EventsList>
                <UsersInvite show={showInvite}/>
            </Section>
        </Container>
    );
}