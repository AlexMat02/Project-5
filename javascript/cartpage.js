let listOfCartItems = JSON.parse(localStorage.getItem("listOfCartItems"));
console.log(listOfCartItems);

// This two lines of code allows this javascript file to get the necessary data
let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));
let productDisplay_deserialized = JSON.parse(localStorage.getItem("productDisplayer"));
let oddCounterRemoveButton = 1;
let evenCounterAddButton = 0;
let buttonCounterArray = [];
let inputCounterArray = [];

// This function creates a cart card
function cartItemListCreator (parameter) {
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
    imgCreator.src = listOfCartItems[parameter].imageUrl;
    imgCreator.setAttribute("class", "product-card-cartpage--img")
    //This is to create the input
    let input = document.createElement("input");
    input.setAttribute("id", 100 + parameter);
    inputCounterArray.push(100 + parameter);
    //This is for creating the addbutton
    let buttonCreator = document.createElement("button");
    buttonCreator.setAttribute("class", "product-card-cartpage-number--style btn")
    buttonCreator.setAttribute("id", evenCounterAddButton);
    buttonCounterArray.push(evenCounterAddButton);
    // When a buttonCreator is pressed, it gives its id so we know which button was pressed
    buttonCreator.addEventListener("click", () =>  {
        let currentIdButton = event.target.id;
        console.log(currentIdButton);
        let currentButton = document.getElementById(currentIdButton);
        console.log(currentButton);
        // This is to get the index for listOfItem
        for (n = 0; n < buttonCounterArray.length; n++){
            if (currentIdButton == buttonCounterArray[n]) {
                let quantityArray = document.getElementsByClassName("quantity");
                let currentUserInput = (inputCounterArray[n / 2] - 100);
                let userInput = document.getElementById(currentUserInput + 100);
                // Check is input is a number
                if (!isNaN(parseFloat(userInput.value))) {
                    userInput.style.border = "";
                    userInput.style.borderRadius = "";
                    userInput.style.boxShadow = "";
                    listOfCartItems[n / 2].numberOfItem += parseFloat(userInput.value);
                    localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                    quantityArray[n / 2].textContent = "Quantity : " + listOfCartItems[n / 2].numberOfItem;
                    // totalPrice = 0 is used to reset the totalPrice so it doesn't add the previous totalPrice to the new one
                    totalPrice = 0;
                    // This is the loop to calculate the totalPrice and update the html
                    for (let x = 0; x < listOfCartItems.length; x++) {
                        totalPrice = totalPrice + ((listOfCartItems[x].price * listOfCartItems[x].numberOfItem) / 100);
                        totalCartPrice.textContent = "Total Price : " + totalPrice + ".00 $";
                    };
                } else {
                    console.log(parseFloat(userInput.value));
                    console.log("not a number");
                    userInput.style.border = "red 2px solid";
                    userInput.style.borderRadius = "20px";
                    userInput.style.boxShadow = "0px 4px 3px black";
                };
            };
        };
    });
    evenCounterAddButton += 2;
    buttonCreator.textContent = "Add";
    //This is to create the remove button
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "product-card-cartpage-number--style btn")
    removeButton.setAttribute("id", oddCounterRemoveButton);
    buttonCounterArray.push(oddCounterRemoveButton);
    removeButton.addEventListener("click", () => {
        let currentIdButton = event.target.id;
        console.log(currentIdButton);
        let currentButton = document.getElementById(currentIdButton);
        console.log(currentButton);
        for (n = 0; n < buttonCounterArray.length; n++){
            if (currentIdButton == buttonCounterArray[n]){
                console.log(buttonCounterArray[n])
                let quantityArray = document.getElementsByClassName("quantity");
                let userInput = document.getElementById(((n + 1) / 2) - 1 + 100);
                // The reason for (((n + 1) / 2) - 1) is because removeButton ids are odd, so n / 2 would 
                // give a result like 0.5 or 1.5; To make the first result even we need to add 1 to n so (n + 1) / 2
                // and to make the result of this operation odd so that i gives the correct index we remove 1
                // This gives the correct index to modify;
                // Check is input is a number
                if (!isNaN(parseFloat(userInput.value))) {
                    userInput.style.border = "";
                    userInput.style.borderRadius = "";
                    userInput.style.boxShadow = "";
                    if ( (listOfCartItems[((n + 1) / 2) - 1].numberOfItem -= parseFloat(userInput.value)) <= 0 ) {
                        console.log(listOfCartItems[((n + 1) / 2) - 1]);
                        listOfCartItems.splice(((n + 1) / 2) - 1, 1);
                        localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                        window.location.reload()
                    } else {
                        console.log("Correct Number " + (listOfCartItems[((n + 1) / 2) - 1].numberOfItem));
                        quantityArray[((n + 1) / 2) - 1].textContent = "Quantity : " + listOfCartItems[((n + 1) / 2) - 1].numberOfItem;
                        localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                        // totalPrice = 0 is used to reset the totalPrice so it doesn't add the previous totalPrice to the new one
                        totalPrice = 0;
                        // This is the loop to calculate the totalPrice and update the html
                        for (let x = 0; x < listOfCartItems.length; x++) {
                            totalPrice = totalPrice + ((listOfCartItems[x].price * listOfCartItems[x].numberOfItem) / 100);
                            totalCartPrice.textContent = "Total Price : " + totalPrice + ".00 $";
                        };
                        console.log(listOfCartItems[((n + 1) / 2) - 1]);
                    };
                } else {
                    console.log(parseFloat(userInput.value));
                    console.log("not a number");
                    userInput.style.border = "red 2px solid";
                    userInput.style.borderRadius = "20px";
                    userInput.style.boxShadow = "0px 4px 3px black";
                };
            };
        };
    });
    oddCounterRemoveButton += 2;
    removeButton.textContent = "Remove";
    //This is the creating the paragraph Product Name
    let pCreator = document.createElement("p");
    pCreator.textContent = listOfCartItems[parameter].name;
    pCreator.setAttribute("class", "product-card-cartpage-info--style");
    //This is creating the dropdown menu
    let pDropdownMenu = document.createElement("select");
    pDropdownMenu.setAttribute("id", "productSelect");
    //This is creating the paragraph Price
    let pPrice = document.createElement("p");
    pPrice.textContent = (listOfCartItems[parameter].price / 100) + ".00 $";
    pPrice.setAttribute("class", "product-card-cartpage-info--style");
    //This is for creating the description
    let pDescription = document.createElement("p");
    pDescription.textContent = listOfCartItems[parameter].description;
    pDescription.setAttribute("class", "product-card-cartpage-info--style");
    pDescription.setAttribute("id", "productDescription");
    //This is creating the paragraph Number
    let pProductNumber = document.createElement("p");
    pProductNumber.textContent = "Quantity : " + listOfCartItems[parameter].numberOfItem;
    pProductNumber.setAttribute("class", "product-card-cartpage-info--style quantity");
    //This is to get the elements into the html
    let mainDiv = document.getElementById("divCartList")
    mainDiv.appendChild(newDiv);
    newDiv.appendChild(imgCreator);
    newDiv.appendChild(divText);
    divText.appendChild(pCreator);
    divText.appendChild(pPrice);
    divText.appendChild(pProductNumber);
    // Define var for creating the dropdown menu
    let stockName = listOfCartItems[parameter].name;
    let colorHolder;
    let waiter = 0;
    // Create the dropdown menu
    for (let w = (teddybearData_deserialized.length - 1); w >= 0; w--) {
        if (stockName == teddybearData_deserialized[w].name) {
            colorHolder = teddybearData_deserialized[w].colors;
            divText.appendChild(pDropdownMenu);
            // Make the user's color go first into the array so that it is correctly display on the html
            for (let i = colorHolder.length; i != 0; i--) {
                if (colorHolder[i - 1] == listOfCartItems[parameter].itemColor) {
                    colorHolder.splice(i - 1, 1);
                    colorHolder.push(listOfCartItems[parameter].itemColor);
                    waiter += 1;
                };
                // waiter is used to push the user's color first. It is used for order
                if (waiter >= 1) {
                    for (let i = colorHolder.length; i != 0; i--) {
                        let newLi = document.createElement("option");
                        newLi.textContent = colorHolder[i - 1];
                        newLi.setAttribute("class", "product-card-cartpage-ul");
                        pDropdownMenu.appendChild(newLi);
                    };
                    waiter = 0;
                };
            };
            break;
        } else {
            console.log("name not found");
        }
    };
    divText.appendChild(pDescription);
    newDiv.appendChild(divAddRemove);
    divAddRemove.appendChild(buttonCreator);
    divAddRemove.appendChild(input);
    divAddRemove.appendChild(removeButton);
};

let totalPrice = 0;
let divCartList = document.getElementById("divCartList");
let totalCartPrice = document.createElement("p");
// Checks if the cart is empty
console.log("Cart Check")
if (listOfCartItems == null || listOfCartItems.length == 0) {
    console.log("empty cart")
    let emptyCartError = document.createElement("p");
    emptyCartError.textContent = "Empty cart"
    emptyCartError.style.textAlign = "center";
    emptyCartError.style.margin = "5px";
    let mainDiv = document.getElementById("divCartList")
    mainDiv.appendChild(emptyCartError);
} else {
    console.log("cart verify")
    for (let x = 0; x < listOfCartItems.length; x++) {
        console.log("not empty")
        cartItemListCreator(x);
        totalPrice = totalPrice + ((listOfCartItems[x].price * listOfCartItems[x].numberOfItem) / 100);
        console.log(totalPrice);
        totalCartPrice.textContent = "Total Price : " + totalPrice + ".00 $";
    };
    console.log(listOfCartItems);
    console.log(listOfCartItems.length);
    console.log("seen")
    totalCartPrice.style.textAlign = "center";
    totalCartPrice.style.margin = "5px";
    divCartList.appendChild(totalCartPrice);
}

let formData = {
    firstName: "",
    lastName: "",
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

let formCounter = 0;
console.log(totalPrice);
// When the user press the 'submitButton' the form that the user filled will be send to the backend
submitButton.addEventListener('click', () =>{
    if ( firstNameVar.value.length > 0 || familyNameVar.value.length > 0 || addressVar.value.length > 0 || cityVar.value.length > 0 || emailVar.value.length > 0) {
        formData.firstName = firstNameVar.value;
        formData.lastName = familyNameVar.value;
        formData.address = addressVar.value;
        formData.city = cityVar.value;
        formData.email = emailVar.value;
        localStorage.setItem("formData", JSON.stringify(formData));
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        console.log("formData sent to localStorage");
        window.location = "orderconfirmation.html"
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