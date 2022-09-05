import React,{ Component } from "react";
import { Wrap, WrapItem, Flex, Image, } from "@chakra-ui/react";

class ListeRecette extends Component{
    state ={
        isLoaded: false,
        items: [],
        error: null
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/recettes/")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }

    render() {
        const{ error, isLoaded, items} = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Chargement…</div>;
          } else {
            return (
                <Wrap p='5' justify='space-evenly' >

                    {items.map(item => (
                        <WrapItem key={item.id} w='250px'  py='2' borderColor='gray.300' border='1px'>
                            <Flex flexDirection='column'  p='3'>
                          
                                <Image src={ item.imgUrl} h='150px' w='200px' />
                                <p><b>Titre</b>{item.titre}</p>  <p><b>Catégorie</b>{item.categorie}</p>
                            </Flex>
                            
                        </WrapItem>
                    ))}
                </Wrap> 
            )
          }
    }
  }

export default ListeRecette