let cart = document.querySelectorAll('.add-cart');

let product = [
    {
        name: 'TITAN INVASION TEE',
        tag: 'titaninvasiontee',
        price: 17,
        inCart: 0
    },
    {
        name: 'EMBROIDED INVADERS TEE',
        tag: 'embroidedinvaderstee',
        price: 17,
        inCart: 0
    },
    {
        name: 'INVASION EP MUG',
        tag: 'invasionepmug',
        price: 10,
        inCart: 0
    },
    {
        name: 'SCNE® RECORDS CORDUROY CAP',
        tag: 'scne®recordscorduroycap',
        price: 23,
        inCart: 0
    },
    {
        name: 'TALKIN - CHAMPION® TEE',
        tag: 'talkin-champion®tee',
        price: 20,
        inCart: 0
    } 
]

for (let i=0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
        cartNumbers(product[i]);
        totalCost(product[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.navbar-cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.navbar-cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.navbar-cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productInCart", JSON.stringify (cartItems));
}
 
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cart-container");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if( cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
        <div class="product">
            <i class="fa-solid fa-circle-xmark"></i>
            <img src="/Volumes/Shay 1/Present/Frontend Portfolio/SCNE Records [HTML, CSS, JS]/Images${item.tag}.webp>
            <span>${item.name}M/span>
        </div>
        <div class="price">$${item.price},00</div>
        <div class="quantity">
            <i class="fa-solid fa-circle-arrow-left"></i>
            <span>${item.inCart}</span>
            <i class="fa-solid fa-circle-arrow-right"></i>
        </div>
        <div class="total">
            ${item.inCart * item.price},00
        </div>
        `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
        `;

    }
}

onLoadCartNumbers();
displayCart();