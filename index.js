function addItem() {
    const addAmount = document.getElementById('amount').value;
    const itemName = document.getElementById('item').value
    const itemData = { amount: addAmount, itemName: itemName };

    axios
        .post(
            "https://crudcrud.com/api/8ba7bd51e3f040a48da9c6939f920314/addNote",
            itemData
        )
        .then((response) => {
            getDataFromServer();
        })
        .catch((error) => console.log(error));


}

function getDataFromServer() {
    axios
        .get(
            "https://crudcrud.com/api/8ba7bd51e3f040a48da9c6939f920314/addNote")
        .then((response) => {
            // console.log(response.data)
            updateitemDataList(response.data)

        })
        .catch((error) => console.log(error));

}


function deleteitemData(itemDataId) {
    console.log(itemDataId)
    axios
        .delete(
            `https://crudcrud.com/api/8ba7bd51e3f040a48da9c6939f920314/addNote/${itemDataId}`)
        .then((response) => {
            getDataFromServer();
            console.log("data deleted");

        })
        .catch((error) => console.log(error));
}

function updateitemDataList(itemData) {
    var itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    // Update itemDatas showing on screen
    let sum = 0;
    console.log(itemData.length);
    itemData.forEach((itemData) => {
        sum += parseInt(itemData.amount);

        var div = document.createElement('div');
        div.classList.add('itemData');
        div.innerHTML = `<label>${itemData.amount} - ${itemData.itemName}</label> 
        <button style="border: green; background-color:aqua; font-size:20px" class="deleteBtn" data-id = "${itemData._id}">Delete</button>`;

        itemList.appendChild(div);
    });

    const totalAmount = document.getElementById('totalitemDatas');
    totalAmount.innerText = sum;


    document.querySelectorAll(".deleteBtn").forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", () => {
            const itemDataId = deleteBtn.getAttribute("data-id");
            deleteitemData(itemDataId);
        });
    });
}

window.addEventListener("DOMContentLoaded", getDataFromServer);
updateitemDataList();
