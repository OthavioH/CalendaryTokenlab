import styled from 'styled-components';

export const Container = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding-bottom:30px;
    background:rgba(255,255,255,0.1);
`;

export const Section = styled.section`
    width:100%;
    min-height:400px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:10px;
`;

export const NavRow = styled.div`
    width:100%;
    min-height:100px;
    display:flex;
    flex-direction:rows;
    justify-content:center;
`;

export const NavButton = styled.button`
    width:100px;
    height:35px;
    color:#fff;
    background:#2495d6;
    border:2px solid rgba(0,0,0,0.4);
    border-radius:10px;
    box-shadow:5px 5px 15px -7px #000000;
    margin:0px 5px;
    cursor:pointer;
    text-decoration:none;

    &:hover {
        box-shadow:none;
    }
`;

export const NavLogout = styled.button`
    width:100px;
    height:35px;
    color:#fff;
    background:red;
    border:2px solid rgba(0,0,0,0.4);
    border-radius:10px;
    box-shadow:5px 5px 15px -7px #000000;
    margin:0px 5px;
    cursor:pointer;
    text-decoration:none;

    &:hover {
        box-shadow:none;
    }
`;

export const Form = styled.form`
    width:20%;
    min-width:300px;
    min-height:400px;
    background:#fff;
    font-size:18px;
    border:4px solid #2495d6;
    display:flex;
    flex-direction:column;
    padding:2px 10px;
`;

export const Title = styled.p`
    width:100%;
    text-align:center;
    font-size:25px;
`;

export const Input = styled.input`
    width:200px;
    height:30px;
    border-radius:10px;
    border:2px solid #000;
    padding:0px 4px;
    margin-bottom:10px;
`;

export const TextArea = styled.textarea`
    width:200px;
    height:30px;
    border-radius:10px;
    border:2px solid #000;
    padding:10px;
    margin-bottom:10px;
`;

export const Button = styled.input`
    width:100px;
    height:35px;
    background:#2495d6;
    border:2px solid #0c5782;
    border-radius:10px;
    color:#fff;
    cursor:pointer;
`;

export const ErrorLabel = styled.label`
    color:red;
`;

export const UsersList = styled.div`
    width:20%;
    min-width:300px;
    background:#fff;
    font-size:18px;
    display:flex;
    flex-direction:column;
    padding:0px 10px;
`;

export const UserItem = styled.div`
    width:98%;
    min-height:50px;
    border-bottom:2px solid #e0e0e0;
    display:grid;
    grid-template-columns:repeat(3,1fr)
    margin-bottom:10px;
`;

export const UserItemTitle = styled.p`
    width:100%;
    height:10px;
    text-align:center;
    font-size:16px;
`;

export const UserItemText = styled.p`
    font-size:15px;
`;

export const NoData = styled.p`
    width:100%;
    font-size:18px;
`;

export const EventsList = styled.div`
    width:50%;
    min-width:300px;
    background:#fff;
    font-size:18px;
    border:1px solid rgba(0,0,0,0.3);
    display:flex;
    flex-direction:column;
    padding:10px 10px;
    box-shadow:5px 5px 15px -7px #000000;
`;

export const EventItem = styled.div`
    width:98%;
    min-height:50px;
    border-bottom:2px solid #e0e0e0;
    display:grid;
    grid-template-columns:repeat(3,1fr)
    margin-bottom:10px;
    padding:0px 10px;
`;

export const EventsItem = styled.div`
    width:98%;
    min-height:50px;
    border-bottom:2px solid #e0e0e0;
    display:none;
    grid-template-columns:repeat(3,1fr)
    margin-bottom:10px;
    padding:0px 10px;
`;

export const EventItemTitle = styled.p`
    width:100%;
    height:10px;
    text-align:center;
    font-size:16px;
`;

export const EventItemText = styled.p`
    font-size:15px;
`;

export const ShowButton = styled.button`
    background:none;
    color:#fff;
    width:40px;
    height:30px;
    margin-top:15px;
    border:none;
`;

export const EventSpan = styled.span`
    border-bottom: 2px solid #000;
    background:white;
    display:flex;
    flex-direction:columns;
    text-align:left;
    padding:0px 10px;
`;

export const EventDiv = styled.div`
    width:100%;
    margin-bottom:10px;
    box-shadow:5px 5px 15px -10px #000000;
`;