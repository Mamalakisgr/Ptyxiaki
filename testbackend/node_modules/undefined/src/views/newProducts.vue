<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-800">
      <div>
        <Breadcrumb :category="'New Products'" />
      </div>
      <div class="flex flex-col lg:flex-row mx-auto max-w-full bg-gray-500">
        <!-- Sidebar -->
        <div class="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
          <div class="sticky top-4 p-6">
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-xl font-bold text-center mb-4 bg-gray-200 rounded py-1">
                Categories
              </h2>
              <ul class="space-y-2">
                <!-- Static Categories -->
                <li>
                  <RouterLink
                    to="/offer-products"
                    class="block py-2 px-4 rounded hover:bg-blue-100 transition-colors"
                    :class="{ 'bg-blue-100 font-semibold': category === 'Offer Products' }"
                  >
                    Hot Offers!
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/product-list/hot-products"
                    class="block py-2 px-4 rounded hover:bg-blue-100 transition-colors"
                    :class="{ 'bg-blue-100 font-semibold': category === 'Hot Products' }"
                  >
                    Hot Products!
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    to="/new-products"
                    class="block py-2 px-4 rounded hover:bg-blue-100 transition-colors"
                    :class="{ 'bg-blue-100 font-semibold': category === 'New Products' }"
                  >
                    New Releases
                  </RouterLink>
                </li>
                
                <!-- Dynamic Categories -->
                <li v-for="cat in categories" :key="cat._id">
                  <RouterLink
                    :to="`/product-list/${cat}`"
                    class="block py-2 px-4 rounded hover:bg-blue-100 transition-colors"
                    :class="{ 'bg-blue-100 font-semibold': category === cat }"
                  >
                    {{ cat }}
                  </RouterLink>
                </li>
              </ul>
            </div>
            
            <!-- Filters Section -->
            <div class="sticky top-4 p-6 bg-gray-800 m-2 rounded-lg text-white">
              <div>
                <h2 class="text-xl text-center font-bold mb-4 p-1 rounded bg-gray-600">Filters</h2>
                <div>
                  <h3 class="text-lg font-semibold mb-2">Price Range</h3>
                  <input 
                    type="range" 
                    min="0" 
                    max="5000" 
                    v-model.number="filters.price" 
                    class="w-full"
                  />
                  <p>Max Price: {{ filters.price }}€</p>
                </div>
                <div class="mt-4">
                  <h3 class="text-lg font-semibold mb-2">Color</h3>
                  <select 
                    v-model="filters.color" 
                    class="w-full border rounded px-2 py-1 text-black"
                  >
                    <option value="">All</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                  </select>
                </div>
                <div class="mt-4">
                  <h3 class="text-lg font-semibold mb-2">Size</h3>
                  <select 
                    v-model="filters.size" 
                    class="w-full border rounded px-2 py-1 text-black"
                  >
                    <option value="">All</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
              <button 
                @click="clearFilters" 
                class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
  
        <!-- Products Section -->
        <div class="w-full lg:w-3/4 p-4 lg:ml-2 rounded dark:bg-gray-500">
          <!-- Sort Filter Bar -->
          <div class="mb-6 flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md dark:bg-gray-800">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white">New Arrivals</h2>
            <div class="flex items-center space-x-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">Sort by:</h3>
              <select 
                v-model="sortOrder" 
                @change="sortProducts" 
                class="border rounded px-2 py-1 text-black"
              >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>
  
          <!-- Products Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 dark:bg-gray-800 p-4 shadow rounded-t-lg">
            <div 
              v-for="product in paginatedProducts" 
              :key="product._id"
              class="relative group bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transform transition-transform duration-300 hover:-translate-y-1"
            >
              <!-- Product Image -->
              <div class="relative overflow-hidden aspect-w-1 aspect-h-1">
                <img 
                  :src="product.image" 
                  :alt="product.product_name"
                  class="object-cover w-full h-48 rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                />
                <!-- New Badge -->
                <div class="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  New Arrival
                </div>
              </div>
  
              <!-- Product Info -->
              <div class="px-5 pb-5">
                <RouterLink :to="`/product-details/${product._id}`">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-200">
                    {{ product.product_name }}
                  </h5>
                </RouterLink>
                
                <div class="flex items-center justify-between mt-3">
                  <div class="flex flex-col">
                    <span class="text-lg font-bold text-gray-900 dark:text-white">
                      {{ product.p_price }} €
                    </span>
                  </div>
                  <button 
                    @click="addToCart(product._id, 1)"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-200"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
  
              <!-- Wishlist Button -->
              <button 
                @click="toggleWishlist(product._id)" 
                class="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
              >
                <svg 
                  v-if="wishlist.includes(product._id)" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor"
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  class="w-6 h-6"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                  />
                </svg>
                <svg 
                  v-else 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2"
                    d="M3 8.5a5.5 5.5 0 0110.42-2.2A5.5 5.5 0 0121 8.5c0 3.58-3.28 6.44-8.28 11.05L12 20.35l-1.28-1.16C6.28 14.94 3 12.08 3 8.5z" 
                  />
                </svg>
              </button>
            </div>
          </div>
  
          <!-- Pagination -->
          <div class="flex justify-center mt-6 space-x-4">
            <button 
              @click="prevPage" 
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors duration-200"
            >
              Previous
            </button>
            <span class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { addToCart } from '@/js';
  import { wishlist, fetchWishlist, toggleWishlist } from '@/js/wishlist.js';
  import Breadcrumb from '../components/Breadcrump.vue';
  import { useRoute } from 'vue-router';
  import { backendUrl } from '@/js/index';
  import axios from 'axios';
  
  const categories = ref([]);
  const sortOrder = ref("asc");
  const currentPage = ref(1);
  const itemsPerPage = ref(12);
  const route = useRoute();
  const category = ref('New Products');
  
  const filters = ref({
    price: 5000,
    color: '',
    size: ''
  });
  
  const products = ref([]);
  const loading = ref(false);
  
  const fetchNewProducts = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${backendUrl}/api/products`, {
        params: { tag: 'NewArrivals' }
      });
  
      products.value = response.data.map(product => ({
        ...product,
        image: product.p_images
          ? `${backendUrl}/api/product-image/${product.p_images}`
          : '/images/fallback-product-image.jpg'
      }));
    } catch (error) {
      console.error('Error fetching new products:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/categories`);
      categories.value = response.data;
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };
  
  const clearFilters = () => {
    filters.value = {
      price: 5000,
      color: '',
      size: ''
    };
  };
  
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const productPrice = parseFloat(product.p_price);
      const maxPrice = parseFloat(filters.value.price);
      return productPrice <= maxPrice &&
        (!filters.value.color || product.color === filters.value.color) &&
        (!filters.value.size || product.size === filters.value.size);
    });
  });
  
  const sortedProducts = computed(() => {
    return filteredProducts.value.slice().sort((a, b) => {
      const priceA = parseFloat(a.p_price);
      const priceB = parseFloat(b.p_price);
      return sortOrder.value === "asc" ? priceA - priceB : priceB - priceA;
    });
  });
  
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return sortedProducts.value.slice(start, end);
  });
  
  const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage.value));
  
  const sortProducts = () => {
    currentPage.value = 1;
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
    }
  };
  
  watch(() => filters.value, () => {
    currentPage.value = 1;
  }, { deep: true });
  
  onMounted(() => {
    fetchNewProducts();
    fetchCategories();
    fetchWishlist();
  });
  </script>
  
  <style scoped>
  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s ease infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>