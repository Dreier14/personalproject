import React, { Component } from 'react';
import Nav from './Nav';
import {Link} from 'react-router-dom';
import axios from 'axios';

class BackpackerTopics extends Component {
    constructor(){
        super();
        this.state ={
           topics : []
        }
    }


    componentDidMount(){
       this.getBackpackerTopics()
       console.log('BPT is being hit')
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

    let backpackTopics = this.state.topics.map(element => {
        return(
            <div key = {element.id}>
                <Link to ={{pathname:`/backpackersblogtopics/${element.topics}/backpackerblog`, state: element.id}}> {element.topics}</Link>
            </div>
        )
    })
    console.log('topics', backpackTopics)
        return (
            <div>
            <Nav/>
                <div style={{paddingTop: '150px'}}>
                    Topics
                    {backpackTopics}
                </div>
            </div>
        );
    }
}

export default BackpackerTopics;