import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./Nav.css"

const Nav = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/callback`);
    const auth0LoginUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
   
   
        return (
        <div>
            <header className = "header">
              <a href="" className= "logo">WB Explorer </a>  
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">
                 <li><Link to="/" >Home</Link></li>
                 <li><Link to="/profile">Profile</Link></li>
                 <li><Link to="/countries">Country Info</Link></li>
                 <li><Link to="/country">Country Blog</Link></li>
                 <li><Link to="/backpackersblogtopics">Backpackers Blog</Link></li>
                 <li><a href={auth0LoginUrl}>Log In</a></li>
                </ul>
             </header>
        </div>
        );
    
}

export default Nav ;