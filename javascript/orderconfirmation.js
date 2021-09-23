let listOfCartItems = JSON.parse(localStorage.getItem("listOfCartItems"));
console.log(listOfCartItems);

let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));
console.log(teddybearData_deserialized);

let products = [];
for (let q = 0; q < listOfCartItems.length; q++){
    products.push(listOfCartItems[q]._id)
}

let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

let contact = JSON.parse(localStorage.getItem("formData"));
console.log(contact);

const currentPrice = document.getElementById("price");
console.log(currentPrice);
currentPrice.textContent = totalPrice + ".00 $";

const htmlUserId = document.getElementById("orderId");

let body = {};
body.contact = contact;
body.products = products;
console.log(body);

const urlPOSTRequest = "http://127.0.0.1:3000/api/teddies/order";

fetch(urlPOSTRequest, {method : 'POST',headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }, body: JSON.stringify(body)})
    .then(response => response.json()).then(data => {
    console.log(data);
    htmlUserId.textContent = data.orderId;
});

for (let i = 0; i < products.length; i++){
    let urlBackendId = `http://127.0.0.1:3000/api/teddies/${products[i]}`;
    fetch(urlBackendId).then(response => response.json()).then(data => {
        console.log(data);
    });
};