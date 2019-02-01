import React from 'react';
import PropTypes from 'prop-types'

export default class GoogleMap extends React.Component {

  state = {
    mapIsReady: false,
  }
/*added by me*/

  static propTypes = {
    universities: PropTypes.array.isRequired,
    showinguniversities: PropTypes.array.isRequired,
    query: PropTypes.array.isRequired,
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
      var largeInfowindow = new window.google.maps.InfoWindow();
      var bounds = new window.google.maps.LatLngBounds();
      var markers =[];


      if (showinguniversities.length<1&&query.length<1){
        for (var i=0; i<universities.length; i++){
          var uniname = universities[i].name;
          var unilocation = universities[i].location;

          var uniaddress = universities[i].address;

          var marker = new window.google.maps.Marker({
            position: unilocation,
            map: map,
            title: uniname,
            id:i,
            animation: window.google.maps.Animation.DROP,
          });
          markers.push(marker);
          marker.addListener('click',function(){
            populateInfoWindow(this,largeInfowindow, uniaddress);
            toggleBounce(this);
          });
        }
      }
      else{
        console.log('second-first');
        for (var j=0; j<showinguniversities.length; j++){
          var uniname2 = showinguniversities[j].name;
          var unilocation2 = showinguniversities[j].location;

          var uniaddress2 = showinguniversities[j].address;

          var marker2 = new window.google.maps.Marker({
            position: unilocation2,
            map: map,
            title: uniname2,
            id:j,
            animation: window.google.maps.Animation.DROP,
          });
          markers.push(marker2);
          marker2.addListener('click',function(){
            populateInfoWindow(this,largeInfowindow, uniaddress2);
            toggleBounce(this);
          });
        }
      }
    }

    function populateInfoWindow(marker, infowindow, address){
      if(infowindow.marker !==marker){
        infowindow.marker=marker;
        infowindow.setContent('<div>'+marker.title+'</div>'+'<br>'+'<div>'+address+'</div>');
        infowindow.open(map,marker);
        infowindow.addListener('closeclick',function(){
          infowindow.setMarker=null;
          toggleBounce(marker);
        })
      }
    }

    function toggleBounce(marker) {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
      }
    }

    function removeBounce(){

    }
  }

  render() {
    const style ={
      width:'100vw',
      height: '100vh',
      position:'absolute'
    }
    return (
      <div id="map" style={style}/>
    );
  }
}
