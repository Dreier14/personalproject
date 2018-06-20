import React, { Component } from 'react';
import Nav from './Nav';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

class CountryforBlog extends Component {
    constructor(){
        super();
        this.state ={
            worldCountry : []
        }
    }


    componentDidMount(){
       this.getCountries()
    }
    getCountries(){
        axios.get(`/api/getCountry/`).then(response =>{
            console.log(response)
            this.setState({
                worldCountry: response.data.getAllCountries
            })
        }).catch(err => console.log("cannot get countries", err));
    }

    render() {
        
    let countries = this.state.worldCountry.map(element => {
        return(

            <div className = "CountryBlogLanding" style={{backgroundImage: `url(${element.pictures})`}} key = {element.id}>
                <Link to={{pathname: `/country/${element.country}/countryblog`, state: element.id}}> {element.country}</Link>
                {/* <img src ={element.pictures}/> */}
               
            </div>
            
        )
        console.log(element.pictures);
    })
        return (
            <div>
                <Nav/>
                <div style={{paddingTop: '200px'}}>
                Countries
                {countries}
                </div>
            </div>
           
        );
    }
}

export default CountryforBlog