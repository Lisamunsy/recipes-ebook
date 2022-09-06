import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React, { Component } from 'react';
import Header from './Header';
import Login from './Login';
import Register from './Register';
// import ImageFond from '../assets/img/bg02.jpg';
// import { Link } from 'react-router-dom';

class Home extends Component {
    state ={
        isLogged: this.props.logoui,
        isRegistered :this.props.reg,
    };

    handleReg = (e) =>{
        if (this.state.isRegistered === 'false') {
            this.setState({isRegistered: 'true'})
        } else {
            this.setState({isRegistered: 'false'})
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.reg !== prevProps.reg) {
          this.setState({isRegistered: this.props.reg });
        }
        if (this.props.logged !== prevProps.logged) {
          this.setState({isLogged: this.props.logged });
        }
      }
    

   
 render(){
    //  if (this.state.isLogged ==='false' || this.state.isLogged === null) {
        const registered= this.state.isRegistered;
        let homeMessage;
        if(registered ==='false'){
            homeMessage = 'Register to create your own E Recipes book!';
        } else{
            homeMessage ='Welcome back. Please log in to access your personal page.';
        }
        return (
            <div className="Home">
                <Header registered={this.state.isRegistered} logged={this.state.isLogged.toString()} />
                    <Flex className='home-container' direction='column' >
                        <Box my='8'>
                            <Heading as="h1" size='3xl' align='center' color='white' my='2'>E Recipes</Heading>
                            <Text as='h3' color='white' align='center'> {homeMessage}</Text>
                        </Box>
                        <Register logged={this.state.isLogged.toString()} registered={this.state.isRegistered}/>
                        <Login logged={this.state.isLogged.toString()} registered={this.state.isRegistered}/>
                    </Flex>
            </div>
        );
    // } else{
    //      return(
    //      <div className="Home">
    //      <Header/>
    //          <Flex className='home-container' direction='column' >
    //              <Box my='8'>
    //                  <Heading as="h1" size='3xl' align='center' color='white' my='2'>E Recipes</Heading>
    //                  <Text as='h3' color='white' align='center'> Booomchakala</Text>
    //              </Box>
    //          </Flex>
    //      </div>
    //      )
        
    //  }
        
}
};
    
    export default Home;