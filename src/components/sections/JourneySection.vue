<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { usePortfolio } from "../../composables/usePortfolio.js";
import JourneyCard from "../cards/JourneyCard.vue";
import JourneyTypeIcon from "../cards/JourneyTypeIcon.vue";
import CertificateCard from "../cards/CertificateCard.vue";
import {
  certificates,
  comingSoonJourney,
  codingWizardAward,
  education,
  experiences,
} from "../../data/portfolio.js";

const { t } = usePortfolio();
const educationCards = [...education, comingSoonJourney];
const experienceCards = [...experiences, comingSoonJourney];
const certificateFilters = ["All", "AI", "Cybersecurity", "Data"];
const activeCertificateFilter = ref("All");
const today = ref(new Date());
const certificateCarousel = ref(null);
const certificateDialog = ref(null);
const certificateCloseButton = ref(null);
const selectedCertificate = ref(null);
const journeyDialog = ref(null);
const journeyCloseButton = ref(null);
const selectedJourney = ref(null);
const selectedJourneySeason = ref(0);
const educationCarousel = ref(null);
const experienceCarousel = ref(null);
const likedExperiencesStorageKey = "portfolio-liked-experiences";
let dateRefreshTimer;

function loadLikedExperienceTitles() {
  try {
    const storedTitles = localStorage.getItem(likedExperiencesStorageKey);
    if (!storedTitles) return new Set();
    const parsedTitles = JSON.parse(storedTitles);
    if (!Array.isArray(parsedTitles)) {
      throw new TypeError("Stored liked experiences must be an array.");
    }
    return new Set(
      parsedTitles.filter(
        (title) =>
          typeof title === "string" &&
          experiences.some((experience) => experience.title === title),
      ),
    );
  } catch (error) {
    console.error("Unable to load liked experiences from local storage.", error);
    return new Set();
  }
}

const likedExperienceTitles = ref(loadLikedExperienceTitles());

function dateRank(item) {
  const [year, month = "0"] = item.sortDate.split("-");
  return Number(year) * 12 + Number(month);
}

function newestEntry(entries) {
  return entries.reduce((newest, entry) =>
    dateRank(entry) > dateRank(newest) ? entry : newest,
  );
}

const newestEducation = newestEntry(education);
const newestExperience = newestEntry(experiences);
const visibleCertificates = computed(() =>
  [...certificates]
    .sort((first, second) => second.issueMonth.localeCompare(first.issueMonth))
    .filter(
      (certificate) =>
        activeCertificateFilter.value === "All" ||
        certificate.category === activeCertificateFilter.value,
    ),
);

function isCertificateNew(certificate) {
  const [year, month] = certificate.issueMonth.split("-").map(Number);
  const issuedAt = new Date(year, month - 1, 1).getTime();
  const ageInDays = (today.value.getTime() - issuedAt) / (24 * 60 * 60 * 1000);
  return ageInDays >= 0 && ageInDays <= 60;
}

function refreshTodayAtMidnight() {
  const now = new Date();
  today.value = now;
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  dateRefreshTimer = window.setTimeout(
    refreshTodayAtMidnight,
    nextMidnight.getTime() - now.getTime() + 50,
  );
}

function scrollCertificates(direction) {
  const firstCard = certificateCarousel.value?.querySelector(".certificate-card");
  if (!firstCard) return;
  const gap = Number.parseFloat(getComputedStyle(certificateCarousel.value).columnGap) || 0;
  certificateCarousel.value.scrollBy({
    left: direction * (firstCard.getBoundingClientRect().width + gap),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}

function scrollSeasonRow(row, direction) {
  const firstCard = row.value?.querySelector(".season-card");
  if (!firstCard) return;
  const gap = Number.parseFloat(getComputedStyle(row.value).columnGap) || 0;
  row.value.scrollBy({
    left: direction * (firstCard.getBoundingClientRect().width + gap),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}

function setCertificateFilter(filter) {
  activeCertificateFilter.value = filter;
  nextTick(() => certificateCarousel.value?.scrollTo({ left: 0, behavior: "auto" }));
}

function toggleExperienceLike(item) {
  const nextLikedTitles = new Set(likedExperienceTitles.value);
  if (nextLikedTitles.has(item.title)) {
    nextLikedTitles.delete(item.title);
  } else {
    nextLikedTitles.add(item.title);
  }
  likedExperienceTitles.value = nextLikedTitles;
  try {
    localStorage.setItem(
      likedExperiencesStorageKey,
      JSON.stringify([...nextLikedTitles]),
    );
  } catch (error) {
    console.error("Unable to save liked experiences to local storage.", error);
  }
}

async function openCertificate(certificate) {
  selectedCertificate.value = certificate;
  await nextTick();
  if (certificateDialog.value && !certificateDialog.value.open) {
    certificateDialog.value.showModal();
    certificateCloseButton.value?.focus();
  }
}

async function openJourney(item, seasonNumber) {
  selectedJourney.value = item;
  selectedJourneySeason.value = seasonNumber;
  await nextTick();
  if (journeyDialog.value && !journeyDialog.value.open) {
    journeyDialog.value.showModal();
    journeyCloseButton.value?.focus();
  }
}

function closeJourney() {
  if (journeyDialog.value?.open) journeyDialog.value.close();
}

function closeCertificate() {
  if (certificateDialog.value?.open) certificateDialog.value.close();
}

onMounted(refreshTodayAtMidnight);
onUnmounted(() => window.clearTimeout(dateRefreshTimer));
</script>

<template>
  <section id="education" class="scene journey-section">
    <div class="section-inner">
      <div class="section-heading-row journey-heading">
        <div class="section-copy">
          <p class="eyebrow">{{ t("THE STORY SO FAR") }}</p>
          <h2>{{ t("Education & experience") }}</h2>
        </div>
        <p>{{ t("Learning beyond the classroom") }}</p>
      </div>
      <div class="journey-columns">
        <div class="journey-column">
          <div class="season-row-heading">
            <div class="season-heading-copy">
              <p class="eyebrow">{{ t("EDUCATION") }}</p>
              <h3>{{ t("Season 1: Learning") }}</h3>
            </div>
            <div class="carousel-arrows season-arrows">
              <button type="button" :aria-label="t('Previous education')" @click="scrollSeasonRow(educationCarousel, -1)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" :aria-label="t('Next education')" @click="scrollSeasonRow(educationCarousel, 1)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
          <div ref="educationCarousel" class="season-carousel" tabindex="0" :aria-label="t('Education timeline carousel')">
            <JourneyCard
              v-for="(item, index) in educationCards"
              :key="`${item.type}-${item.title}`"
              :item="item"
              :season-number="index + 1"
              :is-most-recent="item === newestEducation"
              class="season-card"
              @select="openJourney(item, index + 1)"
            />
          </div>
        </div>
        <div class="journey-column">
          <div class="season-row-heading">
            <div class="season-heading-copy">
              <p class="eyebrow">{{ t("EXPERIENCE") }}</p>
              <h3>{{ t("Season 2: Working") }}</h3>
            </div>
            <div class="carousel-arrows season-arrows">
              <button type="button" :aria-label="t('Previous experience')" @click="scrollSeasonRow(experienceCarousel, -1)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" :aria-label="t('Next experience')" @click="scrollSeasonRow(experienceCarousel, 1)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
          <div ref="experienceCarousel" class="season-carousel" tabindex="0" :aria-label="t('Experience timeline carousel')">
            <div
              v-for="(item, index) in experienceCards"
              :key="`${item.type}-${item.title}`"
              class="season-card-item"
              :class="{ 'season-card-item--likable': item.type !== 'coming-soon' }"
            >
              <JourneyCard
                :item="item"
                :season-number="index + 1"
                :is-most-recent="item === newestExperience"
                class="season-card"
                @select="openJourney(item, index + 1)"
              />
              <div v-if="item.type !== 'coming-soon'" class="season-like-control">
                <button
                  class="season-like-button"
                  :class="{ 'is-liked': likedExperienceTitles.has(item.title) }"
                  type="button"
                  :aria-label="`${t(likedExperienceTitles.has(item.title) ? 'Unlike' : 'Like')} ${t(item.title)}`"
                  :aria-pressed="likedExperienceTitles.has(item.title)"
                  @click="toggleExperienceLike(item)"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                  </svg>
                </button>
                <span v-if="likedExperienceTitles.has(item.title)" class="season-like-status" aria-live="polite">
                  {{ t("Added to My List") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="achievements-area">
        <div class="section-copy achievements-heading">
          <p class="eyebrow">{{ t("AWARDS & CERTIFICATIONS") }}</p>
          <h2>{{ t("Certifications & achievements") }}</h2>
        </div>
        <article class="award-card glass">
          <div class="award-icon" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
                <path d="M31 77c-13-4-21-15-22-30 7 1 13 5 17 11M30 66c-12-1-20-9-23-21 8 0 14 3 19 9M32 54c-10-3-15-11-15-22 7 2 12 6 16 12M69 77c13-4 21-15 22-30-7 1-13 5-17 11M70 66c12-1 20-9 23-21-8 0-14 3-19 9M68 54c10-3 15-11 15-22-7 2-12 6-16 12"/>
                <path d="M38 34h24v8c0 9-5 15-12 17-7-2-12-8-12-17v-8Zm0 4h-9c0 9 4 14 13 16m20-16h9c0 9-4 14-13 16M50 59v10m-13 7h26M44 76v-7m12 7v-7"/>
              </g>
            </svg>
          </div>
          <div class="award-copy">
            <p class="eyebrow">{{ t("FEATURED AWARD") }}</p>
            <h4>{{ t(codingWizardAward.title) }}</h4>
            <p class="award-issuer">
              {{ t(codingWizardAward.issuer) }} <span aria-hidden="true">·</span> {{ t(codingWizardAward.date) }}
            </p>
            <p class="award-description">{{ t(codingWizardAward.description) }}</p>
          </div>
        </article>

        <div class="certificates-heading-row">
          <div class="section-copy">
            <p class="eyebrow">{{ t("SKILLS UNLOCKED") }}</p>
            <h3>{{ t("Certified") }}</h3>
          </div>
          <div class="certificates-heading-tools">
            <p class="certificate-count">{{ t("5 certificates and counting") }}</p>
            <div class="carousel-arrows certificate-arrows">
              <button
                type="button"
                :aria-label="t('Previous certificates')"
                @click="scrollCertificates(-1)"
              ><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg></button>
              <button
                type="button"
                :aria-label="t('Next certificates')"
                @click="scrollCertificates(1)"
              ><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg></button>
            </div>
          </div>
        </div>
        <div class="filter-chips certificate-filters" role="group" :aria-label="t('Filter certificates')">
          <button
            v-for="filter in certificateFilters"
            :key="filter"
            type="button"
            :aria-pressed="activeCertificateFilter === filter"
            @click="setCertificateFilter(filter)"
          >{{ t(filter) }}</button>
        </div>
        <div
          ref="certificateCarousel"
          class="certificate-carousel"
          tabindex="0"
          :aria-label="t('Certificates carousel')"
        >
        <CertificateCard
          v-for="certificate in visibleCertificates"
          :key="certificate.title"
          :certificate="certificate"
          :is-new="isCertificateNew(certificate)"
          @select="openCertificate"
        />
        </div>
      </div>
    </div>

    <dialog
      ref="certificateDialog"
      class="project-dialog certificate-dialog"
      :aria-labelledby="selectedCertificate ? 'certificate-dialog-title' : undefined"
      @click.self="closeCertificate"
      @keydown.esc.prevent="closeCertificate"
      @cancel.prevent="closeCertificate"
      @close="selectedCertificate = null"
    >
      <template v-if="selectedCertificate">
        <button
          ref="certificateCloseButton"
          class="dialog-close"
          type="button"
          :aria-label="t('Close certificate details')"
          @click="closeCertificate"
        >×</button>
        <div class="dialog-content">
          <img
            class="certificate-dialog-image"
            :src="selectedCertificate.image"
            :alt="t(selectedCertificate.title)"
          />
          <p class="eyebrow">{{ t("CERTIFICATE DETAILS") }}</p>
          <h2 id="certificate-dialog-title">{{ t(selectedCertificate.title) }}</h2>
          <dl class="certificate-detail-list">
            <div>
              <dt>{{ t("Issuer") }}</dt>
              <dd>{{ t(selectedCertificate.issuer) }}</dd>
            </div>
            <div>
              <dt>{{ t("Issue date") }}</dt>
              <dd>{{ t(selectedCertificate.issueDate) }}</dd>
            </div>
            <div>
              <dt>{{ t("Category") }}</dt>
              <dd>{{ t(selectedCertificate.category) }}</dd>
            </div>
          </dl>
          <p v-if="selectedCertificate.learned" class="dialog-description">
            {{ t(selectedCertificate.learned) }}
          </p>
        </div>
      </template>
    </dialog>

    <dialog
      ref="journeyDialog"
      class="project-dialog journey-dialog"
      :aria-labelledby="selectedJourney ? 'journey-dialog-title' : undefined"
      @click.self="closeJourney"
      @keydown.esc.prevent="closeJourney"
      @cancel.prevent="closeJourney"
      @close="selectedJourney = null; selectedJourneySeason = 0"
    >
      <template v-if="selectedJourney">
        <button
          ref="journeyCloseButton"
          class="dialog-close"
          type="button"
          :aria-label="t('Close journey details')"
          @click="closeJourney"
        >×</button>
        <div class="journey-dialog-poster" :class="`journey-poster-${selectedJourney.type}`">
          <span class="journey-dialog-season" aria-hidden="true">S{{ selectedJourneySeason }}</span>
          <JourneyTypeIcon :type="selectedJourney.type" />
        </div>
        <div class="dialog-content">
          <div class="journey-dialog-heading">
            <div>
              <h2 id="journey-dialog-title">{{ t(selectedJourney.title) }}</h2>
              <p class="journey-dialog-organisation">{{ t(selectedJourney.organisation) }}</p>
            </div>
            <span class="season-type-badge">
              {{ selectedJourney.type === "education" ? t("EDU") : selectedJourney.type === "volunteer" ? t("VOLUNTEER") : t("WORK") }}
            </span>
          </div>
          <div class="dialog-meta journey-dialog-meta">
            <span>{{ t(selectedJourney.dateRange) }}</span>
            <span v-if="selectedJourney.location">{{ t(selectedJourney.location) }}</span>
          </div>
          <p class="dialog-description">{{ t(selectedJourney.description) }}</p>
          <p v-if="selectedJourney.award" class="season-award-badge journey-dialog-award">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H5v2a4 4 0 0 0 4 4m7-6h3v2a4 4 0 0 1-4 4m-3 1v4m-4 4h8m-6-4h4l2 4H8l2-4Z" />
            </svg>
            <span>{{ t(selectedJourney.award) }}</span>
          </p>
        </div>
      </template>
    </dialog>
  </section>
</template>
