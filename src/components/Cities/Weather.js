import React, { Component } from 'react';
import axios from 'axios';
import "../Css/Buttons.css"

class Weather extends Component {
    constructor(props){
        super(props)
        this.state ={
            temperature: null,
            weather: '',
            icon:'',
            cityName: 'Bangkok',
            countryCode: '764',
            main:'',
            description:'',
            high:'',
            low:'',
            humidity:''
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
            var main = response.data.list[0].weather[0].main;
            var description = response.data.list[0].weather[0].description;
            var high = response.data.list[0].main.temp_max;
            var low = response.data.list[0].main.temp_min;
            var humidity = response.data.list[0].main.humidity
            console.log(response.data)
            this.setState({
                temperature: kelvToFaren(tempKelvin),
                // weather: weather,
                icon: icon,
                main: main,
                description: description,
                high: kelvToFaren(high),
                low: kelvToFaren(low),
                humidity:humidity
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
                var main = response.data.list[0].weather[0].main;
                var description = response.data.list[0].weather[0].description;
                // var icon = response.data.weather[0].icon;
                var high = response.data.list[0].main.temp_max;
                var low = response.data.list[0].main.temp_min;
                var humidity = response.data.list[0].main.humidity
            
                console.log(response.data)
                this.setState({
                    temperature: kelvToFaren(tempKelvin),
                    // weather: weather,
                    icon: icon,
                    main: main,
                    description: description,
                    high: kelvToFaren(high),
                    low: kelvToFaren(low),
                    humidity:humidity
                    
                })
            })    
    
    }
    render() {
        return (
            <div> Weather 
                 <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`}/>
                 <p> {this.state.main} and {this.state.description}</p>
                 <p> The temperature in {this.state.cityName} is: {this.state.temperature}F&deg; with a High today of {this.state.high}F&deg; and a low of {this.state.low}F&deg; </p>
                 <p> Humidity {this.state.humidity}%</p>
                 <p> Please select a country </p>
                 <select onChange={(e) => this.setState({countryCode: e.target.value})}>
                    <option value = "default">Select</option>
                    <option value = "764"> Thailand </option>
                    <option value = "704"> Vietnam </option>
                    <option value = "276"> Germany </option>
                 </select>
                 <p>Please type in a city</p>
                 <input className='input-periphs weatherCity' onChange={(e) => this.setState({cityName: e.target.value})} placeholder='Enter City'/>
                 <button onClick={() => this.updateCity(this.state.cityName)} className='button'>Submit</button> 
            </div>
        );
    }
}

export default Weather;