import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import { useEffect, useState } from "react";

function App() {
    // 객체로 초기화: api 응답값을 그대로 받음
    const [weather, setWeather] = useState(null);

    // 현재 위치 가져오기
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            // console.log('lat: ', lat, ' / lon:', lon, ' / apiKey: ', process.env.REACT_APP_API_KEY);

            getWeather(lat,lon);
        });
    };

    // 현재 위치의 날씨 가져오기
    const getWeather = async (lat, lon) => {
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      let response = await fetch(apiUrl);
      let rsData = await response.json();
      // console.log(rsData);

      // 객체로 설정
      setWeather(rsData);
    };

    // 앱이 실행됨과 동시에 구문안에 있는 내용을 실행한다.
    useEffect(() => {
        getCurrentLocation();
    }, []); // 의존성 배열

  return (
    // react에서 JSX 객체를 직접 표시할 수 없다.
    // 반드시 객체를 문자열로 변환하여 표시해야한다.
    // { weather && weather.name } => "weather 객체가 존재하며(null이 아님) weather.name 속성에 접근할 수 있다." 라는 의미.
    <div>
      <h2>WEATHER API TEST</h2>
        <div>
            API RESPONSE: { weather && weather.name }
        </div>

        <div className="container">
            <WeatherBox rsWeather={ weather }/>
            <WeatherButton/>
        </div>
    </div>
  );
}

export default App;