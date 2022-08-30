import { 
    Flex, FormControl, Heading, FormLabel, Input, 
    // FormHelperText, 
    FormErrorMessage, Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { Component } from 'react';
// import ImageFond from '../assets/img/bg02.jpg';
// import { Link } from 'react-router-dom';


class Register extends Component {
    state ={
        newUser: {
            id:'',
            name:'',
            email:'',
            password:''
        },
        users : []
    };
    // submit = (e) =>{
        // e.preventDefault();
        // this.state.users.push(this.state.newUser);
        // const nextid = this.state.newUser.id +1;
        // this.setState({ newUser: {
            // id: nextid,
        //     name:"",
        //     email:"",
        //     password:""
        // } });
        // localStorage.setItem('users-list', JSON.stringify(this.state.users));
        // alert([this.state.users, localStorage.getItem('users-list')])
    // };

    // submit =(e) => {
    //     e.preventDefault();
    //     const data = new FormData(e.target);
    //     fetch('http://127.0.0.1:8000/users/register', {
    //         method:'Post',
    //         body: JSON.stringify(data),
    //     });
    // }

    submit= (e) => {
        e.preventDefault();

        // const newUser = this.state.newUser;

        axios.post('http://127.0.0.1:8000/users/register', this.state.newUser)
            .then(res => res.data)
    }

    changename = (e) =>{
        const valeur = e.currentTarget.value;
        this.setState({newUser:{
            name: valeur,
            email: this.state.newUser.email,
            password: this.state.newUser.password
            
        } })
    }
    changemail = (e) =>{
        const valeur = e.currentTarget.value;
        this.setState({newUser:{
            name: this.state.newUser.name,
            email: valeur,
            password: this.state.newUser.password
        }})
    }
    changepass = (e) =>{
        const valeur = e.currentTarget.value;
        this.setState({newUser:{
            name: this.state.newUser.name,
            email: this.state.newUser.email,
            password: valeur
        }})
    }
    render() {
        const logged = this.props.logged;
        const registered = this.props.registered;
        if ((logged === 'false' | logged ===null) & registered ==='false') {
            
            return (
                <form className="Register" onSubmit={this.submit}>
                            <Flex className='Register-container' direction='column' bg='white' w='400px' mx='auto' rounded='1rem'>
                                <Heading as="h2" size='lg' align='center' color='gray.700' my='2'>Get started !</Heading>
                                
                                <FormControl w='95%' mx='auto' mb='10px' isRequired>
                                    <FormLabel htmlFor='name' className='FormLabel'>Name or pseudo</FormLabel>
                                    <Input id='name' type='text' placeholder='Enter your name' onChange={this.changename} value={this.state.newUser.name}/>
                                    {/* <FormHelperText>You can use a pseudonyme if you feel more confortable about it.</FormHelperText> */}
                                    <FormErrorMessage>Name or Pseudo is required</FormErrorMessage>
                                </FormControl>

                                <FormControl w='95%' mx='auto' mb='10px' isRequired>
                                    <FormLabel htmlFor='email' className='FormLabel'>Email address</FormLabel>
                                    <Input id='email' type='email' placeholder='Enter your email adress' onChange={this.changemail} value={this.state.newUser.email}/>
                                    {/* <FormHelperText>Your email adress will be your registration id.</FormHelperText> */}
                                    <FormErrorMessage>Email is required.</FormErrorMessage>
                                </FormControl>
                                    {/* <FormControl isInvalid={isError}>
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <Input
                                    id='email'
                                    type='email'
                                    value={input}
                                    onChange={handleInputChange}
                                    />
                                    {!isError ? (
                                        <FormHelperText>
                                        Enter the email you'd like to receive the newsletter on.
                                        </FormHelperText>
                                        ) : (
                                            <FormErrorMessage>Email is required.</FormErrorMessage>
                                            )}
                                        </FormControl> */}
                                <FormControl w='95%' mx='auto' mb='10px' isRequired>
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <Input id='password' placeholder='Choose a password' type='password' onChange={this.changepass} value={this.state.newUser.password}/>
                                    <Button
                                    my={4}
                                    colorScheme='orange'
                                    type='submit'
                                    >
                                        Register
                                    </Button>
                                </FormControl>
                                
                            </Flex>
                    </form>
                );
            } else {
                return(null)
            }
        }

};
    
    export default Register;
