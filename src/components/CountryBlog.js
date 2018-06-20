import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Nav from './Nav';
import {connect} from 'react-redux';
import SearchBar from './SearchBar';

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
        axios.delete(`/api/deleteCountryBlogPost/${id}`).then(response =>
        {
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
            return (
                <div key={element.id}>
                    <h1>{element.username}</h1>
                    <img src ={element.picture} className ="photo"/>
                    <h5>{element.post}</h5>
                    <h6>{element.stamp}</h6>
                    
                    {this.props.state.user.id === element.user_id ?
                    <div>
                    <textarea className ="inputChange" id={element.id} onChange = { event => this.handleChanges(event.target.value)}></textarea> 
                    <br/>
                    <button onClick={() => this.deletePost(element.id)}>Delete</button>
                    <button onClick={() => this.editCountryBlogPost(element.id)}> Edit Post </button>
                    </div> :''}
                    
                </div>)

            
         }).reverse()
        return (
       
        <div> 
         <Nav/>
     
    
        {username && username} 
        <br/> 
        
        <textarea className ="input" onChange = { event => this.handleChange(event.target.value)} value={this.state.currentPost}></textarea> 
        <br/> 
      
         <button onClick = {() => {this.createCountryBlogPost()}}> Create Post </button>
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