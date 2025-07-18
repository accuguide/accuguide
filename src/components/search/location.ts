import Cookies from "js-cookie";

export default async function getLocation(): Promise<void> {
  return new Promise((resolve) => {
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
          resolve();
        },
        (error) => {
          console.error("Error getting location: ", error);
          // Even if location fails, we still resolve to allow the search to continue
          resolve();
        },
      );
    } else {
      // If geolocation is not supported, resolve immediately
      resolve();
    }
  });
}
