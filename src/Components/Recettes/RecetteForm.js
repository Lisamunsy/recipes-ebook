import React, { useState } from "react";
import { Flex, FormControl, Heading, FormLabel, Input, FormErrorMessage, Button, Select } from '@chakra-ui/react';
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
import Header from "../Header";


export function RecetteForm(props){
    const {id} = useParams();

    const [reussite, setReussite] = useState('false');

    const[buttonmsg, setButtonmsg] =useState('');
    useEffect(()=> {
        buttonLook();
    },);

    function buttonLook() {
        if (props.update === 'true') {
            setButtonmsg('Update your recipe')
        } else{
            setButtonmsg('Add your recipe')
        }
    }
    

    const[categories, setCategories] =useState([]);
    useEffect(()=> {
        fetchCates();
    },[]);

    function fetchCates() {

        axios.get(`http://127.0.0.1:8000/categories`)
          .then(
            (res) => {
              setCategories(res.data)
            //   console.log(res.data)
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    const [recette, setRecette] =useState([]
       
    );
    useEffect(()=> {
        if (id !== undefined) {
            fetchRecipe(id);
        } 
        // else{
        //     console.log('Petit problème')
        //     setRecette({
        //         titre:'',
        //         description:'',
        //         imgUrl:'',
        //         categorie_id:''
        //     })
        // }
    }, [id]);

    function fetchRecipe(id) {
        
        
        axios.get(`http://127.0.0.1:8000/recettes/${id}`)
        .then(
            (res) => {
            setRecette(res.data)
            console.log(res.data)
            })
            .catch((err)=>{
                console.log(err);
            });
         
    }

    const handleInputChange= (e) => {
        // const target = e.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const champ = target.name;
    
        // setRecette( prevRecette =>(

        //     {
        //     recette:{
        //         ...prevRecette.recette,
        //       [champ]: value
        //     }
        //     }
        // ))
        const { id, value } = e.target;
  setRecette((prevState) => ({
    recette: {
      ...prevState.recette,
      [id]: value
    }}
  ));
        console.log(recette);
    }

    const handleSubmit= (e) =>{
        e.preventDefault();
        if (props.update === 'false') {
            axios.post('http://127.0.0.1:8000/recettes/', JSON.stringify(recette) )
            .then(res=> console.log('Recette créée'+ res.data))
            .then(setReussite('true'))
        } else if (props.update === 'true'){
            axios.put(`http://127.0.0.1:8000/recettes/${recette.id}`, recette)
            .then(res=> console.log('Recette modifiée'+ res.data))
            .then(setReussite('true'))
        }

    }

    
    if (reussite === 'true') {
        if (props.update==='true') {
            return <Navigate to={`/recipe/${recette.id}`}/>
        } else {
            return <Navigate to={`/personalpage`}/>
        }
    } else{

        return(
            <div className='CreateRecette'>
                        <Header registered={props.reg} logged={props.logoui}/>
        
                        <Flex className='CreateRecette-container' h="auto" direction="column" w="50vw">
                            <form className='CreateForm' onSubmit={handleSubmit}>
        
                                <Heading as="h2" size='lg' align='center' color='gray.700' my='2'>Create a new recipe :</Heading>
        
                                    <FormControl w='95%' mx='auto' mb='10px' isRequired>
                                        <FormLabel htmlFor='titre' className='FormLabel'> Title</FormLabel>
                                        <Input id='titre' name='titre' type='text' placeholder='Enter the title of your recipe' value={recette.titre } onChange={handleInputChange} />
                                        <FormErrorMessage>A title is required</FormErrorMessage>
                                    </FormControl>
        
                                    <FormControl w='95%' mx='auto' mb='10px' isRequired>
                                        <FormLabel htmlFor='description' className='FormLabel'> Description</FormLabel>
                                        <Input id='description' name='description' type='text' placeholder='Enter the description of your recipe' value={recette.description } onChange={handleInputChange} />
                                        <FormErrorMessage>A description is required</FormErrorMessage>
                                    </FormControl>
        
                                    <FormControl w='95%' mx='auto' mb='10px' >
                                        <FormLabel htmlFor='imgUrl' className='FormLabel'> Picture</FormLabel>
                                        <Input id='imgUrl' name='imgUrl' type='text' placeholder='Enter the URL of your picture' value={recette.imgUrl } onChange={handleInputChange} />
                                        <FormErrorMessage>An url is required</FormErrorMessage>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Category</FormLabel>
                                        <Select placeholder='Select a category' name="categorie_id" onChange={handleInputChange}>
                                            {categories.map(cate =>
                                                
                                                <option key={cate.id} value={(cate.id)}>{cate.name}</option>
                                                )}
                                        </Select>
                                    </FormControl>
                                    { 
                                        <Button
                                        my={4}
                                        colorScheme='orange'
                                        type='submit'
                                        >
                                            {buttonmsg} 
                                        </Button>
                                    }
                            </form>
                        </Flex>
                    </div>
        )
    }
}