import React, { Component } from 'react';
import Weather from './Weather';
import Nav from '../Nav/Nav';
import axios from 'axios';
import styled from 'styled-components';
import '../Countries/Countries.css';
import './Weather.css';


const Background = styled.div
      `background: linear-gradient(rgba(177, 177, 177, 0.6), rgba(177, 177, 177, 0.6)), url('https://images.pexels.com/photos/529621/pexels-photo-529621.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
       min-height: 330vh;
       background-position: center;
       background-repeat: no-repeat;
       background-attachment: fixed;
       background-size: cover;
      position: relative;`

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
        axios.get(`/api/getCities/${this.props.location.state}`).then(response => {
            console.log(response)
            this.setState({
                countryCities: response.data.getCity
            })
        }).catch(err => console.log("cannot get cities", err));
    }

    render() {
        console.log(this.props)
    let allCities = this.state.countryCities.map(e => {
        console.log(e);
        return(
            <div style={{backgroundImage: `url(${e.pictures})`, backgroundSize: 'cover', height:'80vh', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}} key = {e.id}>
                 <div className="Country"><div style ={{color:'rgba(30, 74, 121)', textDecoration:'underline',fontSize:'40px', alignItems: 'center',justifyContent:'center'}}>{e.cities}</div> <br/>
                
                    <p> {e.info} </p>
                </div> 
            </div>
       

        )
    })
    console.log(allCities);
        return (
            <div> 
                <Nav/>
                    <Background>
                         <div style={{paddingTop: '80px'}}>
                                <br/>
                                <div className="Countries">
                                Cities 
                                </div>
                             {allCities}
                             <br/>
                             <div className = "Weather">
                             <Weather/>
                             </div>
                        </div>
                    </Background>
            </div>  
        );
    }
}

export default Cities