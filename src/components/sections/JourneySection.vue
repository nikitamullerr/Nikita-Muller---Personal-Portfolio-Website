<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import JourneyCard from "../cards/JourneyCard.vue";
import CertificateCard from "../cards/CertificateCard.vue";
import { education, experiences, certificates } from "../../data/portfolio.js";
const { t } = usePortfolio();
</script>

<template>
  <section id="education" class="scene journey-section">
    <div class="section-inner">
      <div class="split journey-intro">
        <div class="section-copy">
          <p class="eyebrow">{{ t("05 / MY JOURNEY") }}</p>
          <h2>
            <span>{{ t("Education &") }}</span
            >{{ t("Experience") }}
          </h2>
          <h3>{{ t("Learning beyond the classroom") }}</h3>
          <p>
            {{
              t(
                "From business systems and community engagement to hands-on development, every experience shapes the way I approach people, technology, and problem solving.",
              )
            }}
          </p>
        </div>
        <div class="timeline">
          <JourneyCard
            v-for="item in education"
            :key="item.title"
            :item="item"
          />
        </div>
      </div>
      <h3 class="subheading">{{ t("Experience") }}</h3>
      <div class="experience-grid">
        <JourneyCard
          v-for="item in experiences"
          :key="item.title"
          :item="item"
        />
      </div>
      <h3 class="subheading">{{ t("Certifications & achievements") }}</h3>
      <div class="certificate-list">
        <CertificateCard
          v-for="certificate in certificates"
          :key="certificate.title"
          :certificate="certificate"
        />
      </div>
    </div>
  </section>
</template>
