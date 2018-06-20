import React, { Component } from 'react';
import Nav from './Nav';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import Currency from './Currency';

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
            <div key = {e.id}>
                <Link to ={`/countries/${e.country}/cities`}> {e.country}</Link>
            </div>
        )
    })
        return (
            <div>
            <Nav/>
            
            Countries
            {countries} 
            {/* <Currency/> */}
            </div>
           
        );
    }
}


export default Countries 