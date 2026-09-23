<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
defineProps({ group: { type: Object, required: true } });
const { t } = usePortfolio();
</script>

<template>
  <div class="skill-group">
    <h3>{{ t(group.name) }}</h3>
    <div class="skill-tags">
      <span v-for="skill in group.skills" :key="skill" class="glass">{{
        t(skill)
      }}</span>
    </div>
  </div>
</template>
