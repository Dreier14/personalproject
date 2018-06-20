import React, { Component } from 'react';
import GoAlert from 'react-icons/lib/go/alert';

class ErrorComponent extends Component {
    render() {
        return (
          <div>
              <h1>
                <div className = "404Error">
                    404 Error 
                    <br/>
                    The Page You Requested is Invalid
                    <br/>
                    <GoAlert/>
                </div>
              </h1>
          </div>  
        );
    }
}

export default ErrorComponent;