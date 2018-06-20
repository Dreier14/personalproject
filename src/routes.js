import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Countries from './components/Countries';
import Cities from './components/Cities';
import BackpackerBlog from './components/BackpackerBlog';
import CountryBlog from './components/CountryBlog';
import CountryforBlog from './components/CountryforBlog';
import BackpackerTopics from './components/BackpackerTopics';
import ErrorComponent from './components/ErrorComponent';

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path ="/countries" component={Countries}/>
        <Route exact path = "/country" component={CountryforBlog}/>
        <Route path ="/backpackersblogtopics"component={BackpackerTopics}/>
        <Route path = "/countries/:country" component={Cities}/>
        <Route path = "/country/:country/countryblog" component={CountryBlog}/>  
        <Route path ="/profile" component={Profile}/> 
        <Route path="/edit" component={EditProfile} />
        <Route path = "/backpackersblogtopics/:topics/backpackerblog" component={BackpackerBlog}/> 
        <Route component={ErrorComponent}/>   
    </Switch>
  )