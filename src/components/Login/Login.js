import React,  {Component} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
// import styled from 'styled-components';
import LottieControl from './LottieControl';

// const Wrapper = styled.div`
//   color: rgba(25, 88, 206, 0.836);
//   border: 6px rgba(25, 88, 206, 0.836);
//   text-align: center;
//   border-height: 2em;
//   background-color: rgba(211, 211, 211, 0.411);
//   font-size: 5vw;
//   position:absolute;
//   max-width:100%;
//   top:15%;
//   margin:auto;
//   justify-content:center;`

// const Text = styled.div`
//   color: black;
//   border: 6px rgba(25, 88, 206, 0.836);
//   text-align: center;
//   border-height: 2em;
//   background-color: rgba(211, 211, 211, 0.411);
//   font-size: 2vw;
//   position:absolute;
//   max-width:100%;
//   top:100%;
//   margin:auto;
//   `

  

class Login extends Component {
  render (){

return (
    <div>
      <div className="background">
        <Nav/>
          <div>
            <LottieControl/>
           {/* <Wrapper> */}
            <div className = "outer">
             Welcome To WB Explorer!
             {/* <Text> */}
            
              <div className="inner">
             <p> We are a site dedicated for first time travelers, backpackers or travelers in general.</p>
              </div>
            </div>
             {/* </Text> */}
           {/* </Wrapper> */}
          
             
          
        </div>
      </div>
    </div>
  );
  }
} 
export default Login;