import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Currency from './Currency';
import styled from 'styled-components';
import LottieControllerCountries from './LottieControllerCountries';
import '../Css/Buttons.css';
import './Countries.css';
import LottieCountry from './LottieCountry';
import LottieController from './LottieController';


const Background = styled.div`
background: linear-gradient(rgba(177, 177, 177, 0.6), rgba(177, 177, 177, 0.6)), url('https://images.pexels.com/photos/269633/pexels-photo-269633.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
min-height: 340vh;
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
position: relative;`

class Countries extends Component {
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
        axios.get(`/api/getCountries/`).then(response =>{
            console.log(response)
            this.setState({
                worldCountry: response.data.getCountry
            })
        }).catch(err => console.log("cannot get countries", err));
    }

    

    render() {

    let countries = this.state.worldCountry.map(e => {
        return(
            <div style={{backgroundImage: `url(${e.picture})`, backgroundSize: 'cover', height:'80vh', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}} key = {e.id}>
                <div className="Country"> <Link style={{color:'rgba(30, 74, 121)', textDecoration:'none',fontSize:'40px', alignItems: 'center',justifyContent:'center'}} to={{pathname: `/countries/${e.country}/cities`, state: e.id}}><LottieController/> {e.country}</Link><br/>
                    <div className='text'>
                        <p> {e.info} </p> 
                    </div>
                </div>
            </div>
        )
    })
        return (
            <div>
                <Nav/>
                    <Background>
                        <div style={{paddingTop: '80px'}}>
                           <div className = "Countries">   
                                Countries
                           </div>
                                <LottieCountry/>
                                 {countries} 
                                     <br/>
                           <div className = "Currency">
                                 <Currency/>
                            <LottieControllerCountries/>
                           </div>
                        </div>
                    </Background>
            </div>
           
        );
    }
}


export default Countries 