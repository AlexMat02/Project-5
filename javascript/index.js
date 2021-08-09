// This is the code to get data from the backend
// if(typeof(element) != 'undefined' && element != null){

let urlBackend = 'http://127.0.0.1:3000/api/teddies';
let teddybearData = "";

fetch(urlBackend).then(response => response.json()).then(data => {
    console.log(data)
    teddybearData = data
    console.log(teddybearData[0])
    // This loop is for setting up the list page with the correct names and images.
    // Before the loop, it is checking if we are on the correct page
    if (document.getElementsByClassName("container_teddybear--text").length > 0) {
        for (let teddybearTitle = 0; teddybearTitle < 5; teddybearTitle++) {
            document.getElementsByClassName('container_teddybear--text')[teddybearTitle].textContent = teddybearData[teddybearTitle].name;
            document.getElementsByClassName('container_teddybear--img')[teddybearTitle].src = teddybearData[teddybearTitle].imageUrl;
        }
    }
    else {
        console.log("Not list page")
    }
});

// This is the code for the form -> Handle form info

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

if (typeof(submitButton) != 'undefined' && submitButton != null){
    submitButton.addEventListener('click', () =>{
        formData.firstName = firstNameVar.value;
        formData.familyName = familyNameVar.value;
        formData.address = addressVar.value;
        formData.city = cityVar.value;
        formData.email = emailVar.value;
    });
} else {
    console.log("Not cart page")
};


// This is the code for the cart (adding cart items...)

let cartItems = "";

class cartItem{
    constructor(itemName, numberOfItem, itemPrice, itemUrl) {
        this.itemName = itemName;
        this.numberOfItem = numberOfItem;
        this.itemPrice = itemPrice;
        this.itemUrl = itemUrl;
    }
};

const addButtonNorbert = document.getElementById("addButtonNorbert");
let numberProduct = document.getElementById("inputRequired");

// This creates an object, if it already exists it just adds the number
if (typeof(addButtonNorbert) != 'undefined' && addButtonNorbert != null) {
    addButtonNorbert.addEventListener("click", () => {
        if (cartItems === "") {
            cartItems = new cartItem(teddybearData[0].name, Number(numberProduct.value), teddybearData[0].price, teddybearData[0].imageUrl);
        console.log(cartItems)
        } else {
            cartItems.numberOfItem += Number(numberProduct.value);
            console.log(cartItems)
        } 
    });
} else {
    console.log("Not single product page")
};

const removeButtonNorbert = document.getElementById("removeButtonNorbert");

// This removes a number of cartItems.numberOfItem from user input
if (typeof(removeButtonNorbert) != 'undefined' && removeButtonNorbert != null) {
    removeButtonNorbert.addEventListener("click", () => {
        if (!cartItems) {
            console.log("cartItems is not yet created")
        } else if (cartItems.numberOfItem > 0 && numberProduct.value <= cartItems.numberOfItem) {
            cartItems.numberOfItem -= Number(numberProduct.value);
            console.log(cartItems)
        } else if (numberProduct.value >= cartItems.numberOfItem) {
            cartItems.numberOfItem = 0;
            console.log(cartItems)
        }
    })
}