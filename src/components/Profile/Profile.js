import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import "../Css/Buttons.css";
import styled from 'styled-components';
import './Profile.css'


    class Profile extends Component {
  componentDidMount() {
    const { loginUser } = this.props;
   
      axios.get('/api/user').then(response => {
        console.log(response.data)
        if (response.data) {
          loginUser(response.data);
        } else { this.props.history.push("/"),alert('Please Login to create a profile.')}
      });
    }

  logout() {
    const { logoutUser, history } = this.props;
    axios.post('/api/logout').then(response => {
      logoutUser();
      history.push('/');
    });
  }
  
  render() {
    const { user } = this.props;
    let myUser = user;
    console.log(user, myUser)

    return (
      <div>    
       <Nav/>
        <div className ="ProfileBackground">
          <div style={{paddingTop: '80px', color:'rgba(30, 74, 121)'}}>
            {user && 
              <div>
                <div className="info">
                <div className= "title">
                <h1>{myUser.username}</h1>
                </div>
                    <hr/>
                <div className ="user">
                   <img src={myUser.picture} className="image" height="300px" width="300px"/> 
                <div className= "userInfo">
                      
                      <h3>Email: {myUser.email}</h3>
                      <h2> About Me: </h2>
                      <p>{myUser.about}</p>
                      <h4> Country:{myUser.country}</h4>
                </div>
                  </div>
                  <div className = "movebutton1">
                     <button className ="button"> <Link to="/edit">Edit profile</Link> </button>
                  </div>
                  <div className = 'movebutton2'>
                    <button className="button" onClick={() => this.logout()}>Log out</button>
                  </div>
                  <hr/>
                </div>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  loginUser,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);