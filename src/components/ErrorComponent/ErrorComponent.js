import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import GoAlert from 'react-icons/lib/go/alert';
import styled from 'styled-components';
import './ErrorComponent.css'
import LottieError from './LottieError';



const Background = styled.div`
background: linear-gradient(rgba(177, 177, 177, 0.6), rgba(177, 177, 177, 0.6)), url('https://www.elegantthemes.com/blog/wp-content/uploads/2017/07/404-error.png');
min-height: 100vh;
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
position: relative;`


class ErrorComponent extends Component {
    render() {
        return (
          <div>
              <Background>
                <div className = "Error">
                    <div className = "Text">
                         404 Error 
                     <br/>
                        The Page You Requested is Invalid
                     <br/>
                        <GoAlert/>
                     <br/>
                        Click on the Link Below to Return to the Homepage
                     <br/>
                        <Link to="/" >  <LottieError/></Link>
                    </div>
                </div>
              </Background>
          </div>  
        );
    }
}

export default ErrorComponent;