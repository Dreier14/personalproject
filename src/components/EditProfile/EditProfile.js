import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateEmail, updatePicture, updateUsername, updateAbout, updateCountry} from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import {Image} from 'cloudinary-react';
import {Redirect} from 'react-router-dom'
import "../Css/Buttons.css"
import styled from 'styled-components';
import '../Profile/Profile.css';


const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/adamsdevmountain/image/upload'

const Background = styled.div
      `background: linear-gradient(rgba(177, 177, 177, 0.6), rgba(177, 177, 177, 0.6)), url('https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
       min-height: 120vh;
       background-position: center;
       background-repeat: no-repeat;
       background-attachment: fixed;
       background-size: cover;
       position: relative;`


class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      username:'',
      email: '',
      picture:'',
      about: '',
      country:'',
  };
    
    this.updateEmail = this.updateEmail.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateAbout = this.updateAbout.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
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
   
  handleImageUpload = (file) => {

    axios.get('/api/upload').then(response => {

        console.log(response.data.signature);
        let formData = new FormData();
        formData.append("signature", response.data.signature)
        formData.append("api_key", "546115183267443");
        formData.append("timestamp", response.data.timestamp)
        formData.append("file", file[0])
   
        axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {
          console.log('cloud response',response)
          this.setState({
              picture: response.data.secure_url
          })
        }).catch( err => {
        console.log(err);
      })
    })
  }
  
  updateCountry(value){
    this.setState({
      country: value,
    })
  }

  updateAbout(value){
    this.setState({
      about: value,
    })
  }

  updateEmail(value) {
    this.setState({
      email: value,
    });
  }

  updateUsername(value){
    this.setState({
      username: value,
    });
  }

  editProfile() {
    console.log("profile")
    const { updateEmail, updatePicture, updateUsername, updateAbout, updateCountry, history } = this.props;
    axios.put('/api/user', {
      username: this.state.username || this.props.user.username,
      email: this.state.email || this.props.user.email,
      picture: this.state.picture || this.props.user.picture,
      about: this.state.about || this.props.user.about,
      country: this.state.country || this.props.user.country
    
    }).then(response => {
        updateUsername(this.state.username)
        updateEmail(this.state.email)
        updateAbout(this.state.about)
        updateCountry(this.state.country)
        
        
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
    
    return (
      <div>
        <Nav/>
          <div>
           <Background>
           <div style={{paddingTop: '80px'}}>
            <div className="center">
              <div className="text">
                <h1 style={{color:'rgb(30, 74, 121)'}}>Edit Profile</h1>
                  <hr/>
                  <br/>
                    <div> User Name </div>
                      <br/>
                    <input onChange= {(event)=>this.updateUsername(event.target.value)} placeholder={this.props.username}/>
                      <br/>
                      <br/>
                    <div> Email </div>
                      <br/>
                    <input onChange={(event)=>this.updateEmail(event.target.value)} placeholder={this.props.email}/>
                      <br/>
                      <br/>
                    <div> Profile Photo </div>
                      <br/>
                    <input type="file" name="file" id="file" className="inputfile"   height="200px" width= "200px"onChange={(event)=>this.handleImageUpload(event.target.files)} placeholder={this.props.picture}/>
                      <label for="file">Choose a file</label>
                        <br/>
                        <br/>
                      <img src ={this.state.picture}/>
                        <br/>
                    <div>Country</div>
                        <select classname= "Home-Country" value= {this.state.country} onChange={event => this.updateCountry(event.target.value)}>
                            <option value = "Default"> Select </option>
                            <option value = "United States"> United States</option>
                            <option value = "Canada"> Canada </option>
                            <option value = "England"> England </option>
                            <option value = "Ireland"> Ireland </option>
                            <option value = "France"> France </option>
                            <option value = "Scotland"> Scotland </option>
                            <option value = "Geramany">Germany </option>
                            <option value = "Italy"> Italy </option>
                            <option value = "Spain"> Spain </option>
                            <option value = "Portugal"> Portugal </option>
                            <option value = "Denmark"> Denmark </option>
                            <option value = "Sweden"> Sweden </option>
                            <option value = "Norway"> Norway </option>
                            <option value = "Poland"> Poland </option>
                            <option value = "China"> China </option>
                            <option value = "Japan"> Japan </option>
                            <option value = "Turkey"> Turkey </option>
                            <option value = "Russia"> Russia </option>
                            <option value = "Ukraine"> Ukraine</option>
                            <option value = "Mexico"> Mexico </option>
                            <option value = "Netherlands"> Netherlands </option>
                            <option value = "Czech Republic"> Czech Republic </option>
                            <option value = "Thailand"> Thailand </option>
                            <option value = "Veitnam"> Veitnam </option>
                            <option value = "Korea">Korea</option>
                         </select>
                          <br/> 
                          <br/>
                    <div> About Me </div>
                </div>
                    <br/>
                      <textarea className ="input" rows="10" cols="40"  onChange = {event => this.handleChange(event.target.value)} placeholder={this.props.about}></textarea>  
                    <br/>
                    <br/>
                      <button className="button" onClick={this.editProfile}>Update</button>
                </div>
            </div>
          </Background>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
return state
}

const mapDispatchToProps = { 
  updateEmail, updateUsername, updateAbout, updateCountry
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)