let cartItems;

// This enables to make the singleproductpage responsive depending on which card the user clicked
let productDisplay_deserialized = JSON.parse(localStorage.getItem("productDisplayer"));

// This enables to use teddybearData
let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));
console.log(teddybearData_deserialized);

// This is the part of the code for getting the correct html to change

const productIMG = document.getElementById("productIMG");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productNumber = document.getElementById("productNumber");
const productDescription = document.getElementById("productDescription");
const productColor = document.getElementById("productColor");
const productSelect = document.getElementById("productSelect");

// This is to turn the string that is stocked inside the array into a number 
let priceNumber = parseFloat(teddybearData_deserialized[productDisplay_deserialized].price);

// This code is for replacing the default value with the correct ones
productName.textContent = teddybearData_deserialized[productDisplay_deserialized].name;
productPrice.textContent = (priceNumber / 100) + '.00 $';
productIMG.src = teddybearData_deserialized[productDisplay_deserialized].imageUrl;
productDescription.textContent = teddybearData_deserialized[productDisplay_deserialized].description;
// This is for the dropdown menu
for (let i = teddybearData_deserialized[productDisplay_deserialized].colors.length; i > 0; i--) {
    let newLi = document.createElement("option")
    newLi.textContent = teddybearData_deserialized[productDisplay_deserialized].colors[i - 1];
    newLi.setAttribute("class", "product-card-cartpage-ul")
    productSelect.appendChild(newLi);
};

let colorMenu = document.getElementById("productSelect");
/* colorMenu.onclick = function(){MYFUNCTION()};
// Don't need a function just need to do put into the constructor and be like
// var colorChoosed = colorMenu.options[colorMenu.selectedIndex].text;
// this.itemColor = colorChoosed
function MYFUNCTION() {
    var colorChoosed = colorMenu.options[colorMenu.selectedIndex].text;
    console.log(colorChoosed);
}; */


class cartItem{
    constructor(itemName, numberOfItem, itemPrice, itemUrl, itemDescription, itemColor) {
        this.itemName = itemName;
        this.numberOfItem = numberOfItem;
        this.itemPrice = itemPrice;
        this.itemUrl = itemUrl;
        this.itemDescription = itemDescription
        this.itemColor = itemColor
    }
};

//localStorage.clear();
const addButton = document.getElementById("addButton");
let numberProduct = document.getElementById("inputRequired");
let list_CartItems = localStorage.getItem("listOfCartItems");
let listOfCartItems = JSON.parse(localStorage.getItem("listOfCartItems"));


// rename variable voila
console.log(teddybearData_deserialized[productDisplay_deserialized].name);
if (listOfCartItems !== 'null' || listOfCartItems !== null) {
    for (let y = 0; y < listOfCartItems.length ; y++){
        let voila = teddybearData_deserialized[productDisplay_deserialized].name;
        if (listOfCartItems[y].itemName == voila) {
            productNumber.textContent = "Quantity : " + listOfCartItems[y].numberOfItem;
        }
    }
};

// This creates an object, if it already exists it just adds the number
// Need to add a check if input is empty
addButton.addEventListener("click", () => {
    if (listOfCartItems == 'null' || listOfCartItems == null) {
        console.log("listOfCartItems == null");
        listOfCartItems = [];
        cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description,colorMenu.options[colorMenu.selectedIndex].text );
        listOfCartItems.push(cartItems);
        localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
        console.log(listOfCartItems);
        console.log(listOfCartItems.length);
        productNumber.textContent = "Quantity : " + cartItems.numberOfItem;
    } else {
        console.log("listOfCartItems !== null");
        cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description, colorMenu.options[colorMenu.selectedIndex].text);
        //if statement to check if the cartItems is already created, if so, just change the numberOfItem
        // Checks in listOfCartItems if cartItems already exists, then if it doesn't push it in
         for (let i = 0; i < listOfCartItems.length ; i++) {
            if (listOfCartItems[i].itemName == cartItems.itemName)  {
                console.log("found");
                console.log(i);
                listOfCartItems[i].numberOfItem += cartItems.numberOfItem;
                productNumber.textContent = "Quantity : " + listOfCartItems[i].numberOfItem;
                localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                console.log(listOfCartItems);
                break;
            } else if (i == (listOfCartItems.length - 1)){
                console.log("not found");
                listOfCartItems.push(cartItems);
                localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                console.log(cartItems.numberOfItem);
                productNumber.textContent = "Quantity : " + cartItems.numberOfItem;
                console.log(listOfCartItems);
                console.log(listOfCartItems.length);
                break;
            } else {
                console.log("truly not found");
                console.log(i);
            }
        }  
    } 
});

const removeButton = document.getElementById("removeButton");

// This removes a number of cartItems.numberOfItem from user input
removeButton.addEventListener("click", () => {
    if (listOfCartItems !== 'null' || listOfCartItems !== null) {
        for (let y = 0; y < listOfCartItems.length ; y++){
            let voila = teddybearData_deserialized[productDisplay_deserialized].name;
            cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description);
            if (listOfCartItems[y].itemName == voila) {
                listOfCartItems[y].numberOfItem -= cartItems.numberOfItem;
                if (listOfCartItems[y].numberOfItem <= 0) {
                    listOfCartItems[y].numberOfItem = 0;
                    productNumber.textContent = "Quantity : " + listOfCartItems[y].numberOfItem;
                    console.log(listOfCartItems);
                    listOfCartItems.splice(y, 1);
                    console.log(listOfCartItems);
                    localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                } else {
                    console.log("not 0");
                    console.log(listOfCartItems);
                    localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                    productNumber.textContent = "Quantity : " + listOfCartItems[y].numberOfItem;
                }
            }
        }
    };
});