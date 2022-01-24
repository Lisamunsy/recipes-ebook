import { Flex, FormControl, Heading, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import React, { Component } from 'react';
// import ImageFond from '../assets/img/bg02.jpg';
import { Navigate } from 'react-router-dom';

class Login extends Component {
    state ={
        loginUser: {
            email:'',
            password:''
        },
        users : JSON.parse(localStorage.getItem('users-list')),
        isLogged: this.props.logged
    };
    
    
    submit = (e) =>{
        e.preventDefault();
        this.setState({users: JSON.parse(localStorage.getItem('users-list'))});
        const liste = this.state.users;
        const index = liste.findIndex(({email}) => email === this.state.loginUser.email) ;
        if (typeof index !== 'undefined' | index!== null) {
            const checkedUser = liste[index];
            if (this.state.loginUser.password === checkedUser.password) {
                sessionStorage.setItem('logged', 'true');
                sessionStorage.setItem('userId', checkedUser.id);
                this.setState({isLogged :'true'})
            }
            else{
                alert("Something is wrong in your password. Try again!")
            }
        } else{
            alert('Your email adress is wrong, try another one.')
        }
    };
    changemail = (e) =>{
        const valeur = e.currentTarget.value;
        this.setState({loginUser:{
            email: valeur,
            password: this.state.loginUser.password
        }})
    }
    changepass = (e) =>{
        const valeur = e.currentTarget.value;
        this.setState({loginUser:{
            email: this.state.loginUser.email,
            password: valeur
        }})
    }
   
    render() {
        const logged = this.state.isLogged;
        const registered = this.props.registered;
        if ( registered ==='true' & logged === 'false') {
            
            return (
                <form className="Login" onSubmit={this.submit}>
                    <Flex className='Login-container' direction='column' bg='white' w='400px' mx='auto' rounded='1rem' mt={2}>
                        <Heading as="h2" size='lg' align='center' color='gray.700' my='2'>Log in !</Heading>
                        <FormControl w='95%' mx='auto' mb='10px' isRequired>
                            <FormLabel htmlFor='email-login' className='FormLabel'>Email address</FormLabel>
                            <Input id='email-login' type='email' placeholder='Enter your email adress' onChange={this.changemail} value={this.state.loginUser.email}/>
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                        </FormControl>
                           
                        <FormControl w='95%' mx='auto' mb='10px' isRequired>
                            <FormLabel htmlFor='password-login'>Password</FormLabel>
                            <Input id='password-login' placeholder='Choose a password' type='password' onChange={this.changepass} value={this.state.loginUser.password}/>
                            <Button
                            my={4}
                            colorScheme='orange'
                            type='submit'
                            >
                                Log In !
                            </Button>
                        </FormControl>
                        
                    </Flex>
                </form>
            );
        } else if (logged === 'true'){
            return ( <Navigate to="/personalpage" />)
        } else{
            return(null)
        }
    }

};
    
    export default Login;