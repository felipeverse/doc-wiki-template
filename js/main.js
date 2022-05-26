let modules = null;

// Load Wiki config
fetch('./config.json')
    .then(response => response.json())
    .then(data => setConfig(data));

// Load modules from json
fetch('./data.json')
    .then(response => response.json())
    .then(data => menuRender(data));

function LoadMarkdown(path) {
    original = document.getElementById('markdown-element');
    original.src = `${path}`;
}

function setConfig(data) {
    document.title = data.wiki_title;
    document.getElementById("wiki_title").textContent = data.wiki_title;
    document.getElementById("wiki_description").textContent = data.wiki_description;
}

function menuRender (data) {
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++)
        {
            console.log(data[i]);
            addMenuItem(data[i]);
        }
    } else {
        document.getElementById('content-container').remove();
        newElement = document.createElement("h3");
        newElement.setAttribute("class", "text-center m-4");

        newElement.appendChild(document.createTextNode("Nothing to see here yet."));
        console.log(newElement);

        document.getElementById("main-container").appendChild(newElement);

    }
   
}

function addMenuItem(data) {
    
    
    // Li
    newLiElement = document.createElement("li");
    newLiElement.classList.add("mb-1");

    // Button
    newButtonElement = document.createElement("button");
    newButtonElement.setAttribute("class", "btn btn-toggle align-items-center rounded");
    newButtonElement.setAttribute("data-bs-toggle", "collapse");
    newButtonElement.setAttribute("data-bs-target", "#" + data.name.replace(/[^A-Z0-9]/ig, "_") + "-collapse");
    newButtonElement.setAttribute("aria-expanded", "true");
    newButtonElement.appendChild(document.createTextNode(data.name));

    newManualsListDiv = addSubmenuElement(data);
    newManualsList = addSubmenuList();

    for (let i = 0; i < data.manuals.length; i++)
    {
        newManualsList.appendChild(addSubmenuManualsItem(data.path, data.manuals[i]));
        console.log(data.manuals[i]);
    }

    newManualsListDiv.appendChild(newManualsList);

    newLiElement.appendChild(newButtonElement);
    newLiElement.appendChild(newManualsListDiv);

    document.getElementById("modulesList").appendChild(newLiElement);
}

function addSubmenuElement(data) {
    newManualsListDiv = document.createElement("div");
    newManualsListDiv.setAttribute("class", "collapse show");
    newManualsListDiv.setAttribute("id", data.name.replace(/[^A-Z0-9]/ig, "_") + "-collapse");

    return newManualsListDiv;
}

function addSubmenuList() {
    newManualsList = document.createElement("ul");
    newManualsList.setAttribute("class", "btn-toggle-nav list-unstyled fw-normal pb-1 small");

    return newManualsList;
}

function addSubmenuManualsItem(module_path, item) {
    newManualsListItem = document.createElement("li");

    newManualsListItemLink = document.createElement("a");
    newManualsListItemLink.setAttribute("href", "#");
    newManualsListItemLink.setAttribute("class", "link-dark rounded");
    newManualsListItemLink.setAttribute("onclick", "LoadMarkdown('" + module_path + item.filename + "')" );
    newManualsListItemLink.appendChild(document.createTextNode(`${item.name}`));

    newManualsListItem.appendChild(newManualsListItemLink);

    return newManualsListItem;
}
