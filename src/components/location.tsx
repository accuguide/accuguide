"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Location() {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          Cookies.set("latitude", latitude.toString(), {
            expires: 30,
            secure: true,
          });
          Cookies.set("longitude", longitude.toString(), {
            expires: 30,
            secure: true,
          });
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
