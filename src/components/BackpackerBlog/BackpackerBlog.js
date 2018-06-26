import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux'; 
import '../CountryBlog/CountryBlog.css';
import "../Css/Buttons.css";
import styled from 'styled-components'

const Backgroundbackpacker = styled.div`
            background: linear-gradient(rgba(177, 177, 177, 0.6), rgba(177, 177, 177, 0.6)), url('https://images.pexels.com/photos/34511/norway-mountain-sky-blue.jpg?cs=srgb&dl=adventure-backpack-beautiful-34511.jpg&fm=jpg');
            min-height: 100vh;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
            position: relative;`

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
                <h3> {element.username}</h3>

                <img src= {element.picture} className="photo" height="100px" width="100px"/>
                <div style={{ justifyContent: "center", background: "rgba(255, 255, 255, 0.493)" , width: "63.5%"}}>
                <h5>{element.post}</h5>
                <h6>{element.stamp}</h6>
                </div>
                {this.props.state.user.id === element.user_id ?
                <div>
                <textarea className ="inputChange" rows="9" cols="50" id={element.id} onChange = { event => this.handleChanges(event.target.value)}></textarea> 
                <br/>
                <div className = "movebutton1">
                <button className="button"onClick={() => this.deletePost(element.id)}>Delete</button>
                </div>
                <div className = "movebutton2">
                <button className="button"onClick={() => this.editBackpackerBlogPost(element.id)}> Edit Post </button>
                </div>
                </div> : ''}
                </div>)
        }).reverse()
            return (
              <div> 
                 <Nav/> 
                    <Backgroundbackpacker>
                        <div className="backgroundbackpacker">
                            <div style={{paddingTop: '80px'}}>
                            <div className= "center" syle={{position:'absolute'}}>
                                    <div style={{color:'rgb(30, 74, 121)', fontSize:'3em'}}> Backpacker Blog Forum </div>
                                    <hr/>
                                     {username && username}
                                    <hr/>
                                     <div className='createpost' style = {{color:'rgb(30, 74, 121)', fontSize:'3em'}} >Create a Post</div>
                                        <textarea className="input" rows="9" cols="50" onChange ={ event => this.handleChange(event.target.value)} value={this.state.currentPost}></textarea>
                                    <br/>
                                    <div className = "movebutton1">
                                    <button className="button" onClick ={()=> {this.createBackpackerBlogPost()}}> Create Post </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Backgroundbackpacker>
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