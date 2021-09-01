let urlBackend = 'http://127.0.0.1:3000/api/teddies';
window.teddybearData = "";

fetch(urlBackend).then(response => response.json()).then(data => {
    console.log(data)
    teddybearData = data
    console.log(teddybearData[0])
    // This loop is for setting up the list page with the correct names and images.
    for (let teddybearTitle = 0; teddybearTitle < 5; teddybearTitle++) {
        document.getElementsByClassName('container_teddybear--text')[teddybearTitle].textContent = teddybearData[teddybearTitle].name;
        document.getElementsByClassName('container_teddybear--img')[teddybearTitle].src = teddybearData[teddybearTitle].imageUrl;
    }
    let teddybearData_serialized = JSON.stringify(teddybearData);
    localStorage.setItem("backendData", teddybearData_serialized);
    // To use backend data copy/paste this line -> let teddybearData_deserialized = JSON.parse(localStorage.getItem("backendData"));
});

let productDisplay = 0;

for (i = 1; i <= 5; i++) {
    let currentTeddybear = document.getElementById('product' + i);
    {
        // This is to create another scope to make the j variable local since i is global
        let j = i - 1;
        currentTeddybear.addEventListener("click", () => {
            productDisplay = j;
            let productDisplay_serialized = JSON.stringify(productDisplay);
            localStorage.setItem("productDisplayer", productDisplay_serialized);
        });
    }
};