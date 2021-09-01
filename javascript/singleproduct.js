let cartItems = "";

// This enables to make the singleproductpage responsive depending on which card the user clicked
let productDisplay_deserialized = JSON.parse(localStorage.getItem("productDisplayer"));

// This enables to use teddybearData
let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));

// This is the part of the code for getting the correct html to change

const productIMG = document.getElementById("productIMG");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productNumber = document.getElementById("productNumber");
const productDescription = document.getElementById("productDescription");
const productColor = document.getElementById("productColor");
const productSelect = document.getElementById("productSelect");
console.log(teddybearData_deserialized[productDisplay_deserialized].colors.length);

// This is to turn the string that is stocked inside the array into a number 
let priceNumber = parseFloat(teddybearData_deserialized[productDisplay_deserialized].price);

// This code is for replacing the default value with the correct ones
productName.textContent = teddybearData_deserialized[productDisplay_deserialized].name;
productPrice.textContent = (priceNumber / 100) + '.00 $';
productIMG.src = teddybearData_deserialized[productDisplay_deserialized].imageUrl;
productDescription.textContent = teddybearData_deserialized[productDisplay_deserialized].description;
// This is for the dropdown menu
for (let i = teddybearData_deserialized[productDisplay_deserialized].colors.length; i > 0; i -= 1) {
    let newLi = document.createElement("option")
    newLi.textContent = teddybearData_deserialized[productDisplay_deserialized].colors[i - 1];
    newLi.setAttribute("class", "product-card-cartpage-ul")
    productSelect.appendChild(newLi);
};

class cartItem{
    constructor(itemName, numberOfItem, itemPrice, itemUrl, itemDescription) {
        this.itemName = itemName;
        this.numberOfItem = numberOfItem;
        this.itemPrice = itemPrice;
        this.itemUrl = itemUrl;
        this.itemDescription = itemDescription
    }
};

//     let teddybearData_serialized = JSON.stringify(teddybearData);
//     localStorage.setItem("backendData", teddybearData_serialized);
//     let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));

const addButtonNorbert = document.getElementById("addButtonNorbert");
let numberProduct = document.getElementById("inputRequired");
let list_CartItems;
let list_CartItems_deserialized = JSON.parse(localStorage.getItem("listOfCartItems"));
console.log(window.list_CartItems);
console.log(list_CartItems);
console.log(list_CartItems_deserialized);

if (typeof(list_CartItems_deserialized) !== undefined) {
    window.list_CartItems = [];
    let list_CartItems_serialized = JSON.stringify(window.list_CartItems);
    localStorage.setItem("listOfCartItems", list_CartItems_serialized); 
    console.log(window.list_CartItems);
} 
console.log(window.list_CartItems);

// This creates an object, if it already exists it just adds the number
addButtonNorbert.addEventListener("click", () => {
    if (cartItems === "") {
        cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description);
        console.log(cartItems)
        window.list_CartItems.push(cartItems);
        console.log(window.list_CartItems);
        productNumber.textContent = "Product Number : " + cartItems.numberOfItem;
        let list_CartItems_serialized = JSON.stringify(window.list_CartItems);
        localStorage.setItem("listOfCartItems", list_CartItems_serialized);
    } else {
        cartItems.numberOfItem += Number(numberProduct.value);
        console.log(cartItems);
        console.log(window.list_CartItems);
        let list_CartItems_serialized = JSON.stringify(window.list_CartItems);
        localStorage.setItem("listOfCartItems", list_CartItems_serialized);
        productNumber.textContent = "Product Number : " + cartItems.numberOfItem;
    } 
});

const removeButtonNorbert = document.getElementById("removeButtonNorbert");

// This removes a number of cartItems.numberOfItem from user input
removeButtonNorbert.addEventListener("click", () => {
    if (!cartItems) {
        console.log("cartItems is not yet created")
    } else if (cartItems.numberOfItem > 0 && numberProduct.value <= cartItems.numberOfItem) {
        cartItems.numberOfItem -= Number(numberProduct.value);
        console.log(cartItems)
        console.log(window.list_CartItems);
        let list_CartItems_serialized = JSON.stringify(window.list_CartItems);
        localStorage.setItem("listOfCartItems", list_CartItems_serialized);
        productNumber.textContent = "Product Number : " + cartItems.numberOfItem;
    } else if (numberProduct.value >= cartItems.numberOfItem) {
        cartItems.numberOfItem = 0;
        console.log(cartItems)
        console.log(window.list_CartItems);
        let list_CartItems_serialized = JSON.stringify(window.list_CartItems);
        localStorage.setItem("listOfCartItems", list_CartItems_serialized);
        productNumber.textContent = "Product Number : " + cartItems.numberOfItem;
    }
})