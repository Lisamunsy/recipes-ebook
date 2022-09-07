import React, {useEffect, useState} from "react";
import { WrapItem, Flex, Image, Button, Text,Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  useDisclosure,} from "@chakra-ui/react";
import axios from "axios";
import {
  Link,
    useNavigate,
    useParams,
  } from "react-router-dom";

export default function ShowRecetteFun() {
    const{id} = useParams();
    const[recette, setRecette] =useState([]);
    useEffect(()=> {
        fetchRecipe(id);
    }, [id]);

    const {isOpen, onOpen, onClose} = useDisclosure()

    function fetchRecipe(id) {

        axios.get(`http://127.0.0.1:8000/recettes/${id}`)
          .then(
            (res) => {
              setRecette(res.data)
              // console.log(res.data)
            })
            .catch((err)=>{
                console.log(err);
            });
    }
    let navigate = useNavigate();
    const handleDelete=(e)=>{
      e.preventDefault();

      axios.delete(`http://127.0.0.1:8000/recettes/${recette.id}`)
      .then(
        (res) => {
          console.log(res.data);
          
        })
      .catch((err)=>{
          console.log(err);
      })
      .finally(()=>{
        
        navigate("/personalpage", {replace:true})
      })
    }

    
    return (
        <WrapItem key={recette.id} w='400px'  p='2' borderColor='gray.300' border='1px'>
          <Flex flexDirection='column'  p='3' alignItems="left">
              <Heading as='h1' size='2xl' color='orange.800' align='center' w="100%">
                  {/* {this.state.isLogged.toString()} */}
                  {recette.titre}
              </Heading> 
      
              <Image src={ recette.imgUrl} h='150px' w='200px' borderRadius='5' alignSelf="center" my="2"/>
              <p><b>Titre</b>{recette.titre}</p>  <p><b>Catégorie</b>{recette.categorie_id}</p>
              <Link to={`/recipe/update/${recette.id}` }> <Button colorScheme='teal'>Modifier</Button></Link>
              <Button colorScheme='orange' w='fit-content' onClick={onOpen}>Supprimer</Button>
          </Flex>
              <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader color="orange">Warning</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>
                      You are about to delete the following recipe: {recette.titre}
                    </Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="red" mr="3" onClick={handleDelete}>Secondary Action</Button>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
          
      </WrapItem>
        )
}


