let urlBackend = '​http://localhost:3000/api/teddies';
let teddybearData = "";

let listOfCartItems = JSON.parse(localStorage.getItem("listOfCartItems"));

// Get Data from the backend
fetch(urlBackend)
    .then(response => response.json())
    .then(data => {  teddybearData = data
    let teddybearData_serialized = JSON.stringify(teddybearData);
    localStorage.setItem("backendData", teddybearData_serialized);
}).catch((error) => {
    console.log("Error: " + error);
});

let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"))
let productDisplay = 0;

const mainContainerDiv = document.getElementsByClassName("main_container");
// Function to create cards
function listCreator(currentIndex) {
    // Creates the main div
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "container_teddybear");
    // Creates the header
    let header3 = document.createElement("h3");
    header3.setAttribute("class", "container_teddybear--text")
    header3.textContent = teddybearData_deserialized[currentIndex].name;
    // Creates the second div
    let imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "container_teddybear_content")
    imageDiv.style.display = "flex";
    imageDiv.style.justifyContent = "end";
    // Creates the img
    let imageCreator = document.createElement("img");
    imageCreator.setAttribute("class", "container_teddybear--img");
    imageCreator.src = teddybearData_deserialized[currentIndex].imageUrl;
    // Creates the link
    let linkCreator = document.createElement("a");
    linkCreator.href = "./html/singleproduct1.html";
    linkCreator.setAttribute("class", "container_teddybear--buycue");
    linkCreator.setAttribute("id", "product" + (currentIndex + 1));
    // Creates the text
    let textCreator = document.createElement("p");
    textCreator.textContent = "Buy Here!";
    // Creates the card
    mainContainerDiv[0].appendChild(mainDiv);
    mainDiv.appendChild(header3);
    mainDiv.appendChild(imageDiv);
    imageDiv.appendChild(imageCreator);
    imageDiv.appendChild(linkCreator);
    linkCreator.appendChild(textCreator);
};

// This is to create the listpage dynamically
for (i = 1; i <= teddybearData_deserialized.length; i++) {
    listCreator(i - 1);
    let currentTeddybear = document.getElementById('product' + i);
    {
        // J is for the index in the array, which is why it's i - 1 since i starts at 0
        let j = i - 1;
        currentTeddybear.addEventListener("click", () => {
            productDisplay = j;
            let productDisplay_serialized = JSON.stringify(productDisplay);
            localStorage.setItem("productDisplayer", productDisplay_serialized);
        });
    }
};