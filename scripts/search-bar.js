import suggestionList from "../data/suggestions.json" assert { type: "json" };

let searchResults;
const origin = document.getElementById("searchbar-origin");
const destination = document.getElementById("searchbar-destination");
const originSuggestions = document.getElementById("origin-suggestions");
const destinationSuggestions = document.getElementById("destination-suggestions");


origin.onkeyup = (e) => {
    const userInput = e.target.value;
    console.log(originSuggestions);
    originSuggestions.innerHTML = '';

    if (userInput !== "") {

        searchResults = suggestionList.filter((suggestion) =>
            suggestion.id.toLowerCase().includes(userInput.toLowerCase()) ||
            suggestion.aliases && suggestion.aliases.filter((alias) =>
                alias.toLowerCase().includes(userInput.toLowerCase())).length > 0);

        let count = 0;
        for (let result of searchResults) {
            if (++count > 5) {
                break;
            }
            const suggestionItem = document.createElement("li");
            suggestionItem.innerHTML = result.id;
            suggestionItem.setAttribute("class",  "suggestion-item");
            originSuggestions.appendChild(suggestionItem);
        }
    
    }
}; 

destination.onkeyup = (e) => {
    const userInput = e.target.value;
    console.log(destinationSuggestions);
    destinationSuggestions.innerHTML = '';

    if (userInput !== "") {

        searchResults = suggestionList.filter((suggestion) =>
            suggestion.id.toLowerCase().includes(userInput.toLowerCase()) ||
            suggestion.aliases && suggestion.aliases.filter((alias) =>
                alias.toLowerCase().includes(userInput.toLowerCase())).length > 0);

        let count = 0;
        for (let result of searchResults) {
            if (++count > 5) {
                break;
            }
            const suggestionItem = document.createElement("li");
            suggestionItem.innerHTML = result.id;
            suggestionItem.setAttribute("class",  "suggestion-item");
            destinationSuggestions.appendChild(suggestionItem);
        }
    
    }
}; 
