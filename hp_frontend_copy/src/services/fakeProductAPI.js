// Sample product data
const products = {
    smartphones: [
        {
            id: 1,
            name: "iPhone 14 Pro 256GB Space Black",
            brand: "Apple",
            price: 82999,
            rating: 4.8,
            image: "https://s3no.cashify.in/cashify/store/product//75a3920ea81e4df5b6935fcb21ab1f65.jpg?p=default&s=lg",
            storage: "256GB",
            ram: "6GB",
            category: "Premium",
            type: "smartphones"
        },
        {
            id: 2,
            name: "Samsung Galaxy S23 Ultra 512GB Phantom Black",
            brand: "Samsung",
            price: 99999,
            rating: 4.9,
            image: "https://s3no.cashify.in/cashify/store/product/210c9961154c48f1be19316433ae29be.jpg?p=default&s=lg",
            storage: "512GB",
            ram: "12GB",
            category: "Premium",
            type: "smartphones"
        },
        {
            id: 3,
            name: "Google Pixel 7 Pro 256GB Obsidian",
            brand: "Google",
            price: 74999,
            rating: 4.7,
            image: "https://s3no.cashify.in/cashify/store/product/e6796b74196f400c9351c867c396ef7b.jpg?p=default&s=lg",
            storage: "256GB",
            ram: "12GB",
            category: "Premium",
            type: "smartphones"
        },
        {
            id: 4,
            name: "OnePlus 11 256GB Eternal Green",
            brand: "OnePlus",
            price: 57999,
            rating: 4.6,
            image: "https://s3no.cashify.in/cashify/store/product/1c589b1344464d53a611349c069c6216.jpg?p=default&s=lg",
            storage: "256GB",
            ram: "16GB",
            category: "Premium",
            type: "smartphones"
        },
        {
            id: 5,
            name: "Xiaomi 13 Pro 256GB Ceramic Black",
            brand: "Xiaomi",
            price: 74999,
            rating: 4.5,
            image: "https://s3no.cashify.in/cashify/store/product/ed1987b44c0549eeaff78b9905635afa.jpg?p=default&s=lg",
            storage: "256GB",
            ram: "12GB",
            category: "Premium",
            type: "smartphones"
        },
        {
            id: 6,
            name: "Nothing Phone 2 256GB Dark Grey",
            brand: "Nothing",
            price: 49999,
            rating: 4.4,
            image: "https://s3no.cashify.in/cashify/store/product/49d84204e0c04f5db37342db0b1dc4fa.jpg?p=default&s=lg",
            storage: "256GB",
            ram: "12GB",
            category: "Mid-range",
            type: "smartphones"
        },
        {
            id: 24,
            name: "Samsung Galaxy A54 128GB Awesome Black",
            brand: "Samsung",
            price: 38999,
            rating: 4.3,
            image: "https://s3no.cashify.in/cashify/store/product/9a5f6e5e33504b38ae7c2b2ec5e1231f.jpg?p=default&s=lg",
            storage: "128GB",
            ram: "8GB",
            category: "Mid-range",
            type: "smartphones"
        },
        {
            id: 25,
            name: "Pixel 7a 128GB Charcoal",
            brand: "Google",
            price: 43999,
            rating: 4.4,
            image: "https://s3no.cashify.in/cashify/store/product/f4ac1478acce48388bdbd760b395da1e.jpg?p=default&s=lg",
            storage: "128GB",
            ram: "8GB",
            category: "Mid-range",
            type: "smartphones"
        },
        {
            id: 26,
            name: "Redmi Note 13 Pro+ 256GB Midnight Black",
            brand: "Xiaomi",
            price: 31999,
            rating: 4.2,
            image: "https://s3no.cashify.in/cashify/store/product/e04db74f968f40b7aaaa932780b93ad7.jpg?p=default&s=lg",
            storage: "256GB",
            ram: "12GB",
            category: "Mid-range",
            type: "smartphones"
        },
        {
            id: 27,
            name: "iQOO 12 256GB Legend",
            brand: "iQOO",
            price: 52999,
            rating: 4.5,
            image: "https://s3no.cashify.in/cashify/store/product/970552c4cd0a46f4b45ca9b4be440f7a.jpg?p=default&s=lg",
            storage: "256GB",
            ram: "12GB",
            category: "Premium",
            type: "smartphones"
        },
        {
            id: 28,
            name: "Realme 11 Pro+ 256GB Sunrise Beige",
            brand: "Realme",
            price: 27999,
            rating: 4.1,
            image: "https://s3no.cashify.in/cashify/store/product/54838bd02acc4b0ca556fad4dc249cb4.jpg?p=default&s=lg",
            storage: "256GB",
            ram: "8GB",
            category: "Mid-range",
            type: "smartphones"
        },
        {
            id: 29,
            name: "Motorola Edge 40 128GB Eclipse Black",
            brand: "Motorola",
            price: 29999,
            rating: 4.2,
            image: "https://s3no.cashify.in/cashify/store/product/ecee3012ef4749ff88e894837dc540d8.jpg?p=default&s=lg",
            storage: "128GB",
            ram: "8GB",
            category: "Mid-range",
            type: "smartphones"
        }
    ],
    smartwatches: [
        {
            id: 7,
            name: "Apple Watch Series 8 45mm Midnight Aluminum",
            brand: "Apple",
            price: 33999,
            rating: 4.7,
            image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKUQ3_VW_34FR+watch-45-alum-midnight-nc-8s_VW_34FR_WF_CO?wid=1400&hei=1400",
            features: "GPS, Heart Rate Monitor",
            category: "Premium",
            type: "smartwatches"
        },
        {
            id: 8,
            name: "Samsung Galaxy Watch 5 Pro 45mm Black Titanium",
            brand: "Samsung",
            price: 37999,
            rating: 4.6,
            image: "https://images.samsung.com/is/image/samsung/p6pim/in/2208/gallery/in-galaxy-watch5-pro-sm-r920nzkainu-533190299?$2052_1641_JPG$",
            features: "GPS, Body Composition",
            category: "Premium",
            type: "smartwatches"
        },
        {
            id: 9,
            name: "Garmin Fenix 7 47mm Slate Gray",
            brand: "Garmin",
            price: 57999,
            rating: 4.8,
            image: "https://m.media-amazon.com/images/I/61NYFHe3uEL._SL1500_.jpg",
            features: "Advanced GPS, Training",
            category: "Premium",
            type: "smartwatches"
        },
        {
            id: 10,
            name: "Fitbit Sense 2 Graphite Aluminum",
            brand: "Fitbit",
            price: 24999,
            rating: 4.4,
            image: "https://m.media-amazon.com/images/I/613MGc8BguL._SL1500_.jpg",
            features: "Health Tracking, ECG",
            category: "Mid-range",
            type: "smartwatches"
        }
    ],
    tablets: [
        {
            id: 11,
            name: "iPad Pro 12.9 256GB Space Gray",
            brand: "Apple",
            price: 91999,
            rating: 4.9,
            image: "https://m.media-amazon.com/images/I/81rxOSprYqL._SL1500_.jpg",
            storage: "256GB",
            category: "Premium",
            type: "tablets"
        },
        {
            id: 12,
            name: "Samsung Galaxy Tab S9 Ultra 512GB Graphite",
            brand: "Samsung",
            price: 99999,
            rating: 4.8,
            image: "https://m.media-amazon.com/images/I/71kgQosWURL._SL1500_.jpg",
            storage: "512GB",
            category: "Premium",
            type: "tablets"
        },
        {
            id: 13,
            name: "Microsoft Surface Pro 9 256GB Platinum",
            brand: "Microsoft",
            price: 82999,
            rating: 4.7,
            image: "https://m.media-amazon.com/images/I/51+iKnnyQeL._SL1080_.jpg",
            storage: "256GB",
            category: "Premium",
            type: "tablets"
        },
        {
            id: 14,
            name: "Lenovo Tab P12 Pro 128GB Storm Grey",
            brand: "Lenovo",
            price: 57999,
            rating: 4.5,
            image: "https://m.media-amazon.com/images/I/51b9LjzmPCL._SL1080_.jpg",
            storage: "128GB",
            category: "Mid-range",
            type: "tablets"
        }
    ],
    laptops: [
        {
            id: 15,
            name: "MacBook Pro 16 1TB Space Gray",
            brand: "Apple",
            price: 207999,
            rating: 4.9,
            image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673666",
            storage: "1TB SSD",
            ram: "32GB",
            category: "Premium",
            type: "laptops"
        },
        {
            id: 16,
            name: "Dell XPS 15 512GB Platinum Silver",
            brand: "Dell",
            price: 165999,
            rating: 4.8,
            image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9520/media-gallery/black/laptop-xps-9520-t-black-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402&qlt=100,1&resMode=sharp2&size=402,402&chrss=full",
            storage: "512GB SSD",
            ram: "16GB",
            category: "Premium",
            type: "laptops"
        },
        {
            id: 17,
            name: "Lenovo ThinkPad X1 Carbon 1TB Deep Black",
            brand: "Lenovo",
            price: 149999,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            storage: "1TB SSD",
            ram: "16GB",
            category: "Premium",
            type: "laptops"
        },
        {
            id: 18,
            name: "HP Spectre x360 512GB Nightfall Black",
            brand: "HP",
            price: 124999,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            storage: "512GB SSD",
            ram: "16GB",
            category: "Premium",
            type: "laptops"
        }
    ],
    accessories: [
        {
            id: 19,
            name: "AirPods Pro 2 White",
            brand: "Apple",
            price: 20999,
            rating: 4.8,
            image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361",
            features: "Active Noise Cancellation",
            category: "Premium",
            type: "accessories"
        },
        {
            id: 20,
            name: "Samsung Galaxy Buds2 Pro Graphite",
            brand: "Samsung",
            price: 16999,
            rating: 4.6,
            image: "https://m.media-amazon.com/images/I/61KVX-MbIUL._SL1500_.jpg",
            features: "360 Audio",
            category: "Premium",
            type: "accessories"
        },
        {
            id: 21,
            name: "Sony WH-1000XM5 Black",
            brand: "Sony",
            price: 32999,
            rating: 4.9,
            image: "https://m.media-amazon.com/images/I/51aXvjzcukL._SL1500_.jpg",
            features: "Best-in-class ANC",
            category: "Premium",
            type: "accessories"
        },
        {
            id: 22,
            name: "Apple Magic Keyboard Black",
            brand: "Apple",
            price: 24999,
            rating: 4.7,
            image: "https://m.media-amazon.com/images/I/71rSweOTEJL._SL1500_.jpg",
            features: "Backlit Keys",
            category: "Premium",
            type: "accessories"
        },
        {
            id: 23,
            name: "Samsung 45W Power Adapter Black",
            brand: "Samsung",
            price: 3999,
            rating: 4.5,
            image: "https://m.media-amazon.com/images/I/71hUPwNiLfL._SL1500_.jpg",
            features: "Super Fast Charging",
            category: "Mid-range",
            type: "accessories"
        }
    ]
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fake API service
const fakeProductAPI = {
    // Get products by category
    getProductsByCategory: async (category) => {
        await delay(800); // Simulate network delay
        return products[category] || [];
    },

    // Get all products
    getAllProducts: async () => {
        await delay(800);
        return Object.values(products).flat();
    },

    // Get product by ID
    getProductById: async (id) => {
        await delay(500);
        const allProducts = Object.values(products).flat();
        return allProducts.find(product => product.id === id);
    },

    // Get unique brands
    getBrands: async () => {
        await delay(300);
        const allProducts = Object.values(products).flat();
        return [...new Set(allProducts.map(product => product.brand))];
    },

    // Get unique categories
    getCategories: async () => {
        await delay(300);
        const allProducts = Object.values(products).flat();
        return [...new Set(allProducts.map(product => product.category))];
    }
};

export default fakeProductAPI; 