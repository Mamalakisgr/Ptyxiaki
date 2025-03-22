<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside class="w-72 bg-white dark:bg-gray-800 p-6 shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Categories</h2>
      <div class="space-y-4">
        <div v-for="category in categories" :key="category.name" class="rounded-lg overflow-hidden">
          <button 
            @click="toggleCategory(category)" 
            class="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <span class="font-medium text-gray-700 dark:text-gray-200">{{ category.name }}</span>
            <svg 
              class="w-5 h-5 text-gray-500 transform transition-transform duration-200"
              :class="{ 'rotate-180': openCategoryName === category.name }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div 
            v-if="openCategoryName === category.name" 
            class="bg-white dark:bg-gray-800 border-l-4 border-blue-500"
          >
            <ul class="py-2">
              <li 
                v-for="product in category.products" 
                :key="product._id" 
                class="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div class="flex items-center justify-between">
                  <span class="text-gray-700 dark:text-gray-300 truncate max-w-[180px]">
                    {{ product.product_name }}
                  </span>
                  <div class="flex space-x-2">
                    <button 
                      @click="editProduct(product)" 
                      class="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      @click="confirmDeleteProduct(product._id)" 
                      class="text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <div v-if="selectedProduct" class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Update product information and settings</p>
        </div>

        <form @submit.prevent="updateProduct" class="p-6 space-y-6">
          <!-- Product Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
            <input 
              v-model="selectedProduct.product_name" 
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
              type="text" 
              required 
            />
          </div>

          <!-- Price Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Regular Price</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">€</span>
                <input 
                  v-model="selectedProduct.p_price" 
                  class="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                  type="number" 
                  step="0.01" 
                  required 
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Offer Price</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">€</span>
                <input 
                  v-model="selectedProduct.offer_price" 
                  class="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                  type="number" 
                  step="0.01" 
                />
              </div>
            </div>
          </div>

          <!-- Category and Quantity -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select 
                v-model="selectedProduct.p_category" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                required
              >
                <option v-for="category in categories" :key="category.name" :value="category.name">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
              <input 
                v-model="selectedProduct.p_quantity" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                type="number" 
                min="0" 
                required 
              />
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
            <div class="flex items-center space-x-2 mb-3">
              <select 
                v-model="newTag" 
                class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select a tag</option>
                <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
              </select>
              <button 
                type="button" 
                @click="addTag" 
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Add
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in selectedProduct.p_tag" 
                :key="tag" 
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {{ tag }}
                <button 
                  @click="removeTag(tag)" 
                  class="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Image</label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600 dark:text-gray-400">
                  <label class="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a file</span>
                    <input @change="handleFileUpload" type="file" class="sr-only" accept="image/*">
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-4">
            <button 
              type="button" 
              @click="selectedProduct = null" 
              class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>

      <!-- Empty State -->
      <div 
        v-else 
        class="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400"
      >
        <svg class="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="text-lg font-medium">No Product Selected</h3>
        <p class="mt-1">Select a product from the sidebar to edit its details</p>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="showDeleteModal" 
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          @click="cancelDelete"
        ></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  Delete Product
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="deleteProduct" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button 
              type="button" 
              @click="cancelDelete" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { backendUrl } from '@/js/index';

const categories = ref([]);
const availableTags = ref([]);
const selectedProduct = ref(null);
const openCategoryName = ref(null);
const showDeleteModal = ref(false);
const productIdToDelete = ref(null);
const newTag = ref('');

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories`);
    categories.value = response.data.map(category => ({
      name: category,
      products: []
    }));

    for (const category of categories.value) {
      try {
        const productsResponse = await axios.get(`${backendUrl}/api/products`, {
          params: { category: category.name }
        });
        category.products = productsResponse.data;
      } catch (productsError) {
        console.error(`Error fetching products for category ${category.name}:`, productsError);
      }
    }
  } catch (error) {
    console.error('Error fetching categories and products:', error);
  }
};

const fetchTags = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/tags`);
    availableTags.value = response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
  }
};

const toggleCategory = (category) => {
  openCategoryName.value = openCategoryName.value === category.name ? null : category.name;
};

const editProduct = (product) => {
  selectedProduct.value = { 
    ...product,
    p_tag: Array.isArray(product.p_tag) ? product.p_tag : [product.p_tag]
  };
};

const handleFileUpload = (event) => {
  selectedProduct.value.image = event.target.files[0];
};

const addTag = () => {
  if (newTag.value && !selectedProduct.value.p_tag.includes(newTag.value)) {
    selectedProduct.value.p_tag.push(newTag.value);
    newTag.value = '';
  }
};

const removeTag = (tag) => {
  selectedProduct.value.p_tag = selectedProduct.value.p_tag.filter(t => t !== tag);
};

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

    await axios.put(`${backendUrl}/api/products/${selectedProduct.value._id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    await fetchCategories();
    selectedProduct.value = null;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

const confirmDeleteProduct = (productId) => {
  productIdToDelete.value = productId;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  productIdToDelete.value = null;
};

const deleteProduct = async () => {
  try {
    await axios.delete(`${backendUrl}/api/products/${productIdToDelete.value}`);
    await fetchCategories();
    cancelDelete();
    selectedProduct.value = null;
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

onMounted(() => {
  fetchCategories();
  fetchTags();
});
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
</style>