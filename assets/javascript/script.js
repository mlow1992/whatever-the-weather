var searchEl = document.querySelector("#city");
var searchBtn = document.querySelector("#searchBtn");
var citySearch = document.querySelector("#city-search");
var currentWeather = document.querySelector("current-weather");
var fiveDay = document.querySelector("weather-cards");

var day1 = document.querySelector("day_1");
var day2 = document.querySelector("day_2");
var day3 = document.querySelector("day_3");
var day4 = document.querySelector("day_4");
var day5 = document.querySelector("day_5");
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
    if (!state) {
        alert("please specify a state")
    }
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