// This is the code for the form -> Handle form info

let formData = {
    firstName: "",
    familyName: "",
    address: "",
    city: "",
    email: ""
};

let firstNameVar = document.getElementById("firstName");
let familyNameVar = document.getElementById("familyName");
let addressVar = document.getElementById("address");
let cityVar = document.getElementById("city");
let emailVar = document.getElementById("email");

const submitButton = document.getElementById("submit");

// When the user press the 'submitButton' the form that the user filled will be send to the backend

submitButton.addEventListener('click', () =>{
    formData.firstName = firstNameVar.value;
    formData.familyName = familyNameVar.value;
    formData.address = addressVar.value;
    formData.city = cityVar.value;
    formData.email = emailVar.value;
});