import axios from "axios";
import React, { useEffect, useState } from "react";
import { 
    // Route, Routes,
    Link} from "react-router-dom";
// import ShowRecette from "./ShowRecette";
import { Wrap, WrapItem, Flex, Image, } from "@chakra-ui/react";

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

            <Wrap p='5' justify='space-evenly' >

                {recettes.map(item => (
                    <WrapItem key={item.id} w='250px'  py='2' borderColor='gray.300' border='1px'>
                        <Flex flexDirection='column'  p='3'>
                    
                            <Image src={ item.imgUrl} h='150px' w='200px' />
                            <p><b>Titre</b>{item.titre}</p>  <p><b>Catégorie</b>{item.categorie_id}</p>
                            <Link to={`/recipe/${item.id}` }>More Details</Link>
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