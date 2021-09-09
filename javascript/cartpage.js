let list_CartItems_deserialized = JSON.parse(localStorage.getItem("listOfCartItems"));
console.log(list_CartItems_deserialized);

// This two lines of code allows this javascript file to get the necessary data
let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));
let productDisplay_deserialized = JSON.parse(localStorage.getItem("productDisplayer"));

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
    //This is creating the dropdown menu
    let pDropdownMenu = document.createElement("select");
    pDropdownMenu.setAttribute("id", "productSelect");
    //This is creating the paragraph Price
    let pPrice = document.createElement("p");
    pPrice.textContent = (list_CartItems_deserialized[0].itemPrice / 100) + ".00 $";
    pPrice.setAttribute("class", "product-card-cartpage-info--style");
    //This is for creating the description
    let pDescription = document.createElement("p");
    pDescription.textContent = list_CartItems_deserialized[0].itemDescription;
    pDescription.setAttribute("class", "product-card-cartpage-info--style");
    pDescription.setAttribute("id", "productDescription");
    //This is creating the paragraph Number
    let pProductNumber = document.createElement("p");
    pProductNumber.textContent = "Number of Item : " + list_CartItems_deserialized[0].numberOfItem;
    pProductNumber.setAttribute("class", "product-card-cartpage-info--style");
    //This is to get the elements into the html
    let mainDiv = document.getElementById("divCartList")
    mainDiv.appendChild(newDiv);
    newDiv.appendChild(imgCreator);
    newDiv.appendChild(divText);
    divText.appendChild(pCreator);
    divText.appendChild(pPrice);
    divText.appendChild(pProductNumber);
    //This part is to create the dropdown menu, same code has been used in the singleproduct.js
    divText.appendChild(pDropdownMenu);
    for (let i = teddybearData_deserialized[productDisplay_deserialized].colors.length; i > 0; i--) {
        let newLi = document.createElement("option")
        newLi.textContent = teddybearData_deserialized[productDisplay_deserialized].colors[i - 1];
        newLi.setAttribute("class", "product-card-cartpage-ul")
        productSelect.appendChild(newLi);
    };
    divText.appendChild(pDescription);
    newDiv.appendChild(divAddRemove);
    divAddRemove.appendChild(buttonCreator);
    divAddRemove.appendChild(input);
    divAddRemove.appendChild(removeButton);
};


// Checks if the cart is empty
if (list_CartItems_deserialized[0].numberOfItem > 0) {
    cartItemListCreator();
} else {
    let emptyCartError = document.createElement("p");
    emptyCartError.textContent = "Empty cart"
    emptyCartError.style.textAlign = "center";
    emptyCartError.style.margin = "5px";
    let mainDiv = document.getElementById("divCartList")
    mainDiv.appendChild(emptyCartError);
    console.log("empty cart")
}

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

//This is the code for the error message if the form is not filled
let formHTML = document.getElementById("form");
let formErrorMsg = document.createElement("p");
formErrorMsg.innerText = "The form hasn't been filled correctly";
formErrorMsg.style.textAlign = "center";

// When the user press the 'submitButton' the form that the user filled will be send to the backend

let formCounter = 0;

submitButton.addEventListener('click', () =>{
    if ( firstNameVar.value.length > 0 || familyNameVar.value.length > 0 || addressVar.value.length > 0 || cityVar.value.length > 0 || emailVar.value.length > 0) {
        formData.firstName = firstNameVar.value;
        formData.familyName = familyNameVar.value;
        formData.address = addressVar.value;
        formData.city = cityVar.value;
        formData.email = emailVar.value;
        if (formCounter === 1) {
            formHTML.removeChild(formErrorMsg);
            formCounter -= 1;
            console.log(formCounter)
        }
    } else {
        console.log(formCounter)
        if (formCounter !== 1) {
            formHTML.appendChild(formErrorMsg);
            formCounter += 1;
        }
    }
});