var searchEl = document.querySelector("#city");
var searchBtn = document.querySelector("#searchBtn");
var citySearch = document.querySelector("#city-search");
var cityCounter = 0;
var cities = []

var searchBtnHandler = function(event) {
    event.preventDefault();

    var city = document.querySelector("input[name='city']").value;
    console.log(cities);
    
    if (!city) {
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