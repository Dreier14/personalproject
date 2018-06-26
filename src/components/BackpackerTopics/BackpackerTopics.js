import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import './BackpackerTopic.css';
import LottieControllerTopics from './LottieControllerTopics';
import '../Countries/Countries.css';

const Background = styled.div`
background: linear-gradient(rgba(177, 177, 177, 0.6), rgba(177, 177, 177, 0.6)), url('https://images.pexels.com/photos/721169/pexels-photo-721169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
min-height: 100vh;
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
position: relative;`

class BackpackerTopics extends Component {
    constructor(){
        super();
        this.state ={
           topics : []
        }
    }


    componentDidMount(){
       this.getBackpackerTopics()
    }
    getBackpackerTopics(){
        axios.get(`/api/getBackpackerBlogTopics`).then(response =>{
            console.log(response)
            this.setState({
                topics: response.data.getAllTopics
            })
        }).catch(err => console.log("cannot get countries", err));
    }

    

    render() {
      
    let backpackerTopics = this.state.topics.map(element => {
        
            return(
            <div className = "BackpackerTopics" style={{backgroundImage: `url(${element.picture})`, backgroundSize: 'cover', height:'80vh', display: 'flex', justifyContent:'center', alignItems: 'center', fontSize:'40px', opacity:'.85'}}key = {element.id}>

                <Link style={{color:'rgba(30, 74, 121)', textDecoration:'none',justifyContent:'center', alignItems: "center", background: 'rgba(255, 255, 255, 0.76)', position: 'absolute', width: '100%', textAlign: 'center'}} to ={{pathname:`/backpackersblogtopics/${element.topics}/backpackerblog`, state: element.id}}> <LottieControllerTopics/>{element.topics}</Link>
            </div>
        )
    })
   
        return (
            <div>
              <Nav/>
              <Background>
                <div style={{paddingTop: '80px'}}>
                    <div className="Countries">
                            Topics
                        {backpackerTopics}
                    </div>
                </div>
                </Background>
            </div>
        );
    }
}

export default BackpackerTopics;