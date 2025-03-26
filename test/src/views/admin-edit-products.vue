<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Toast Messages -->
    <div 
      v-if="showSuccessToast"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-slide-in"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>{{ toastMessage }}</span>
    </div>

    <!-- Error Toast -->
    <div 
      v-if="showErrorToast"
      class="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-slide-in"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span>{{ toastMessage }}</span>
    </div>

    <!-- Product Selection Area -->
    <div class="container mx-auto p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Categories List -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Categories</h2>
          <div class="space-y-2">
            <div v-for="category in categories" :key="category" class="cursor-pointer">
              <div 
                @click="toggleCategory(category)"
                class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span class="text-gray-700 dark:text-gray-300">{{ category }}</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': openCategory === category }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <!-- Products in Category -->
              <div v-if="openCategory === category" class="mt-2 ml-4 space-y-2">
                <div 
                  v-for="product in categoryProducts[category]" 
                  :key="product._id"
                  @click="selectProduct(product)"
                  class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  :class="{ 'bg-blue-50 dark:bg-blue-900': selectedProduct?._id === product._id }"
                >
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ product.product_name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Form -->
        <div v-if="selectedProduct" class="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Product</h2>
          
          <form @submit.prevent="updateProduct" class="space-y-6">
            <!-- Product Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name
              </label>
              <input
                v-model="selectedProduct.product_name"
                type="text"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <!-- Price -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Regular Price
                </label>
                <input
                  v-model="selectedProduct.p_price"
                  type="number"
                  step="0.01"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Offer Price
                </label>
                <input
                  v-model="selectedProduct.offer_price"
                  type="number"
                  step="0.01"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <!-- Category and Brand -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  v-model="selectedProduct.p_category"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brand
                </label>
                <input
                  v-model="selectedProduct.p_brand"
                  type="text"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <!-- Image Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Image
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                <div class="space-y-1 text-center">
                  <div v-if="selectedProduct.image" class="mb-4">
                    <img 
                      :src="getImageUrl(selectedProduct.image)"
                      alt="Product preview"
                      class="mx-auto h-32 w-auto object-contain"
                    />
                    <button 
                      type="button"
                      @click="removeImage"
                      class="mt-2 text-red-500 hover:text-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                  <div v-else>
                    <label class="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input @change="handleFileUpload" type="file" class="sr-only" accept="image/*">
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="cancelEdit"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <!-- Empty State -->
        <div 
          v-else 
          class="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
        >
          <svg class="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Product Selected</h3>
          <p class="mt-1 text-gray-500 dark:text-gray-400">Select a product from the list to edit</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { backendUrl } from '@/js/index';

// State management
const categories = ref([]);
const categoryProducts = ref({});
const selectedProduct = ref(null);
const openCategory = ref(null);
const showSuccessToast = ref(false);
const showErrorToast = ref(false);
const toastMessage = ref('');

// Image URL handling
const getImageUrl = (image) => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (image instanceof File && typeof URL !== 'undefined' && URL.createObjectURL) {
    return URL.createObjectURL(image);
  }
  return '';
};

// Toast handling
const showToast = (message, isSuccess = true) => {
  toastMessage.value = message;
  if (isSuccess) {
    showSuccessToast.value = true;
    showErrorToast.value = false;
  } else {
    showSuccessToast.value = false;
    showErrorToast.value = true;
  }
  
  setTimeout(() => {
    showSuccessToast.value = false;
    showErrorToast.value = false;
  }, 3000);
};

// Fetch data
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories`);
    categories.value = response.data;
    
    // Fetch products for each category
    for (const category of categories.value) {
      const productsResponse = await axios.get(`${backendUrl}/api/products`, {
        params: { category }
      });
      categoryProducts.value[category] = productsResponse.data;
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    showToast('Failed to fetch categories', false);
  }
};

// Category handling
const toggleCategory = (category) => {
  openCategory.value = openCategory.value === category ? null : category;
};

// Product selection
const selectProduct = (product) => {
  selectedProduct.value = {
    ...product,
    image: product.p_images ? `${backendUrl}/api/product-image/${product.p_images}` : null,
    p_tag: Array.isArray(product.p_tag) ? product.p_tag : [product.p_tag]
  };
};

// Image handling
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (selectedProduct.value.image && typeof selectedProduct.value.image === 'string' && typeof URL !== 'undefined') {
      URL.revokeObjectURL(selectedProduct.value.image);
    }
    selectedProduct.value.image = file;
  }
};

const removeImage = () => {
  if (selectedProduct.value.image && typeof selectedProduct.value.image === 'string' && typeof URL !== 'undefined') {
    URL.revokeObjectURL(selectedProduct.value.image);
  }
  selectedProduct.value.image = null;
};

// Form actions
const updateProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('name', selectedProduct.value.product_name);
    formData.append('price', selectedProduct.value.p_price);
    formData.append('p_category', selectedProduct.value.p_category);
    formData.append('p_tag', selectedProduct.value.p_tag.join(','));
    formData.append('p_brand', selectedProduct.value.p_brand);
    formData.append('p_quantity', selectedProduct.value.p_quantity);
    formData.append('offer_price', selectedProduct.value.offer_price || '');

    if (selectedProduct.value.image instanceof File) {
      formData.append('productImage', selectedProduct.value.image);
    }

    const response = await axios.put(
      `${backendUrl}/api/products/${selectedProduct.value._id}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );

    if (response.data) {
      showToast('Product updated successfully!');
      await fetchCategories();
      selectProduct(response.data);
    }
  } catch (error) {
    console.error('Error updating product:', error);
    showToast('Failed to update product', false);
  }
};

const cancelEdit = () => {
  if (selectedProduct.value?.image && typeof selectedProduct.value.image === 'string' && typeof URL !== 'undefined') {
    URL.revokeObjectURL(selectedProduct.value.image);
  }
  selectedProduct.value = null;
};

// Lifecycle
onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}
</style>