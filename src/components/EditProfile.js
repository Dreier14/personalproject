import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateEmail, updatePicture, updateUsername, updateAbout } from '../ducks/reducer';
import Nav from './Nav';
import {Image} from 'cloudinary-react';
import {Redirect} from 'react-router-dom'

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/adamsdevmountain/image/upload'

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      email: '',
      picture:'',
      about: ''
    };
    
    this.updateEmail = this.updateEmail.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateAbout = this.updateAbout.bind(this);
  }

  

  componentWillMount(){
    console.log(this.props);
    axios.get('/api/user').then(response => {
      console.log('USER RESPONSE', response.data)
      if(!response.data){
        this.props.history.push('/'),alert('Please Login to create a profile.')
      }
    })
  }
    // if (this.props.user === null){ 
    //   <Redirect to={'/'}/>
    //   // alert("You Must Login or Sign Up to Post!")
    // } else {
    //   this.editProfile()
    // }
 
  

  handleImageUpload = (file) => {

    axios.get('/api/upload').then(response => {

        console.log(response.data.signature);
        let formData = new FormData();
        formData.append("signature", response.data.signature)
        formData.append("api_key", "546115183267443");
        formData.append("timestamp", response.data.timestamp)
        formData.append("file", file[0])
   
        axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
          console.log(response)
          this.setState({
              picture: response.data.secure_url
          })
        }).catch( err => {
        console.log(err);
      })
    })
  }
  

  updateAbout(event){
    this.setState({
      about: event.target.value,
    })
  }

  updateEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  updateUsername(event){
    this.setState({
      username: event.target.value,
    });
  }


  editProfile() {
    console.log("profile")
    const { updateEmail, updatePicture, updateUsername, updateAbout, history } = this.props;
    axios.put('/api/user', {
      username: this.state.username || this.props.user.username,
      email: this.state.email || this.props.user.email,
      picture: this.state.picture || this.props.user.picture,
      about: this.state.about || this.props.user.about
    
    }).then(response => {
        updateUsername(this.state.username)
        // updatePicture(this.state.picture)
        updateEmail(this.state.email)
        updateAbout(this.state.about)
        
        
      this.props.history.push('/profile');
    }).catch(err=> console.log("ERROR_____________________",err))
  }

  clearAllFields(){
    this.setState({
       about:''
    })
  }


  handleChange(val){
  this.setState({
      about: val
    })
  }

  render() {
    // if (!this.props.user) { 
    //   this.props.history.push('/')
    // };
    //  const {username, picture, email, about} = this.props.user
    return (
      <div>
        <Nav/>
        {/* {this.props.user && */}
          <div>
           <h1>Edit Profile</h1>
           <br/><div> User Name </div>
           <input onChange={this.updateUsername} placeholder={this.props.username}/>
           <br/><div> Email </div>
           <input onChange={this.updateEmail} placeholder={this.props.email}/>
           <br/><div> Profile Photo </div>
           <input type="file" onChange={(event)=>this.handleImageUpload(event.target.files)} placeholder={this.props.picture}/>
           <br/> <div> About Me </div>
           <textarea className ="input" onChange = {event => this.handleChange(event.target.value)} placeholder={this.props.about}></textarea>  
           <br/>
           <button onClick={this.editProfile}>Update</button></div>
        {/* } */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
return state
}

const mapDispatchToProps = { 
  updateEmail, updateUsername, updateAbout
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)