<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import ProfileAvatar from "../shared/ProfileAvatar.vue";
const { t } = usePortfolio();
</script>

<template>
  <div id="about" class="hero-profile glass">
    <ProfileAvatar size="large" alt="Portrait of Nikita Muller" />
    <div class="section-copy">
      <h2>{{ t("A little about me") }}</h2>
      <p>
        {{ t("I graduated from Rosebank College in 2025 with a Bachelor of IT in Business Systems. I am now developing my full stack skills at Life Choices Academy.") }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.hero-profile > .avatar { width: 168px; height: 168px; border-width: 2px; box-shadow: 0 0 0 8px #c8a2d60a; }
.hero-profile :deep(.avatar img) { width: 100%; height: 100%; object-fit: cover; object-position: center bottom; transform: scale(1.8); transform-origin: 50% 80%; }
</style>
