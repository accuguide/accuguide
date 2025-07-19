"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";

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
          window.location.reload();
        },
        (error) => {
          console.error("Error getting location: ", error);
          // Even if location fails, we still resolve to allow the search to continue
        },
      );
    } else {
    }
  }

  useEffect(() => {
    // Only request location if we don't already have it stored
    const hasLatitude = Cookies.get("latitude");
    const hasLongitude = Cookies.get("longitude");

    if (!hasLatitude || !hasLongitude) {
      getLocation();
    }
  }, []);
  return <div></div>;
}
