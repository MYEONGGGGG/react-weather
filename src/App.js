import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import { useEffect, useState } from "react";

function App() {
    // 객체로 초기화: api 응답값을 그대로 받음
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);
    const cities=['seoul', 'tokyo', 'new york', 'bangkok', 'paris'];

    // 현재 위치 가져오기
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            getWeather(lat,lon);
        });
    };

    // 현재 위치의 날씨 가져오기
    const getWeather = async (lat, lon) => {
      let apiUrl = `${process.env.REACT_APP_API_URL}lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
      let response = await fetch(apiUrl);
      let rsData = await response.json();

      // 객체로 설정
      setWeather(rsData);
    };

    // 특정 도시의 날씨 가져오기
    const getWeatherByCity = async () => {
        // state의 city의 값을 이용
        let apiUrl = `${process.env.REACT_APP_API_URL}q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
        let response = await fetch(apiUrl);
        let rsData = await response.json();
        // console.log(rsData);

        setWeather(rsData);
    };

    // 앱이 실행됨과 동시에 구문안에 있는 내용을 실행한다.
    // *react의 'useEffect'는 vue의 'watch'와 같은 기능을 한다.
    useEffect(() => {
        // 기존 날씨 정보 초기화
        setWeather(null);

        if (city === null) {
            // 특정 도시의 이름을 가져오지 못한 경우, 현재 위치 기준으로 조회
            getCurrentLocation();
        } else {
            // 특정 도시의 이름을 가져온 경우, 도시 기준으로 조회
            getWeatherByCity();
        }
    }, [city]); // 의존성 배열

  return (
    // react에서 JSX 객체를 직접 표시할 수 없다.
    // 반드시 객체를 문자열로 변환하여 표시해야한다.
    // { weather && weather.name } => "weather 객체가 존재하며(null이 아님) weather.name 속성에 접근할 수 있다." 라는 의미.
      <div>
          <h2>WEATHER API TEST</h2>

          <div className="test">
              <span>API RESPONSE: {weather && weather.name}</span>
              <span>city(button click)? {city === null ? null : city}</span>
          </div>

          <div className="container">
              <WeatherBox rsWeather={weather}/>
              <WeatherButton cities={cities} setCity={setCity}/>
          </div>
      </div>
  );
}

export default App;