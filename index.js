import { menuArray } from '/data.js'

const orderMenu = document.getElementById('order-menu')
const userOrder = document.getElementById('user-order')
const userOrderContainer = document.getElementById('user-order-container')
const completeOrderBtn = document.getElementById('complete-order-btn')
const cardDetailsContainer = document.getElementById('card-details')
const payBtn = document.getElementById('pay-btn')
const paymentForm = document.getElementById('form')

//DEFAULT STATE

//Create food menu
function createOrderMenu() {
    return menuArray.map(function(item) {
        const {
            emoji,
            name,
            ingredients,
            price,
            id
        } = item
        
        return `
            <div class="order-item" id="${id}">
                <div class="order-icon"><p>${emoji}</p></div>
                <div class="order-text">
                    <h4 data-name=${id}>${name}</h4>
                    <p class="data-ingredients">${ingredients}</p>
                    <p class="data-price" data-price=${id}>$${price}</p>
                </div>
                <a href="#user-order" class="order-btn" data-btn=${id}>+</a>
            </div>
            <hr>
        `
    }).join('')
}

//Render food menu
orderMenu.innerHTML = createOrderMenu()

//CHECKOUT STATE

document.addEventListener('click', function(e){
    
    //Get the dataset attribute from the product that user clicked the add button for and create new item for this product
    if (e.target.dataset.btn) {
        createNewItem(e.target.dataset.btn)
        
    //Delete the product property from the food item object if user clicks its remove btn
    } else if (e.target.dataset.remove) {
        const test = e.target.dataset.remove
        delete foodItemArr[test]
        
        //Render user menu
        renderUserMenu()
    }
})

let foodItemArr = {}

function createNewItem(id) {
    
    const orderedItemArr = menuArray.filter(item => item.id == id)
    const orderedItem = orderedItemArr[0]
    
    const orderedItemName = orderedItem.name
    const orderedItemPrice = orderedItem.price
    
    if (!foodItemArr[orderedItemName]) {
        foodItemArr[orderedItemName] = orderedItemPrice
    } else {
        foodItemArr[orderedItemName] += orderedItemPrice
    }
    
    renderUserMenu()
}

function renderUserMenu() {
    
    //Get the total price for all the chosen items
    const price = Object.values(foodItemArr);

    const sum = price.reduce((accumulator, value) => {
    return accumulator + value;
    }, 0);
    
    //Create arr for all the food items in object
    let test = []
    
    for (const item in foodItemArr) {
        test.push(item)
    }
    
    let test1 = ''    
    test.forEach(item => {
        
        test1 += `
            <div id="${item}" class="user-order-item">
                <div class="user-order-text-left">
                    <h4>${item}</h4>
                    <button id="removeBtn" data-remove=${item}>remove</button>
                </div>
                <p>$${foodItemArr[item]}</p>
            </div>
            `
    })
    
    renderOrderItems(test1, sum)
        
    userOrder.classList.remove("display-none")
    userOrder.classList.add("display-flex")
}

function renderOrderItems(items, sum) {
    
    userOrderContainer.innerHTML = 
        `
            <div class="user-order-text">
                ${items}
                <hr class="hr-black">
                <div class="user-order-complete">
                    <h5 class="total-price">Total price:</h5>
                    <p>$${sum}</p>
                </div>
            </div>
        `
}

//PAYMENT STATE

//When user clicks Order Btn make the Card Detail Container visible
completeOrderBtn.addEventListener("click", () => {
    cardDetailsContainer.classList.remove("display-none")
    cardDetailsContainer.classList.add("card-details")
})

//COMPLETE STATE

//Form submition
paymentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    //Get the user name from the form
    const userName = document.getElementById("user-name").value
    
    //Hide the Card Detail Container
    cardDetailsContainer.classList.remove("card-details")
    cardDetailsContainer.classList.add("display-none")
    
    //Replace the order details with thank you text
    userOrder.innerHTML = `
        <div class="completed-order-text">
            <h4>Thanks, ${userName}! Your order is on the way!</h4>
        </div>
    `
})