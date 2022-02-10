var searchEl = document.querySelector("#city");
var searchBtn = document.querySelector("#searchBtn");
var citySearch = document.querySelector("#city-search");
var cityCounter = 0;
var cities = []

var searchBtnHandler = function(event) {
    event.preventDefault();

    var city = document.querySelector("input[name='city']").value;

    console.log(city);

    if (!city) {
        alert("Please enter a city")
    }

    createSearchEl();
}

var createSearchEl = function() {

    var btnItemEl = document.createElement("button");
    btnItemEl.className = "btn btn-secondary btn-block";
    btnItemEl.textContent = document.querySelector("input[name='city']").value
    btnItemEl.setAttribute("data-city-id", cityCounter);
    btnItemEl.setAttribute("id", "searchBtn");
    btnItemEl.setAttribute("type", "submit");
    
    // cityDataObj.id = cityCounter;
    // cities.push(cityDataObj)

    citySearch.appendChild(btnItemEl);

    cityCounter++;

    saveSearch();
}

var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

searchBtn.addEventListener("click", searchBtnHandler);