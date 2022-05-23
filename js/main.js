let modules = null;

function LoadMarkdown(path) {
    original = document.getElementById('markdown-element');
    original.src = `./modules/SM/${path}`;
}

fetch('data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        createMenu(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function createMenu (data) {
    console.log(data);
}

function addElementToModulesList() {
    // Li
    newLiElement = document.createElement("li");
    newLiElement.classList.add("mb-1");

    // Button
    newButtonElement = document.createElement("button");
    newButtonElement.setAttribute("class", "btn btn-toggle align-items-center rounded");
    newButtonElement.setAttribute("data-bs-toggle", "collapse");
    newButtonElement.setAttribute("data-bs-target", "#teste-collapse");
    newButtonElement.setAttribute("aria-expanded", "true");
    newButtonElement.appendChild(document.createTextNode("Teste"));

    // Manuals List Div
    newManualsListDiv = document.createElement("div");
    newManualsListDiv.setAttribute("class", "collapse show");
    newManualsListDiv.setAttribute("id", "teste-collapse");

    // Manuals List
    newManualsList = document.createElement("ul");
    newManualsList.setAttribute("class", "btn-toggle-nav list-unstyled fw-normal pb-1 small");

    newManualsListItem = document.createElement("li");

    newManualsListItemLink = document.createElement("a");
    newManualsListItemLink.setAttribute("href", "#");
    newManualsListItemLink.setAttribute("class", "link-dark rounded");
    newManualsListItemLink.setAttribute("onclick", "LoadMarkdown('ManualSm-Exemplo02.md')");
    newManualsListItemLink.appendChild(document.createTextNode("Manual Teste"));

    newManualsListItem.appendChild(newManualsListItemLink);
    newManualsList.appendChild(newManualsListItem);
    newManualsListDiv.appendChild(newManualsList);
    newLiElement.appendChild(newButtonElement);
    newLiElement.appendChild(newManualsListDiv);
    document.getElementById("modulesList").appendChild(newLiElement);
    
}

