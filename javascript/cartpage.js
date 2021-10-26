// Allow this javascript file to get the necessary localStorage data.
let listOfCartItems = JSON.parse(localStorage.getItem("listOfCartItems"));
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
        // This is to get the index for listOfCartItems
        for (n = 0; n < buttonCounterArray.length; n++){
            if (currentIdButton == buttonCounterArray[n]) {
                let quantityArray = document.getElementsByClassName("quantity");
                // currentUserInput is used to get the correct input id in the array so that userInput can get the correct id
                // currentUserInput has an (n/2) to get the correct index since inputCounterArray will always be twice as
                // small as buttonCounterArray. Since n is the correct index for buttonCounterArray, it needs to be divided
                // by 2 to get the correct index for other array which are twice as small.
                let currentUserInput = (inputCounterArray[n / 2] - 100);
                // userInput is +100 because the id's of the input are 100 + parameter (which is an index)
                let userInput = document.getElementById(currentUserInput + 100);
                // Check is input is a number, since it need to be a number because
                // Quantity is a number
                if (!isNaN(parseFloat(userInput.value))) {
                    // It resets the style of the input in case the input style has been previously changed
                    userInput.style.border = "";
                    userInput.style.borderRadius = "";
                    userInput.style.boxShadow = "";
                    // change the value of quantity of the item and updates it.
                    // (n/2) is used once again, since listOfCartItems will also always be twice as small as buttonCounterArray
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
                    // Input wasn't a number, so it changes the input style to indicate the
                    // user that the input is wrong, and the modification didn't work
                    userInput.style.border = "red 2px solid";
                    userInput.style.borderRadius = "20px";
                    userInput.style.boxShadow = "0px 4px 3px black";
                };
            };
        };
    });
    // This is to set the id of the buttonCreator to always be even which helps to find them back.
    evenCounterAddButton += 2;
    buttonCreator.textContent = "Add";
    //This is to create the remove button
    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "product-card-cartpage-number--style btn")
    removeButton.setAttribute("id", oddCounterRemoveButton);
    buttonCounterArray.push(oddCounterRemoveButton);
    removeButton.addEventListener("click", () => {
        let currentIdButton = event.target.id;
        // This is to get the index for listOfCartItems
        for (n = 0; n < buttonCounterArray.length; n++){
            if (currentIdButton == buttonCounterArray[n]){
                let quantityArray = document.getElementsByClassName("quantity");
                let userInput = document.getElementById(((n + 1) / 2) - 1 + 100);
                // The reason for (((n + 1) / 2) - 1) is because removeButton ids are odd, so n / 2 would 
                // give a result like 0.5 or 1.5; To make the first result even we need to add 1 to n so (n + 1) / 2
                // and to make the result of this operation odd so that i gives the correct index we remove 1
                // This gives the correct index to modify;
                // Check is input is a number
                if (!isNaN(parseFloat(userInput.value))) {
                    // It resets the style of the input in case the input style has been previously changed
                    userInput.style.border = "";
                    userInput.style.borderRadius = "";
                    userInput.style.boxShadow = "";
                    // If statement to check if the quantity of the object in listOfCartItems would reach 0 or
                    // a value lower than 0. If it's the case, it splices the object from the array listOfCartItems
                    // set the new listOfCartItems value in the local storage and reload the page
                    // to make the html display correctly
                    if ( (listOfCartItems[((n + 1) / 2) - 1].numberOfItem -= parseFloat(userInput.value)) <= 0 ) {
                        listOfCartItems.splice(((n + 1) / 2) - 1, 1);
                        localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                        window.location.reload()
                    } else {
                        // The quantity of the object in listOfCartItems did not reach a value of 0 or lower, so it
                        // only needs to update the value and not to delete it.
                        quantityArray[((n + 1) / 2) - 1].textContent = "Quantity : " + listOfCartItems[((n + 1) / 2) - 1].numberOfItem;
                        localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                        // totalPrice = 0 is used to reset the totalPrice so it doesn't add the previous totalPrice to the new one
                        totalPrice = 0;
                        // This is the loop to calculate the totalPrice and update the html
                        for (let x = 0; x < listOfCartItems.length; x++) {
                            totalPrice = totalPrice + ((listOfCartItems[x].price * listOfCartItems[x].numberOfItem) / 100);
                            totalCartPrice.textContent = "Total Price : " + totalPrice + ".00 $";
                        };
                    };
                } else {
                    // Input wasn't a number, so it changes the input style to indicate the
                    // user that the input is wrong, and the modification didn't work
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
    // stockName is used to have the correct teddybear name
    let stockName = listOfCartItems[parameter].name;
    let colorHolder;
    let waiter = 0;
    // Create the dropdown menu
    // for loop to check every object in teddybearData_deserialized
    for (let w = (teddybearData_deserialized.length - 1); w >= 0; w--) {
        // if statement to find the correct teddybear name
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
        }
    };
    divText.appendChild(pDescription);
    newDiv.appendChild(divAddRemove);
    divAddRemove.appendChild(buttonCreator);
    divAddRemove.appendChild(input);
    divAddRemove.appendChild(removeButton);
};

let totalPrice = 0;
const divCartList = document.getElementById("divCartList");
let totalCartPrice = document.createElement("p");
// Checks if listOfCartItems is empty
if (listOfCartItems == null || listOfCartItems.length == 0) {
    let emptyCartError = document.createElement("p");
    emptyCartError.textContent = "Empty cart"
    emptyCartError.style.textAlign = "center";
    emptyCartError.style.margin = "5px";
    let mainDiv = document.getElementById("divCartList")
    mainDiv.appendChild(emptyCartError);
} else {
    for (let x = 0; x < listOfCartItems.length; x++) {
        // If listOfCartItems is not empty, it will create a card of each item in listOfCartItems.
        // Then, it will calculate the total price and update the html.
        // The parameter x is for the index of the item in listOfCartItems
        cartItemListCreator(x);
        totalPrice = totalPrice + ((listOfCartItems[x].price * listOfCartItems[x].numberOfItem) / 100);
        totalCartPrice.textContent = "Total Price : " + totalPrice + ".00 $";
    };
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


// This is to get the inputs for the form
const firstNameVar = document.getElementById("firstName");
const familyNameVar = document.getElementById("familyName");
const addressVar = document.getElementById("address");
const cityVar = document.getElementById("city");
const emailVar = document.getElementById("email");

const submitButton = document.getElementById("submit");

//This is the code for the error message if the form is not filled
const formHTML = document.getElementById("form");
const formErrorMsg = document.createElement("p");
formErrorMsg.innerText = "The form hasn't been filled correctly";
formErrorMsg.style.textAlign = "center";

function emailVerification (textValue) {
    let emailArray = [];
    for (let i = 0; i < textValue.length; i++) {
        // Put each character of textValue into an array so that we can check every one of them individually.
        emailArray.push(textValue.slice(i, i + 1));
        // Checks for the for loop to be done.
    }
    // Checks every value in emailArray.
    for (let a = 0; a < emailArray.length; a++) {
        // Checks @, also checks if the value before the @ exists.
        // Also checks if the value after is not a dot.
        // All of this is done to follow the correct email format.
        if (emailArray[a] == "@" && emailArray[a - 1] && emailArray[a + 1] != ".") {
            return true
        }
    }        
};

let formCounter = 0;
// When the user press the 'submitButton' the form that the user filled will be send to the backend
submitButton.addEventListener('click', () =>{
    // Check if the form has been filled.
    if ( firstNameVar.value.length > 0 && familyNameVar.value.length > 0 && addressVar.value.length > 0 && cityVar.value.length > 0 && emailVar.value.length > 0 && emailVerification(emailVar.value) && listOfCartItems.length > 0) {
        formData.firstName = firstNameVar.value;
        formData.lastName = familyNameVar.value;
        formData.address = addressVar.value;
        formData.city = cityVar.value;
        formData.email = emailVar.value;
        // Put the form into localStorage so that it can be used in other pages
        localStorage.setItem("formData", JSON.stringify(formData));
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
        // Change this page to the orderconfirmation page.
        window.location = "orderconfirmation.html"
        if (formCounter === 1) {
            // This removes the errorMsg from the html
            formHTML.removeChild(formErrorMsg);
            formCounter -= 1;
        }
    } else {
        if (formCounter !== 1) {
            // This add the errorMsg to the html.
            formHTML.appendChild(formErrorMsg);
            formCounter += 1;
        }
    }
});