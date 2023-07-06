const wishlistInputElement = document.querySelector(".input");
const addBtn = document.querySelector(".button");
const parentContainer = document.querySelector(".wishlist-container");

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

let wishList = [];

wishlistInputElement.addEventListener("keyup", (event) => {
  wishListItemText = event.target.value;
});

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  wishList = [
    ...wishList,
    { id: uuid(), item: wishListItemText, isCompleted: false },
  ];
//   console.log(wishList);
  wishlistInputElement.value = "";
  showWishList(wishList);

});

function showWishList(wishList) {
  parentContainer.innerHTML = wishList.map(
    ({ id, item, isCompleted }) =>
      `<div class = "item-container">
    <input type="checkbox" id= ${id}  ${isCompleted ? "checked" : ""} >
    <span id = ${id} class = ${isCompleted ? "checked":""}>${item}</span>
    <button id = ${id}>Delete</button>
    <button id = ${id}>Edit</button>
    </div>`
  );
}

parentContainer.addEventListener("click",(e) => {
    // console.log(e.target.innerText)
    // console.log(e.target.id)
    if(e.target.innerText === "Delete"){
        wishList = wishList.filter((wish) => (wish.id !== e.target.id))
        // console.log(wishList)
        // showWishList(wishList)
    }
    else if(e.target.innerText === "Edit"){
        itemToEditId = e.target.id
        for(let i = 0; i < wishList.length; i++){
            if(wishList[i].id === itemToEditId){
                const newItem = prompt("Enter the new value for the wishlist item:",wishList[i].item)
                wishList[i].item = newItem
                wishList[i].isCompleted = false
            }
        }
        // console.log(wishList)
    }
    else if(e.target.tagName === "INPUT" ||e.target.tagName === "SPAN" ){
        itemToCheckId = e.target.id
        for(let i = 0; i < wishList.length; i++){
            if(wishList[i].id === itemToCheckId){
                wishList[i].isCompleted = !wishList[i].isCompleted 
            }
        }
    }
    showWishList(wishList)
    
})
