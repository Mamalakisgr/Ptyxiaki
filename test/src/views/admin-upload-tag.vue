<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Tags Section -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Upload Tags</h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Add new tags to categorize your products</p>
          </div>

          <div class="p-6">
            <form @submit.prevent="uploadTag" class="space-y-6">
              <div>
                <label for="tagName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tag Name
                </label>
                <div class="relative">
                  <input 
                    id="tagName"
                    v-model="tagName"
                    type="text"
                    placeholder="Enter new tag"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                  <div 
                    v-if="tagMessage" 
                    class="absolute right-0 top-0 bottom-0 flex items-center pr-3"
                  >
                    <svg 
                      v-if="tagMessageClass.includes('green')" 
                      class="h-5 w-5 text-green-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg 
                      v-else 
                      class="h-5 w-5 text-red-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <p 
                  v-if="tagMessage" 
                  :class="[tagMessageClass, 'mt-2 text-sm']"
                >
                  {{ tagMessage }}
                </p>
              </div>

              <button 
                type="submit"
                class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Tag
              </button>
            </form>
          </div>
        </div>

        <!-- Categories Section -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Upload Categories</h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Add new categories to organize your products</p>
          </div>

          <div class="p-6">
            <form @submit.prevent="uploadCategory" class="space-y-6">
              <div>
                <label for="categoryName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name
                </label>
                <div class="relative">
                  <input
                    id="categoryName"
                    v-model="categoryName"
                    type="text"
                    placeholder="Enter new category"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                  <div 
                    v-if="categoryMessage" 
                    class="absolute right-0 top-0 bottom-0 flex items-center pr-3"
                  >
                    <svg 
                      v-if="categoryMessageClass.includes('green')" 
                      class="h-5 w-5 text-green-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg 
                      v-else 
                      class="h-5 w-5 text-red-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <p 
                  v-if="categoryMessage" 
                  :class="[categoryMessageClass, 'mt-2 text-sm']"
                >
                  {{ categoryMessage }}
                </p>
              </div>

              <button 
                type="submit"
                class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { backendUrl } from '@/js/index';

const tagName = ref('');
const categoryName = ref('');
const tagMessage = ref('');
const categoryMessage = ref('');
const tagMessageClass = ref('');
const categoryMessageClass = ref('');

const showMessage = (message, isSuccess, isTag) => {
  if (isTag) {
    tagMessage.value = message;
    tagMessageClass.value = isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
    setTimeout(() => {
      tagMessage.value = '';
      tagMessageClass.value = '';
    }, 3000);
  } else {
    categoryMessage.value = message;
    categoryMessageClass.value = isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
    setTimeout(() => {
      categoryMessage.value = '';
      categoryMessageClass.value = '';
    }, 3000);
  }
};

const uploadTag = async () => {
  try {
    const response = await axios.post(`${backendUrl}/api/upload-tag`, { name: tagName.value });
    showMessage(response.data.message || 'Tag uploaded successfully', true, true);
    tagName.value = '';
  } catch (error) {
    showMessage(error.response?.data?.message || 'Failed to upload tag', false, true);
  }
};

const uploadCategory = async () => {
  try {
    const response = await axios.post(`${backendUrl}/api/upload-category`, { name: categoryName.value });
    showMessage(response.data.message || 'Category uploaded successfully', true, false);
    categoryName.value = '';
  } catch (error) {
    showMessage(error.response?.data?.message || 'Failed to upload category', false, false);
  }
};
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
  transition-duration: 200ms;
}
</style>