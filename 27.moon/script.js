window.onload = async function() {
 const { sunrise, sunset } = await fetchSunsetSunrise();
 positionStars();
 setInterval(() => setSunOrMoon({ sunrise, sunset }), 1000);
};

async function fetchSunsetSunrise() {
 const location = await getLocation();
 const url = `https://api.sunrise-sunset.org/json?lat=${location.lat}&lng=${
  location.lng
 }&formatted=0`;
 const response = await fetch(url);
 const data = await response.json();
 const { results: { sunrise, sunset } } = data;
 return { sunrise: new Date(sunrise), sunset: new Date(sunset) };
}

async function getLocation() {
 let location = JSON.parse(localStorage.getItem("location") || null);
 if (location) return location;
 else {
  try {
   const position = await getGeoLoc();
   location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
   };
   localStorage.setItem("location", JSON.stringify(location));
   return location;
  } catch (e) {
   alert("Enable location on your browser");
  }
 }
}

function getGeoLoc() {
 return new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, ({ code, message }) =>
   reject(Object.assign(new Error(message), { name: "PositionError", code }))
  );
 });
}

function setSunOrMoon({ sunrise, sunset }) {
 const now = new Date();
 if (now > sunset || now < sunrise) {
  document.body.classList.add("night");
 } else {
  document.body.classList.add("day");
 }
}

function positionStars() {
 const stars = document.querySelectorAll(".star");

 for (let i = 0; i < stars.length; i++) {
  stars[i].style.top = Math.floor(Math.random() * 70) + "%";
  stars[i].style.left = Math.floor(Math.random() * 100) + "%";
 }
}