import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import "../Css/Buttons.css";
import styled from 'styled-components';
import './Profile.css'



const Background = styled.div
  ` background: linear-gradient(rgba(177, 177, 177, 0.6), rgba(177, 177, 177, 0.6)), url('https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
    height: 170vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;`


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
        <Background>
          <div style={{paddingTop: '80px', color:'rgba(30, 74, 121)'}}>
            {user && 
              <div>
                <div className="center">
                   <h1>Profile</h1>
                    <hr/>
                  <div className = "movebutton1">
                     <button className ="button"> <Link to="/edit">Edit profile</Link> </button>
                  </div>
                  <div className = 'movebutton2'>
                    <button className="button" onClick={() => this.logout()}>Log out</button>
                  </div>
                   <img src={myUser.picture} className="photo" height="300px" width="300px" /> 
                  <div style={{ justifyContent: "center", background: "rgba(255, 255, 255, 0.493)" , width: "63.5%"}}>
                      <h1>{myUser.username}</h1>
                      <h3>Email: {myUser.email}</h3>
                      <h2> About Me: </h2>
                      <p>{myUser.about}</p>
                      <h4> Country:{myUser.country}</h4>
                  </div>
                  <hr/>
                </div>
            </div>}
          </div>
        </Background>
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