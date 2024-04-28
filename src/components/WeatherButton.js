import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity }) => { // App.js 에서 받은 props, useState
    // console.log(cities);

    // 함수 호출: 1. JSX 배열을 반환하는 함수를 미리 선언
    const rendering = () => {
      const result = [];

      // 상위 컴포넌트 App.js 로 부터 props 으로 전달받은 배열 값 cities의 길이만큼 반복
      for (let i=0; i<cities.length; i++) {
          result.push(<Button className="btn-success m-1" key={i} onClick={() => {setCity(cities[i])}}>{ cities[i] }</Button>)
      }

      // 반환
      return result;
    };

    return (
        // react 반복문 렌더링
        // - rendering(): 함수 호출: 2. return문에서 호출 // 함수 재사용으로 코드가 깔끔해짐
        // - map(): map 메서드는 요소를 순회하며 값을 반환해준다. (JSX 반환) // 강의에서 진행한 방법
        <div>
            <div> {rendering()} </div>

            {/*<div>*/}
            {/*    {cities.map((item, index) => (*/}
            {/*        <Button className="btn-success" key={index} onClick={() => setCity(item)}>{item}</Button>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <Button className="btn-primary">Current Location</Button>*/}
            {/*    <Button className="btn-danger m-1">paris</Button>*/}
            {/*    <Button className="btn-success">new york</Button>*/}
            {/*</div>*/}

            <Button className="btn-primary" onClick={() => setCity(null)}>Current Location</Button>
        </div>
    );
};

export default WeatherButton;