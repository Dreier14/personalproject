import React, { Component } from 'react';
import axios from 'axios';

 class Currency extends Component {
     constructor(props){
         super(props)
         this.state ={
             base:"USD" ,
             rates:{},
             submit: false,
             submittedValue: ''


         }
     }

    componentDidMount(){
   axios.get(`https://openexchangerates.org/api/latest.json?app_id=719655d20ede467980f32a2242b6a1a9`).then(response => { 
         let base = response.data.base
         
            console.log(response.data)
         this.setState({
            rates: response.data.rates,
            base: base

        })
      }).catch(err => console.log("you have an error boy ---------->", err));
    }  

    render() {

        var newRates = []
        let {rates} = this.state
        for(let key in rates){
            newRates.push(key)
        }
       
    console.log('hey', this.state.submittedValue, '1', this.state.rates[newRates[1]])
        return (
            <div> Currency Converter
                <br/>
                {this.state.submit ?  <p> The current exhange : USD ($1) = {this.state.rates[this.state.submittedValue]} </p>:''} 
             <select onChange={(event)=> this.setState({submittedValue: event.target.value})}>
                <option value='default'>
                        Select
                </option>
                        {newRates.map((e,i)=> {
                    return 
                    <option key={i} value={e}>
                                {e}
                    </option>
                })}
            </select>
                    <button className ="button" onClick={() => this.setState({submit:true})}>Submit</button>
            </div>
        );  
    }
}

export default Currency