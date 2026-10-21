<script setup>
defineProps({
  type: { type: String, required: true },
});
</script>

<template>
  <svg
    v-if="type === 'education'"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
  >
    <path d="m4 17 20-10 20 10-20 10L4 17Z" />
    <path d="M12 21v12c6 6 18 6 24 0V21M44 18v14" />
  </svg>
  <svg
    v-else-if="type === 'experience'"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
  >
    <rect x="5" y="15" width="38" height="27" rx="4" />
    <path d="M17 15V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6M5 25h38M20 25v4h8v-4" />
  </svg>
  <svg
    v-else-if="type === 'volunteer'"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="24" cy="13" r="6" />
    <circle cx="10" cy="19" r="4" />
    <circle cx="38" cy="19" r="4" />
    <path d="M12 40v-4a12 12 0 0 1 24 0v4m-29 0v-3a8 8 0 0 1 8-8m30 11v-3a8 8 0 0 0-8-8" />
  </svg>
  <svg
    v-else
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
  >
    <path d="M24 4v11m0 18v11M4 24h11m18 0h11M10 10l8 8m12 12 8 8m0-28-8 8m-12 12-8 8" />
  </svg>
</template>

<style scoped>
svg {
  width: 42px;
  height: 42px;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
}
</style>
