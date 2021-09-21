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

let colorMenu = document.getElementById("productSelect");

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

//localStorage.clear();
const addButton = document.getElementById("addButton");
let numberProduct = document.getElementById("inputRequired");
let list_CartItems = localStorage.getItem("listOfCartItems");
let listOfCartItems = JSON.parse(localStorage.getItem("listOfCartItems"));

console.log(listOfCartItems);
if (listOfCartItems == null || listOfCartItems.length == 0) {
    console.log("read1");
    console.log("listOfCartItems is empty");
    for (let i = teddybearData_deserialized[productDisplay_deserialized].colors.length; i > 0; i--) {
        let newLi = document.createElement("option")
        newLi.textContent = teddybearData_deserialized[productDisplay_deserialized].colors[i - 1];
        newLi.setAttribute("class", "product-card-cartpage-ul")
        productSelect.appendChild(newLi);
    };
} else {
    console.log("read1-3");
    // Used to see if the product is already in the cart, if it's not it doesn't execute the code below since
    // the user did not add the product to his cart yet
    for (let h = 0; h < listOfCartItems.length; h++){
        console.log("read3");
        console.log(teddybearData_deserialized[productDisplay_deserialized].name);
        console.log(listOfCartItems[h].name);
        if (teddybearData_deserialized[productDisplay_deserialized].name == listOfCartItems[h].name) {
            console.log("read3-1");
            console.log(listOfCartItems[h]);
            let colorHolder = teddybearData_deserialized[productDisplay_deserialized].colors;
            let waiter = 0;
            console.log(colorHolder);
            // Make the user's color go first into the array so that it is correctly display on the html
        for (let i = colorHolder.length; i > 0; i--) {
            console.log("read3-2");
            console.log(listOfCartItems[h].itemColor);
            if (colorHolder[i - 1] == listOfCartItems[h].itemColor) {
                colorHolder.splice(i - 1, 1);
                colorHolder.push(listOfCartItems[h].itemColor);
                waiter += 1;
                console.log("read4");
            };
            // waiter is used to push the user's color first. It is used for order
            if (waiter >= 1) {
                for (let i = colorHolder.length; i != 0; i--) {
                    let newLi = document.createElement("option");
                    newLi.textContent = colorHolder[i - 1];
                    newLi.setAttribute("class", "product-card-cartpage-ul");
                    colorMenu.appendChild(newLi);
                };
                waiter = 0;
                console.log("read5");
            };
        };
        } else if (h >= listOfCartItems.length - 1) {
            console.log("not found");
            for (let i = teddybearData_deserialized[productDisplay_deserialized].colors.length; i > 0; i--) {
                let newLi = document.createElement("option")
                newLi.textContent = teddybearData_deserialized[productDisplay_deserialized].colors[i - 1];
                newLi.setAttribute("class", "product-card-cartpage-ul")
                productSelect.appendChild(newLi);
            };
        }
    };
}

console.log(teddybearData_deserialized[productDisplay_deserialized].name);
// This is to display quantity
if (listOfCartItems !== null) {
    console.log("listOfCartItems is not null");
    for (let y = 0; y < listOfCartItems.length ; y++){
        let correctTeddybearName = teddybearData_deserialized[productDisplay_deserialized].name;
        if (listOfCartItems[y].name == correctTeddybearName) {
            productNumber.textContent = "Quantity : " + listOfCartItems[y].numberOfItem;
        }
    }
} else {
    console.log("listOfCartItems is null");
    for (let i = teddybearData_deserialized[productDisplay_deserialized].colors.length; i > 0; i--) {
        let newLi = document.createElement("option")
        newLi.textContent = teddybearData_deserialized[productDisplay_deserialized].colors[i - 1];
        newLi.setAttribute("class", "product-card-cartpage-ul")
        productSelect.appendChild(newLi);
    };
}

// This creates an object, if it already exists it just adds the number
// Need to add a check if input is empty
addButton.addEventListener("click", () => {
    if (!isNaN(parseFloat(numberProduct.value))) {
        numberProduct.style.border = "";
        numberProduct.style.borderRadius = "";
        numberProduct.style.boxShadow = "";
        if (listOfCartItems == null || listOfCartItems.length == 0) {
            console.log("listOfCartItems == null");
            listOfCartItems = [];
            cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description,colorMenu.options[colorMenu.selectedIndex].text, teddybearData_deserialized[productDisplay_deserialized]._id );
            listOfCartItems.push(cartItems);
            localStorage.setItem("listOfCartItems", JSON.stringify(listOfCartItems));
            console.log(listOfCartItems);
            console.log(listOfCartItems.length);
            productNumber.textContent = "Quantity : " + cartItems.numberOfItem;
        } else {
            console.log("listOfCartItems !== null");
            cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description, colorMenu.options[colorMenu.selectedIndex].text, teddybearData_deserialized[productDisplay_deserialized]._id);
            //if statement to check if the cartItems is already created, if so, just change the numberOfItem
            // Checks in listOfCartItems if cartItems already exists, then if it doesn't push it in
             for (let i = 0; i < listOfCartItems.length ; i++) {
                if (listOfCartItems[i].name == cartItems.name)  {
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
    } else {
        console.log(parseFloat(numberProduct.value));
        console.log("not a number");
        numberProduct.style.border = "red 2px solid";
        numberProduct.style.borderRadius = "20px";
        numberProduct.style.boxShadow = "0px 4px 3px black";
    };
});

const removeButton = document.getElementById("removeButton");

// This removes a number of cartItems.numberOfItem from user input
removeButton.addEventListener("click", () => {
    if (!isNaN(parseFloat(numberProduct.value))) {
        numberProduct.style.border = "";
        numberProduct.style.borderRadius = "";
        numberProduct.style.boxShadow = "";
        if (listOfCartItems !== 'null' || listOfCartItems !== null) {
            for (let y = 0; y < listOfCartItems.length ; y++){
                let correctTeddybearName = teddybearData_deserialized[productDisplay_deserialized].name;
                cartItems = new cartItem(teddybearData_deserialized[productDisplay_deserialized].name, Number(numberProduct.value), teddybearData_deserialized[productDisplay_deserialized].price, teddybearData_deserialized[productDisplay_deserialized].imageUrl, teddybearData_deserialized[productDisplay_deserialized].description);
                if (listOfCartItems[y].name == correctTeddybearName) {
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
    } else {
        console.log(parseFloat(numberProduct.value));
        console.log("not a number");
        numberProduct.style.border = "red 2px solid";
        numberProduct.style.borderRadius = "20px";
        numberProduct.style.boxShadow = "0px 4px 3px black";
    };
});