import axios from "axios";
import React, { useEffect, useState } from "react";
import { 
    // Route, Routes,
    Link} from "react-router-dom";
// import ShowRecette from "./ShowRecette";
import { Wrap, WrapItem, Flex, Image, Heading, Button, Box, LinkBox } from "@chakra-ui/react";

function ListeRecetteFun(props) {
    const[recettes, setRecettes] =useState([]);
    useEffect(()=> {
        fetchRecettes();
    }, []);


    function fetchRecettes() {
        axios
            .get("http://127.0.0.1:8000/recettes/")
            .then((res)=> {
                setRecettes(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    }

        return(
            <div className="liste-container">
                <Box className="heading-container" w="100%" display="flex" justifyContent="space-between" flexDir="column">
                    <Heading as='h1' size='2xl' mb="1rem" color='orange.800' align='center' w="100%" >
                    {/* {this.state.isLogged.toString()} */}
                    Welcome
                    </Heading> 
                    <LinkBox> <Button colorScheme="green"> Add a recipe</Button> </LinkBox>
                </Box>

            <Wrap p='5' justify='space-evenly' >

                {recettes.map(item => (
                    <Link to={`/recipe/${item.id}` }key={item.id}>
                        <WrapItem  w='200px' m={4} py={6}  className="card-recette cardhover">
                            <Flex flexDirection='column' alignItems="center" h="100%" w="100%" justifyContent="space-evenly">
                        
                                <Image src={ item.imgUrl} h='100px' w='120px' borderRadius="15px"/>
                                <Heading as='h3' size="sm" color="gray.700" textTransform="capitalize">{item.titre}</Heading> 
                                {/* <p><b>Catégorie</b>{item.categorie_id}</p> */}
                                
                                {/* <Button colorScheme="orange">More Details</Button> */}
                            </Flex>
                        </WrapItem>
                    </Link>

                ))}
            </Wrap>
            
            
                {/* <Routes>
                    <Route 
                        path="recipe/:id"
                        render = {({match}) => {
                            <ShowRecette
                                recid= {recettes.find(
                                    (recette) => recette.id === match.params.id
                                )}
                                reg='true' 
                                logoui='true'
                            />
                        }}
                    />
                </Routes> */}
           
            </div>

        )
}
export default ListeRecetteFun