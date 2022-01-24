import React, { Component } from 'react';
import Header from './Header';

class PersonalPage extends Component{
    state={
        isLogged: JSON.parse(sessionStorage.getItem('logged')),
        isRegistered: this.props.reg
    }

    render(){
        return(
            <div className="Home">
                <Header registered={this.state.isRegistered} logged={this.state.isLogged.toString()}/>
                <h1>{this.state.isLogged.toString()}</h1>
            </div>
        )
    }
}

export default PersonalPage