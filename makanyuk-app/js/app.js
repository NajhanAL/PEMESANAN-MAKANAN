// Main Application Controller
document.addEventListener('DOMContentLoaded', function() {
    console.log('MakanYuk App Loaded');
    
    // Initialize modules
    initNavigation();
    initScrollToMenu();
    initEventListeners();
    initMobileMenu();
    
    // Load initial data
    updateCartCount();
});

// Navigation System
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Navigation items click
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const section = this.dataset.section;
            
            // If it's a category section
            if (section && section !== 'home') {
                // Update category filter
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.category === section) {
                        btn.classList.add('active');
                    }
                });
                
                // Update menu
                currentCategory = section;
                loadMenu();
                
                // Scroll to menu section
                document.getElementById('menu').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (section === 'home') {
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
    
    // Category filter buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update menu
            currentCategory = this.dataset.category;
            loadMenu();
        });
    });
}

// Scroll to menu function
function initScrollToMenu() {
    const orderNowBtn = document.getElementById('orderNowBtn');
    const viewMenuBtn = document.getElementById('viewMenuBtn');
    
    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', function() {
            document.getElementById('menu').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            showNotification('Silahkan pilih menu favorit Anda! 🍽️');
        });
    }
    
    if (viewMenuBtn) {
        viewMenuBtn.addEventListener('click', function() {
            document.getElementById('menu').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// Event Listeners
function initEventListeners() {
    // Cart toggle
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartToggleBtn) {
        cartToggleBtn.addEventListener('click', toggleCart);
    }
    
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', toggleCart);
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', toggleCart);
    }
    
    // Close cart with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
        }
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', processCheckout);
    }
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            this.innerHTML = navMenu.classList.contains('mobile-open') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 576 && navMenu) {
            navMenu.classList.remove('mobile-open');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
}

// Cart Functions
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        
        // Prevent body scroll when cart is open
        document.body.style.overflow = cartSidebar.classList.contains('active') 
            ? 'hidden' 
            : '';
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
        
        // Update checkout button state
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.disabled = count === 0;
        }
    }
}

// Process checkout
function processCheckout() {
    if (cart.length === 0) {
        showNotification('Keranjang belanja kosong!', 'warning');
        return;
    }
    
    const total = calculateTotal();
    const deliveryFee = 5000;
    const finalTotal = total + deliveryFee;
    
    if (confirm(`Konfirmasi pesanan dengan total Rp ${finalTotal.toLocaleString()}?\n\nTermasuk ongkos kirim Rp ${deliveryFee.toLocaleString()}`)) {
        // In a real app, you would send this to a backend
        const orderData = {
            items: cart,
            total: finalTotal,
            deliveryFee: deliveryFee,
            timestamp: new Date().toISOString(),
            orderId: 'ORD' + Date.now()
        };
        
        // Save order to localStorage (simulate backend)
        const orders = JSON.parse(localStorage.getItem('makanyuk_orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('makanyuk_orders', JSON.stringify(orders));
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartCount();
        closeCart();
        
        showNotification(`Pesanan #${orderData.orderId} berhasil! Total: Rp ${finalTotal.toLocaleString()} 🎉`, 'success');
        
        // Show order confirmation
        setTimeout(() => {
            alert(`🎉 TERIMA KASIH TELAH BERBELANJA!\n\n📦 Pesanan #${orderData.orderId}\n💰 Total: Rp ${finalTotal.toLocaleString()}\n🚚 Akan dikirim dalam 30-45 menit\n\nSelamat menikmati makanan Anda!`);
        }, 500);
    }
}

// Calculate cart total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Initialize app on load
window.addEventListener('load', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Check for saved cart
    loadCart();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Selamat datang di MakanYuk! 🍽️');
    }, 1000);
});