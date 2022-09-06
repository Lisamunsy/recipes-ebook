import React,{ Component } from "react";
import { WrapItem, Flex, Image, } from "@chakra-ui/react";
import axios from "axios";
// import { useParams } from 'react-router-dom'

class ShowRecette extends Component {
   state = {
        isLoaded: false,
        recette: {},
        error: null,
        recetteid: this.props.match.params.id

   }
   componentDidMount() {
 console.log(this.state.recetteid)
    axios.get(`http://127.0.0.1:8000/recettes/`,this.state.recetteid)
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            recette: res.data
          });
          console.log(res)
          console.log(res.data)
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

  render(){
    return (
      <WrapItem key={this.state.recette.id} w='250px'  py='2' borderColor='gray.300' border='1px'>
          <Flex flexDirection='column'  p='3'>
      
              <Image src={ this.state.recette.imgUrl} h='150px' w='200px' />
              <p><b>Titre</b>{this.state.recette.titre}</p>  <p><b>Catégorie</b>{this.state.recette.categorie_id}</p>
              
          </Flex>
          
      </WrapItem>
    )
  };
}

export default ShowRecette