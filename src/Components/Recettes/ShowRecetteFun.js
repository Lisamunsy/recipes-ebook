import React, {useEffect, useState} from "react";
import { WrapItem, Flex, Image, } from "@chakra-ui/react";
import axios from "axios";
import {
    useParams,
  } from "react-router-dom";

export default function ShowRecetteFun() {
    const{id} = useParams();
    const[recette, setRecette] =useState([]);
    useEffect(()=> {
        fetchRecipe(id);
    }, [id]);

//    console.log(id);
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
    
    return (
        <WrapItem key={recette.id} w='250px'  py='2' borderColor='gray.300' border='1px'>
          <Flex flexDirection='column'  p='3'>
      
              <Image src={ recette.imgUrl} h='150px' w='200px' />
              <p><b>Titre</b>{recette.titre}</p>  <p><b>Catégorie</b>{recette.categorie_id}</p>
              
          </Flex>
          
      </WrapItem>
        )
}


