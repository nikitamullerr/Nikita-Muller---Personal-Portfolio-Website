<script setup>
import { ref } from "vue";
import { usePortfolio } from "../../composables/usePortfolio.js";
import { showPlayButton } from "../../data/portfolio.js";

const { t, navigate } = usePortfolio();
const trailerDialog = ref(null);
const trailerVideo = ref(null);

function openTrailer() {
  trailerDialog.value?.showModal();
  trailerVideo.value?.play().catch(() => {});
}

function closeTrailer() {
  trailerVideo.value?.pause();
  if (trailerVideo.value) trailerVideo.value.currentTime = 0;
  trailerDialog.value?.close();
}
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
          <span>{{ t("Web Â· Python Â· Systems") }}</span>
        </div>
        <p class="hero-role">{{ t("Business mind. Developer heart.") }}</p>
        <p class="hero-description">
          {{ t("Connecting business insight with technology to build thoughtful web experiences.") }}
        </p>
        <div class="hero-actions">
          <button v-if="showPlayButton" class="hero-contact hero-play" type="button" @click="openTrailer">
            <span aria-hidden="true">▶</span> {{ t("Watch Trailer") }}
          </button>
          <a class="hero-contact hero-more" href="#about" @click="navigate('about')">
            <span aria-hidden="true">ⓘ</span> {{ t("More Info") }}
          </a>
        </div>
      </div>
    </div>
    <dialog
      ref="trailerDialog"
      class="trailer-dialog"
      :aria-label="t('Nikita Muller official trailer')"
      @click.self="closeTrailer"
      @close="trailerVideo?.pause()"
    >
      <button class="trailer-close" type="button" :aria-label="t('Close trailer')" @click="closeTrailer">
        <span aria-hidden="true">×</span> {{ t("Close") }}
      </button>
      <div class="trailer-heading">
        <span class="trailer-mark" aria-hidden="true">N</span>
        <div>
          <p>{{ t("A NIKITA ORIGINAL") }}</p>
          <h2>{{ t("Nikita Muller official trailer") }}</h2>
        </div>
      </div>
      <video
        ref="trailerVideo"
        class="trailer-video"
        src="/videos/Brown-Vintage-90s-Coming-Soon-Video.mp4"
        controls
        autoplay
        playsinline
        preload="metadata"
        :aria-label="t('Nikita Muller official trailer')"
      />
    </dialog>
  </section>
</template>
