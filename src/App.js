import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListUniversities from './ListUniversities';
import Map from './Map';
import Modal from './Modal';
import ModalOverlay from './ModalOverlay';
import escapeRegExp from 'escape-string-regexp';
import fetchJsonp from 'fetch-jsonp';

class App extends Component {
  state = {
    universities: [
      {
         "id": "unienv",
         "name": "Wrocław University of Environmental and Life Sciences",
         "address": "ul. C.K. Norwida 25,50-375 Wroclaw, Poland",
         "location":{
           lat:51.111618,
           lng:17.064321
         }
       },
       {
         "id": "uniscien",
         "name": "Wrocław University of Science and Technology",
         "address": "Wybrzeże Wyspiańskiego 27, 50-370 Wrocław, Poland",
         "location":{
           lat:51.108015,
           lng:17.061667
         }
       },
       {
         "id": "uniecon",
         "name": "Wrocław University of Economics",
         "address": "ul. Komandorska 118-120, 53-345 Wrocław, Poland",
         "location":{
           lat:51.091261,
           lng:17.024777
         }
       },
       {
         "id": "musacad",
         "name": "Karol Lipiński Academy of Music",
         "address": "pl. Jana Pawła II nr 2, 50-043 Wrocław, Poland",
         "location":{
           lat:51.111354,
           lng:17.021337
         }
       },
       {
         "id": "artacad",
         "name": "Eugeniusz Geppert Academy of Fine Arts",
         "address": "ul. Plac Polski 3/4, 50-156 Wrocław, Poland",
         "location":{
           lat:51.111532,
           lng:17.043541
         }
       },
       {
         "id": "unimed",
         "name": "Wrocław Medical University",
         "address": "Wybrzeże L. Pasteura 1, 50-367 Wrocław",
         "location":{
           lat:51.108981,
           lng:17.068926
         },
       },
       {
          "id": "uniwro",
          "name": "University of Wrocław",
          "address": "Plac Uniwersytecki 1, 50-137 Wrocław",
          "location":{
             lat:51.114241,
             lng:17.034463
          }
       }
    ],
    data: [//data fetched from wiki
    ],
    clickeduni: [//stores info about the clicked item on the list
    ],
    clickedWiki: [//stores wiki info about the clicked item on the list
    ],
    showingUniversities: [//stores info about the filtered items
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

  toggleHidden = () => {//this will update the state isHidden so that the modal can be visible
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  handleClick = (e)=> {//this function will take the id of the clicked university from ListUniversities component
    const clickedUniObj = e;
    console.log(clickedUniObj);
    this.setState({
      clickeduni: clickedUniObj
    });
    this.toggleHidden();
    this.takeWikiData();
  }

  updateData = (newData) => {//updates 'data' state with the data fetched from wiki
    this.setState({
      data:newData,
    });
  }

  updateWiki = (wikiData) => {//upadates 'clikedWikiw' state with the wiki date for the clicked item on the list only
    this.setState({
      clickedWiki:wikiData,
    });
  }

  componentDidMount(){//wiki data are fetched and passed to updateData method
    this.state.universities.map((location,index)=>{
      return fetchJsonp(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${location.name}&format=json&callback=wikiCallback`)
      .then(response => response.json()).then((responseJson) => {
        let newData = [...this.state.data,[responseJson,responseJson[2][0],responseJson[3][0]]]
        this.updateData(newData)
      }).catch(error =>
      console.error(error)
      )
    })
  }

  takeWikiData =() => {
    let getData = this.state.data.filter((single)=>this.state.clickeduni.name === single[0][0]).map(item2=>
      {if (item2.length===0)
        return 'No Contents Have Been Found Try to Search Manually'
        else if (item2[1] !=='')
          return item2[1]
        else
          return 'No Contents Have Been Found Try to Search Manually'
    })
    this.updateWiki(getData)
  }


  // handleWikiResponse = (data)=>{
  //   this.setState({
  //     wikiResponse: data
  //   });
  // }
  //
  // getWikiInfo = () => {//makes XHR request to wiki API
  //   const wikiRequest = new XMLHttpRequest();
  //   wikiRequest.open('GET','https://en.wikipedia.org/w/api.php?action=parse&format=json&page=University_of_Wroc%C5%82aw&prop=text&section=0&origin=*');
  //   let data
  //   function handleSuccess(){
  //     data = JSON.parse(this.responseText);
  //     console.log (data)
  //   }
  //   this.setState({
  //     wikiResponse: data
  //   });
  //   wikiRequest.onload = handleSuccess;
  //   wikiRequest.send();
  // }

  render() {
    return (
        <Route exact path='/' render={() => (
          <div className="app_container">
          <ListUniversities
            universities={this.state.universities}
            showinguniversities={this.state.showingUniversities}
            updateUniversities={this.updateUniversitiesList}
            query={this.state.query}
            showDetails={this.handleClick}
          />
            <Map
            universities={this.state.universities}
            showinguniversities={this.state.showingUniversities}
            query={this.state.query}
            />
            {!this.state.isHidden && <Modal clickedUni ={this.state.clickeduni} wiki ={this.state.clickedWiki}/>}
            // {!this.state.isHidden && <ModalOverlay showDetails={this.toggleHidden}/>}
          </div>
        )}/>
    )
}
}

export default App;
