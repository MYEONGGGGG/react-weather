import React, { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';

const WeatherBox = ({ rsWeather }) => { // App.js 에서 받은 props
    const [loading, setLoading] = useState(true);
    const [celsius, setCelsius] = useState(null);
    const [fahrenheit, setFahrenheit] = useState(null);

    let temp = rsWeather?.main.temp;

    useEffect(() => {
        setLoading(!rsWeather);

        // console.log('섭씨:', temp);
        setCelsius(temp);

        let fh = calculator(celsius);
        // console.log('화씨:', fh);
        setFahrenheit(fh);
    }, [celsius, temp, rsWeather]);

    // 화씨 계산
    const calculator = (value) => {
      return value * (9/5) + 32;
    };

    return (
        // rsWeather 값이 존재할 경우, name 값을 보여준다.
        // - 조건부 렌더링: <div>{rsWeather && rsWeather.name}</div>
        // - 삼항 연산식 렌더링: <div>{rsWeather?.name}</div>
        <div className="weather-box">
            {loading ? ( // 로딩 중이면 Spinner를 표시
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : ( // 로딩 중이 아니면 날씨 정보를 표시
                <div>
                    {/*<div>{rsWeather && rsWeather.name}</div>*/}
                    <div>{rsWeather?.name}</div>
                    {/*<h3>{rsWeather?.main.temp}C/{fahrenheit()}</h3>*/}
                    <h3>{ celsius }C/{ fahrenheit }</h3>
                    <h5>{rsWeather?.weather[0].description}</h5>
                </div>
            )}
        </div>
    );
};

export default WeatherBox;