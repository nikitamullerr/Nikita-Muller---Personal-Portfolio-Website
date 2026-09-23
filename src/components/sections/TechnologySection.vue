<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import TechnologyCard from "../cards/TechnologyCard.vue";
import { technologies } from "../../data/portfolio.js";
const { t } = usePortfolio();
</script>

<template>
  <section id="technology" data-nav="about" class="scene">
    <div class="section-inner split">
      <div class="section-copy">
        <p class="eyebrow">{{ t("03 / MY TOOLKIT") }}</p>
        <h2>
          <span>{{ t("Technology") }}</span
          >{{ t("Stack") }}
        </h2>
        <h3>{{ t("Technology and tools I use") }}</h3>
        <p>
          {{
            t(
              "My toolkit brings together web development and a grounding in business systems. I’m learning how to turn ideas into useful interfaces, understand the systems behind them, and keep improving the way I work.",
            )
          }}
        </p>
      </div>
      <div class="technology-grid">
        <TechnologyCard
          v-for="technology in technologies"
          :key="technology.title"
          :technology="technology"
        />
      </div>
    </div>
  </section>
</template>
