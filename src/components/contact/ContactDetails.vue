<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import CopyEmailButton from "../controls/CopyEmailButton.vue";
const { t } = usePortfolio();
</script>

<template>
  <div class="section-copy">
    <p class="eyebrow">{{ t("06 / CONTACT") }}</p>
    <h2>
      <span>{{ t("Let’s Build") }}</span
      >{{ t("Something Great") }}
    </h2>
    <p>
      {{
        t(
          "Have a project, internship, or collaboration in mind? I’d love to connect and hear about it.",
        )
      }}
    </p>
    <a class="email-link" href="mailto:nikitamuller1005@gmail.com"
      >nikitamuller1005@gmail.com ↗</a
    >
    <CopyEmailButton />
    <p class="location">{{ t("Cape Town, South Africa") }}</p>
    <div class="social-links">
      <a
        href="https://github.com/nikitamullerr"
        target="_blank"
        rel="noopener noreferrer"
        >GitHub ↗</a
      ><a
        href="https://www.linkedin.com/in/nikita-muller/"
        target="_blank"
        rel="noopener noreferrer"
        >LinkedIn ↗</a
      >
    </div>
  </div>
</template>
