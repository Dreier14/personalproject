import React,  {Component} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';
class Login extends Component {
  render (){
  return (
    <div>
      <Nav/>
        <div className = "greeting"><h1> WELCOME TO WB EXPLORER! </h1>
        <br/>
        <div className = "info"> <p> We are a site dedicated for first time travelers, backpackers or travelers in general. </p>
        </div>
      </div>
    </div>
  );
  }
} 
export default Login;