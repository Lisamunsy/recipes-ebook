import axios from "axios";
import React, { useEffect, useState } from "react";
import { 
    // Route, Routes,
    Link} from "react-router-dom";
// import ShowRecette from "./ShowRecette";
import { Wrap, WrapItem, Flex, Image, Heading, Button } from "@chakra-ui/react";

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
                <Heading as='h1' size='2xl' color='orange.800' align='center' w="100%">
                  {/* {this.state.isLogged.toString()} */}
                  Welcome
                </Heading> 

            <Wrap p='5' justify='space-evenly' >

                {recettes.map(item => (
                    <WrapItem key={item.id} w='250px' m={4} py='2'  className="card-recette cardhover">
                        <Flex flexDirection='column'  p='3' >
                    
                            <Image src={ item.imgUrl} h='150px' w='200px' borderRadius="15px"/>
                            <Heading as='h3' size="md" color="gray.700" textTransform="capitalize">{item.titre}</Heading> 
                             {/* <p><b>Catégorie</b>{item.categorie_id}</p> */}
                            
                            <Link to={`/recipe/${item.id}` }><Button colorScheme="orange">More Details</Button></Link>
                        </Flex>
                        
                    </WrapItem>
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