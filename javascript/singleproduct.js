let cartItems = "";

// This enables to make the singleproductpage responsive depending on which card the user clicked
let productDisplay_deserialized = JSON.parse(localStorage.getItem("productDisplayer"));
console.log(productDisplay_deserialized);

// This enables to use teddybearData
let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));
console.log(teddybearData_deserialized);

// This is the part of the code for displaying the correct product depending on which card the user clicked

const productIMG = document.getElementById("productIMG");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productNumber = document.getElementById("productNumber");

productName.textContent = teddybearData_deserialized[productDisplay_deserialized].name;
productPrice.textContent = teddybearData_deserialized[productDisplay_deserialized].price + '€';
productIMG.src = teddybearData_deserialized[productDisplay_deserialized].imageUrl;

class cartItem{
    constructor(itemName, numberOfItem, itemPrice, itemUrl) {
        this.itemName = itemName;
        this.numberOfItem = numberOfItem;
        this.itemPrice = itemPrice;
        this.itemUrl = itemUrl;
    }
};

//     let teddybearData_serialized = JSON.stringify(teddybearData);
//     localStorage.setItem("backendData", teddybearData_serialized);
//     let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));

const addButtonNorbert = document.getElementById("addButtonNorbert");
let numberProduct = document.getElementById("inputRequired");
let list_CartItems;

if (typeof(list_CartItems) !== undefined) {
    window.list_CartItems = [];
    console.log('a');
} 

// This creates an object, if it already exists it just adds the number
addButtonNorbert.addEventListener("click", () => {
    if (cartItems === "") {
        cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl);
        console.log(cartItems)
        window.list_CartItems.push(cartItems);
        console.log(window.list_CartItems);
        let list_CartItems_serialized = JSON.stringify(window.list_CartItems);
        localStorage.setItem("listOfCartItems", list_CartItems_serialized);
        productNumber.textContent = "Product Number " + cartItems.numberOfItem;
    } else {
        cartItems.numberOfItem += Number(numberProduct.value);
        console.log(cartItems);
        console.log(window.list_CartItems);
        let list_CartItems_serialized = JSON.stringify(window.list_CartItems);
        localStorage.setItem("listOfCartItems", list_CartItems_serialized);
        productNumber.textContent = "Product Number " + cartItems.numberOfItem;
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
        productNumber.textContent = "Product Number " + cartItems.numberOfItem;
    } else if (numberProduct.value >= cartItems.numberOfItem) {
        cartItems.numberOfItem = 0;
        console.log(cartItems)
        console.log(window.list_CartItems);
        let list_CartItems_serialized = JSON.stringify(window.list_CartItems);
        localStorage.setItem("listOfCartItems", list_CartItems_serialized);
        productNumber.textContent = "Product Number " + cartItems.numberOfItem;
    }
})