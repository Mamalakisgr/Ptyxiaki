<template>
  <header class="backoffice-header flex items-center justify-between">
    <div class="flex items-center space-x-6">
      <!-- Products Dropdown -->
      <div class="products-section relative group">
        <button class="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-700 transition-all duration-200">
          <span>Products</span>
          <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div class="products-dropdown absolute left-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg overflow-hidden transform opacity-0 scale-95 transition-all duration-200">
          <router-link 
            to="/admin/upload-product" 
            class="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
          >
            Upload Products
          </router-link>
          <router-link 
            to="/admin/edit-product" 
            class="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
          >
            Edit Products
          </router-link>
          <router-link 
            to="/admin/upload-tag" 
            class="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
          >
            Edit Tag/Category
          </router-link>
        </div>
      </div>

      <!-- Orders Link -->
      <router-link 
        to="/admin/edit-orders" 
        class="px-4 py-2 rounded-full hover:bg-gray-700 transition-all duration-200"
      >
        Orders
      </router-link>
    </div>

    <!-- Logout Button -->
    <button 
      @click="logout" 
      class="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Logout</span>
      </span>
    </button>
  </header>
</template>

<script setup>
const logout = () => {
  // Handle logout functionality
  console.log('Logging out...');
  // You can add actual logout logic here
}
</script>

<style scoped>
.backoffice-header {
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
}

.products-section:hover .products-dropdown {
  opacity: 1;
  transform: scale(100%);
  pointer-events: auto;
}

.products-dropdown {
  pointer-events: none;
  z-index: 50;
}

/* Ensure links are visible in dropdown */
.products-dropdown a {
  color: white;
}

/* Focus styles for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #60a5fa;
  outline-offset: 2px;
}
</style>