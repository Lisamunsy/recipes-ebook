import React, { Component } from 'react';
import Header from './Header';
import { Wrap, WrapItem, Center, Flex, Image, Heading} from '@chakra-ui/react';

class PersonalPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          isLogged: true,
          isRegistered: this.props.reg,
          
        };
      }
    // state={
    //     isLogged: JSON.parse(sessionStorage.getItem('logged')),
    //     isRegistered: this.props.reg,
    // }

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

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.reg !== prevProps.reg) {
        this.setState({isRegistered: this.props.reg });
      }
      if (this.props.logged !== prevProps.logged) {
        this.setState({isLogged: this.props.logged });
      }
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Chargement…</div>;
        } else {
          return (
            <div className="PersonalPage">
                 <Header registered={this.state.isRegistered} logged={this.state.isLogged.toString()}/>
                 <div className="perso">
                    <Heading as='h1' size='2xl' color='orange.800' align='center'>
                        {/* {this.state.isLogged.toString()} */}
                        Vos Recettes
                    </Heading> 
                    <Center w='100'>

                        <Wrap p='5' justify='space-evenly' >

                            {items.map(item => (
                                <WrapItem key={item.titre} w='250px'  py='2' borderColor='gray.300' border='1px'>
                                    <Flex flexDirection='column'  p='3'>
                                        <Image src='https://picsum.photos/200' />
                                        <p><b>Titre</b>{item.titre}</p>  <p><b>Catégorie</b>{item.categorie}</p>
                                    </Flex>
                                    
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Center>
                    
                 </div>
            </div>
            
          );
        }
      }
    }


export default PersonalPage