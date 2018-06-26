import React,  {Component} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import styled from 'styled-components';
import LottieControl from './LottieControl';

const Wrapper = styled.div`
color: rgba(25, 88, 206, 0.836);
border: 6px rgba(25, 88, 206, 0.836);
text-align: center;
border-height: 2em;
background-color: rgba(211, 211, 211, 0.411);
font-size:4em;
position:absolute;
width:100%;
top:10%;
`
const Text = styled.div`
color: black;
border: 6px rgba(25, 88, 206, 0.836);
text-align: center;
border-height: 2em;
background-color: rgba(211, 211, 211, 0.411);
font-size:1.25em;
position:absolute;
width:100%;
top:21.65%;
`
class Login extends Component {
  render (){

return (
    <div>
      <div className="background">
        <Nav/>
          <div>
            <LottieControl/>
           <Wrapper>
             Welcome To WB Explorer!
           </Wrapper>
           <Text>
             <p> We are a site dedicated for first time travelers, backpackers or travelers in general.</p>
           </Text>
        </div>
      </div>
    </div>
  );
  }
} 
export default Login;