<script setup>
import { nextTick, ref } from "vue";
import { usePortfolio } from "../../composables/usePortfolio.js";
import { testimonials } from "../../data/portfolio.js";

const { t } = usePortfolio();
const reviewDialog = ref(null);
const closeButton = ref(null);
const selectedTestimonial = ref(null);

async function openReview(testimonial) {
  selectedTestimonial.value = testimonial;
  await nextTick();
  if (reviewDialog.value && !reviewDialog.value.open) {
    reviewDialog.value.showModal();
    closeButton.value?.focus();
  }
}

function closeReview() {
  if (reviewDialog.value?.open) reviewDialog.value.close();
}
</script>

<template>
  <section id="testimonials" class="scene testimonials-section">
    <div class="section-inner">
      <div class="section-heading-row testimonials-heading">
        <div class="section-copy">
          <p class="eyebrow">{{ t("WHAT THE CREW SAYS") }}</p>
          <h2>{{ t("Top Reviews") }}</h2>
        </div>
      </div>

      <div
        class="testimonials-carousel"
        tabindex="0"
        :aria-label="t('Testimonials carousel')"
      >
        <article
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="testimonial-card glass"
        >
          <svg class="testimonial-quote-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 11H5.7c.2-2.5 1.5-4.2 4-5.1L8.5 3C4.4 4.5 2.5 7.5 2.5 12v7h7.5v-8Zm11 0h-4.3c.2-2.5 1.5-4.2 4-5.1L19.5 3c-4.1 1.5-6 4.5-6 9v7H21v-8Z" />
          </svg>
          <p class="testimonial-pull-quote">“{{ t(testimonial.quote) }}”</p>
          <div class="testimonial-person">
            <span class="testimonial-avatar" aria-hidden="true">{{ testimonial.initials }}</span>
            <div class="testimonial-person-copy">
              <h3>{{ t(testimonial.name) }}</h3>
              <p>{{ t(testimonial.role) }}</p>
            </div>
          </div>
          <div class="testimonial-footer">
            <span
              class="testimonial-stars"
              role="img"
              :aria-label="t('5 out of 5 stars')"
            >★★★★★</span>
            <button
              class="testimonial-read-more"
              type="button"
              @click="openReview(testimonial)"
            >{{ t("Read full review") }} <span aria-hidden="true">↗</span></button>
          </div>
        </article>
      </div>
    </div>

    <dialog
      ref="reviewDialog"
      class="project-dialog testimonial-dialog"
      :aria-labelledby="selectedTestimonial ? 'testimonial-dialog-title' : undefined"
      @click.self="closeReview"
      @keydown.esc.prevent="closeReview"
      @cancel.prevent="closeReview"
      @close="selectedTestimonial = null"
    >
      <template v-if="selectedTestimonial">
        <button
          ref="closeButton"
          class="dialog-close"
          type="button"
          :aria-label="t('Close full review')"
          @click="closeReview"
        >×</button>
        <div class="dialog-content">
          <p class="eyebrow">{{ t("TESTIMONIAL") }}</p>
          <h2 id="testimonial-dialog-title">
            {{ t(selectedTestimonial.modalTitle || selectedTestimonial.name) }}
          </h2>
          <p class="testimonial-dialog-person">
            {{ t(selectedTestimonial.name) }} · {{ t(selectedTestimonial.role) }}
          </p>
          <p class="dialog-description testimonial-full-text">
            {{ t(selectedTestimonial.fullText) }}
          </p>
        </div>
      </template>
    </dialog>
  </section>
</template>
