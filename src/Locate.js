import React, { useState } from "react";

function Locate() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
      alert("Geolocation not supported");
    }
  }

  function getCoordinates(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  return (
    <div>
      <button onClick={getLocation}>get coordinates: </button>
      <h4> {lat}</h4>
      <h4> {lng}</h4>
    </div>
  );
}

export default Locate;
