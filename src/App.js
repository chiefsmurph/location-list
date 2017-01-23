import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NewLocation from './NewLocation';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      locations: []
    };
    this.createLOI = this.createLOI.bind(this);
  }
  createLOI(lat, long, title) {
    console.log(lat, long, title);
    this.setState({
      locations: [{
        lat: lat,
        long: long,
        title: title
      }].concat(this.state.locations)
    });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <NewLocation createLOI={this.createLOI}/>
          <hr/>
          <div className="list">
            List of locations
            {
              this.state.locations.map((location) => <SingleLOI location={location} key={location.title} />)
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

class SingleLOI extends Component {
  constructor() {
    super();
  }
  render() {
    let loc = this.props.location;
    return (
      <Card initiallyExpanded={true}>
        <CardHeader title={loc.title} />
        <CardText>
          Latitude: {loc.lat} || Longitude: {loc.long}
        </CardText>
        <CardActions>
          <FlatButton onClick={() => { window.open(`https://maps.google.com?saddr=Current+Location&daddr=${loc.lat},${loc.long}`); }}>Click here to navigate to this location</FlatButton>
        </CardActions>
      </Card>
    )
  }
}

export default App;
