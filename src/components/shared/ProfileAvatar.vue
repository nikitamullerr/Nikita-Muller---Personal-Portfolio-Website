<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import portrait from "../../../images/Nikita_Muller_Headshot.png";
defineProps({
  size: { type: String, default: "small" },
  alt: { type: String, default: "Nikita Muller" },
});
const { t } = usePortfolio();
</script>

<template>
  <span
    class="avatar"
    :class="size === 'large' ? 'avatar-large' : 'avatar-small'"
    ><img
      :src="portrait"
      :alt="t(alt)"
      :width="size === 'large' ? 180 : 88"
      :height="size === 'large' ? 180 : 88"
  /></span>
</template>
