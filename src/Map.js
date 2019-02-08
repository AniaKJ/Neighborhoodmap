import React from 'react';
import PropTypes from 'prop-types'

export default class GoogleMap extends React.Component {

  state = {
    mapIsReady: false,
    clickedMarkerName:'',
  }

  static propTypes = {
    universities: PropTypes.array.isRequired,
    showinguniversities: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired,
    clickedUni: PropTypes.string.isRequired,
    clickedUniFull: PropTypes.string.isRequired,
    wiki: PropTypes.array.isRequired,
    showDetails: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const ApiKey = 'AIzaSyC-BPDy9KeSAkg3Qr8fSI1InA8iIR_0zZs';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      this.setState({ mapIsReady: true });
    });

    document.body.appendChild(script);
  }

  componentDidUpdate() {
    const { clickedUniFull } = this.props;
    const { wiki } = this.props;

    if (this.state.mapIsReady) {
      // Display the map
      var map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.109961, lng: 17.032725},
        zoom: 13,
        mapTypeId: 'roadmap',
      });
      // Markers added
      const { universities } = this.props;
      const { showinguniversities} = this.props;
      const { query} = this.props;
      const { clickedUni } = this.props;
      const { wiki } = this.props;

      var largeInfowindow = new window.google.maps.InfoWindow();
      var bounds = new window.google.maps.LatLngBounds();
      var markers =[];
      var uniMarked =[];

      if (showinguniversities.length<1&&query.length<1){//determines for which list (with all univerities or only the filtered ones) markers will be added to the map
        uniMarked=universities;
      }else{
        uniMarked=showinguniversities;
      }

      //creates markers for each item from 'uniMarked'
      for (var i=0; i<uniMarked.length; i++){
        var uniname = uniMarked[i].name;
        var unilocation = uniMarked[i].location;
        var uniaddress = uniMarked[i].address;

        var marker = new window.google.maps.Marker({//marker created
          position: unilocation,
          map: map,
          title: uniname,
          id:i,
          animation: null,
          customInfo: wiki,//informacja z poprzednio kliknietego uni
        });

        // marker.addListener('click',function(){//-->caused an warning in the console
        //   removeAllBounce();//removes bounce from all markers
        //   populateInfoWindow(this,largeInfowindow, uniaddress);
        //   // toggleBounce(this);
        //   addBounce(this);
        // })

        markerClickListener(marker);

        markers.push(marker);//mark added to the arrawy with all markers
      }

      for (var l=0; l<markers.length; l++){//the clicked location on the list will bounce on the map & infowindow will be opened
        if(markers[l].title === clickedUni){
          markers[l].setAnimation(window.google.maps.Animation.BOUNCE);
          populateInfoWindow(markers[l],largeInfowindow);
        }
      }
    }

    function markerClickListener(marker){//adds event listener to a marker
      marker.addListener('click',function(){

        var name = marker.title;
        updateClickedMarkerName(name);

        removeAllBounce();//removes bounce from all markers
        populateInfoWindow(this,largeInfowindow);
        addBounce(this);//makes the cliked marker bounce
      })
    }

    function updateClickedMarkerName (name){
      this.setState({
        clickedMarkerName:name,
      });
    }

    function populateInfoWindow(marker, infowindow, address){
      // if(infowindow.marker !==marker){//ten warunek powodował, że przy drugim kliknięciu nie otwierał sie infowindow
        infowindow.marker=marker;
        infowindow.setContent('<div style="font-size:18px; text-aligh:center"><strong>'+marker.title+'</strong></div><div>'+ clickedUniFull+'</div><div>'+wiki+'</div>');
        // infowindow.setContent('<div style="font-size:18px"><strong>'+marker.title+'</strong></div><div>'+ address+'</div>'+marker.customInfo);
        infowindow.open(map,marker);
        infowindow.addListener('closeclick',function(){
          infowindow.setMarker=null; //co to robi?
          removeBounce(marker);
        })
      // }
    }

    function removeAllBounce(){//removes bounce from all markers
      for (var k=0; k<uniMarked.length; k++){
        markers[k].setAnimation(null);
      }
    }

    function addBounce(marker){//markes the marker bounce
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    }

    function removeBounce(marker){//makes the marker stops to bounce
      marker.setAnimation(null);
    }
  }

  render() {
    const style ={
      width:'100vw',
      height: '100%',
      position:'absolute'
    }
    return (
      <div id="map" onClick={(event)=>{this.props.showDetails(event.target.title)}} style={style}/>
    );
  }
}
