import React, { Component } from 'react';
import Header from './Header';
// import { Flex} from '@chakra-ui/react';

class PersonalPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          isLogged: JSON.parse(sessionStorage.getItem('logged')),
          isRegistered: this.props.reg,
          
        };
      }
    // state={
    //     isLogged: JSON.parse(sessionStorage.getItem('logged')),
    //     isRegistered: this.props.reg,
    //     // error:null,
    //     // isLoaded: false,
    //     // items:[]
    // }

    // componentDidMount(){
    //     fetch("http://127.0.0.1:8000/recettes/")
    //     .then(res => res.json())
    //     .then(
    //         (res) =>{
    //             this.setState({
    //                 isLoaded: true,
    //                 items: res.items
    //             });
    //         },
    //         (error) =>{
    //             this.setState({
    //                 isLoaded: true,
    //                 error
    //             });
    //         }
    //     )
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

    // render(){
    //     // const {error, isLoaded, items} =this.state;
    //     // if(this.state.error){
    //     //     return <div>Erreur: {this.state.error.message}</div>
    //     // } else if (!this.state.isLoaded){
    //     //     return <div>Chargement ...</div>
    //     // } else {
    //     //    const recettes = this.state.items
    //     return(
    //         <div className="Home">
    //             <Header registered={this.state.isRegistered} logged={this.state.isLogged.toString()}/>
    //             <div className="perso">
    //                 <h1>{this.state.isLogged.toString()} Ensemble des recettes</h1> 
    //                <p>
                    
    //                </p>
    //             </div>
    //         </div>
    //     )}
    // // }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Chargement…</div>;
        } else {
          return (
            <div className="Home">
                 <Header registered={this.state.isRegistered} logged={this.state.isLogged.toString()}/>
                 <div className="perso">
                     <h1>{this.state.isLogged.toString()} Ensemble des recettes</h1> 
                    <ul>
                        {items.map(item => (
                            <li key={item.titre}>
                            <b>titre</b>{item.titre}  <b>Catégorie</b>{item.categorie}
                            </li>
                        ))}
                    </ul>
                 </div>
            </div>
            
          );
        }
      }
    }


export default PersonalPage