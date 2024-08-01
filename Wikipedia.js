let searchInputElement = document.getElementById("searchInput");
let loading = document.getElementById("spinner");
let searchResultContainer = document.getElementById("searchResults");

function createAppendSearchResults(results) {
    let {
        title,
        link,
        description
    } = results;

    let resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");
    searchResultContainer.appendChild(resultItemElement);

    let titleElement = document.createElement("a");
    titleElement.href = link;
    titleElement.target = "_blank";
    titleElement.textContent = title;
    titleElement.classList.add("result-title");
    resultItemElement.appendChild(titleElement);

    let titleBreakElement = document.createElement("br");
    resultItemElement.appendChild(titleBreakElement);

    let linkElement = document.createElement("a");
    linkElement.href = link;
    linkElement.target = "_blank";
    linkElement.textContent = link;
    linkElement.classList.add("result-url");
    resultItemElement.appendChild(linkElement);

    let linkBreakElement = document.createElement("br");
    resultItemElement.appendChild(linkBreakElement);

    let descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("link-description");
    resultItemElement.appendChild(descriptionElement);
}

function displayResults(search_results) {
    loading.classList.add("b-none");
    for (let results of search_results) {
        createAppendSearchResults(results);
    }
}

function searchWikipedia(event) {

    if (event.key === "Enter") {
        loading.classList.remove("b-none");
        searchResultContainer.textContent = "";
        let searchValue = searchInputElement.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputElement.addEventListener("keydown", searchWikipedia);