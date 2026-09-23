<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import SkillGroup from "../cards/SkillGroup.vue";
import { skillGroups, strengths } from "../../data/portfolio.js";
const { t } = usePortfolio();
</script>

<template>
  <section id="skills" data-nav="about" class="scene">
    <div class="section-inner split skills-layout">
      <div class="skill-groups">
        <SkillGroup
          v-for="group in skillGroups"
          :key="group.name"
          :group="group"
        />
      </div>
      <div class="section-copy">
        <p class="eyebrow">{{ t("02 / WHAT I BRING") }}</p>
        <h2>
          <span>{{ t("Technical") }}</span
          >{{ t("Skills") }}
        </h2>
        <h3>{{ t("Personal strengths") }}</h3>
        <ul class="strengths">
          <li v-for="strength in strengths" :key="strength">
            <span aria-hidden="true">✦</span>{{ t(strength) }}
          </li>
        </ul>
        <p class="small-note">
          {{
            t("Always learning, practising, and building on my foundations.")
          }}
        </p>
      </div>
    </div>
  </section>
</template>
