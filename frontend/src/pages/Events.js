import React,{useState,useEffect} from 'react';
import moment from 'moment';
import { Container, Section, EventsList, EventItemTitle, EventItem, EventSpan,NoData,EventDiv, ShowButton} from '../styles/styles';
import Navigator from '../components/Navigator/index';
import api from '../services/api';
import olho from '../assets/olho.png';

export default function Events({history}){
    const [eventData,setEventData] = useState([]);
    

    useEffect(() => {
        getEvents();

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
            document.getElementById(`event${id}`).style.display = 'inline';
        }
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
                                    <p>{event.name}</p>
                                    <ShowButton onClick={(e)=>{toggleVisibility(i)}}><img src={olho} style={{width:30,height:30}} alt="show"/></ShowButton>
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