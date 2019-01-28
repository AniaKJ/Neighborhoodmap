import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListUniversities from './ListUniversities';
import Map from './Map';
import Modal from './Modal';
import ModalOverlay from './ModalOverlay';
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
  state = {
    universities: [
      {
         "id": "unienv",
         "name": "Wrocław University of Environmental and Life Sciences",
         "email": "ul. C.K. Norwida 25,50-375 Wroclaw, Poland",
         "location":{
           lat:51.111618,
           lng:17.064321
         }
       },
       {
         "id": "uniscien",
         "name": "Wrocław University of Science and Technology",
         "email": "Wybrzeże Wyspiańskiego 27, 50-370 Wrocław, Poland",
         "location":{
           lat:51.108015,
           lng:17.061667
         }
       },
       {
         "id": "uniecon",
         "name": "Wrocław University of Economics",
         "email": "ul. Komandorska 118-120, 53-345 Wrocław, Poland",
         "location":{
           lat:51.091261,
           lng:17.024777
         }
       },
       {
         "id": "musacad",
         "name": "Academy of Music",
         "email": "pl. Jana Pawła II nr 2, 50-043 Wrocław, Poland",
         "location":{
           lat:51.111354,
           lng:17.021337
         }
       },
       {
         "id": "artacad",
         "name": "Academy of Fine Arts",
         "email": "ul. Plac Polski 3/4, 50-156 Wrocław, Poland",
         "location":{
           lat:51.111532,
           lng:17.043541
         }
       },
       {
         "id": "unimed",
         "name": "Medical University",
         "email": "Wybrzeże L. Pasteura 1, 50-367 Wrocław",
         "location":{
           lat:51.108981,
           lng:17.068926
         }
       }
    ],
    showingUniversities: [
    ],
    query: [

    ],
    isHidden: true//for modal
  }


  updateUniversitiesList = (query)=>{
    this.setState({
      query: query.trim()
    })
    const match = new RegExp(escapeRegExp(query), 'i')
    this.setState((state)=>({
      showingUniversities: state.universities.filter((university) => match.test(university.name))

    }))
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  //   const styleVisible ={
  //     display: 'block',
  //     width:'50%',
  //     position:'fixed'
  //   }

  //   const styleVisible ={
  //     display: 'block',
  //     width:'50%',
  //     position:'fixed'
  //   }

  render() {
    return (
        <Route exact path='/' render={() => (
          <div className="app_container">
          <ListUniversities
            universities={this.state.universities}
            showinguniversities={this.state.showingUniversities}
            updateUniversities={this.updateUniversitiesList}
            query={this.state.query}
            showDetails={this.toggleHidden}
          />
            <Map
            universities={this.state.universities}
            showinguniversities={this.state.showingUniversities}
            query={this.state.query}
            />
            {!this.state.isHidden && <Modal/>}
            {!this.state.isHidden && <ModalOverlay showDetails={this.toggleHidden}/>}
          </div>
        )}/>
    )
}
}

export default App;
