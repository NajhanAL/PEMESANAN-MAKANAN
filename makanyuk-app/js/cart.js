// Cart Data
let cart = [];

// Initialize cart
function initCart() {
    loadCart();
    updateCartDisplay();
    updateCartCount();
}

// Load cart from localStorage
function loadCart() {
    try {
        const savedCart = localStorage.getItem('makanyuk_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('Cart loaded from localStorage:', cart);
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        cart = [];
    }
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('makanyuk_cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage');
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const cartDelivery = document.getElementById('cartDelivery');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartItems || !cartEmpty || !cartSubtotal || !cartTotal) {
        console.error('Cart elements not found');
        return;
    }
    
    // Show/hide empty cart message
    if (cart.length === 0) {
        cartItems.classList.remove('active');
        cartEmpty.style.display = 'block';
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        cartItems.classList.add('active');
        cartEmpty.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = false;
    }
    
    // Clear cart items
    cartItems.innerHTML = '';
    
    // Calculate totals
    let subtotal = 0;
    const deliveryFee = 5000;
    
    // Add cart items
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = createCartItemElement(item, index);
        cartItems.appendChild(cartItem);
    });
    
    // Update totals
    const total = subtotal + deliveryFee;
    
    cartSubtotal.textContent = `Rp ${subtotal.toLocaleString()}`;
    cartTotal.textContent = `Rp ${total.toLocaleString()}`;
    
    // Add delivery fee display
    if (cartDelivery) {
        cartDelivery.textContent = `Rp ${deliveryFee.toLocaleString()}`;
    }
    
    // Update checkout button text
    if (checkoutBtn) {
        checkoutBtn.innerHTML = `
            <i class="fas fa-check"></i> 
            Checkout (Rp ${total.toLocaleString()})
        `;
    }
}

// Create cart item element
function createCartItemElement(item, index) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.dataset.index = index;
    
    const itemTotal = item.price * item.quantity;
    const formattedPrice = item.price.toLocaleString();
    const formattedTotal = itemTotal.toLocaleString();
    
    div.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">Rp ${formattedPrice}</div>
        </div>
<div class="cart-item-controls">
    <button class="btn btn-icon btn-outline decrease" data-index="${index}" 
            aria-label="Kurangi ${item.name}">
        <i class="fas fa-minus"></i>
    </button>
    <span class="cart-item-quantity">${item.quantity}</span>
    <button class="btn btn-icon btn-outline increase" data-index="${index}"
            aria-label="Tambah ${item.name}">
        <i class="fas fa-plus"></i>
    </button>
</div>
    `;
    
    // Add event listeners
    const decreaseBtn = div.querySelector('.decrease');
    const increaseBtn = div.querySelector('.increase');
    
    decreaseBtn.addEventListener('click', () => updateQuantity(index, -1));
    increaseBtn.addEventListener('click', () => updateQuantity(index, 1));
    
    return div;
}

// Update item quantity
function updateQuantity(index, change) {
    if (index < 0 || index >= cart.length) {
        console.error('Invalid cart index:', index);
        return;
    }
    
    const item = cart[index];
    
    if (change === -1 && item.quantity <= 1) {
        // Remove item if quantity becomes 0
        if (confirm(`Hapus ${item.name} dari keranjang?`)) {
            cart.splice(index, 1);
            showNotification(`${item.name} dihapus dari keranjang`, 'warning');
        }
    } else {
        item.quantity += change;
        
        // Show notification for quantity change
        if (change > 0) {
            showNotification(`${item.name} ditambah (${item.quantity})`);
        } else {
            showNotification(`${item.name} dikurangi (${item.quantity})`);
        }
    }
    
    // Save and update
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(index) {
    if (index < 0 || index >= cart.length) {
        console.error('Invalid cart index:', index);
        return;
    }
    
    const item = cart[index];
    
    if (confirm(`Hapus ${item.name} dari keranjang?`)) {
        cart.splice(index, 1);
        saveCart();
        updateCartDisplay();
        updateCartCount();
        showNotification(`${item.name} dihapus dari keranjang`, 'warning');
    }
}

// Clear cart
function clearCart() {
    if (cart.length === 0) {
        showNotification('Keranjang sudah kosong', 'info');
        return;
    }
    
    if (confirm('Kosongkan seluruh keranjang belanja?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartCount();
        showNotification('Keranjang berhasil dikosongkan', 'info');
    }
}

// Get cart summary for checkout
function getCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 5000;
    const total = subtotal + deliveryFee;
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    
    return {
        items: [...cart],
        subtotal,
        deliveryFee,
        total,
        itemCount,
        timestamp: new Date().toISOString()
    };
}

// Validate cart before checkout
function validateCart() {
    if (cart.length === 0) {
        return {
            valid: false,
            message: 'Keranjang belanja kosong'
        };
    }
    
    // Check if any item has invalid quantity
    const invalidItem = cart.find(item => item.quantity < 1);
    if (invalidItem) {
        return {
            valid: false,
            message: `Jumlah ${invalidItem.name} tidak valid`
        };
    }
    
    return {
        valid: true,
        message: 'Cart is valid'
    };
}

// Calculate cart statistics
function getCartStats() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const uniqueItems = cart.length;
    
    // Most expensive item
    const mostExpensive = cart.length > 0 
        ? cart.reduce((max, item) => item.price > max.price ? item : max, cart[0])
        : null;
    
    // Most quantity item
    const mostQuantity = cart.length > 0
        ? cart.reduce((max, item) => item.quantity > max.quantity ? item : max, cart[0])
        : null;
    
    return {
        itemCount,
        subtotal,
        uniqueItems,
        mostExpensive,
        mostQuantity
    };
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cart,
        initCart,
        loadCart,
        saveCart,
        updateCartDisplay,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartSummary,
        validateCart,
        getCartStats
    };
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', initCart);

// Auto-save cart before page unload
window.addEventListener('beforeunload', function() {
    saveCart();
});

// Periodically save cart (every 30 seconds)
setInterval(() => {
    if (cart.length > 0) {
        saveCart();
        console.log('Cart auto-saved');
    }
}, 30000);