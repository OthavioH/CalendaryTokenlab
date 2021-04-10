import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ShowUsers from './pages/ShowUsers';
import EventsForm from './pages/EventsForm';
import Events from './pages/Events';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/user/logout" component={Logout}/>
            <Route exact path="/users" component={ShowUsers}/>
            <Route exact path="/events/create" component={EventsForm}/>
            <Route exact path="/events" component={Events}/>
        </BrowserRouter>
    );
}