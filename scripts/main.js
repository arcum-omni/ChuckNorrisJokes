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
};
/**
 * Fetches random ChuckNorris joke
 */
function fetchJoke() {
    // AJAX: JS that talks to a server (XML/?JSON to transport data, JS to display data)
    // https://www.w3schools.com/xml/ajax_intro.asp
    var request = new XMLHttpRequest();
    request.onreadystatechange = handleJokeResponse;
    // Set URL to send request to:
    request.open("GET", "https://api.icndb.com/jokes/random");
    // Initiate request
    request.send();
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
