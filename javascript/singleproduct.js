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

const addButtonNorbert = document.getElementById("addButtonNorbert");
let numberProduct = document.getElementById("inputRequired");

// This creates an object, if it already exists it just adds the number
addButtonNorbert.addEventListener("click", () => {
    if (cartItems === "") {
        cartItems = new cartItem(teddybearData_deserialized[0].name, Number(numberProduct.value), teddybearData_deserialized[0].price, teddybearData_deserialized[0].imageUrl);
        console.log(cartItems)
    } else {
        cartItems.numberOfItem += Number(numberProduct.value);
        console.log(cartItems)
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
    } else if (numberProduct.value >= cartItems.numberOfItem) {
        cartItems.numberOfItem = 0;
        console.log(cartItems)
    }
})