<template>
  <div class="min-h-screen bg-gray-800">
    <!-- Breadcrumb Section -->
    <div class="px-4 py-3 lg:py-6">
      <Breadcrumb :category="displayCategory" />
    </div>

    <div class="flex flex-col lg:flex-row mx-auto max-w-7xl px-4 pb-20 lg:pb-4">
      <!-- Mobile Category & Filter Buttons -->
      <div class="lg:hidden flex space-x-2 mb-4">
        <button 
          @click="toggleMobileCategories"
          class="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <span>Categories</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'rotate-180': showMobileCategories }" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <button 
          @click="toggleMobileFilters"
          class="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <span>Filters</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'rotate-180': showMobileFilters }" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Mobile Categories Drawer -->
      <div 
        v-if="showMobileCategories" 
        class="lg:hidden bg-gray-800 rounded-lg shadow-lg mb-4 overflow-hidden transition-all duration-300"
      >
        <div class="p-4">
          <h2 class="text-lg font-semibold text-white mb-4">Categories</h2>
          <div class="space-y-2">
            <RouterLink
              v-for="cat in ['offers', 'hot', 'new', ...categories]"
              :key="cat"
              :to="`/product-list/${cat}`"
              class="block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
              :class="{ 'bg-blue-600 text-white': category === cat }"
            >
              {{ cat === 'offers' ? 'Hot Offers!' : 
                 cat === 'hot' ? 'Hot Products!' :
                 cat === 'new' ? 'New Releases' : cat }}
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Mobile Filters Drawer -->
      <div 
        v-if="showMobileFilters" 
        class="lg:hidden bg-gray-800 rounded-lg shadow-lg mb-4 overflow-hidden transition-all duration-300"
      >
        <div class="p-4">
          <h2 class="text-lg font-semibold text-white mb-4">Filters</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
              <input
                type="range"
                min="0"
                max="5000"
                v-model.number="filters.price"
                class="w-full accent-blue-600"
              />
              <div class="flex justify-between text-sm text-gray-400 mt-1">
                <span>€0</span>
                <span>€{{ filters.price }}</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Color</label>
              <select v-model="filters.color" class="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border-0">
                <option value="">All Colors</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Size</label>
              <select v-model="filters.size" class="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border-0">
                <option value="">All Sizes</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <button
              @click="clearFilters"
              class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Desktop Sidebar -->
      <aside class="hidden lg:block lg:w-64 lg:mr-8">
        <div class="sticky top-4 space-y-6">
          <!-- Categories -->
          <div class="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-bold text-white mb-4">Categories</h2>
            <div class="space-y-2">
              <RouterLink
                v-for="cat in ['offers', 'hot', 'new', ...categories]"
                :key="cat"
                :to="`/product-list/${cat}`"
                class="block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                :class="{ 'bg-blue-600 text-white': category === cat }"
              >
                {{ cat === 'offers' ? 'Hot Offers!' : 
                   cat === 'hot' ? 'Hot Products!' :
                   cat === 'new' ? 'New Releases' : cat }}
              </RouterLink>
            </div>
          </div>

          <!-- Filters -->
          <div class="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-bold text-white mb-4">Filters</h2>
            <div class="space-y-4">
              <!-- Price Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  v-model.number="filters.price"
                  class="w-full accent-blue-600"
                />
                <div class="flex justify-between text-sm text-gray-400 mt-1">
                  <span>€0</span>
                  <span>€{{ filters.price }}</span>
                </div>
              </div>

              <!-- Color Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Color</label>
                <select v-model="filters.color" class="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border-0">
                  <option value="">All Colors</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
              </div>

              <!-- Size Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Size</label>
                <select v-model="filters.size" class="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border-0">
                  <option value="">All Sizes</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <button
                @click="clearFilters"
                class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1">
        <!-- Sort Bar -->
        <div class="bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
          <div class="flex flex-col sm:flex-row items-center justify-between">
            <h1 class="text-2xl font-bold text-white mb-4 sm:mb-0">{{ displayCategory }}</h1>
            <div class="flex items-center space-x-2">
              <label class="text-gray-300 text-sm">Sort by:</label>
              <select
                v-model="sortOrder"
                @change="sortProducts"
                class="bg-gray-700 text-white rounded-lg px-3 py-2 border-0"
              >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Hot Products Section -->
        <HotProducts v-if="showHotProducts" :hot-products="hotProducts" class="mb-6" />

        <!-- Products Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="product in paginatedProducts"
            :key="product._id"
            class="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <!-- Product Image -->
            <div class="relative aspect-square">
              <img
                :src="product.image"
                :alt="product.product_name"
                class="w-full h-full object-cover"
              />
              <div 
                v-if="showBadge"
                class="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold"
                :class="getBadgeClasses"
              >
                {{ getBadgeText }}
              </div>
              <!-- Wishlist Button -->
              <button
                @click="toggleWishlist(product._id)"
                class="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <svg
                  v-if="wishlist.includes(product._id)"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-5 h-5 text-red-500"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <RouterLink :to="`/product-details/${product._id}`">
                <h3 class="text-white font-medium mb-2 line-clamp-2">{{ product.product_name }}</h3>
              </RouterLink>
              <div class="flex items-center justify-between">
                <div>
                  <span v-if="product.offer_price" class="text-lg font-bold text-red-500">
                    €{{ product.offer_price }}
                  </span>
                  <span
                    v-if="product.offer_price"
                    class="text-sm text-gray-400 line-through ml-2"
                  >
                    €{{ product.p_price }}
                  </span>
                  <span v-else class="text-lg font-bold text-white">
                    €{{ product.p_price }}
                  </span>
                </div>
                <button
                  @click="addToCart(product._id, 1)"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-8 space-x-2">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
          <div class="px-4 py-2 bg-gray-700 text-white rounded-lg">
            {{ currentPage }} of {{ totalPages }}
          </div>
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Next
          </button>
        </div>
      </main>
    </div>
    <Footer/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { addToCart } from '@/js';
import Footer from '../components/Footer.vue';
import Breadcrumb from '../components/Breadcrump.vue';
import HotProducts from '@/components/HotProducts.vue';
import { wishlist, fetchWishlist, toggleWishlist } from '@/js/wishlist.js';
import { backendUrl } from '@/js/index';

const route = useRoute();
const products = ref([]);
const hotProducts = ref([]);
const categories = ref([]);
const showMobileCategories = ref(false);
const showMobileFilters = ref(false);
const filters = ref({
  price: 5000,
  color: '',
  size: ''
});
const sortOrder = ref("asc");
const currentPage = ref(1);
const itemsPerPage = ref(12);
const category = computed(() => route.params.categoryId);

const toggleMobileCategories = () => {
  showMobileCategories.value = !showMobileCategories.value;
  if (showMobileCategories.value) showMobileFilters.value = false;
};

const toggleMobileFilters = () => {
  showMobileFilters.value = !showMobileFilters.value;
  if (showMobileFilters.value) showMobileCategories.value = false;
};

const displayCategory = computed(() => {
  switch (category.value) {
    case 'offers':
      return 'Special Offers';
    case 'hot':
      return 'Hot Products';
    case 'new':
      return 'New Releases';
    default:
      return category.value;
  }
});

const showHotProducts = computed(() => {
  return !['offers', 'hot', 'new'].includes(category.value);
});

const showBadge = computed(() => {
  return ['offers', 'hot', 'new'].includes(category.value);
});

const getBadgeText = computed(() => {
  switch (category.value) {
    case 'offers':
      return 'Special Offer';
    case 'hot':
      return 'Hot Product';
    case 'new':
      return 'New Arrival';
    default:
      return '';
  }
});

const getBadgeClasses = computed(() => {
  switch (category.value) {
    case 'offers':
      return 'bg-red-600 text-white';
    case 'hot':
      return 'bg-orange-600 text-white';
    case 'new':
      return 'bg-green-600 text-white';
    default:
      return '';
  }
});

const fetchProducts = async () => {
  try {
    let params = {};
    
    switch (category.value) {
      case 'offers':
        params.hasOffer = true;
        break;
      case 'hot':
        params.tag = 'HotProducts';
        break;
      case 'new':
        params.tag = 'New';
        break;
      default:
        params.category = category.value;
    }

    const response = await axios.get(`${backendUrl}/api/products`, { params });
    products.value = response.data.map(product => ({
      ...product,
      image: product.p_images
        ? `${backendUrl}/api/product-image/${product.p_images}`
        : '/images/fallback-product-image.jpg'
    }));
  } catch (error) {
    console.error('Failed to fetch products', error);
  }
};

const fetchHotProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/products`, {
      params: { tag: 'HotProducts', category: category.value }
    });
    hotProducts.value = response.data.slice(0, 5).map(product => ({
      ...product,
      image: product.p_images
        ? `${backendUrl}/api/product-image/${product.p_images}`
        : '/images/fallback-product-image.jpg'
    }));
  } catch (error) {
    console.error('Error fetching hot products:', error);
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

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const productPrice = parseFloat(product.offer_price || product.p_price);
    const maxPrice = parseFloat(filters.value.price);
    return productPrice <= maxPrice &&
      (!filters.value.color || product.color === filters.value.color) &&
      (!filters.value.size || product.size === filters.value.size);
  });
});

const sortedProducts = computed(() => {
  return filteredProducts.value.slice().sort((a, b) => {
    const priceA = parseFloat(a.offer_price || a.p_price);
    const priceB = parseFloat(b.offer_price || b.p_price);
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

const clearFilters = () => {
  filters.value = {
    price: 5000,
    color: '',
    size: ''
  };
  showMobileFilters.value = false;
};

watch(() => route.params.categoryId, () => {
  currentPage.value = 1;
  showMobileCategories.value = false;
  showMobileFilters.value = false;
  fetchProducts();
  if (showHotProducts.value) {
    fetchHotProducts();
  }
  window.scrollTo(0, 0);
});

onMounted(() => {
  fetchProducts();
  if (showHotProducts.value) {
    fetchHotProducts();
  }
  fetchCategories();
  fetchWishlist();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1 / 1;
}

@media (max-width: 1024px) {
  .sticky {
    position: relative;
    top: 0;
  }
}
</style>