// import React, { Component } from 'react';
// import axios from 'axios';

//  class Currency extends Component {
//      constructor(props){
//          super(props)
//          this.state ={
//              base:"USD" ,
//              rates:{},
//              submit: false,
//              submittedValue: ''


//          }
//      }

//     componentDidMount(){
//    axios.get(`https://openexchangerates.org/api/latest.json?app_id=719655d20ede467980f32a2242b6a1a9`).then(response => { 
//          let base = response.data.base
         
//             console.log(response.data)
//          this.setState({
//             rates: response.data.rates, 
//             base: base

//         })
//       }).catch(err => console.log("you have an error boy ---------->", err));
//     }  

//     render() {
//         return (
//             <div> Currency
//             <br/>
//            {this.state.submit ?  <p> The current exhange : USD ($1) - {this.state.rates[this.state.submittedValue]} </p>:''} 
//             <input className='input-Currency' onChange={(e) => this.setState({submittedValue: e.target.value})} placeholder='Enter Currency'/> 
//             <button onClick={() => this.setState({submit:true})}className='sumbit'>Submit</button>
//             </div>
//         );  
//     }
// }

// export default Currency