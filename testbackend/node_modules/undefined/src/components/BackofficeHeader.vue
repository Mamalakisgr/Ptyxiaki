<template>
  <header class="backoffice-header flex items-center justify-between">
    <div class="flex items-center space-x-6">
      <!-- Products Dropdown -->
      <div 
        class="products-section relative group"
        @mouseenter="showDropdown = true"
        @mouseleave="startHideTimer"
      >
        <button class="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-700 transition-all duration-200">
          <span>Products</span>
          <svg 
            class="w-4 h-4 transition-transform duration-200" 
            :class="{ 'rotate-180': showDropdown }"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div 
          class="products-dropdown absolute left-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
          :class="{ 
            'opacity-100 translate-y-0 pointer-events-auto': showDropdown,
            'opacity-0 -translate-y-2 pointer-events-none': !showDropdown 
          }"
          @mouseenter="clearHideTimer"
          @mouseleave="startHideTimer"
        >
          <router-link 
            to="/admin/upload-product" 
            class="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
            @click="hideDropdown"
          >
            Upload Products
          </router-link>
          <router-link 
            to="/admin/edit-product" 
            class="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
            @click="hideDropdown"
          >
            Edit Products
          </router-link>
          <router-link 
            to="/admin/upload-tag" 
            class="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
            @click="hideDropdown"
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
import { ref } from 'vue';

const showDropdown = ref(false);
const hideTimer = ref(null);

const startHideTimer = () => {
  hideTimer.value = setTimeout(() => {
    hideDropdown();
  }, 300); // 300ms delay before hiding
};

const clearHideTimer = () => {
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
    hideTimer.value = null;
  }
};

const hideDropdown = () => {
  showDropdown.value = false;
};

const logout = () => {
  // Handle logout functionality
  console.log('Logging out...');
  // You can add actual logout logic here
};
</script>

<style scoped>
.backoffice-header {
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
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

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>