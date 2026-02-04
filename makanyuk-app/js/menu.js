// Menu Data
const menuData = [
    {
        id: 1,
        name: "Nasi Goreng Spesial",
        description: "Nasi goreng dengan telur, ayam, sayuran, dan sosis spesial",
        price: 25000,
        category: "sarapan",
        image: "images/nasigoreng.jpg",
        rating: 4.8,
        preparationTime: "15-20 menit",
        isPopular: true
    },
    {
        id: 2,
        name: "Ayam Bakar Madu",
        description: "Ayam bakar dengan bumbu madu spesial, lalapan segar, dan sambal terasi",
        price: 32000,
        category: "makan-malam",
        image: "images/ayambakar.jpg",
        rating: 4.9,
        preparationTime: "25-30 menit",
        isPopular: true
    },
    {
        id: 3,
        name: "Sate Ayam",
        description: "10 tusuk sate ayam dengan bumbu kacang khas dan lontong",
        price: 28000,
        category: "makan-malam",
        image: "images/sateayam.jpg",
        rating: 4.7,
        preparationTime: "20-25 menit",
        isPopular: false
    },
    {
        id: 4,
        name: "Mie Goreng Jawa",
        description: "Mie goreng dengan sayuran segar, telur, dan ayam suwir",
        price: 22000,
        category: "sarapan",
        image: "images/migoreng.jpg",
        rating: 4.6,
        preparationTime: "15-20 menit",
        isPopular: true
    },
    {
        id: 5,
        name: "Cappuccino",
        description: "Rasa kopi yang kuat namun tidak pahit, sering dihiasi bubuk cokelat atau kayu manis",
        price: 20000,
        category: "minuman",
        image: "images/Cappuccino.jpg",
        rating: 4.5,
        preparationTime: "15 menit",
        isPopular: false
    },
    {
        id: 6,
        name: "Jus Alpukat",
        description: "Jus alpukat creamy dengan susu kental manis dan coklat cair",
        price: 18000,
        category: "minuman",
        image: "images/jusalpukat.jpg",
        rating: 4.8,
        preparationTime: "10 menit",
        isPopular: true
    },
    {
        id: 7,
        name: "Kentang Goreng",
        description: "Kentang goreng renyah dengan saus tomat dan mayonnaise",
        price: 15000,
        category: "snack",
        image: "images/kentang.jpg",
        rating: 4.4,
        preparationTime: "10-15 menit",
        isPopular: false
    },
    {
        id: 8,
        name: "Matcha Latte",
        description: "Matcha latte dengan susu kental manis dan topping sesuai pilihan",
        price: 25000,
        category: "minuman",
        image: "images/matchalatte.jpg",
        rating: 4.9,
        preparationTime: "30-35 menit",
        isPopular: true
    },
    {
        id: 9,
        name: "Dimsum Mentai",
        description: "Dimsum dengan saus mentai yang pedas dan lezat",
        price: 20000,
        category: "snack",
        image: "images/DimsumMentai.jpg",
        rating: 4.6,
        preparationTime: "20-25 menit",
        isPopular: false
    },
    {
        id: 10,
        name: "Pisang Goreng Coklat Keju",
        description: "Pisang goreng dengan coklat dan keju di atasnya",
        price: 25000,
        category: "snack",
        image: "images/PisangGoreng.jpg",
        rating: 4.7,
        preparationTime: "15 menit",
        isPopular: true
    },
    {
        id: 11,
        name: "Es Jeruk",
        description: "Es jeruk segar dengan sedikit madu dan biji selasih",
        price: 12000,
        category: "minuman",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        preparationTime: "5 menit",
        isPopular: false
    },
    {
        id: 12,
        name: "Roti Bakar",
        description: "Roti bakar dengan keju, coklat, dan meses warna-warni",
        price: 15000,
        category: "snack",
        image: "images/Rotibakar.jpg",
        rating: 4.4,
        preparationTime: "10 menit",
        isPopular: true
    },
    {
        id: 13,
        name: "Tongseng Ayam",
        description: "Tongseng Ayam dengan kuah santan gurih",
        price: 35000,
        category: "makan-siang",
        image: "images/TongsengAyam.jpg",
        rating: 4.5,
        preparationTime: "10 menit",
        isPopular: false
    },
    {
        id: 14,
        name: "Sayur Asem",
        description: "Sayur asem adalah hidangan berkuah segar dengan cita rasa asam yang khas",
        price: 20000,
        category: "makan-siang",
        image: "images/SayurAsem.jpg",
        rating: 4.3,
        preparationTime: "15 menit",
        isPopular: false
    },
    {
        id: 15,
        name: "Soto Ayam",
        description: "Soto ayam adalah sup khas Indonesia berkuah kuning yang gurih, berisi potongan ayam.",
        price: 25000,
        category: "sarapan",
        image: "images/SotoAyam.jpg",
        rating: 4.5,
        preparationTime: "15 menit",
        isPopular: true
    },
];

// Current category
let currentCategory = 'all';

// Load menu function
function loadMenu() {
    const menuGrid = document.getElementById('menuGrid');
    
    if (!menuGrid) {
        console.error('Menu grid element not found');
        return;
    }
    
    // Clear existing menu
    menuGrid.innerHTML = '';
    
    // Filter menu items by category
    const filteredMenu = currentCategory === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === currentCategory);
    
    // Show message if no items found
    if (filteredMenu.length === 0) {
        menuGrid.innerHTML = `
            <div class="no-menu-items">
                <i class="fas fa-utensils-slash"></i>
                <h3>Tidak ada menu untuk kategori ini</h3>
                <p>Silakan pilih kategori lain</p>
            </div>
        `;
        return;
    }
    
    // Create menu cards
    filteredMenu.forEach(item => {
        const menuCard = createMenuCard(item);
        menuGrid.appendChild(menuCard);
    });
}

// Create menu card element
function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.dataset.id = item.id;
    card.dataset.category = item.category;
    
    // Format price with thousand separator
    const formattedPrice = item.price.toLocaleString('id-ID');
    
    card.innerHTML = `
        <div class="menu-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            ${item.isPopular ? '<span class="menu-badge">🔥 Popular</span>' : ''}
        </div>
        <div class="menu-content">
            <div class="menu-header">
                <h3 class="menu-title">${item.name}</h3>
                <div class="menu-rating">
                    <i class="fas fa-star"></i>
                    <span>${item.rating}</span>
                    <span class="menu-time">${item.preparationTime}</span>
                </div>
            </div>
            <p class="menu-desc">${item.description}</p>
            <div class="menu-footer">
                <div class="menu-price-info">
                    <div class="menu-price">Rp ${formattedPrice}</div>
                    <div class="menu-stock">Tersedia</div>
                </div>
                <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listener to add-to-cart button
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        addToCart(item.id);
    });
    
    return card;
}

// Add item to cart
function addToCart(itemId) {
    const item = menuData.find(m => m.id === itemId);
    
    if (!item) {
        console.error('Item not found:', itemId);
        return;
    }
    
    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    // Save to localStorage
    saveCart();
    
    // Update cart display
    updateCartDisplay();
    updateCartCount();
    
    // Show notification
    showNotification(`${item.name} ditambahkan ke keranjang! 🛒`);
    
    // Open cart if it's the first item
    if (cart.length === 1) {
        setTimeout(() => {
            toggleCart();
        }, 500);
    }
    
    // Add animation to cart button
    const cartToggleBtn = document.getElementById('cartToggleBtn');
    if (cartToggleBtn) {
        cartToggleBtn.classList.add('pulse');
        setTimeout(() => {
            cartToggleBtn.classList.remove('pulse');
        }, 300);
    }
}

// Search functionality (optional)
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm.length === 0) {
                loadMenu();
                return;
            }
            
            const filteredMenu = menuData.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );
            
            displaySearchResults(filteredMenu);
        });
    }
}

// Display search results
function displaySearchResults(results) {
    const menuGrid = document.getElementById('menuGrid');
    
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    if (results.length === 0) {
        menuGrid.innerHTML = `
            <div class="no-search-results">
                <i class="fas fa-search"></i>
                <h3>Tidak ditemukan</h3>
                <p>Tidak ada menu yang cocok dengan pencarian Anda</p>
            </div>
        `;
        return;
    }
    
    results.forEach(item => {
        const menuCard = createMenuCard(item);
        menuGrid.appendChild(menuCard);
    });
}

// Sort menu (optional)
function sortMenu(sortBy) {
    let sortedMenu = [...menuData];
    
    switch(sortBy) {
        case 'price-low':
            sortedMenu.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedMenu.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedMenu.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            sortedMenu.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default sorting
            sortedMenu = menuData;
    }
    
    // Re-display sorted menu
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    // Apply current category filter
    const filteredMenu = currentCategory === 'all' 
        ? sortedMenu 
        : sortedMenu.filter(item => item.category === currentCategory);
    
    filteredMenu.forEach(item => {
        const menuCard = createMenuCard(item);
        menuGrid.appendChild(menuCard);
    });
}

// Initialize menu on page load
document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    initSearch();
    
    // Add sort functionality if needed
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            sortMenu(e.target.value);
        });
    }
});

// Export functions if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        menuData,
        loadMenu,
        addToCart,
        sortMenu
    };
}