<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import AboutSection from "./AboutSection.vue";
const { t, navigate } = usePortfolio();
</script>

<template>
  <section id="home" class="scene hero">
    <div class="section-inner hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">{{ t("CAPE TOWN, SOUTH AFRICA") }}</p>
        <h1 class="hero-name">
          <span class="gradient-text">Nikita</span><span>Muller</span>
        </h1>
        <div class="hero-qualification">
          <p class="degree-title">
            {{ t("Business systems graduate.") }}<br />
            <span>{{ t("Aspiring full stack developer.") }}</span>
          </p>
        </div>
        <p class="hero-description">
          {{
            t(
              "Connecting business insight with technology to build thoughtful web experiences.",
            )
          }}
        </p>
        <a class="hero-contact" href="#contact" @click="navigate('contact')">
          {{ t("Get in touch") }} <span aria-hidden="true">&nearr;</span>
        </a>
      </div>
      <AboutSection />
    </div>
  </section>
</template>
