import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./Nav.css";
import FaHome from 'react-icons/lib/fa/home';
import styled from 'styled-components';
import IoIosContact from 'react-icons/lib/io/ios-contact';
import FaGlobe from 'react-icons/lib/fa/globe';
import GoSignIn from 'react-icons/lib/go/sign-in';
import MdLocalAirport from 'react-icons/lib/md/local-airport';
import IoIosBriefcase from 'react-icons/lib/io/ios-briefcase';

const Nav = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/callback`);
    const auth0LoginUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;

const Wrapper = styled.li`
font-size:1.3em`


   
        return (
        <div>
          
            <header className = "header">
              <Link to = "/" className= "logo">WB Explorer</Link>
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                    <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                         <ul className="menu">
                            <Wrapper><Link to="/" ><FaHome/></Link></Wrapper>
                            <Wrapper><Link to="/profile">Profile<IoIosContact/></Link></Wrapper>
                            <Wrapper><Link to="/countries">Country Info<FaGlobe/></Link></Wrapper>
                            <Wrapper><Link to="/country">Travel Blog<MdLocalAirport/></Link></Wrapper>
                            <Wrapper><Link to="/backpackersblogtopics">Backpacker Blog<IoIosBriefcase/></Link></Wrapper>
                            <Wrapper><a href={auth0LoginUrl}>Log In<GoSignIn/></a></Wrapper>
                        </ul>
             </header>
        </div>
        );
    
}

export default Nav ;