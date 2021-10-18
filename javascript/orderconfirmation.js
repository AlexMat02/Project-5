let listOfCartItems = JSON.parse(localStorage.getItem("listOfCartItems"));
let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));

// Used to put the id(s) of listOfCartItems into the array products to send it to the backend.
// Because backend require an array of products' ids.
let products = [];
for (let q = 0; q < listOfCartItems.length; q++){
    products.push(listOfCartItems[q]._id)
}

// Get data from the localStorage to be used to send to the backend.
let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
let contact = JSON.parse(localStorage.getItem("formData"));

// Displays thte total price.
const currentPrice = document.getElementById("price");
currentPrice.textContent = totalPrice + ".00 $";

const htmlUserId = document.getElementById("orderId");

// Make the data that is going to the backend use the correct syntax
let body = {};
body.contact = contact;
body.products = products;

const urlPOSTRequest = "http://127.0.0.1:3000/api/teddies/order";

fetch(urlPOSTRequest, {method : 'POST',headers: {'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(body)})
    .then(response => response.json())
    .then(data => {htmlUserId.textContent = data.orderId})
    .catch((error) => {
        response.status(400).json({
            error: error
        })
    });

// Send each product id to the backend.
for (let i = 0; i < products.length; i++){
    let urlBackendId = `http://127.0.0.1:3000/api/teddies/${products[i]}`;
    fetch(urlBackendId).then(response => response.json()).then(data => {})
    .catch((error) => {
        response.status(400).json({
            error: error
        });
    })
};