import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class LatLongRefresher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleVal: ''
    };
    this.watchLocation = this.watchLocation.bind(this);
  }
  componentDidMount() {
    this.watchLocation();
  }
  watchLocation() {
    navigator.geolocation.watchPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      this.props.updateCoords(lat, long);
      this.setState({
        lat,
        long
      });
    },function (error) {
      if (error.code == error.PERMISSION_DENIED) {
        console.log("you denied me :-(");
      }
      alert('error finding you');
    });
  }
  render() {
    return (
      <div id='lat-long-refresher'>
        <div>
          <h2>{this.state.lat || '--'}</h2>
          Latitude
        </div>
        <div>
          <h2>{this.state.long || '--'}</h2>
          Longitude
        </div>
      </div>
    );
  }
}

export default class NewLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleVal: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.createLOI = this.createLOI.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
  }
  updateCoords(lat, long) {
    this.setState({
      lat,
      long
    });
  }
  handleTitleChange(evt) {
    this.setState({
      titleVal: evt.target.value
    });
  }
  createLOI() {
    alert('new loc');
    this.props.createLOI(this.state.lat, this.state.long, this.state.titleVal);
  }
  render() {
    // inline
    let styles = {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    };
    return (
      <div style={styles}>
        <TextField value={this.state.titleVal || ''} onChange={this.handleTitleChange} hintText='Title this location'/>
        <FloatingActionButton onClick={this.createLOI}>
          <ContentAdd />
        </FloatingActionButton>
        <LatLongRefresher updateCoords={this.updateCoords} />
      </div>
    );
  }
}
