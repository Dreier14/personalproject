import React, { Component } from 'react';
import Nav from './Nav';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux'; 

class BackpackerBlog extends Component {
    constructor(){
        super();
        this.state ={
            posts: [],
            currentPost: '',
            editPost:''
        }
    }

    componentDidMount(){
        console.log("loaded")
        if (this.props.state.user === null ){ this.props.history.push('/'),alert("You Must Login or Sign Up to Post!")} 
            else this.getBackpackerBlogPost()}
 

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
    createBackpackerBlogPost(){
    //    console.log(this.props) 
        const {username, picture} = this.props.state.user;
        let param = {
            topic_id: this.props.location.state,   
            username: username,
            picture: picture,
            post: this.state.currentPost,
            stamp: new Date(),
        }
        axios.post(`/api/createBackpackerBlogPost`, param).then(response => {
            console.log(response)
            this.setState({
                posts: response.data.backpackerBlog,
                currentPost:''
            })
            this.getBackpackerBlogPost();
        })
    }

    getBackpackerBlogPost(){
        axios.get(`/api/getBackpackerBlogPost/${this.props.location.state}`).then(response =>{
            console.log(response)
            this.setState({
                posts: response.data.backpackerBlog
            })
        }).catch(err => console.log ('axios-------------> get backpacker call'))
    }

    editBackpackerBlogPost(post_id){
        console.log(post_id, "id");
        let body = {
            post: this.state.editPost,
            stamp: new Date()
        }
        let editTextArea = document.getElementById(post_id)
        axios.put(`/api/editBackpackerBlogPost/${post_id}`, body).then(response => {
            console.log(response.data)
            this.setState({
                posts: response.data.backpackerBlog,
                editPost: ''
            })
            editTextArea.value = ''
        }).catch(err => console.log('axios edit error', err));
    }

    deletePost(id){
        axios.delete(`/api/deleteBackpackerBlogPost/${id}`).then(response =>{
            this.getBackpackerBlogPost()
        }).catch(err => console.log('delete error -------------------->', err))
        console.log(id)
    }

    clearAllFields(){
        this.setState({
            posts: ''
        })
    }
    render() {

        let username = this.state.posts && this.state.posts.map(element => {
            console.log(element.username)
            return(
                <div key ={element.id}>
                <h1> {element.username}</h1>
                <img src= {element.picture} className="photo"/>
                <h5>{element.post}</h5>
                <h6>{element.stamp}</h6>
                {this.props.state.user.id === element.user_id ?
                <div>
                <textarea className ="inputChange" id={element.id} onChange = { event => this.handleChanges(event.target.value)}></textarea> 
                <br/>
                <button onClick={() => this.deletePost(element.id)}>Delete</button>
                <button onClick={() => this.editBackpackerBlogPost(element.id)}> Edit Post </button>
                </div> : ''}
                </div>)
        }).reverse()
            return (
              <div> 
                 <Nav/> 
                {username && username}

                <textarea className="input" onChange ={ event => this.handleChange(event.target.value)} value={this.state.currentPost}></textarea>
                <button onClick ={()=> {this.createBackpackerBlogPost()}}> Create Post </button>
             </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        state
    }
}
export default connect(mapStateToProps)(BackpackerBlog);