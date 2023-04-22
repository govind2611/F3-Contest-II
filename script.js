let fetchDataBtn = document.getElementById("fetch-data-btn");
let googleMap = document.getElementById("google-map");
let latitudeValue = document.getElementById("latitude-value");
let longitudeValue = document.getElementById("longitude-value");
let mapContainer = document.querySelector(".map-container");
let weatherDataContainer = document.querySelector(".weather-data-container");
let weatherContent = document.querySelector(".weather-content");
let mainContainer = document.querySelector(".main-container");

function fetchLocation() {
  /* aceesing location of use */
  if (navigator.geolocation) {
    mainContainer.style.width = "100vw";
    mainContainer.style.height = "280vh";
    fetchDataBtn.style.display = "none";
    mapContainer.style.display = "block";
    /* retrieving current loaction of user */
    navigator.geolocation.getCurrentPosition(success, error);
    weatherDataContainer.style.display = "block";
  } else {
    /* if browser is not supportive to api */
    alert("Your Browser does not support Geolocation API");
    fetchDataBtn.style.display = "block";
    mapContainer.style.display = "none";
  }
}
/* updating current position on map */
function success(position) {
  lattitude = position.coords.latitude;
  longitude = position.coords.longitude;

  latitudeValue.innerText = lattitude;
  longitudeValue.innerText = longitude;

  var lattitudeLongitude = new google.maps.LatLng(lattitude, longitude);
  var myOptions = {
    center: lattitudeLongitude,
    zoom: 15,
    mapTypeControl: true,
    navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL,
    },
  };
  var maps = new google.maps.Map(googleMap, myOptions);
  var markers = new google.maps.Marker({
    position: lattitudeLongitude,
    map: maps,
    title: "This is Your current Location!",
  });
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=4054535fcc56ee7b217bf7f35be322f1`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      weatherContent.innerHTML = `
                <ul>
                    <li>Location : ${data.name}</li>
                    <li class="latLangAdd">
                        <span>Lat : ${data.coord.lat}</span>
                        <span>Long : ${data.coord.lon}</span>
                    </li>
                    <li>TimeZone : ${data.timezone} UTC</li>
                    <li>Wind Speed : ${data.wind.speed} m/s</li>
                    <li>Pressure : ${data.main.pressure} hpa</li>
                    <li>Humidity : ${data.main.humidity} %</li>
                    <li>Wind Direction : ${data.wind.deg} deg</li>
                    <li>UV Index : ${data.visibility}</li>
                    <li>Feels Like : ${data.main.feels_like}</li>
                </ul>
            `;
    });
}

/*Handling Errors*/
function error(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Permission Denied");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("POSITION_UNAVAILABLE");
      break;
    case error.TIMEOUT:
      alert("The connection has timed out");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
