//HTML Elements
var slider = document.querySelectorAll('.slide');
var rightbut = document.querySelector('.fa-arrow-right');
var leftbut = document.querySelector('.fa-arrow-left');
var dots = document.querySelectorAll('.dot');
var addToCrate = document.querySelectorAll('.addtocart');
var items = document.querySelectorAll('.item');
var filter = document.querySelectorAll('.products div p');
var cartNumber = document.querySelector('.cart-number');
var upKey = document.querySelector('.up');
var cart = document.querySelector('.cart');
var cartIcon = document.querySelector('.cart-icon');
var container = document.querySelector('.container');
var shopNowButton = document.querySelector('.shopNow');
var placeOrderButton = document.querySelector('.place-order');
var totalPriceTag = document.querySelector('.price');
var orderMessage = document.querySelector('.placed-order');
var continueShoppingButton = document.querySelector('.continue-shopping');
var start = 0;
var currentSlide = 0;
var cartOrderNumber = 0;
var flag = 1;
var button = 1;
var buttons;
var totalPrice = 0;


// Functions
function slide() {
    for (var i = 0; i < slider.length; i++) {
        slider[i].style.transform = `translateX(${(i - currentSlide) * 100}%)`;
        dots[i].style.backgroundColor = "black";
    }
}
function showAddTocrate(e) {
    var index = e.target.className;
    addToCrate[index - 1].style.transition = "opacity 1s";
    addToCrate[index - 1].style.opacity = "1";
    addToCrate[index - 1].style.transform = "translateX(0px)";
    items[index - 1].addEventListener("mouseleave", function () {
        addToCrate[index - 1].style.opacity = "0";
        addToCrate[index - 1].style.transform = "translateX(43px)";
        addToCrate[index - 1].style.transition = "all 1s";
    });
}
function filterItems(e, label) {
    for (var k = 0; k < 3; k++) {
        if (e.target.className == filter[k].className) {
            filter[k].style.color = "black";
        } else {
            filter[k].style.color = "gray";
        }
    }

    if (!label) {
        for (var j = 0; j < items.length; j++) {
            items[j].style.opacity = "1";
            items[j].style.display = "block";
        }
    }
    else {
        for (var i = 0; i < items.length; i++) {
            if (items[i].children[0].children[0].firstChild.data === label) {
                items[i].style.opacity = "1";
                items[i].style.display = "block";
            } else {
                items[i].style.opacity = "0";
                items[i].style.display = "none";
            }
        }
    }
}
function increaseCartNumber(e) {
    var found = 0;
    var itemN = e.target.classList[0];
    for (var i = 0; i < cart.children.length; i++) {
        if (cart.children[i].children[1].className == itemN) {
            found = i;
        }
    }
    if (found) {
        window.scrollTo(0, 0);
    } else {
        start++;
        cartNumber.style.opacity = "1";
        cartNumber.innerHTML = `${start}`;
        placeItemToCart(items[itemN - 1], itemN);
    }
    totalPriceTag.innerHTML = `Total Price: $${totalPrice}`;
}
function decreaseCartNumber() {
    start--;
    if (start < 0) { start = 0; cartNumber.style.opacity = "0"; }
    cartNumber.innerHTML = `${start}`;
}
function placeItemToCart(itemInfo, number) {
    cartOrderNumber++;
    var orderInfo = document.createElement('div');
    orderInfo.append(itemInfo.childNodes[1].childNodes[3].cloneNode(true));
    var quantatiy = document.createElement('div');
    quantatiy.innerHTML = `
    <h4 style="text-align:center;">Qty</h4>
    <i class="fa-solid fa-minus" data-number="${cartOrderNumber}" onclick="decreaseQty(event)"></i>
    <h4 class="qty" style="display:inline-block">1</h4>
    <i class="fa-solid fa-plus" data-number="${cartOrderNumber}" onclick="increaseQty(event)">`;
    quantatiy.style.margin = "auto 10px 20px";
    orderInfo.append(quantatiy);
    orderInfo.style.display = 'flex';
    orderInfo.className = number;
    orderInfo.children[0].style.width = '100px';
    orderInfo.children[0].style.borderRadius = '20px';
    console.log(quantatiy);
    var productDesc = itemInfo.childNodes[5].childNodes[1].cloneNode(true);
    var productPrice = itemInfo.childNodes[5].childNodes[3].cloneNode(true);
    var productRow = document.createElement('div');
    productRow.className = "cart-row";
    var removeButton = document.createElement('div');
    removeButton.innerHTML = `<button class="remove-button" data-number="${button++}" onclick="removeProduct(event)">Remove</button>`;
    var productNumberColumn = document.createElement('div');
    productNumberColumn.innerHTML = `<h2>${cartOrderNumber}</h2>`;
    productRow.append(productNumberColumn);
    productRow.append(orderInfo);
    productRow.append(productDesc);
    productRow.append(productPrice);
    productRow.append(removeButton);
    cart.append(productRow);
    totalPrice += Math.ceil(Number(productPrice.textContent.substring(1)));
    buttons = document.querySelectorAll('.remove-button');
}
function removeProduct(e) {
    var row = e.target.dataset.number;
    console.log(e);
    totalPrice -= Math.ceil(Math.ceil(Number(cart.children[row].children[1].children[1].children[2].textContent)) * Math.ceil(Number(cart.children[row].children[3].textContent.substring(1))));
    totalPriceTag.innerHTML = `Total Price:$${totalPrice}`;
    cart.children[row].remove();
    removeButtons = document.querySelectorAll('.remove-button');
    var addButtons = document.querySelectorAll('.fa-plus');
    var minusButtons = document.querySelectorAll('.fa-minus');
    console.log(addButtons, minusButtons);
    button--;
    cartOrderNumber--;
    decreaseCartNumber();
    for (var i = (row - 1); i < removeButtons.length; i++) {
        removeButtons[i].dataset.number = row++;
        document.querySelectorAll('.cart-row')[i + 1].firstChild.innerHTML = `${i + 1}`;
        addButtons[i].dataset.number = i + 1;
        minusButtons[i].dataset.number = i + 1;
    }
}
function showCartItems() {
    if (flag) {
        container.style.display = 'none';
        cart.style.display = 'flex';
        cartIcon.style.color = "#1428B2";
        document.querySelector('.products').style.marginTop = "0";
        flag = 0;
    } else {
        container.style.display = 'flex';
        cart.style.display = 'none';
        document.querySelector('.products').style.marginTop = "-360px";
        flag = 1;
        cartIcon.style.color = "";
    }
}
function scrollToShopping() {
    window.scrollTo(0, 1800);
}

function increaseQty(e) {
    var row = e.target.dataset.number;
    var qty = cart.children[row].children[1].children[1].children[2];
    qty.textContent = `${(Number(qty.textContent)) + 1}`;
    totalPrice += Math.ceil(Number(cart.children[row].children[3].textContent.substring(1)));
    totalPriceTag.innerHTML = `Total Price: $${totalPrice}`;
}
function decreaseQty(e) {
    var row = e.target.dataset.number;
    var qty = cart.children[row].children[1].children[1].children[2];
    if (qty.textContent == 1) {
    } else {
        qty.textContent = `${(Number(qty.textContent)) - 1}`;
        totalPrice -= Math.ceil(Number(cart.children[row].children[3].textContent.substring(1)));
        totalPriceTag.innerHTML = `Total Price: $${totalPrice}`;
    }
}

function placeOrder() {
    var length = cart.children.length;
    if (length < 2) {
    } else {
        for (var i = 1; i < length; i++) {
            cart.children[1].remove();
            console.log(i);
        }
        var deliveryDate = new Date();
        totalPrice = 0;
        cartOrderNumber = 0;
        start = 0;
        decreaseCartNumber();
        button = 1;
        totalPriceTag.innerHTML = `Total Price:$${totalPrice}`;
        cart.style.display = 'none';
        document.querySelector('.products div').style.display = 'none';
        document.querySelector('.items').style.display = 'none';
        orderMessage.style.display = 'flex';
        orderMessage.children[2].innerHTML = `The order will be at your door Within 3 Days From today.
        <br> by ${deliveryDate.getDate() + 3} / ${deliveryDate.getMonth() + 1} / ${deliveryDate.getFullYear()} `;
    }
}

function continueShopping() {
    orderMessage.style.display = 'none';
    container.style.display = 'flex';
    showCartItems();
    document.querySelector('.products div').style.display = 'flex';
    document.querySelector('.items').style.display = 'flex';
    setTimeout(function () {
        window.scrollTo(0, 1800);
    }, 500);

}
//Events
rightbut.addEventListener("click", function () {
    currentSlide++;
    if (currentSlide > 2) { currentSlide = 0; }
    slide();
    dots[currentSlide].style.backgroundColor = "gray";
    i;
});

leftbut.addEventListener("click", function () {
    currentSlide--;
    if (currentSlide < 0) { currentSlide = 2; }
    slide();
    dots[currentSlide].style.backgroundColor = "gray";
});
window.addEventListener("scroll", function () {
    if (window.scrollY > 1700) {
        upKey.style.opacity = "1";
    } else {
        upKey.style.opacity = "0";
    }
});
upKey.addEventListener("click", function () {
    window.scroll(0, 0);
});
cartIcon.addEventListener('click', showCartItems);
placeOrderButton.addEventListener('click', placeOrder);
continueShoppingButton.addEventListener('click', continueShopping);
