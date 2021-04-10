import React,{useEffect,useState} from 'react';
import api from '../services/api';
import moment from 'moment';
import Navigator from '../components/Navigator/index';
import { Container, Section, UsersList, UserItemTitle, UserItem, UserItemText,NoData } from '../styles/styles';

export default function ShowUsers({history}){

    const [dados,setDados] = useState([]);

    useEffect(() => {
        getUsers();

        async function getUsers(){
            await api.get('/all_users',{
                headers:{
                    'authorization':`${localStorage.getItem("token")}`,
                    'Content-Type':'application/json'
                }
            })
            .then((res)=>{
                setDados(res.data.users);
            })
            .catch((error)=>{
                if(error.response){
                    if(error.response.status === 401){
                        history.push('/');
                        window.alert("To view all users you need to be logged in");
                    }
                }
            });
            
        }
    }, [history,dados])

    return(
        <Container>
            <Section>
                <Navigator/>
                <UsersList>
                    {dados.length >0 ? (dados.map((user,i)=>{
                        return (
                            <UserItem key={i}>
                                <UserItemTitle>Name: {user.name}</UserItemTitle>
                                <UserItemText>Birth date: {moment(user.birthDate).format('DD/MM/YYYY')}</UserItemText>
                                <UserItemText>Age: {user.age}</UserItemText>
                            </UserItem>
                        );
                    })) : <NoData>There's no users in our database</NoData>}
                    
                </UsersList>
            </Section>
        </Container>
    );
}