import React, { useEffect, useRef, useState } from 'react';
import io from "socket.io-client"
import './App.css';

function App() {

  const [ temperature, setTemperature ] = useState([])

  const socketRef = useRef()

  useEffect(
    () => {
      socketRef.current = io.connect("http://192.168.100.71:4000")
      socketRef.current.on("temperature", ({ temperatureInfo, humanityInfo }) => {
        setTemperature([ ...temperature, { temperatureInfo, humanityInfo } ])
      })
      return () => socketRef.current.disconnect()
    }, 
    [ temperature ]
  )

  const renderHumanity = () => {
    //console.log(temperature)
    if (temperature.length > 0) {
      return temperature.map(({temperatureInfo, humanityInfo}, index) => (
        temperature.length - 1 === index ? humanityInfo.substring(0,2) + (parseInt(humanityInfo.substring(3,2)) !== 0 ? '.'+humanityInfo.substring(3,2) : '') : ''
      ))
    } else {
      return ('-')
    }
  }

  const renderTemperature = () => {
    //console.log(temperature)
    if (temperature.length > 0) {
      return temperature.map(({temperatureInfo, humanityInfo}, index) => (
        temperature.length - 1 === index ? temperatureInfo.substring(0,2) +'.'+temperatureInfo.substring(3,2) : ''
      ))
    } else {
      return ('-')
    }
  }

  return (
    <div className="container">
      <div className="app-title">
          <p>Info</p>
      </div>
      <div className="notification"> </div>
        <div className="weather-container">
            <div className="weather-icon">
                <img src={`${process.env.PUBLIC_URL}icon/025-cpu.png`} alt="logo" />
            </div>
            <div className="temperature-value">
              <p>{renderTemperature()} °<span>C</span></p>
            </div>
            <div className="temperature-description">
                <p> Temperature Condition </p>
            </div>
            <div className="location">
                <p>Device</p>
            </div>
        </div>
        <div className="notification"> </div>
        <div className="weather-container">
            <div className="weather-icon">
                <img src={`${process.env.PUBLIC_URL}icon/034-AI.png`} alt="logo" />
            </div>
            <div className="temperature-value">
              <p>{renderHumanity()}<span> %</span></p>
            </div>
            <div className="temperature-description">
                <p> Humanity Condition </p>
            </div>
            <div className="location">
                <p>Device</p>
            </div>
        </div>
    </div>
  );
}

export default App;
