import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

import { Container, Section, EventsList, EventItemTitle, EventsItem, EventSpan,NoData,EventDiv} from '../styles/styles';
import Navigator from '../components/Navigator/index';
import api from '../services/api';
import verifyToken from '../services/verifyToken';

import eye from '../assets/eye.png';
import del from '../assets/delete.svg';
import edit from '../assets/edit.png';

export default function Events({history}){
    const [eventData,setEventData] = useState([]);
    const [display, setDisplay] = useState('grid');


    useEffect(() => {

        const isTokenValid = verifyToken();
        if(isTokenValid){
            getEvents();
        }
        
    },[])

    async function getEvents(){
        await api.post('/events',{},{
            headers:{
                'authorization':`${localStorage.getItem("token")}`,
                'Content-Type':'application/json'
            }
        })
        .then((response)=>{
            if(response.status){
                setEventData(response.data);
            }
            
        });
    }


    function toggleVisibility(id){

        if(display !== 'none'){
            setDisplay('none');
        }
        else{
            setDisplay('grid');
        }
        document.getElementById(`event${id}`).style.display = display;
    }

    async function confirmDelete(event){
        var r = window.confirm("Você tem certeza que quer excluir este personagem?");
        if(r===true){
            await api.delete(`/events/delete/${event._id}`,
                {headers:{
                        'authorization':`${localStorage.getItem("token")}`,
                        'Content-Type':'application/json'
                    }
                }
            )
            .catch((error)=>{
                return console.log(error.response.data.error);
            })
            .then((response)=>{
    
                if(response.status){
                    history.push('/');
                }
            })
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
                                <EventsItem id={`event${i}`}>

                                    <EventItemTitle>Name: {event.name}</EventItemTitle>
                                    <EventItemTitle>Date: {moment(event.date).format('DD/MM/YYYY')}</EventItemTitle>
                                    <EventItemTitle>Description: {event.description}</EventItemTitle>
                                    <EventItemTitle>Start time: {event.startTime}</EventItemTitle>
                                    <EventItemTitle>End time: {event.endTime}</EventItemTitle>
                                </EventsItem>
                            </EventDiv> 
                        );
                    })) : <NoData>You have no events</NoData>}
                    
                </EventsList>
            </Section>
        </Container>
    );
}