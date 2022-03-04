var searchEl = document.querySelector("#city");
var searchBtn = document.querySelector("#searchBtn");
var citySearch = document.querySelector("#city-search");
var currentWeather = document.querySelector("#current-weather");
var fiveDay = document.querySelector("#weather-cards");
var day1 = document.querySelector("#day_1");
var day2 = document.querySelector("#day_2");
var day3 = document.querySelector("#day_3");
var day4 = document.querySelector("#day_4");
var day5 = document.querySelector("#day_5");
var lat = "";
var long = "";

var bigWeather = document.createElement("div");
var cityName = document.createElement("h3");
var temp = document.createElement("h3");
var wind = document.createElement("h3");
var humidity = document.createElement("h3");
var UV = document.createElement("h3");
var icon = document.createElement("h4");
var firstDay = document.createElement("h4");
var secondDay = document.createElement("h4");
var thirdDay = document.createElement("h4");
var fourthDay = document.createElement("h4");
var fifthDay = document.createElement("h4");

var cityCounter = 0;
var cities = []

var searchBtnHandler = function(event) {
    event.preventDefault();

    var city = document.querySelector("input[name='city']").value;
    console.log(cities);
    
    if (city) {
        getWeatherData(city);

    } else {
        alert("Please enter a city")
    }
    
    if (!cities.includes(city)) {
        
        createSearchEl();
        cities.push(city)
    }
    cityName.textContent = city
    bigWeather.appendChild(cityName);    
}

var createSearchEl = function() {

    var btnItemEl = document.createElement("button");
    btnItemEl.className = "btn btn-secondary btn-block";
    btnItemEl.textContent = document.querySelector("input[name='city']").value
    btnItemEl.setAttribute("data-city-id", cityCounter);
    btnItemEl.setAttribute("id", "searchBtn");
    btnItemEl.setAttribute("type", "submit");    

    citySearch.appendChild(btnItemEl);

    cityCounter++;

    saveSearch();
}

var getWeatherData = function(city, state) {
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + ", " + state + "&limit=5&appid=93ec56821a727ff38ffe9140f6060c88";
    fetch(apiURL)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    displayResult(data);
                    weatherReport();
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect")
        });
};

var displayResult = function(city, state) {
    if (city.length === 0) {
        alert("city not found");
        return;
    }

    for (var i = 0; i < city.length; i++) {

        lat = city[i].lat;
        long = city[i].lon;
        console.log(lat, long);
    }
}

var weatherReport = function() {
    var apiURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=93ec56821a727ff38ffe9140f6060c88"
    fetch(apiURL)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    currentWeatherDisplay(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect")
        });
}

var currentWeatherDisplay = function(cityData) {
    var weatherIconURL = cityData.current.weather[0].icon;
    var iconIMG = "http://openweathermap.org/img/wn/" + weatherIconURL + "@2x.png";
    icon.innerHTML = "<img src=" + iconIMG + ">";
    
    temp.textContent = "Temp: " + cityData.current.temp + " °F";

    
    wind.textContent = "Wind: " + cityData.current.wind_speed + " mph";


    humidity.textContent = "Humidity: " + cityData.current.humidity + " %";

    UV.textContent = "UV Index: " + cityData.current.uvi;

    bigWeather.appendChild(icon);
    bigWeather.appendChild(temp);
    bigWeather.appendChild(wind);
    bigWeather.appendChild(humidity);
    bigWeather.appendChild(UV);
    currentWeather.appendChild(bigWeather);

    fiveDayForecast(cityData.daily)
}

var fiveDayForecast = function(daily) {

    var day = [];
    var day_temp = [];
    var day_wind = [];
    var day_hum = [];
    var day_icon = [];

    
 

}



var loadSearch = function() {
    
    var searchHist = JSON.parse(localStorage.getItem("cities"));
    console.log(searchHist);
    for (var index = 0; index < searchHist.length; index++) {
        
    var btnItemEl = document.createElement("button");
    btnItemEl.className = "btn btn-secondary btn-block";
    btnItemEl.textContent = searchHist[index]
    btnItemEl.setAttribute("data-city-id", cityCounter);
    btnItemEl.setAttribute("id", "searchBtn");
    btnItemEl.setAttribute("type", "submit");

    citySearch.appendChild(btnItemEl);
    }
}

if (localStorage.getItem("cities")) {
    cities = JSON.parse(localStorage.getItem("cities"))
}
if (cities.length !== 0) {
    loadSearch();
}

var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

searchBtn.addEventListener("click", searchBtnHandler);