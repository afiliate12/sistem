const products = [
        { id: 1, name: "Headphone Pro Wireless", category: "Elektronik", price: 1200000, img: "https://www.dropbox.com/scl/fi/jxmfruq9lrxx9qztefp4o/1.png?rlkey=x4zzks0hdgf393rc5ae69jqep&st=ug8e16z8&dl=1" },
        { id: 2, name: "Smart Watch S3", category: "Gadget", price: 2500000, img: "https://www.dropbox.com/scl/fi/06qu9o3gnrowsxc4c576s/2.png?rlkey=nr1egorhxbktiaqjp71v8czz0&st=rai2us18&dl=1" },
        { id: 3, name: "Sepatu Lari Elite", category: "Lifestyle", price: 850000, img: "https://www.dropbox.com/scl/fi/421h5wxx2mibhf21ivqbj/3.png?rlkey=35jfssm26k8052cs298wrwv0e&st=d13muxr3&dl=1" },
        { id: 4, name: "Kacamata Hitam UV", category: "Fashion", price: 450000, img: "https://www.dropbox.com/scl/fi/2rlndqy7sf750iqu3smwp/4.png?rlkey=1l03t1nnlci4v6r2fk0ldqwe5&st=ytxoms5t&dl=1" },
        { id: 5, name: "Mekanikal Keyboard", category: "Gadget", price: 1100000, img: "https://www.dropbox.com/scl/fi/j1vpauedpswvz2j3g3ump/5.png?rlkey=akycj3ho0js8ed9osrfyb4alt&st=8rs4zdw3&dl=1" },
        { id: 6, name: "Headphone Pro Wireless", category: "Elektronik", price: 1200000, img: "https://www.dropbox.com/scl/fi/vxxvcr0ffjco5kgy093ol/6.png?rlkey=vhf94kgkuw3w74cfxrhhot8l7&st=j89u813w&dl=1" },
        { id: 7, name: "Smart Watch S3", category: "Gadget", price: 2500000, img: "https://www.dropbox.com/scl/fi/9m1d65fdv5bpzy7leem0f/7.png?rlkey=49q5rsijiwa11jgrqg30652ik&st=bi8n3shw&dl=1" },
        { id: 8, name: "Sepatu Lari Elite", category: "Lifestyle", price: 850000, img: "https://www.dropbox.com/scl/fi/jtnwykhqevr4ajkmxiqeo/8.png?rlkey=8q7we5658nyrgmm8sqthi6vy4&st=q1404a1i&dl=1" },
        { id: 9, name: "Kacamata Hitam UV", category: "Fashion", price: 450000, img: "https://www.dropbox.com/scl/fi/frl4kct5brxwfq3npmdfx/9.png?rlkey=lvgzs7pwvxxbhwctb0esuxrtb&st=09brjs1z&dl=1" },
        { id: 10, name: "Mekanikal Keyboard", category: "Gadget", price: 1100000, img: "https://www.dropbox.com/scl/fi/wxkcve7c7fowjxpianhhn/10.png?rlkey=oshhzzat51z8k83cw8ezk6my7&st=iulrvpgm&dl=1" }
    ];
    
    const musicList = [
    { id: 1, title: "Berita hari ini", artist: "Cards Id Purwanto", duration: "2:24", url: "https://www.dropbox.com/scl/fi/cxlidxlki5qd8y7e4graw/1.mp3?rlkey=p0r4arad6tpk1iy1fc2godslj&st=jszqap1h&dl=1" },
    { id: 2, title: "Kata kata indah hari ini", artist: "Cards Id Purwanto", duration: "3:10", url: "https://www.dropbox.com/scl/fi/p8x93iv5x8utru8yhf9g4/2.mp3?rlkey=5xis8n9u92mjw7do1fbunen9f&st=wjozt2ru&dl=1" },
    { id: 3, title: "Tutorial terbaik khusus hari ini", artist: "Cards Id Purwanto", duration: "4:05", url: "https://www.dropbox.com/scl/fi/1n43dgeaa0qxp8lfn0xih/3.mp3?rlkey=3au43htu4y9li7ge9fkqh4v8x&st=srvxl8hs&dl=1" },
    { id: 4, title: "Kata mutiara hari ini", artist: "Cards Id Purwanto", duration: "3:45", url: "https://www.dropbox.com/scl/fi/krjo7atz5pyzglqbzetyd/4.mp3?rlkey=vptqbobawgq6f7r7h4ca27g2v&st=kz23xejn&dl=1" },
    { id: 5, title: "Lagu pop indonesia", artist: "Cards Id Purwanto", duration: "2:58", url: "https://www.dropbox.com/scl/fi/we3cwmv2wyfrv55limm6s/5.mp3?rlkey=3lfaqdmljefiij8w51rbj2ctv&st=wpl6fks6&dl=1" },
    { id: 6, title: "Lagu dangdut indonesia", artist: "Cards Id Purwanto", duration: "3:15", url: "https://www.dropbox.com/scl/fi/wwir4ykfx03p8tgibdnh4/6.mp3?rlkey=6owrkxk6qkol04gljy15epxcz&st=mvrsnm8d&dl=1" },
    { id: 7, title: "Lagu anak anak", artist: "Cards Id Purwanto", duration: "5:20", url: "https://www.dropbox.com/scl/fi/vzx5zzayq3ot8m72uxdsz/7.mp3?rlkey=p1ba6alm2l3lnpld7svkfm9h9&st=vtopkum5&dl=1" },
    { id: 8, title: "Lagu pilihan islami", artist: "Cards Id Purwanto", duration: "3:30", url: "https://www.dropbox.com/scl/fi/89ng9x5q1edwlj2cuzhzp/8.mp3?rlkey=nu1fwx18j2yz0vg2aeercu5qw&st=r4wewi0x&dl=1" },
    { id: 9, title: "Koleksi lagu luar negeri", artist: "Cards Id Purwanto", duration: "4:12", url: "https://www.dropbox.com/scl/fi/i5q2acj6k8zna1ld808db/9.mp3?rlkey=gwq9fgctt3tl2xpt0gimm2yhl&st=xy3mc94r&dl=1" },
    { id: 10, title: "Pidato singkat khusus hari ini", artist: "Cards Id Purwanto", duration: "2:50", url: "https://www.dropbox.com/scl/fi/0ab6k2rbq6laien92lf61/10.mp3?rlkey=q63n4rlle0nb7wi4dzvb2vvm8&st=bl9a2ych&dl=1" }
    ];
    
    
    let cart = [];
    let wishlist = [];
    let currentCategory = 'All';
    let audioPlayer = new Audio();
    let currentPlaying = null;
    let isPlaying = false;
    
    window.onload = () => {
        renderProducts(products);
        renderSongs();
        updateCartUI();
    
        audioPlayer.ontimeupdate = () => {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            document.getElementById('music-progress').style.width = `${progress || 0}%`;
        };
    
        audioPlayer.onended = () => nextSong();
    };
