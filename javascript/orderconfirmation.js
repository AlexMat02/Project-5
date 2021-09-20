let listOfCartItems = JSON.parse(localStorage.getItem("listOfCartItems"));
console.log(listOfCartItems);

let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

let contact = JSON.parse(localStorage.getItem("formData"));
console.log(contact);

const currentPrice = document.getElementById("price");
console.log(currentPrice);
currentPrice.textContent = totalPrice + ".00 $";

const htmlUserId = document.getElementById("orderId");

const urlPOSTRequest = "http://127.0.0.1:3000/api/teddies/order";
const urlBackendId = "http://127.0.0.1:3000/api/teddies/:_id";

fetch(urlPOSTRequest, {method : 'POST', body: contact, listOfCartItems})
    .then(response => response.json()).then(data => {
    console.log(data);
    console.log("c");
});

fetch(urlBackendId).then(response => response.json()).then(data => {
    console.log(data);
    console.log("w");
    htmlUserId.textContent = data;
});