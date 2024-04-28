import React, { useState, useEffect } from "react";

const WeatherBox = ({ rsWeather }) => { // App.js 에서 받은 값
    // console.log('rsWeather: ', rsWeather?.main);
    let temp = rsWeather?.main.temp;

    const [celsius, setCelsius] = useState(null);
    const [fahrenheit, setFahrenheit] = useState(null);

    useEffect(() => {
        // console.log('섭씨:', temp);
        setCelsius(temp);

        let fh = calculator(celsius);
        // console.log('화씨:', fh);
        setFahrenheit(fh);
    }, [celsius, temp]);

    // 화씨 계산
    const calculator = (value) => {
      return value * (9/5) + 32;
    };

    return (
        // rsWeather 값이 존재할 경우, name 값을 보여준다.
        // - 조건부 렌더링: <div>{rsWeather && rsWeather.name}</div>
        // - 삼항 연산식 렌더링: <div>{rsWeather?.name}</div>
        <div className="weather-box">
            {/*<div>{rsWeather && rsWeather.name}</div>*/}
            <div>{rsWeather?.name}</div>
            {/*<h3>{rsWeather?.main.temp}C/{fahrenheit()}</h3>*/}
            <h3>{ celsius }C/{ fahrenheit }</h3>
            <h5>{rsWeather?.weather[0].description}</h5>
        </div>
    );
};

export default WeatherBox;