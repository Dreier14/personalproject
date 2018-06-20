import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import Nav from './Nav';

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
        <h1>Profile</h1>
         {user && <div>
            <img src={myUser.picture} className="photo" /> 
            <h1>{myUser.username}</h1>
            <h3>Email: {myUser.email}</h3>
            <h2> About Me: </h2>
            <p>{myUser.about}</p>
            <div>
              <button> <Link to="/edit">Edit profile</Link> </button>
            </div>
              <br/>
              <button onClick={() => this.logout()}>Log out</button>
         </div>}
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