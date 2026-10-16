<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import { showPlayButton } from "../../data/portfolio.js";
import ProfileAvatar from "../shared/ProfileAvatar.vue";
const { t, navigate } = usePortfolio();
</script>

<template>
  <section id="home" class="scene hero">
    <div class="section-inner hero-grid">
      <div class="hero-copy">
        <p class="hero-kicker"><span>N</span>{{ t("A NIKITA ORIGINAL") }}</p>
        <h1 class="hero-name">
          <span>Nikita</span><span>Muller</span>
        </h1>
        <div class="hero-meta" aria-label="Portfolio details">
          <span>100% {{ t("match") }}</span>
          <span>2026</span>
          <span class="hero-rating">{{ t("DEV") }}</span>
          <span class="hero-award-badge">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 4h8v4a4 4 0 0 1-8 0V4Zm0 2H5v2a3 3 0 0 0 3 3m8-5h3v2a3 3 0 0 1-3 3m-4 2v3m-4 3h8" />
              <path d="M19 2v3m-1.5-1.5h3M4 14v3m-1.5-1.5h3" />
            </svg>
            {{ t("Award-winning") }}
          </span>
          <span>{{ t("Web · Python · Systems") }}</span>
        </div>
        <p class="hero-role">{{ t("Business mind. Developer heart.") }}</p>
        <p class="hero-description">
          {{
            t(
              "Connecting business insight with technology to build thoughtful web experiences.",
            )
          }}
        </p>
        <div class="hero-actions">
          <a
            v-if="showPlayButton"
            class="hero-contact hero-play"
            href="#portfolio"
            @click="navigate('portfolio')"
          >
            <span aria-hidden="true">▶</span> {{ t("Play") }}
          </a>
          <a class="hero-contact hero-more" href="#about" @click="navigate('about')">
            <span aria-hidden="true">ⓘ</span> {{ t("More Info") }}
          </a>
        </div>
      </div>
      <div class="hero-portrait">
        <ProfileAvatar size="large" alt="Portrait of Nikita Muller" />
        <span class="portrait-location"><span aria-hidden="true">⌖</span> {{ t("Cape Town, South Africa") }}</span>
      </div>
    </div>
  </section>
</template>
