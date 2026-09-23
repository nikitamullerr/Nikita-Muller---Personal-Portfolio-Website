<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
const { t, scrollProgress, navigate } = usePortfolio();
</script>

<template>
  <a
    v-if="scrollProgress > 0.15"
    class="floating-top"
    href="#home"
    @click="navigate('home')"
    :aria-label="t('Back to top ↑')"
    ><span aria-hidden="true">↑</span></a
  >
</template>
