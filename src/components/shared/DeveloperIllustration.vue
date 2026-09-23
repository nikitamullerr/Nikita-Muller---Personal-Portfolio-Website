<script setup>
import { ref } from "vue";
import { usePortfolio } from "../../composables/usePortfolio.js";
const { t } = usePortfolio();
const paused = ref(false);
</script>

<template>
  <div class="hero-art glass" :class="{ 'motion-paused': paused }">
    <svg class="moving-illustration" aria-hidden="true"
      viewBox="0 0 320 320"
      fill="none"
      stroke="url(#tech-gradient)"
      stroke-width="7"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <defs>
        <linearGradient
          id="tech-gradient"
          x1="50"
          y1="30"
          x2="280"
          y2="290"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#e1c6f0" />
          <stop offset=".5" stop-color="#c8a2d6" />
          <stop offset="1" stop-color="#8b5f9e" />
        </linearGradient>
      </defs>
      <rect x="42" y="40" width="15" height="15" rx="4" />
      <rect x="73" y="40" width="15" height="15" rx="4" />
      <rect x="104" y="40" width="15" height="15" rx="4" />
      <path
        d="M205 78a48 48 0 1 1 60 61m0-14-1 16 16-2M218 99V82h12v34m13-8V66h13v48"
      />
      <circle cx="145" cy="160" r="76" />
      <path d="M70 143v44l-12-12m12 12 12-12" />
      <path
        class="turning-gear" d="m132 112-3 13-12 7-13-4-12 21 10 9v13l-10 9 12 21 13-4 12 7 3 13h25l3-13 12-7 13 4 12-21-10-9v-13l10-9-12-21-13 4-12-7-3-13Z"
      />
      <circle cx="145" cy="164" r="25" />
      <circle cx="145" cy="164" r="13" />
      <path d="M101 260h105m-12-11 12 11-12 11" />
      <rect x="224" y="232" width="48" height="50" rx="3" />
      <path
        d="M246 233v48M45 228h31v55H35v-44l10-11Zm0 0v14H35m13 12h15m-15 13h15"
      />
    </svg>
    <span class="art-caption">{{ t("IDEAS → CODE → EXPERIENCES") }}</span>
    <button class="motion-toggle" type="button" @click="paused = !paused" :aria-pressed="paused">{{ t(paused ? 'Resume animation' : 'Pause animation') }}</button>
  </div>
</template>

<style scoped>
.motion-toggle { align-self:center; display:flex; align-items:center; gap:8px; margin-top:18px; padding:8px 13px; background:var(--control); border:1px solid var(--line); border-radius:20px; color:var(--primary-lilac); font-size:11px; }
@keyframes illustration-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-9px); } }
@keyframes gear-turn { to { transform:rotate(360deg); } }
@media(prefers-reduced-motion:no-preference) {
.moving-illustration { animation:illustration-float 5s ease-in-out infinite; }
.turning-gear { transform-origin:145px 164px; animation:gear-turn 24s linear infinite; }
.motion-paused .moving-illustration,.motion-paused .turning-gear { animation-play-state:paused; }
}
@media(prefers-reduced-motion:reduce) { .motion-toggle { display:none; } .moving-illustration,.turning-gear { animation:none; } }
</style>
