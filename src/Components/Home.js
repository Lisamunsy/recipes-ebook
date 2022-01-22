import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React, { Component } from 'react';
import Header from './Header';
import Register from './Register';
// import ImageFond from '../assets/img/bg02.jpg';
// import { Link } from 'react-router-dom';

class Home extends Component {
 render(){

     return (
         <div className="Home">
             <Header/>
                <Flex className='home-container' direction='column' >
                    <Box my='8'>
                        <Heading as="h1" size='3xl' align='center' color='white' my='2'>E Recipes</Heading>
                        <Text as='h3' color='white' align='center'> Register to create your own E Recipes book!</Text>
                    </Box>
                    <Register/>
                </Flex>
        </div>
    );
}
};
    
    export default Home;