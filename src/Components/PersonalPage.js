import React, { Component } from 'react';
import Header from './Header';
// import ListeRecette from './Recettes/ListeRecette.js';
import { Center,  Heading} from '@chakra-ui/react';
import ListeRecetteFun from './Recettes/ListeRecetteFun';
import ShowRecetteFun from './Recettes/ShowRecetteFun';

class PersonalPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
          isLogged: this.props.logoui,
          isRegistered: this.props.reg,
          isPage: this.props.page
        };
      }
    // state={
    //     isLogged: JSON.parse(sessionStorage.getItem('logged')),
    //     isRegistered: this.props.reg,
    // }

    // componentDidMount() {
    //   fetch("http://127.0.0.1:8000/recettes/")
    //     .then(res => res.json())
    //     .then(
    //       (result) => {
    //         this.setState({
    //           isLoaded: true,
    //           items: result
    //         });
    //       },
    //       // Remarque : il est important de traiter les erreurs ici
    //       // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
    //       // des exceptions provenant de réels bugs du composant.
    //       (error) => {
    //         this.setState({
    //           isLoaded: true,
    //           error
    //         });
    //       }
    //     )
    // }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.reg !== prevProps.reg) {
        this.setState({isRegistered: this.props.reg });
      }
      if (this.props.logged !== prevProps.logged) {
        this.setState({isLogged: this.props.logged });
      }
      if (this.props.page !== prevProps.page) {
        this.setState({isPage: this.props.page });
      }
    }

    render() {
        // const { error, isLoaded, items } = this.state;
        // if (error) {
        //   return <div>Erreur : {error.message}</div>;
        // } else if (!isLoaded) {
        //   return <div>Chargement…</div>;
        // } else {
          const isPage = this.state.isPage;
          let page ='';
          if (isPage === 'liste') {
            page =<ListeRecetteFun />;
          } else if (isPage === 'show'){
            page =<ShowRecetteFun/>
          };
          return (
            <div className="PersonalPage">
                 <Header registered={this.state.isRegistered} logged={this.state.isLogged.toString()}/>
                 <div className="perso">
                    <Heading as='h1' size='2xl' color='orange.800' align='center'>
                        {/* {this.state.isLogged.toString()} */}
                        Vos Recettes
                    </Heading> 
                    <Center w='100'>
                        {page}
                        
                    </Center>
                    
                 </div>
            </div>
            
          );
        // }
      }
    }


export default PersonalPage