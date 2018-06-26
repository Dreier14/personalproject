import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import "../Css/Buttons.css"
import styled from 'styled-components';
import './CountryBlog.css';


const Background = styled.div
      `background: linear-gradient(rgba(177, 177, 177, 0.6), rgba(177, 177, 177, 0.6)), url('https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
       min-height: 150vh;
       background-position: center;
       background-repeat: no-repeat;
       background-attachment: fixed;
       background-size: cover;
      position: relative;`


 class CountryBlog extends Component {
    constructor(){
        super();
        this.state = {
            posts : [],
            currentPost: '',
            editPost: ''
        }
    }
    
    componentDidMount(){
       if (this.props.state.user === null ){ this.props.history.push('/country'),alert("You Must Login or Sign Up to Post!")} 
            else {this.getCountryBlogPost()}

    }

    handleChange(val){
        this.setState({
            currentPost: val
            
        })
    }

    handleChanges(val){
        this.setState({
            editPost: val
        })
    }
    createCountryBlogPost(){
        // console.log("hey props is here", this.props.location.state)
        const {username, picture} = this.props.state.user;
        let param = {
            countries_id: this.props.location.state,
            username: username,
            picture: picture,
            post: this.state.currentPost ,
            stamp: new Date(),
        }
        console.log("params",param);
        axios.post(`/api/createCountryBlogPost`, param).then(response => {
            console.log(response)
                this.setState({
                posts : response.data.countryBlogPost,
                currentPost: ''   
                })
                this.getCountryBlogPost();
            
        })
    }

    getCountryBlogPost(){
        console.log("get country blog posts")
        axios.get(`/api/getCountryBlogPost/${this.props.location.state}`).then(response => {
            console.log(response)
            console.log()
            this.setState({
                posts: response.data.countryBlogPost
           
            })
         }).catch(err=> console.log("axios error--------------> get country call", err))
    }

    editCountryBlogPost(post_id){
        let body = {
            post: this.state.editPost,
            stamp: new Date()
        }
        let editTextArea = document.getElementById(post_id)
        axios.put(`/api/editCountryBlogPost/${post_id}`, body).then(response => {
            console.log(response.data)
            this.setState({
                posts: response.data.countryBlogPost,
                editPost: ''
            });
        editTextArea.value = '';
        }).catch(err => console.log("axios edit error", err));
    }

    deletePost(id){
        console.log(id)
        axios.delete(`/api/deleteCountryBlogPost/${id}`).then(response =>
        {   
            console.log(response);

            this.getCountryBlogPost()
        }).catch(err => console.log("axios delete error---------->", err))
        console.log(id)
    }

    clearAllFields(){
        this.setState({
           posts:''
        })
    }

    render() {
        // console.log(this.props)
        console.log(this.state.posts)
        let username = this.state.posts && this.state.posts.map(element => {
            //console.log(element.username);
            console.log(element)
            return (
                <div key={element.id}>
                    <h1>{element.username}</h1>
                    <img src ={element.picture} className ="photo" height="100px" width="100px"/>
                    <div style={{ justifyContent: "center", background: "rgba(255, 255, 255, 0.493)" , width: "63.5%"}}>
                    <h5>{element.post}</h5>
                    <h6>Date:{element.stamp}</h6>
                    </div>
                    {this.props.state.user.id === element.user_id ?
                    <div>
                    <textarea className ="inputChange" rows="9" cols="50" id={element.id} onChange = { event => this.handleChanges(event.target.value)}></textarea> 
                    <br/>
                    <div className = "movebutton1">
                    <button className="button" onClick={() => this.deletePost(element.id)}>Delete</button>
                    </div>
                    <div className = "movebutton2">
                    <button className="button" onClick={() => this.editCountryBlogPost(element.id)}> Edit Post </button>
                    </div>
                    </div> :''}
                    
                </div>)

            
         }).reverse()
        return (
       
        <div> 
         <Nav/>
            <Background>
                 <div style={{paddingTop: '80px'}}>
                        <div className= "center" syle={{position:'absolute'}}>
                        <div style={{color:'rgb(30, 74, 121)', fontSize:'3em'}}> Travel Blog Forum </div>
                        <hr/>
                        {username && username} 
                        <br/> 
                        <hr/>
                        <div className='createpost' style = {{color:'rgb(30, 74, 121)', fontSize:'3em'}} >Create a Post</div>
                            <textarea className ="input" rows="9" cols="50" onChange = { event => this.handleChange(event.target.value)} value={this.state.currentPost}></textarea> 
                        <br/>
                        <div className = "movebutton1">
                            <button className="button" onClick = {() => {this.createCountryBlogPost()}}> Create Post </button>
                        </div>
                        </div>
                 </div> 
            </Background>      
        </div>
        
        );
    }
}

const mapStateToProps = state => { 
    return {
        state
    }
} 

// const mapDispatchToProps ={
    
// }

export default connect(mapStateToProps)(CountryBlog);