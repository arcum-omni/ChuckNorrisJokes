/**
 * Represents a single joke about Chuck Norris from icndb.com
 */
var ChuckNorrisJoke = /** @class */ (function () {
    function ChuckNorrisJoke() {
    }
    return ChuckNorrisJoke;
}());
window.onload = function () {
    getYear();
    var jokeBtn = document.getElementById("get-joke");
    jokeBtn.onclick = fetchJoke;
    populateCategories();
};
/**
 * Fetches random ChuckNorris joke
 */
function fetchJoke() {
    // AJAX: JS that talks to a server (XML/?JSON to transport data, JS to display data)
    // https://www.w3schools.com/xml/ajax_intro.asp
    // disabled joke button immediatley following button click
    var jokeBtn = this;
    jokeBtn.disabled = true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = handleJokeResponse;
    // Set URL to send request to:
    request.open("GET", "https://api.icndb.com/jokes/random");
    // Initiate request
    request.send();
    var loaderImg = document.getElementById("loader");
    loaderImg.classList.add("loader");
}
/**
 * function to handle response from server
 */
function handleJokeResponse() {
    var request = this;
    // readyState 4 means request is finished
    // status 200 means "OK", ie success
    if (request.readyState == 4 && request.status == 200) {
        // Hold the JSON response from the server
        var responseData = JSON.parse(request.responseText);
        var myJoke = responseData.value;
        displayJoke(myJoke);
        //alert(myJoke.joke);
        //alert(responseData.value.joke); //This didn't have intellisense when we first wrote the code
        //console.log(responseData);
    }
    else if (request.readyState == 4 && request.status != 200) {
        alert("Please try again later, something went wrong.");
    }
}
function displayJoke(j) {
    var jokeTextParagraph = document.getElementById("joke-text");
    jokeTextParagraph.innerHTML = j.joke;
    var jokeIdParagraph = document.getElementById("joke-id");
    jokeIdParagraph.innerHTML = "ID#: " + j.id.toString();
    var categoryList = document.getElementById("categories");
    categoryList.innerHTML = ""; // Clear categories from any previous joke.
    var allCategories = j.categories;
    allCategories.sort();
    for (var i = 0; i < allCategories.length; i++) {
        var item = document.createElement("li");
        item.innerHTML = allCategories[i];
        // Creating HTML - <li>Nerdy</li>
        // <ul> <li>Nerdy</li></ul>
        categoryList.appendChild(item);
    }
    var catDisplay = document.getElementById("category-display");
    if (allCategories.length == 0) {
        catDisplay.style.display = "none";
    }
    else {
        catDisplay.style.display = "block";
    }
    var loaderImg = document.getElementById("loader");
    loaderImg.classList.remove("loader");
    // Re-enable joke button 0.5s after joke is displayed.
    // so user can get another joke
    setTimeout(function () {
        var jokeBtn = document.getElementById("get-joke");
        jokeBtn.disabled = false;
    }, 500);
}
/**
 * Display categories in a drop down list
 * https://www.w3schools.com/js/js_ajax_intro.asp
 */
function populateCategories() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://api.icndb.com/categories");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { // this = request in this case (this.readyState = request.readyState)
            var categories = JSON.parse(this.responseText).value;
            console.log(categories);
        }
    };
    request.send();
}
/**
 * Displays current year (1999) in the copyright statement
 */
function getYear() {
    var today = new Date();
    var year = today.getFullYear();
    var spanMsg = document.getElementById("span");
    spanMsg.innerHTML = year.toString();
}
