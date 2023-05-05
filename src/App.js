import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");
  const searchWeather = (e) => {
    setInput(e.target.value);
  };
  const clickWeather = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=cff3503001bb4bf5a6595156230405&q=${input}`
      )
      .then((data) => {
        setWeather(data.data);
      });
  };
  useEffect(() => {
    axios
      .get(
        "http://api.weatherapi.com/v1/current.json?key=cff3503001bb4bf5a6595156230405&q=India&aqi=no"
      )
      .then((data) => {
        setWeather(data.data);
      })
      .catch((err) => err.log(err));
  }, []);
  return (
    <div className="App">
      {weather && (
        <AppStyle>
          <div className="search">
            <input
              onChange={searchWeather}
              type="text"
              placeholder="Location here"
            />
            <button onClick={clickWeather}>View Weather</button>
          </div>
          <div className="weather-info">
            <h2>{weather.location.name}</h2>
            <h2>{weather.location.region}</h2>
            <h2>{weather.location.country}</h2>
            <div className="icon">
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
              />
              <p>Temperature : {weather.current.temp_c}° Celcious</p>
              <p>{weather.current.condition.text}</p>
            </div>
          </div>
        </AppStyle>
      )}
    </div>
  );
}
const AppStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding-top: 5rem;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  .search {
    input,
    button {
      padding: 0.5rem 0.5rem;
    }
  }
  .weather-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default App;
