<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import ContactDetails from "../contact/ContactDetails.vue";
import ContactForm from "../contact/ContactForm.vue";
const { t } = usePortfolio();
</script>

<template>
  <section id="contact" class="scene contact-section">
    <div class="section-inner">
      <div class="contact-layout">
        <div class="contact-copy-block">
          <ContactDetails />
          <details class="contact-form-disclosure">
            <summary>{{ t("Send a message") }}</summary>
            <ContactForm />
          </details>
        </div>
        <a class="contact-invitation" href="mailto:nikitamuller1005@gmail.com">
          {{ t("Let’s talk") }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </section>
</template>
