// Variabel Global untuk menyimpan status aplikasi
let cart = [];
let wishlist = [];
let currentCategory = 'All';
let audioPlayer = new Audio();
let currentPlaying = null;
let isPlaying = false;

// Fungsi yang dijalankan saat halaman selesai dimuat
window.onload = () => {
    // Merender produk dan lagu pertama kali
    renderProducts(products);
    renderSongs();
    updateCartUI();

    // Logika Progress Bar Musik
    audioPlayer.ontimeupdate = () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        const progressBar = document.getElementById('music-progress');
        if (progressBar) progressBar.style.width = `${progress || 0}%`;
    };

    // Otomatis putar lagu berikutnya jika lagu selesai
    audioPlayer.onended = () => nextSong();
};

// --- LOGIKA PRODUK & FILTER ---

function renderProducts(data) {
    const container = document.getElementById('product-container');
    if (!container) return;
    container.innerHTML = '';
    
    data.forEach(product => {
        const isFavorite = wishlist.includes(product.id);
        container.innerHTML += `
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                <div class="relative h-40 overflow-hidden">
                    <img src="${product.img}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                    <button onclick="toggleWishlist(${product.id})" class="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'} shadow-sm">
                        <i class="${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                </div>
                <div class="p-3">
                    <span class="text-[10px] font-bold text-blue-500 uppercase">${product.category}</span>
                    <h4 class="text-sm font-semibold text-gray-800 line-clamp-1">${product.name}</h4>
                    <p class="text-blue-600 font-bold mt-1">Rp ${product.price.toLocaleString('id-ID')}</p>
                    <button onclick="addToCart(${product.id})" class="w-full mt-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 active:bg-blue-600 active:text-white transition-colors">
                        + Keranjang
                    </button>
                </div>
            </div>
        `;
    });
}

function filterCategory(category, btn) {
    currentCategory = category;
    const filtered = category === 'All' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);

    // Update UI tombol filter
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-white', 'text-gray-600');
    });
    btn.classList.remove('bg-white', 'text-gray-600');
    btn.classList.add('bg-blue-600', 'text-white');
}

// --- LOGIKA KERANJANG (CART) ---

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    showNotification("Produk ditambahkan ke keranjang!");
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    const badgeCount = document.getElementById('cart-count-badge');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-20">
                <i class="fa-solid fa-cart-shopping text-4xl text-gray-200 mb-2"></i>
                <p class="text-gray-400 text-sm">Keranjang masih kosong</p>
            </div>`;
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="flex items-center space-x-4 bg-gray-50 p-3 rounded-xl">
                    <img src="${item.img}" class="w-16 h-16 rounded-lg object-cover">
                    <div class="flex-1">
                        <h4 class="text-sm font-bold text-gray-800 line-clamp-1">${item.name}</h4>
                        <p class="text-blue-600 text-xs font-bold">Rp ${item.price.toLocaleString('id-ID')} (x${item.quantity})</p>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-red-400 p-2">
                        <i class="fa-solid fa-trash-can text-sm"></i>
                    </button>
                </div>
            `;
        });
    }

    totalDisplay.innerText = `Rp ${total.toLocaleString('id-ID')}`;
    badgeCount.innerText = count;
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const content = document.getElementById('cart-content');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => content.style.transform = 'translate(-50%, 0)', 10);
    } else {
        content.style.transform = 'translate(-50%, 100%)';
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

// --- LOGIKA WISHLIST ---

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) wishlist.splice(index, 1);
    else wishlist.push(productId);
    
    renderProducts(currentCategory === 'All' ? products : products.filter(p => p.category === currentCategory));
    if (!document.getElementById('wishlist-view').classList.contains('hidden')) renderWishlist();
}

function renderWishlist() {
    const container = document.getElementById('wishlist-items');
    if (!container) return;
    
    const favoriteProducts = products.filter(p => wishlist.includes(p.id));
    
    if (favoriteProducts.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-10 col-span-2">Belum ada barang favorit.</p>';
        return;
    }

    container.innerHTML = '';
    favoriteProducts.forEach(product => {
        container.innerHTML += `
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div class="relative h-32 overflow-hidden">
                    <img src="${product.img}" class="w-full h-full object-cover">
                    <button onclick="toggleWishlist(${product.id})" class="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-red-500 shadow-sm">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
                <div class="p-3 text-center">
                    <h4 class="text-xs font-semibold text-gray-800 line-clamp-1">${product.name}</h4>
                    <button onclick="addToCart(${product.id})" class="mt-2 text-[10px] text-blue-600 font-bold uppercase">Tambah +</button>
                </div>
            </div>
        `;
    });
}

// --- LOGIKA MUSIK ---

function renderSongs() {
    const container = document.getElementById('song-list');
    if (!container) return;
    container.innerHTML = '';
    musicList.forEach(song => {
        const isThisPlaying = currentPlaying?.id === song.id && isPlaying;
        container.innerHTML += `
            <div onclick="selectSong(${song.id})" class="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-transparent ${isThisPlaying ? 'border-blue-200 bg-blue-50/50' : ''} active:scale-95 transition-all cursor-pointer">
                <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-blue-600">
                        <i class="fa-solid ${isThisPlaying ? 'fa-volume-high' : 'fa-play'}"></i>
                    </div>
                    <div>
                        <h5 class="text-sm font-bold ${isThisPlaying ? 'text-blue-600' : 'text-gray-800'}">${song.title}</h5>
                        <p class="text-xs text-gray-400">${song.artist}</p>
                    </div>
                </div>
                <span class="text-[10px] font-medium text-gray-400">${song.duration}</span>
            </div>
        `;
    });
}

function selectSong(id) {
    const song = musicList.find(s => s.id === id);
    if (currentPlaying?.id === id) {
        togglePlayMain();
        return;
    }
    currentPlaying = song;
    audioPlayer.src = song.url;
    audioPlayer.play();
    isPlaying = true;
    updatePlayerUI();
    renderSongs();
}

function togglePlayMain() {
    if (!currentPlaying) { selectSong(musicList[0].id); return; }
    if (isPlaying) { audioPlayer.pause(); isPlaying = false; }
    else { audioPlayer.play(); isPlaying = true; }
    updatePlayerUI();
    renderSongs();
}

function updatePlayerUI() {
    const btn = document.getElementById('master-play-btn');
    const art = document.getElementById('music-art');
    document.getElementById('current-title').innerText = currentPlaying.title;
    document.getElementById('current-artist').innerText = currentPlaying.artist;
    
    if (isPlaying) {
        btn.innerHTML = '<i class="fa-solid fa-pause text-xl"></i>';
        art.classList.add('animate-spin-slow');
    } else {
        btn.innerHTML = '<i class="fa-solid fa-play text-xl ml-1"></i>';
        art.classList.remove('animate-spin-slow');
    }
}

function nextSong() {
    if (!currentPlaying) return;
    let index = musicList.findIndex(s => s.id === currentPlaying.id);
    index = (index + 1) % musicList.length;
    selectSong(musicList[index].id);
}

function prevSong() {
    if (!currentPlaying) return;
    let index = musicList.findIndex(s => s.id === currentPlaying.id);
    index = (index - 1 + musicList.length) % musicList.length;
    selectSong(musicList[index].id);
}

// --- NAVIGASI & NOTIFIKASI ---

function navigate(viewName) {
    ['home-view', 'wishlist-view', 'profile-view', 'music-view'].forEach(v => {
        const el = document.getElementById(v);
        if (el) el.classList.add('hidden');
    });
    
    const target = document.getElementById(`${viewName}-view`);
    if (target) target.classList.remove('hidden');

    // Update warna icon navbar
    const navIcons = { home: 'nav-home', wishlist: 'nav-wishlist', profile: 'nav-profile', music: 'nav-music' };
    Object.values(navIcons).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.replace('text-blue-600', 'text-gray-400');
    });
    const activeNav = document.getElementById(`nav-${viewName}`);
    if (activeNav) activeNav.classList.replace('text-gray-400', 'text-blue-600');

    if (viewName === 'wishlist') renderWishlist();
}

function showNotification(text) {
    const notif = document.getElementById('notification');
    if (!notif) return;
    notif.innerText = text;
    notif.style.transform = 'translate(-50%, 80px)';
    setTimeout(() => notif.style.transform = 'translate(-50%, -80px)', 2000);
}

// --- LOGIKA CHECKOUT WHATSAPP ---

function checkout() {
    const memberValue = document.getElementById('member-code').value.trim();
    const addressValue = document.getElementById('address').value.trim();
    
    if (cart.length === 0) {
        alert("Keranjang kosong!");
        return;
    }
    
    if (!memberValue || !addressValue) {
        alert("Harap isi Kode Iklan dan Alamat!");
        return;
    }
    
    const phoneNumber = "6285168901775"; 
    let message = "*PESANAN BARU*\n------------------------------\n";
    message += `*KODE IKLAN:* ${memberValue.toUpperCase()}\n`;
    message += `*ALAMAT:* ${addressValue}\n------------------------------\n\n`;
    
    let total = 0;
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `${index + 1}. *${item.name}* (${item.quantity}x)\n   Rp ${subtotal.toLocaleString('id-ID')}\n\n`;
    });
    
    let finalTotal = total;
    if (memberValue.toUpperCase() === "TETANGGAKU") {
        const discount = total * 0.1;
        finalTotal = total - discount;
        message += `Diskon Member: -Rp ${discount.toLocaleString('id-ID')}\n`;
    }
    
    message += `*TOTAL: Rp ${finalTotal.toLocaleString('id-ID')}*\n------------------------------\n`;
    message += "Mohon segera dikonfirmasi.";
    
    window.open(`https://wa.me/6285168901775?text=${encodeURIComponent(message)}`, '_blank');
    
    cart = []; 
    updateCartUI(); 
    toggleCart();
    showNotification("Pesanan dikirim!");
}

document.addEventListener('contextmenu', event => event.preventDefault());
  document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0))) {
      return false;
    }
