import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = () => {
    // console.log(props)

    return (
        <div>
            <Button className="btn-primary">Current Location</Button>
            <Button className="btn-danger m-1">paris</Button>
            <Button className="btn-success">new york</Button>
        </div>
    );
};

export default WeatherButton;