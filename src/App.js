import React from 'react';
import './App.css';
import Axios from 'axios';
import DisplayData from './components/DisplayData';
import Navbar from './components/Navbar'

class App extends React.Component{

  state = {
    coords : {
      latitude : 37,
      longitude : 127
    },
    data : {},
    inputData : ''
  }
  componentDidMount(){
    // console.log('render mounted')
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude, position.coords.longitude);
        let newCoords = {
          latitude : position.coords.latitude,
          longitude : position.coords.longitude
        }
        this.setState({coords : newCoords});

        Axios.get(`http://api.weatherstack.com/current?access_key=7cd18e56b647cf5e1a5061fbaa26ef9e&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then((res) => {
          // console.log(res);
          let weatherData = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }
          this.setState({data:weatherData});
        })
      }); 
    } else {
      console.log('not suppoted');
    }
  }

  change = (value) => {
    this.setState({inputData : value});
    // console.log(this.state.inputData);
  }

  changeWeather = (event) => {
    event.preventDefault();
    Axios.get(`http://api.weatherstack.com/current?access_key=7cd18e56b647cf5e1a5061fbaa26ef9e&query=${this.state.inputData}`).then((res) => {
      // console.log(res);
      let weatherData = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }
      this.setState({data:weatherData});
    });
  }

  render(){
    return(
    <div className="App">
      <div className='container'>
        <Navbar changeRegion={this.change} changeWeather = {this.changeWeather}/>
        <DisplayData weather = {this.state.data}/>
      </div>
    </div>
  );
  }
}
export default App;
