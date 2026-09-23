<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import ProfileAvatar from "../shared/ProfileAvatar.vue";
import DeveloperIllustration from "../shared/DeveloperIllustration.vue";
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
          <p class="eyebrow">{{ t("BACHELOR’S DEGREE GRADUATE") }}</p>
          <p class="degree-title">
            {{ t("Bachelor of IT") }}<br />{{ t("in Business Systems") }}
          </p>
          <p class="degree-institution">Rosebank College · 2023–2025</p>
        </div>
        <p class="hero-description">
          {{
            t(
              "Aspiring full stack web developer, connecting business insight with technology.",
            )
          }}
        </p>
        <div class="presenter-panel glass">
          <ProfileAvatar />
          <div>
            <span>{{ t("Presented by") }}</span
            ><strong>Nikita Muller</strong>
          </div>
          <div class="presenter-link">
            <span>{{ t("Let’s build something") }}</span
            ><a href="#contact" @click="navigate('contact')">{{
              t("Get in touch ↗")
            }}</a>
          </div>
        </div>
      </div>
      <DeveloperIllustration />
      <a class="scroll-cue" href="#about" @click="navigate('about')"
        >{{ t("Explore my portfolio") }} <span aria-hidden="true">↓</span></a
      >
    </div>
  </section>
</template>
