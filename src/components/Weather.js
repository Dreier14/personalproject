import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    constructor(props){
        super(props)
        this.state ={
            temperature: null,
            weather: '',
            icon:'',
            cityName: 'Bangkok',
            countryCode: '764'

        }
    }
    componentDidMount(){
        function kelvToFaren(kelv){
            return Math.floor((kelv * (9/5)- 459.67));
        }

        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName},${this.state.countryCode},&APPID=be50db19df77f2ec7401deef2555c767`).then(response =>{
            var tempKelvin = response.data.list[0].main.temp;
            // var weather = response.data.weather[0];
            var icon = response.data.list[0].weather[0].icon;
            console.log(response.data)
            this.setState({
                temperature: kelvToFaren(tempKelvin),
                // weather: weather,
                icon: icon
                
            })
        })
    }       
    
        updateCity(city){
            function kelvToFaren(kelv){
                    return Math.floor((kelv * (9/5)- 459.67));
                }
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${this.state.countryCode},&APPID=be50db19df77f2ec7401deef2555c767`).then(response =>{
                console.log(response)
                var tempKelvin = response.data.list[0].main.temp;
                var icon = response.data.list[0].weather[0].icon;
                // var icon = response.data.weather[0].icon;
            
                console.log(response.data)
                this.setState({
                    temperature: kelvToFaren(tempKelvin),
                    // weather: weather,
                       icon: icon
                    
                })
            })    
        // function kelvToFaren(kelv){
        //     return Math.floor((kelv * (9/5)- 459.67));
        // }
        // axios.get(`http://api.openweathermap.org/data/2.5/weather?city=${city},be50db19df77f2ec7401deef2555c767`).then(response => {
        //     var tempKelvin = response.data.main.temp;
        //     var weather = response.data.weather[0].description;
        //     var icon = response.data.weather[0].icon;
        //     var cityname = response.data.name;
        //     console.log(response.data.name)
        //     this.setState({
        //         temperature: kelvToFaren(tempKelvin),
        //         weather: weather,
        //         icon: icon,
        //         cityName: cityname
        //     })     
        // })
    }
    render() {
        return (
            <div> Weather 
                 <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`}/>
                 <p> Please select a country for weather and type in a city</p>
                 <select onChange={(e) => this.setState({countryCode: e.target.value})}>
                    <option value = "764"> Thailand </option>
                    <option value = "704"> Vietnam </option>
                    <option value = "276"> Germany </option>
                 </select>
                 <p> The temperature in {this.state.cityName} is: {this.state.temperature}F&deg;</p>
                 <input className='input-periphs weatherCity' onChange={(e) => this.setState({cityName: e.target.value})} placeholder='Enter City'/>
                <button onClick={() => this.updateCity(this.state.cityName)} className='sumbit'>Submit</button>
            </div>
        );
    }
}

export default Weather;