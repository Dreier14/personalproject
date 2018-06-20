import React, { Component } from 'react';
import Weather from './Weather';
import Nav from './Nav';
import axios from 'axios';

class Cities extends Component {
    constructor(){
        super()
        this.state={
            countryCities: []
        }
    }

    componentDidMount(){
        this.getCities()
    }

    getCities(){
        axios.get(`/api/getCities/`).then(response => {
            console.log(response)
            this.setState({
                countryCities: response.data.getCity
            })
        }).catch(err => console.log("cannot get cities", err));
    }

    render() {

    let allCities = this.state.countryCities.map(e => {
        return(
            <div key = {e.id}>
            {e.cities}
            </div>
        )
    })
        return (
            <div> 
                <Nav/>
                <Weather/>
                 Cities 
                {allCities}
            </div>
        );
    }
}

export default Cities