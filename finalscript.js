const apiUrl = 'https://fakestoreapi.com/products';
let products = [];
let cart = [];

// Fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts() {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button style="background-color:#00ff00" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear existing content
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h4>${item.title}</h4>
            <p>Price: $${item.price}</p>
            <button style="background-color:#bb0000;" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    const totalElement = document.getElementById('cart-total');
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Call the fetch function
fetchProducts();