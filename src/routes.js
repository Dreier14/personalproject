import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import EditProfile from './components/EditProfile/EditProfile';
import Countries from './components/Countries/Countries';
import Cities from './components/Cities/Cities';
import BackpackerBlog from './components/BackpackerBlog/BackpackerBlog';
import CountryBlog from './components/CountryBlog/CountryBlog';
import CountryforBlog from './components/CountryforBlog/CountryforBlog';
import BackpackerTopics from './components/BackpackerTopics/BackpackerTopics';
import ErrorComponent from './components/ErrorComponent/ErrorComponent';

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path ="/countries" component={Countries}/>
        <Route exact path = "/country" component={CountryforBlog}/>
        <Route exact path ="/backpackersblogtopics"component={BackpackerTopics}/>
        <Route path = "/countries/:country" component={Cities}/>
        <Route path = "/country/:country/countryblog" component={CountryBlog}/>  
        <Route path ="/profile" component={Profile}/> 
        <Route path="/edit" component={EditProfile} />
        <Route path = "/backpackersblogtopics/:topics/backpackerblog" component={BackpackerBlog}/> 
        <Route component={ErrorComponent}/>   
    </Switch>
  )