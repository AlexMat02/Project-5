// This is the code for the form -> Handle form info
let list_CartItems_deserialized = JSON.parse(localStorage.getItem("listOfCartItems"));
console.log(list_CartItems_deserialized);

// This function creates a cart card
function cartItemListCreator () {
    //This is for creating a new div
    let newDiv = document.createElement('div');
    newDiv.setAttribute("class", "product-card-cartpage");
    //This is to create  divText
    let divText = document.createElement('div');
    divText.setAttribute("class", "product-card-cartpage-info")
    //This is to create divAddRemove
    let divAddRemove = document.createElement('div');
    divAddRemove.setAttribute("class", "product-card-cartpage-number")
    //This is for creating the img
    let imgCreator = document.createElement("img");
    imgCreator.src = list_CartItems_deserialized[0].itemUrl;
    imgCreator.setAttribute("class", "product-card-cartpage--img")
    //This is for creating the addbutton
    let buttonCreator = document.createElement("button");
    buttonCreator.setAttribute("class", "product-card-cartpage-number--style btn")
    buttonCreator.textContent = "Add";
    //This is to create the remove button
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "product-card-cartpage-number--style btn")
    removeButton.textContent = "Remove";
    //This is to create the input
    let input = document.createElement("input");
    //This is the creating the paragraph Product Name
    let pCreator = document.createElement("p");
    pCreator.textContent = list_CartItems_deserialized[0].itemName;
    pCreator.setAttribute("class", "product-card-cartpage-info--style");
    //This is creating the paragraph Price
    let pPrice = document.createElement("p");
    pPrice.textContent = list_CartItems_deserialized[0].itemPrice + "€";
    pPrice.setAttribute("class", "product-card-cartpage-info--style");
    //This is creating the paragraph Number
    let pProductNumber = document.createElement("p");
    pProductNumber.textContent = list_CartItems_deserialized[0].numberOfItem;
    pProductNumber.setAttribute("class", "product-card-cartpage-info--style");
    //This is to get the elements into the html
    let mainDiv = document.getElementById("jambon")
    mainDiv.appendChild(newDiv);
    newDiv.appendChild(imgCreator);
    newDiv.appendChild(divText);
    divText.appendChild(pCreator);
    divText.appendChild(pPrice);
    divText.appendChild(pProductNumber);
    newDiv.appendChild(divAddRemove);
    divAddRemove.appendChild(buttonCreator);
    divAddRemove.appendChild(input);
    divAddRemove.appendChild(removeButton);
};

cartItemListCreator();

let formData = {
    firstName: "",
    familyName: "",
    address: "",
    city: "",
    email: ""
};

let firstNameVar = document.getElementById("firstName");
let familyNameVar = document.getElementById("familyName");
let addressVar = document.getElementById("address");
let cityVar = document.getElementById("city");
let emailVar = document.getElementById("email");

const submitButton = document.getElementById("submit");

// When the user press the 'submitButton' the form that the user filled will be send to the backend

submitButton.addEventListener('click', () =>{
    formData.firstName = firstNameVar.value;
    formData.familyName = familyNameVar.value;
    formData.address = addressVar.value;
    formData.city = cityVar.value;
    formData.email = emailVar.value;
});