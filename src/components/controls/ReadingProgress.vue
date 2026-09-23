<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
const { scrollProgress } = usePortfolio();
</script>

<template>
  <div class="reading-progress" aria-hidden="true">
    <span :style="{ transform: 'scaleX(' + scrollProgress + ')' }"></span>
  </div>
</template>
