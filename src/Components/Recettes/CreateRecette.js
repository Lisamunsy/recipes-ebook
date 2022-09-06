import { Flex, FormControl, Heading, FormLabel, Input, FormErrorMessage, Button, Select } from '@chakra-ui/react';
import axios from 'axios';
import React, { Component } from 'react';
import Header from '../Header';
import { Navigate } from "react-router-dom";

class CreateRecette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newRecipe: {
                titre: '',
                description: '',
                imgUrl: '',
                categorie: 0
            },
            categories: [],
            isLogged: this.props.logoui,
            isRegistered: this.props.reg,
            reussite : false
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {
        fetch("http://127.0.0.1:8000/categories/")
            .then(res => res.json())
            .then(
                (res) =>{
                    this.setState({
                        isLoaded:true,
                        categories: res
                    });
                },
                (error =>{
                    this.setState({
                        isLoaded: true,
                        error                        
                    });
                })
            )
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState( prevState =>(

            {
            newRecipe:{
                ...prevState.newRecipe,
              [name]: value
            }
        }
        )
        );
      }
    
      handleSubmit(event) {
         
          event.preventDefault();
        // return console.log((this.state.newRecipe));
          axios.post('http://127.0.0.1:8000/recettes/', this.state.newRecipe)
           .then(res=> console.log(res.data))
           .then(this.setState({reussite: true}))
        
        //    return ( <Navigate to="/personalpage" />)

        
           
      }

      render() {
        const cates =this.state.categories;
        if (this.state.reussite === true) {
            return ( <Navigate to="/personalpage" />)
        } else {
            return(
                
                <div className='CreateRecette'>
                    <Header registered={this.state.isRegistered} logged={this.state.isLogged}/>
    
                    <Flex className='CreateRecette-container' h="auto" direction="column" w="50vw">
                        <form className='CreateForm' onSubmit={this.handleSubmit}>
    
                            <Heading as="h2" size='lg' align='center' color='gray.700' my='2'>Create a new recipe :</Heading>
    
                                <FormControl w='95%' mx='auto' mb='10px' isRequired>
                                    <FormLabel htmlFor='titre' className='FormLabel'> Title</FormLabel>
                                    <Input id='titre' name='titre' type='text' placeholder='Enter the title of your recipe' value={this.state.newRecipe.titre } onChange={this.handleInputChange} />
                                    <FormErrorMessage>A title is required</FormErrorMessage>
                                </FormControl>
    
                                <FormControl w='95%' mx='auto' mb='10px' isRequired>
                                    <FormLabel htmlFor='description' className='FormLabel'> Description</FormLabel>
                                    <Input id='description' name='description' type='text' placeholder='Enter the title of your recipe' value={this.state.newRecipe.description } onChange={this.handleInputChange} />
                                    <FormErrorMessage>A description is required</FormErrorMessage>
                                </FormControl>
    
                                <FormControl w='95%' mx='auto' mb='10px' >
                                    <FormLabel htmlFor='imgUrl' className='FormLabel'> Picture</FormLabel>
                                    <Input id='imgUrl' name='imgUrl' type='text' placeholder='Enter the title of your recipe' value={this.state.newRecipe.imgUrl } onChange={this.handleInputChange} />
                                    <FormErrorMessage>An url is required</FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Country</FormLabel>
                                    <Select placeholder='Select a category' name="categorie" onChange={this.handleInputChange}>
                                        {cates.map(cate =>
                                            
                                            <option key={cate.id} value={(cate.id)}>{cate.name}</option>
                                            )}
                                    </Select>
                                </FormControl>
                                <Button
                                 my={4}
                                 colorScheme='orange'
                                 type='submit'
                                >
                                    Add your recipe 
                                </Button>
    
                        </form>
                    </Flex>
                </div>
            )
        }
      }
}

export default CreateRecette