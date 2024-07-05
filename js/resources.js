/* Rishav Chapagain */

let sidebar = document.querySelector(".sidebar");
let sidebar_img = document.getElementById("sidebar_img");
let sidebar_close_img = document.getElementById("sidebar_close_img");
let search_img = document.getElementById("search_img");
let searchInput = document.getElementById("searchinput");
let lbl_items = document.querySelectorAll('.label-items')
let go_button = document.getElementById("go_button")


sidebar_img.addEventListener("click", sidebarOpen);
sidebar_close_img.addEventListener("click", sidebarClose);
search_img.addEventListener("click", searchOpen);
document.addEventListener('click', function(event) {
  if (event.target.closest('.label-items')) {
    labelSearchEvent(event);
  }
});
go_button.addEventListener("click",searchByText)

function sidebarOpen() {
  sidebar.style.visibility = "visible";
  sidebar.style.left = "0px";
  document.addEventListener("click", handleOutsideClick);
}

function sidebarClose() {
  sidebar.style.left = "-350px";
  sidebar.style.visibility = "hidden";
  document.removeEventListener("click", handleOutsideClick);
}

function handleOutsideClick(event) {
  if (!sidebar.contains(event.target) && event.target !== sidebar_img) {
    sidebarClose();
  }
}

function searchOpen() {
  searchInput.focus();
}


async function fetchAndProcessJSON() {
  try {
    const response = await fetch("../resources/resources.json");
    if (!response.ok) {
      throw new Error("Failed to fetch JSON");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching or processing JSON:", error);
    return null;
  }
}


function createResourceElement(resource, key) {
  const name = document.createElement("a");
  name.setAttribute("href", resource.link);
  name.setAttribute("target", "_blank");
  name.classList.add("item");

  const item_div = document.createElement("div");
  item_div.classList.add("item-desc");

  const title = document.createElement("p");
  title.classList.add("name");
  title.textContent = resource.name;
  item_div.appendChild(title);

  const desc = document.createElement("p");
  desc.classList.add("desc");
  desc.textContent = resource.description;
  item_div.appendChild(desc);

  const key_div = document.createElement("div");
  key_div.classList.add("keys");

  const span = document.createElement("span");
  span.classList.add("key");
  span.textContent = key;
  key_div.appendChild(span);

  name.appendChild(item_div);
  name.appendChild(key_div);

  const item_container = document.getElementById("item-container");
  item_container.appendChild(name);
}

async function jsonFunction(whitespace) {
  try {
    const data = await fetchAndProcessJSON();

    if (!data) {
      throw new Error("Failed to fetch or process JSON data");
    }

    console.log("Working.......");

    const titles = Object.keys(data);
    const containers = document.querySelectorAll(".keycontainer");
    if(whitespace !=  "a"){
    containers.forEach(container => {
      titles.forEach(key => {
        const li = document.createElement("li");
        li.classList.add("label-items");
        li.textContent = key;
        container.appendChild(li);
      });
    });
  }
    const maxLength = Math.max(...titles.map(key => data[key].length));

    for (let i = 0; i < maxLength; i++) {
      titles.forEach(key => {
        
        console.log(key)
        if (i < data[key].length) {
          console.log(data[key][i])
          createResourceElement(data[key][i], key);
        }
      });
    }
  } catch (error) {
    console.error("Error in jsonFunction:", error);
  }
}

async function labelSearchEvent(event){
  const data = await fetchAndProcessJSON();

  if (!data) {
    throw new Error("Failed to fetch or process JSON data");
  }

  console.log("Working.t.....");

  const clickedLabel = event.target.innerText;
  console.log(clickedLabel)
  labelSearch(clickedLabel)

}

async function labelSearch(clickedLabel){
  const data = await fetchAndProcessJSON();
  const resources = data[clickedLabel];
  const item_container = document.getElementById("item-container");
  if(clickedLabel != ""){
  item_container.innerHTML=""
  resources.forEach(resource => {
   createResourceElement(resource, clickedLabel);
    
  });
  item_container.style.gridTemplateColumns='repeat(auto-fill, minmax(325px, 1fr))';
}
  sidebarClose();
}


async function searchByText() {
  const search = searchInput.value;
  const item_container = document.getElementById("item-container");
  
  if (!search) {
    item_container.innerHTML = "";
    item_container.style.gridTemplateColumns='repeat(auto-fill, minmax(325px, 1fr))';
    await jsonFunction("a");
    return;
  }
  
  const matchedResources = [];
  const data = await fetchAndProcessJSON();
  const lowerSearch = search.toLowerCase();
  const titles = Object.keys(data);
  
  titles.forEach(key => {
    if (lowerSearch === key) {
      
      labelSearch(lowerSearch);
      return;
    }

    if (lowerSearch === "javascript") {
     
      labelSearch("js");
      return;
    }
    
    data[key].forEach(check => {
      let nameLowercase = check.name.toLowerCase();
      let descLowercase = check.description.toLowerCase();
      
      if (nameLowercase.endsWith('.')) {
        nameLowercase = nameLowercase.slice(0, -1);
      }
      if (descLowercase.endsWith('.')) {
        descLowercase = descLowercase.slice(0, -1);
      }
      
      if (nameLowercase.includes(lowerSearch) || descLowercase.includes(lowerSearch)) {
        let found = false;
        for (let i = 0; i < matchedResources.length; i++) {
          if (matchedResources[i][key] === check) {
            found = true;
            break;
          }
        }
        if (!found) {
          matchedResources.push({ [key]: check });
        }
      }
    });
  });
  
  item_container.innerHTML = "";
  if (matchedResources.length === 0) {
    const noMatchElement = document.createElement('div');
    noMatchElement.classList.add('no-match');
    noMatchElement.textContent = 'No match found';
    item_container.style.gridTemplateColumns="none"
    item_container.appendChild(noMatchElement);
  } else {
    matchedResources.forEach(item => {
      const key = Object.keys(item)[0];
      item_container.style.gridTemplateColumns='repeat(auto-fill, minmax(325px, 1fr))';
      createResourceElement(item[key], key);
    });
  }
}

jsonFunction();
