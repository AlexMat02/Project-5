let cartItems;

// This enables to make the singleproductpage responsive depending on which card the user clicked
let productDisplay_deserialized = JSON.parse(localStorage.getItem("productDisplayer"));

// This enables to use teddybearData
let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));

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

const colorMenu = document.getElementById("productSelect");

class cartItem{
    constructor(name, numberOfItem, price, imageUrl, description, itemColor, _id ) {
        this.name = name;
        this.numberOfItem = numberOfItem;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description
        this.itemColor = itemColor
        this._id = _id
    }
};

const addButton = document.getElementById("addButton");
const numberProduct = document.getElementById("inputRequired");
let listOfCartItems = JSON.parse(localStorage.getItem("listOfCartItems"));

// Makes the dropdown menu, first check if the cart exist or if it's empty, since if it is
// it means that the user hasn't picked a color yet thus making the part of the code responsible for
// displaying the user's color useless. So if it is empty or non-existing, it will just use a basif for loop.
if (listOfCartItems == null || listOfCartItems.length == 0) {
    // Basic for loop to create the dropdown menu with the correct colors. It is only used if the user
    // hasn't picked a color yet.
    for (let i = teddybearData_deserialized[productDisplay_deserialized].colors.length; i > 0; i--) {
        let newLi = document.createElement("option")
        newLi.textContent = teddybearData_deserialized[productDisplay_deserialized].colors[i - 1];
        newLi.setAttribute("class", "product-card-cartpage-ul")
        productSelect.appendChild(newLi);
    };
} else {
    // Checks the cart for the product.
    for (let h = 0; h < listOfCartItems.length; h++){
        if (teddybearData_deserialized[productDisplay_deserialized].name == listOfCartItems[h].name) {
            let colorHolder = teddybearData_deserialized[productDisplay_deserialized].colors;
            let waiter = 0;
            // The product is in the cart,
            // Make the user's color go first into the array so that it is correctly display on the html
        for (let i = colorHolder.length; i > 0; i--) {
            if (colorHolder[i - 1] == listOfCartItems[h].itemColor) {
                colorHolder.splice(i - 1, 1);
                colorHolder.push(listOfCartItems[h].itemColor);
                waiter += 1;
            };
            // waiter is used to push the user's color first. It is used for order.
            if (waiter >= 1) {
                // Creates the modified dropdown menu
                for (let i = colorHolder.length; i != 0; i--) {
                    let newLi = document.createElement("option");
                    newLi.textContent = colorHolder[i - 1];
                    newLi.setAttribute("class", "product-card-cartpage-ul");
                    colorMenu.appendChild(newLi);
                };
                waiter = 0;
            };
        };
        // If the item isn't found in listOfCartItems, it will create a basic color's menu.
        } else if (h >= listOfCartItems.length - 1) {
            for (let i = teddybearData_deserialized[productDisplay_deserialized].colors.length; i > 0; i--) {
                let newLi = document.createElement("option")
                newLi.textContent = teddybearData_deserialized[productDisplay_deserialized].colors[i - 1];
                newLi.setAttribute("class", "product-card-cartpage-ul")
                productSelect.appendChild(newLi);
            };
        }
    };
}

// This is to display quantity
if (listOfCartItems !== null) {
    for (let y = 0; y < listOfCartItems.length ; y++){
        let correctTeddybearName = teddybearData_deserialized[productDisplay_deserialized].name;
        // Finds the correct teddybear in listOfCartItems with the name value.
        if (listOfCartItems[y].name == correctTeddybearName) {
            productNumber.textContent = "Quantity : " + listOfCartItems[y].numberOfItem;
        }
    }
} else {
    for (let i = teddybearData_deserialized[productDisplay_deserialized].colors.length; i > 0; i--) {
        let newLi = document.createElement("option")
        newLi.textContent = teddybearData_deserialized[productDisplay_deserialized].colors[i - 1];
        newLi.setAttribute("class", "product-card-cartpage-ul")
        productSelect.appendChild(newLi);
    };
}

// This creates an object, if it already exists it just adds the number
addButton.addEventListener("click", () => {
    // This checks if the input given by the user is a number.
    if (!isNaN(parseFloat(numberProduct.value))) {
        // If the input given by the user is a number, it resets the input css style.
        numberProduct.style.border = "";
        numberProduct.style.borderRadius = "";
        numberProduct.style.boxShadow = "";
        // This verify if listOfCartItems is null or empty
        if (listOfCartItems == null || listOfCartItems.length == 0) {
            // If listOfCartItems is null or empty, it creates it, then add the current teddybear into
            // this array. After that, it will put listOfCartItems into the localStorage so that other pages
            // can use it. It also updates the html quantity.
            listOfCartItems = [];
            cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description,colorMenu.options[colorMenu.selectedIndex].text, teddybearData_deserialized[productDisplay_deserialized]._id );
            listOfCartItems.push(cartItems);
            localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
            productNumber.textContent = "Quantity : " + cartItems.numberOfItem;
        } else {
            cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description, colorMenu.options[colorMenu.selectedIndex].text, teddybearData_deserialized[productDisplay_deserialized]._id);
            // listOfCartItems is neither null or empty, which means we need to add to an already existing object.
            // for loop to check every object in listOfCartItems
             for (let i = 0; i < listOfCartItems.length ; i++) {
                // if statement to find the correct object in listOfCartItems
                if (listOfCartItems[i].name == cartItems.name)  {
                    listOfCartItems[i].numberOfItem += cartItems.numberOfItem;
                    productNumber.textContent = "Quantity : " + listOfCartItems[i].numberOfItem;
                    localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                    break;
                // if the correct object hasn't been found, it pushes cartItems into the localStorage
                } else if (i == (listOfCartItems.length - 1)){
                    listOfCartItems.push(cartItems);
                    localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                    productNumber.textContent = "Quantity : " + cartItems.numberOfItem;
                    break;
                }
            }  
        } 
    } else {
        // The input given by the user is not a number, so a style change is done on the html input
        // to notify the user that something is wrong.
        numberProduct.style.border = "red 2px solid";
        numberProduct.style.borderRadius = "20px";
        numberProduct.style.boxShadow = "0px 4px 3px black";
    };
});

const removeButton = document.getElementById("removeButton");

// This removes a number of cartItems.numberOfItem from user input
removeButton.addEventListener("click", () => {
    // This checks if the input given by the user is a number.
    if (!isNaN(parseFloat(numberProduct.value))) {
        // If the input given by the user is a number, it resets the input css style.
        numberProduct.style.border = "";
        numberProduct.style.borderRadius = "";
        numberProduct.style.boxShadow = "";
        // This verify if listOfCartItems is null or empty
        if (listOfCartItems !== 'null' || listOfCartItems !== null) {
            // for loop used to check every listOfCartItems product.
            for (let y = 0; y < listOfCartItems.length ; y++){
                let correctTeddybearName = teddybearData_deserialized[productDisplay_deserialized].name;
                cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description);
                // If statement to find the correct teddybear.
                if (listOfCartItems[y].name == correctTeddybearName) {
                    listOfCartItems[y].numberOfItem -= cartItems.numberOfItem;
                    // If the listOfCartItems[y].numberOfItem is 0 or lower, it will delete it form listOfCartItems
                    if (listOfCartItems[y].numberOfItem <= 0) {
                        listOfCartItems[y].numberOfItem = 0;
                        productNumber.textContent = "Quantity : " + listOfCartItems[y].numberOfItem;
                        listOfCartItems.splice(y, 1);
                        localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                    } else {
                        // It checked if listOfCartItems[y].numberOfItem is 0 or lower, and it found that it isn't,
                        // so it updates the item in localstorage with its new numberOfItem value and updates the html.
                        localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
                        productNumber.textContent = "Quantity : " + listOfCartItems[y].numberOfItem;
                    }
                }
            }
        };
    } else {
        // The input given by the user is not a number, so a style change is done on the html input
        // to notify the user that something is wrong.
        numberProduct.style.border = "red 2px solid";
        numberProduct.style.borderRadius = "20px";
        numberProduct.style.boxShadow = "0px 4px 3px black";
    };
});