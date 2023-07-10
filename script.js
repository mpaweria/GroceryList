// ---------------------------------- Using Firebase ------------------------------------------------

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "https://grocerylist-8f9ad-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }

// const app = initializeApp(appSettings)
// const database = getDatabase(app)
// const groceryInDB = ref(database, "Groceries")

// const inputEl = document.getElementById("input-el")
// const addBtn = document.getElementById("add-btn")
// const groceryList = document.getElementById("grocery-list")

// let itemsArray = []

// addBtn.addEventListener("click", () => {
//     addItem()
// })

// inputEl.addEventListener("keydown", (e) => {
//     if(e.key === "Enter"){
//         addItem()
//     }
// })

// onValue(groceryInDB, (snapshot) => {
//     if(snapshot.exists()){
//         itemsArray = Object.entries(snapshot.val())
//         groceryList.innerHTML = ""
        
//         for(let i=0; i<itemsArray.length; i++){
//             let currentItem = itemsArray[i]
//             renderList(currentItem)
//         }
//     }else{
//         groceryList.innerHTML = `<p> No items yet... </p>`
//     }
// })

// function addItem() {
//     let inputValue = inputEl.value
//     if(inputValue !== ""){
//         push(groceryInDB, inputValue)
//     }
//     inputEl.value = ""
// }

// function renderList(item) {
//     let itemId = item[0]
//     let itemValue = item[1]

//     let newEl = document.createElement("li")

//     newEl.textContent= itemValue

//     newEl.addEventListener("dblclick", () => {
//         let exactLocationInDB = ref(database, `Groceries/${itemId}`)
//         remove(exactLocationInDB)
//     })

//     groceryList.append(newEl)
// }



// ---------------------------------------------------- Using Local Storage -------------------------------------------------------

const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn")
const groceryList = document.getElementById("grocery-list")

// empty array to store list of items
let itemsList = []

// fetch all the items from localstorage and save it in a variable
const items = fetchItems()

// if there are items then save it in the above declared items array
if(items) {
    itemsList = items
}

// to render the saved items list
renderItems()

// event listener on input element to save elements on pressing enter
inputEl.addEventListener("keydown", (e) => {
    if(e.code === "Enter"){
        addItem()
    }
})

// event listener on input element to save elements
addBtn.addEventListener("click", () => {
    addItem()
})


function addItem() {
    let inputValue = inputEl.value

    // if the input value is not empty then add it to the array
    if(inputValue !== '' && inputValue !== null){
        itemsList.push(inputValue)
        saveItem()
    }
    inputEl.value = ''
}

// save the items array to the local storage
function saveItem() {
    localStorage.setItem("GroceryList", JSON.stringify(itemsList))
    renderItems()
}

// render the items array list on the screen
function renderItems() {
    console.log(itemsList.length)
    if(itemsList.length > 0) {
        // clear the screen before renderering so that the items appear only once
        groceryList.innerHTML = ''
        
        for(let i=0; i<itemsList.length; i++){
            let newEl = document.createElement("li")
            newEl.textContent = itemsList[i]

            // adding event listener to call delete function on double click
            newEl.addEventListener("dblclick", () => {
                deleteItem(itemsList, itemsList[i])
            })
            groceryList.append(newEl)
        }
    } else {
        groceryList.innerHTML = "<p> No items yet... </p>"
    }
}

// fetches the items list from the local storage
function fetchItems() {
    let items = localStorage.getItem("GroceryList")
    items = JSON.parse(items)
    return items
}

// delete the items from the items array
function deleteItem(array, item) {
    const index = array.indexOf(item)

    // checking that the item exists in the array
    if(index > -1){
        // first argument takes the index to delete and the second argument states that only one element should be deleted
        array.splice(index, 1)
    }
    // save the items array in the localhost again
    saveItem()
}