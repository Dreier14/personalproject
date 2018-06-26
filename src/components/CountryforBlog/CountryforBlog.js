import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import LottieController from './LottieController';
import './CountryforBlog.css';
import LottieCountry from '../Countries/LottieCountry';

const Background = styled.div
      `background: linear-gradient(rgba(177, 177, 177, 0.6), rgba(177, 177, 177, 0.6)), url('https://images.pexels.com/photos/91217/pexels-photo-91217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
       min-height: 100vh;
       background-position: center;
       background-repeat: no-repeat;
       background-attachment: fixed;
       background-size: cover;
      position: relative;`

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

            <div className = "CountryBlogLanding" style={{backgroundImage: `url(${element.pictures})`, backgroundSize: 'cover', height:'80vh', display: 'flex', justifyContent:'center', alignItems: 'center', fontSize:'40px'}} key = {element.id}>
                <br/>
                    <div className ="CountryforBlog">
                        <Link style={{color:'rgba(30, 74, 121)', textDecoration:'none'}} to={{pathname: `/country/${element.country}/countryblog`, state: element.id}}> 
                            <LottieController/>
                            {element.country}
                        </Link>
                    </div>
            </div>
            
        )
        console.log(element.pictures);
    })
        return (
            <div>
                <Nav/>
                    <Background>
                        <div style={{paddingTop: '80px'}}>
                            <div className="Countries">
                                 Countries
                              <LottieCountry/>
                                {countries}
                            </div>
                        </div>
                    </Background>
            </div>
           
        );
    }
}

export default CountryforBlog