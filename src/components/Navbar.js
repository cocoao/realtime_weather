import React from 'react';

function Navbar(props){
  return(
    <div className='row'>
      <div className='col-md-6'>
        <h1 className='title'>Real Time Weather</h1>
      </div>
      <div className='col-md-6'>
        <form className='region' onSubmit={(e) => props.changeWeather(e)}>
          <input className='regioninput' placeholder='Enter Your Location' onChange={(e) => {props.changeRegion(e.target.value)}}/>
        </form>
      </div>
    </div>
  )
}

export default Navbar;