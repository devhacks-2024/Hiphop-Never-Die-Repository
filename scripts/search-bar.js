// Prototype search bar
// TODO: Revise later with updated HTML code/search suggestions data

import suggestionList from "../data/suggestions.json" assert { type: "json" };

const searchBar = document.querySelector("#search-bar");

const searchSuggestions = document.querySelector("#search-suggestions");

let searchResults;

searchBar.onkeyup = (e) => {
    const userInput = e.target.value;

    searchSuggestions.innerHTML = "";

    if (userInput !== "") {

        searchResults = suggestionList.filter((suggestion) =>
            suggestion.id.toLowerCase().startsWith(userInput.toLowerCase()) ||
            suggestion.aliases && suggestion.aliases.filter((alias) =>
                alias.toLowerCase().startsWith(userInput.toLowerCase())).length > 0);

        for (let result of searchResults) {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = result.id;

            searchSuggestions.appendChild(suggestionItem);
        }
    
    }
}; 
