<template>
  <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
    <!-- Header -->
    <div class="bg-gray-700 p-6">
      <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>Cart Summary</span>
      </h2>
    </div>

    <!-- Cart Items -->
    <div class="p-6 space-y-4">
      <TransitionGroup 
        name="list" 
        tag="div" 
        class="space-y-4"
      >
        <Item 
          v-for="(item, i) in items" 
          :key="item.id || i" 
          :item="item" 
          class="transform transition-all duration-300"
        />
      </TransitionGroup>

      <!-- Empty State -->
      <div v-if="!items.length" class="text-center py-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p class="text-gray-400">Your cart is empty</p>
      </div>

      <!-- Price Breakdown -->
      <div v-if="items.length" class="space-y-4 mt-8">
        <!-- Original Price -->
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-400">Original Price</span>
          <span class="text-gray-100 font-medium">€{{ originalPrice.toFixed(2) }}</span>
        </div>

        <!-- Savings -->
        <div v-if="savings > 0" class="flex justify-between items-center text-sm bg-green-900/20 p-3 rounded-lg">
          <span class="text-green-400 flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>Your Savings</span>
          </span>
          <span class="text-green-400 font-medium">-€{{ savings.toFixed(2) }}</span>
        </div>

        <!-- Delivery -->
        <div v-if="deliveryPickup > 0" class="flex justify-between items-center text-sm">
          <span class="text-gray-400 flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span>Delivery</span>
          </span>
          <span class="text-gray-100 font-medium">€{{ deliveryPickup }}</span>
        </div>

        <!-- Tax -->
        <div v-if="tax > 0" class="flex justify-between items-center text-sm">
          <span class="text-gray-400">Tax (8%)</span>
          <span class="text-gray-100 font-medium">€{{ tax.toFixed(2) }}</span>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-700 my-4"></div>

        <!-- Total -->
        <div class="flex justify-between items-center text-lg font-bold">
          <span class="text-white">Total</span>
          <span class="text-white">€{{ totalPrice.toFixed(2) }}</span>
        </div>

        <!-- Savings Summary -->
        <div v-if="savings > 0" class="mt-4 bg-green-900/20 rounded-lg p-4 text-center">
          <p class="text-green-400 text-sm">
            You're saving €{{ savings.toFixed(2) }} on your order!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { backendUrl } from "@/js/index";

export default {
  name: "Summary",
  components: {
    Item,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    deliveryOption: {
      type: String,
      required: true,
    },
  },
  emits: ['update:totalPrice'],
  setup(props, { emit }) {
    const cartItems = ref([]);

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/cart-items`, {
          withCredentials: true,
        });
        cartItems.value = response.data.items;
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    onMounted(() => {
      fetchCartItems();
    });

    const originalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => {
        return total + (item.price || 0) * (item.quantity || 0);
      }, 0);
    });

    const savings = computed(() => {
      return cartItems.value.reduce((total, item) => {
        const itemSavings = (item.price || 0) - (item.offer_price || item.price);
        return total + itemSavings * (item.quantity || 0);
      }, 0);
    });

    const deliveryPickup = computed(() => {
      return props.deliveryOption === "pickup" ? 0 : 99;
    });

    const taxRate = 0.08;
    const tax = computed(() => {
      return originalPrice.value * taxRate;
    });

    const totalPrice = computed(() => {
      const total = originalPrice.value - savings.value + deliveryPickup.value;
      emit('update:totalPrice', total);
      return total;
    });

    watch(() => props.deliveryOption, () => {
      emit('update:totalPrice', totalPrice.value);
    });

    return {
      items: cartItems,
      originalPrice,
      savings,
      deliveryPickup,
      tax,
      totalPrice,
    };
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

/* Hover effect for interactive elements */
.hover-effect {
  @apply transition-all duration-300 ease-in-out;
}

.hover-effect:hover {
  @apply transform scale-105;
}

/* Custom scrollbar for the items list */
.items-container {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.600') theme('colors.gray.800');
}

.items-container::-webkit-scrollbar {
  width: 8px;
}

.items-container::-webkit-scrollbar-track {
  background: theme('colors.gray.800');
}

.items-container::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.600');
  border-radius: 4px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .items-container {
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>