"use client";

import { useEffect } from "react";

export default function Location() {
  function setCookie(name: string, value: string, days: number = 30) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("Latitude: " + latitude);
          console.log("Longitude: " + longitude);

          // Set cookies for latitude and longitude
          setCookie("latitude", latitude.toString());
          setCookie("longitude", longitude.toString());
        },
        (error) => {
          console.error("Error getting location: ", error);
        },
      );
    }
  }
  useEffect(() => {
    getLocation();
  }, []);

  return <div></div>;
}
