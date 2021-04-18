import React,{useEffect,useState} from 'react';
import moment from 'moment';

import api from '../../services/api';
import { InviteMenu } from './styles.js';
import { UsersList, UserItemTitle, UserItem, UserItemText,NoData } from '../../styles/styles';

export default function UsersInvite(props){

    const [dados,setDados] = useState([]);
    const [show,setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
        if(show){
            document.getElementById("invite-menu").style.display = "block";
            getUsers();
        }
        else{
            document.getElementById("invite-menu").style.display = "none";
        }
    }, [props.show,show])

    async function getUsers(){
        await api.post('/all_users',{},{
            headers:{
                'authorization':`${localStorage.getItem("token")}`,
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            setDados(res.data.users);
        })
        
    }

    return (
        <InviteMenu id="invite-menu">
            <UsersList>
                {dados.length >0 ? (dados.map((user,i)=>{
                    return (
                        <UserItem key={i}>
                            <UserItemTitle>Name: {user.name}</UserItemTitle>
                            <UserItemText>Birth date: {moment(user.birthDate).format('DD/MM/YYYY')}</UserItemText>
                            <UserItemText>Age: {user.age}</UserItemText>
                        </UserItem>
                    );
                })) : <NoData>There are no users in our database</NoData>}
                
            </UsersList>
            
        </InviteMenu>
    );
}