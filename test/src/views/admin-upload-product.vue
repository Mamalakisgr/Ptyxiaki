<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
    <!-- Success Message Toast -->
    <div 
      v-if="showSuccessMessage"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-slide-in"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Product uploaded successfully!</span>
    </div>

    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Fill in the details to add a new product to your store</p>
      </div>

      <!-- Main Form Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <form @submit.prevent="uploadProduct" enctype="multipart/form-data" class="p-6 space-y-8">
          <!-- Image Upload Section -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Image</label>
            <div 
              class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg relative"
              :class="{ 'border-red-500 dark:border-red-500': imageError }"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
            >
              <!-- Preview Image -->
              <div v-if="imagePreview" class="relative group">
                <img 
                  :src="imagePreview" 
                  alt="Product preview" 
                  class="h-48 w-auto object-contain rounded-lg"
                />
                <div 
                  class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg"
                >
                  <button 
                    type="button"
                    @click="removeImage"
                    class="text-white hover:text-red-500 transition-colors duration-200"
                  >
                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Upload Interface -->
              <div v-else class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600 dark:text-gray-400">
                  <label class="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input 
                      type="file" 
                      @change="handleFileUpload" 
                      accept="image/*" 
                      class="sr-only" 
                      required
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>

              <!-- Loading Spinner -->
              <div 
                v-if="isUploading" 
                class="absolute inset-0 bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 flex items-center justify-center"
              >
                <div class="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              </div>
            </div>

            <!-- Error Message -->
            <p v-if="imageError" class="text-sm text-red-600 dark:text-red-400 mt-1">
              {{ imageError }}
            </p>
          </div>

          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Product Name -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
              <input 
                v-model="product.name" 
                type="text" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter product name"
                required 
              />
            </div>

            <!-- Price Fields -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Regular Price</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">€</span>
                <input 
                  v-model="product.price" 
                  type="number" 
                  step="0.01"
                  class="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="0.00"
                  required 
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Offer Price</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">€</span>
                <input 
                  v-model="product.offerPrice" 
                  type="number" 
                  step="0.01"
                  class="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <!-- Category and Brand -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select 
                v-model="product.category" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required 
              >
                <option value="">Select a category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand</label>
              <input 
                v-model="product.brand" 
                type="text" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter brand name"
                required 
              />
            </div>

            <!-- Quantity -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
              <input 
                v-model="product.quantity" 
                type="number" 
                min="0"
                class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter quantity"
                required 
              />
            </div>

            <!-- Tags -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
              <div class="flex items-center space-x-2 mb-2">
                <select 
                  v-model="selectedTag" 
                  class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select a tag</option>
                  <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
                </select>
                <button 
                  type="button" 
                  @click="addTag" 
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Add Tag
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in product.tags" 
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
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-6">
            <button 
              type="submit" 
              class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Upload Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { backendUrl } from '@/js/index';

// Add new ref for success message
const showSuccessMessage = ref(false);

const product = ref({
  name: '',
  price: '',
  category: '',
  tags: [],
  brand: '',
  quantity: '',
  offerPrice: '',
  image: null,
});

const categories = ref([]);
const tags = ref([]);
const selectedTag = ref('');
const imagePreview = ref(null);
const imageError = ref('');
const isUploading = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  validateAndProcessImage(file);
};

const handleFileDrop = (event) => {
  const file = event.dataTransfer.files[0];
  validateAndProcessImage(file);
};

const validateAndProcessImage = (file) => {
  imageError.value = '';
  
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    imageError.value = 'Please upload a valid image file (PNG, JPG, or GIF)';
    return;
  }

  // Validate file size (10MB max)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    imageError.value = 'Image size must be less than 10MB';
    return;
  }

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);

  // Store file for upload
  product.value.image = file;
};

const removeImage = () => {
  imagePreview.value = null;
  product.value.image = null;
  imageError.value = '';
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories`);
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const fetchTags = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/tags`);
    tags.value = response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
  }
};

const addTag = () => {
  if (selectedTag.value && !product.value.tags.includes(selectedTag.value)) {
    product.value.tags.push(selectedTag.value);
    selectedTag.value = '';
  }
};

const removeTag = (tag) => {
  product.value.tags = product.value.tags.filter(t => t !== tag);
};

const uploadProduct = async () => {
  if (!product.value.image) {
    imageError.value = 'Please select an image for the product';
    return;
  }

  isUploading.value = true;
  const formData = new FormData();
  formData.append('name', product.value.name);
  formData.append('price', product.value.price);
  formData.append('p_category', product.value.category);
  formData.append('p_tag', product.value.tags.join(','));
  formData.append('p_brand', product.value.brand);
  formData.append('p_quantity', product.value.quantity);
  formData.append('offer_price', product.value.offerPrice);
  formData.append('productImage', product.value.image);

  try {
    await axios.post(`${backendUrl}/api/upload-product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Show success message
    showSuccessMessage.value = true;
    setTimeout(() => {
      showSuccessMessage.value = false;
    }, 3000);

    resetForm();
  } catch (error) {
    console.error('Error uploading product:', error);
    imageError.value = 'Failed to upload product. Please try again.';
  } finally {
    isUploading.value = false;
  }
};

const resetForm = () => {
  product.value = {
    name: '',
    price: '',
    category: '',
    tags: [],
    brand: '',
    quantity: '',
    offerPrice: '',
    image: null,
  };
  selectedTag.value = '';
  imagePreview.value = null;
  imageError.value = '';
};

onMounted(() => {
  fetchCategories();
  fetchTags();
});
</script>

<style scoped>
/* Focus styles */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/* Smooth transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Add new styles for drag and drop */
.border-dashed {
  border-style: dashed;
}

/* Loading spinner animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Add new animation for success message */
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