
import React, { Component } from 'react';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
 // MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
import Input from '../../../components/ui/Input';


// const icon = 'https://whirlpool-kz.net/files/logo_57.png'
const icon = '../../../dist/images/bag.png'
const mapstyle = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
var shallowCompare = require('react-addons-shallow-compare');

class Maps extends Component {
  state={address:'', mapCenter:{lat:43.2220146,lng:76.8512485}, curLocation:'Местоположение', coordsLat:43.2220146,coordsLng:76.8512485}
  
  onChange=(address)=>{
    this.setState({
      address:address
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  onFound=(latLng)=> {
    console.log("laltlng", latLng.lat, latLng.lng)
    this.setState({
      mapCenter:{lat:latLng.lat, lng:latLng.lng},
      coordsLat:latLng.lat,
      coordsLng:latLng.lng
      // coords:{lat:latLng.lat, lng:latLng.lng}
    })
  }
  handleEnter = (address) => {
  geocodeByAddress(address)
    .then(results => {
      console.log('results', results)
    })
  }
  componentWillReceiveProps(nextProps) {
    // this.props.addressToFind!==nextProps.addressToFind&&this.searchInput.focus()

    this.props.addressToFind!==nextProps.addressToFind&&this.setState({address:nextProps.addressToFind})
  }
  handleCoordsLatChange(e){

     this.setState({
      // mapCenter:{lat:parseFloat(e.target.value.split(" ")[1]), lng:parseFloat(this.state.coordsLng)},
      coordsLat:e.target.value.split(" ")[1]?e.target.value.split(" ")[1]:''
    })
  }
  handleCoordsChange1(e){
    this.setState({
      // mapCenter:{lat:parseFloat(this.state.coordsLat), lng:parseFloat(e.target.value.split(" ")[1])},
      coordsLng:e.target.value.split(" ")[1]?e.target.value.split(" ")[1]:''
    })
  }
  handleSubmit=(address)=> {
    this.setState({
      curLocation:address,
      address
    })
  geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.onFound(latLng))
      .catch(error => console.error('Error', error))
  }
  componentWillMount() {
    this.props.mapCenter&&
    this.setState({
      mapCenter:{lat:parseFloat(this.props.mapCenter.lat), lng:parseFloat(this.props.mapCenter.lng)},
      coordsLat:parseFloat(this.props.mapCenter.lat),
      coordsLng:parseFloat(this.props.mapCenter.lng)
    })

  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("MAPCENTER", this.state.mapCenter, prevState.mapCenter)
    this.state.mapCenter!==prevState.mapCenter&&this.props.setCoords(this.state.mapCenter.lat, this.state.mapCenter.lng)

  }
  
  render() {
    // console.log("MAAAP", this.state.mapCenter)
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      type: 'search',
      charSet:"utf-8",
      placeholder: `Поиск адреса`,
      // ref: input => { this.searchInput = input}
      // ref:(e)=>this.props.setRef(e)
      

    }
    return (
      <div  style={{width:'85.3%'}}>
        <div className="curr-location"> <i className="map-marker-outline" ></i>{" "+ this.state.curLocation}</div>
        <div className="google-map">
          <GoogleMapLoader
            containerElement={
              <div
                style={{
                  height: 300,
                  width: "100%"
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                defaultZoom={12}
                options={{mapTypeControl:false, streetViewControl:false}}
                // defaultCenter={{lat:this.state.mapCenter.lat , lng:this.state.mapCenter.lng}}
                center={{lat:this.state.mapCenter.lat , lng:this.state.mapCenter.lng}}
              >
                    <Marker 
                      draggable 
                      onDragend={e=>this.setState({mapCenter:{lat:e.latLng.lat(), lng:e.latLng.lng()}, coordsLat:e.latLng.lat(), coordsLng:e.latLng.lng()})} 
                      position={{lat:this.state.mapCenter.lat , lng:this.state.mapCenter.lng}} 
                    />

                {this.props.shops.shops.map((marker, i) => {
                  
                  return(
                    <Marker icon={{url:icon, scaledSize:{width:20, height:20}}} key={marker.name} onClick={e=>console.log("e",e)}  position={{lat:marker.latitude, lng:marker.longitude}} />
                  );
                })}
              </GoogleMap>
            }
          />
        </div>

        <div className="map-search">
           <PlacesAutocomplete 
              onEnterKeyDown={this.handleEnter} 
              onSelect={this.handleSubmit} 
              inputProps={inputProps} 
              // shouldFetchSuggestions={()=>this.state.address.length>0}
              styles={{autocompleteContainer:{zIndex:'2'}}}
              // renderSuggestion={renderSuggestion}
            />
        </div>

        <div className="coords">
          <Input  style={{}}isFull value={"Широта: "+this.state.coordsLat} onFieldChange={(e)=>this.handleCoordsLatChange(e)}/>
          <Input  style={{}}isFull value={"Долгота: "+this.state.coordsLng} onFieldChange={(e)=>this.handleCoordsChange1(e)}/>
          <button 
            onClick={e=>this.setState({mapCenter:{lat:parseFloat(this.state.coordsLat), lng:parseFloat(this.state.coordsLng)}})}
          >
            <i className="fa fa-search" ></i>
          </button>
          
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    isSent: state.retailer.addSuccess,
    errors: state.retailer.errors,
    shops:state.shops,
    user:state.app


  };
}
export default connect(mapStateToProps)(Maps);

