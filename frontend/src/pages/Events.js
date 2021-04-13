import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import { Container, Section, EventsList, EventItemTitle, EventItem, EventSpan,NoData,EventDiv} from '../styles/styles';
import Navigator from '../components/Navigator/index';
import api from '../services/api';
import verifyToken from '../services/verifyToken';

import eye from '../assets/eye.png';
import del from '../assets/delete.svg';
import edit from '../assets/edit.png';

export default function Events({history}){
    const [eventData,setEventData] = useState([]);

    useEffect(() => {

        const isTokenValid = verifyToken();
        if(!isTokenValid){
            history.push('/');
        }
        else{
            getEvents();
        }

        async function getEvents(){
            await api.post('/events',{
                userEmail:localStorage.getItem("email"),
            },{
                headers:{
                    'authorization':`${localStorage.getItem("token")}`,
                    'Content-Type':'application/json'
                }
            })
            .then((res)=>{
                setEventData(res.data);
            });
        }
    }, [history,eventData,])


    function toggleVisibility(id){
        let display = document.getElementById(`event${id}`).style.display;

        if(display !== 'none'){
            document.getElementById(`event${id}`).style.display = 'none';
        }
        else{
            document.getElementById(`event${id}`).style.display = 'grid';
        }
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
                    {eventData.length >0 ? (eventData.map((event,i)=>{
                        return (
                            <EventDiv key={i}>
                                <EventSpan>
                                    <div style={{float:'left'}}>
                                        <p>{event.name}</p>
                                    </div>
                                    <div style={{float:'right', paddingTop:10,flex:1}}>
                                    <img onClick={()=>{toggleVisibility(i)}} src={eye} style={iconStyle} alt="show"/>
                                        <span>
                                            <img id="img1" src={del} style={iconStyle} alt="excluir" onClick={()=>{confirmDelete(event);}}/>
                                            <Link to={`/event/update?id=${event._id}`}><img id="img2" src={edit} style={iconStyle} alt="editar"/></Link>
                                        </span>
                                    </div>
                                    
                                </EventSpan>
                                <EventItem id={`event${i}`}>

                                    <EventItemTitle>Name: {event.name}</EventItemTitle>
                                    <EventItemTitle>Date: {moment(event.date).format('DD/MM/YYYY')}</EventItemTitle>
                                    <EventItemTitle>Description: {event.description}</EventItemTitle>
                                    <EventItemTitle>Start time: {event.startTime}</EventItemTitle>
                                    <EventItemTitle>End time: {event.endTime}</EventItemTitle>
                                </EventItem>
                            </EventDiv> 
                        );
                    })) : <NoData>You have no events</NoData>}
                    
                </EventsList>
            </Section>
        </Container>
    );
}