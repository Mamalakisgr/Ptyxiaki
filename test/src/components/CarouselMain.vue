<template>
  <div class="relative w-full group">
    <!-- Main Carousel Container -->
    <div class="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden ">
      <!-- Slides -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 transition-opacity duration-700 ease-in-out"
        :class="{ 'opacity-0': activeSlide !== index }"
      >
        <!-- Image with Zoom Effect -->
        <div class="absolute inset-0 transition-transform duration-[2s] ease-out"
             :class="{ 'scale-110': activeSlide === index }">
          <img
            :src="slide.src"
            :alt="slide.alt"
            class="absolute w-full h-full object-cover"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        </div>

        <!-- Slide Content -->
        <div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
          <div class="max-w-2xl mx-auto text-center">
            <h2 
              class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 transform transition-all duration-700 delay-200"
              :class="{ 'translate-y-0 opacity-100': activeSlide === index, 'translate-y-8 opacity-0': activeSlide !== index }"
            >
              {{ slide.title }}
            </h2>
            <p 
              class="text-sm sm:text-base md:text-lg text-gray-200 mb-6 transform transition-all duration-700 delay-300"
              :class="{ 'translate-y-0 opacity-100': activeSlide === index, 'translate-y-8 opacity-0': activeSlide !== index }"
            >
              {{ slide.description }}
            </p>
            <button 
              class="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              :class="{ 'translate-y-0 opacity-100': activeSlide === index, 'translate-y-8 opacity-0': activeSlide !== index }"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="[
          activeSlide === index 
            ? 'bg-white w-8' 
            : 'bg-white/50 hover:bg-white/75'
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const slides = [
  {
    src: new URL('/public/store-inside-2.jpg', import.meta.url),
    alt: 'Modern Fashion Store Interior',
    title: 'Discover Our Latest Collection',
    description: 'Explore the newest trends and styles in our carefully curated selection.'
  },
  {
    src: new URL('/public/store-inside.jpg', import.meta.url),
    alt: 'Elegant Store Display',
    title: 'Premium Quality Fashion',
    description: 'Experience luxury and comfort with our premium clothing line.'
  },
  {
    src: new URL('/public/store-out-carousel.jpg', import.meta.url),
    alt: 'Store Exterior',
    title: 'Visit Our Flagship Store',
    description: 'Come and experience our world-class shopping environment.'
  }
];

const activeSlide = ref(0);
const autoplayInterval = ref(null);
const autoplayDelay = 5000; // 5 seconds

const startAutoplay = () => {
  autoplayInterval.value = setInterval(() => {
    nextSlide();
  }, autoplayDelay);
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
  }
};

const goToSlide = (index) => {
  activeSlide.value = index;
  stopAutoplay();
  startAutoplay();
};

const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length;
  stopAutoplay();
  startAutoplay();
};

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % slides.length;
};

// Touch support
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
};

const handleSwipe = () => {
  const swipeThreshold = 50;
  const diff = touchEndX - touchStartX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
};

onMounted(() => {
  startAutoplay();
  
  // Add touch event listeners
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchend', handleTouchEnd);
  }
});

onUnmounted(() => {
  stopAutoplay();
  
  // Remove touch event listeners
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.removeEventListener('touchstart', handleTouchStart);
    carousel.removeEventListener('touchend', handleTouchEnd);
  }
});
</script>

<style scoped>
.carousel {
  -webkit-tap-highlight-color: transparent;
}

/* Smooth transition for slide content */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Prevent text selection */
.carousel {
  user-select: none;
}

/* Improve button accessibility */
button:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

/* Responsive font sizes */
@media (max-width: 640px) {
  .text-4xl {
    font-size: 1.875rem;
  }
  .text-lg {
    font-size: 1rem;
  }
}
</style>