<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import ProfileCard from "../cards/ProfileCard.vue";
const { t } = usePortfolio();
</script>

<template>
  <section id="about" class="scene">
    <div class="section-inner split">
      <div class="section-copy">
        <p class="eyebrow">{{ t("01 / PROFILE") }}</p>
        <h2>
          <span>{{ t("Business Systems Graduate.") }}</span
          >{{ t("Developer in the Making.") }}
        </h2>
        <h3>{{ t("A degree that connects business and technology") }}</h3>
        <p>
          {{
            t(
              "I hold a Bachelor of IT in Business Systems from Rosebank College, completed in 2025. My degree built a foundation in business analysis, database systems, systems analysis and design, IT project management, and enterprise resource planning.",
            )
          }}
        </p>
        <p>
          {{
            t(
              "I am now extending that foundation through a six-month Full Stack Web Development programme at Life Choices Academy, gaining hands-on skills in HTML, CSS, JavaScript, Python, and Vue.js.",
            )
          }}
        </p>
      </div>
      <ProfileCard />
    </div>
  </section>
</template>
