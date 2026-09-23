<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
const { t, navigate } = usePortfolio();
</script>

<template>
  <footer class="site-footer">
    <span>Nikita Muller <span class="footer-dot">✦</span></span>
    <p>
      © {{ new Date().getFullYear() }} {{ t("· Made with curiosity & Vue") }}
    </p>
    <a href="#home" @click="navigate('home')">{{ t("Back to top ↑") }}</a>
  </footer>
</template>
