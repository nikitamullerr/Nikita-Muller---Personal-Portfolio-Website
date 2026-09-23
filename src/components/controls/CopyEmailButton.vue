<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
const { t, copyEmail, copyStatus } = usePortfolio();
</script>

<template>
  <div class="copy-email">
    <button type="button" class="utility-button" @click="copyEmail">
      {{ t("Copy email") }} <span aria-hidden="true">⧉</span>
    </button>
    <p role="status" class="copy-status">
      {{ copyStatus ? t(copyStatus) : "" }}
    </p>
  </div>
</template>
