/**
 * Represents a single joke about Chuck Norris from icndb.com
 */
class ChuckNorrisJoke{
    /**
     * The unique ID of the joke.
     */
    id:Number;

    /**
     * The text of the joke.
     */
    joke:string;

    /**
     * The category of the joke; uncategorized, nerdy, & explicit
     */
    categories:string[];
}

window.onload = function(){
    getYear();

    let jokeBtn = document.getElementById("get-joke");
    jokeBtn.onclick = fetchJoke;

    populateCategories();
}

/**
 * Fetches random ChuckNorris joke
 */
function fetchJoke(){
    // AJAX: JS that talks to a server (XML/?JSON to transport data, JS to display data)
    // https://www.w3schools.com/xml/ajax_intro.asp

    // disabled joke button immediatley following button click
    let jokeBtn = <HTMLButtonElement>this;
    jokeBtn.disabled = true;

    let request = new XMLHttpRequest();
    request.onreadystatechange = handleJokeResponse;

    let url = "https://api.icndb.com/jokes/random"
    if(isCategorySelected()){
        url += "?limitTo=[" + getSelectedCategory() + "]";

        // using a variable for the function call can help with debugging
        // let category = getSelectedCategory();
        // url += "?limitTo=[" + category + "]";
    }

    // Set URL to send request to:
    request.open("GET", url);

    // Initiate request
    request.send();

    let loaderImg = document.getElementById("loader");
    loaderImg.classList.add("loader");


}

/**
 * 
 */
function isCategorySelected():boolean{
    let list = <HTMLSelectElement>document.getElementById("cat-list");
    if(list.selectedIndex == 0){
        return false;
    }
    return true;
}

/**
 * Return the selected category
 */
function getSelectedCategory():string{
    let list = <HTMLSelectElement>document.getElementById("cat-list");
    let index = list.selectedIndex;
    let cat = list.options[index].text;

    return cat;
}

/**
 * function to handle response from server
 */
function handleJokeResponse(){
    let request = <XMLHttpRequest>this;

    // readyState 4 means request is finished
    // status 200 means "OK", ie success
    if(request.readyState == 4 && request.status == 200){
        // Hold the JSON response from the server
        let responseData = JSON.parse(request.responseText);
        let myJoke = <ChuckNorrisJoke>responseData.value;
        displayJoke(myJoke);
        //alert(myJoke.joke);
        //alert(responseData.value.joke); //This didn't have intellisense when we first wrote the code
        //console.log(responseData);
    }
    else if(request.readyState == 4 && request.status != 200){
        alert("Please try again later, something went wrong.");
    }
}

function displayJoke(j:ChuckNorrisJoke):void{
    let jokeTextParagraph = document.getElementById("joke-text");
    jokeTextParagraph.innerHTML = j.joke;

    let jokeIdParagraph = document.getElementById("joke-id");
    jokeIdParagraph.innerHTML = "ID#: " + j.id.toString();

    let categoryList = document.getElementById("categories");
    categoryList.innerHTML = ""; // Clear categories from any previous joke.

    let allCategories = j.categories;
    allCategories.sort();
    for(let i=0; i<allCategories.length; i++){
        let item = document.createElement("li");
        item.innerHTML = allCategories[i];
        // Creating HTML - <li>Nerdy</li>

        // <ul> <li>Nerdy</li></ul>
        categoryList.appendChild(item);
    }

    let catDisplay = document.getElementById("category-display");
    if(allCategories.length == 0){
        catDisplay.style.display = "none";
    }
    else{
        catDisplay.style.display = "block";
    }

    let loaderImg = document.getElementById("loader");
    loaderImg.classList.remove("loader");

    // Re-enable joke button 0.5s after joke is displayed.
    // so user can get another joke
    setTimeout(function(){
        let jokeBtn = <HTMLButtonElement>document.getElementById("get-joke");
        jokeBtn.disabled = false;
    }, 500);
}

/**
 * Display categories in a drop down list
 * https://www.w3schools.com/js/js_ajax_intro.asp
 */
function populateCategories(){
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.icndb.com/categories");

    request.onreadystatechange = function(){
        // Request has finished (4) successfully (200)
        if(this.readyState == 4 && this.status == 200){ // this = request in this case (this.readyState = request.readyState)
            let categories:string[] = JSON.parse(this.responseText).value;
            console.log(categories);

            populateCatDropDown(categories);
        }
    }
    request.send();
}

/**
 * 
 * @param categories 
 */
function populateCatDropDown(categories:string[]):void{
    let list = document.getElementById("cat-list");
    for(let i = 0; i<categories.length; i++){
        let catOptions = document.createElement("option")
        catOptions.text = categories[i];
        list.appendChild(catOptions); // add option to the select
    }
}

/**
 * Displays current year (1999) in the copyright statement
 */
function getYear(){
    var today = new Date();
    var year = today.getFullYear();
    let spanMsg:HTMLElement = <HTMLElement>document.getElementById("span");
    spanMsg.innerHTML = year.toString();
}

