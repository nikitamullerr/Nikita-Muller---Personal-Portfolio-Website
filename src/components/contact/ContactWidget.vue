<script setup>
import { nextTick, ref } from "vue";
import { usePortfolio } from "../../composables/usePortfolio.js";
import ContactForm from "./ContactForm.vue";

const { t } = usePortfolio();
const isOpen = ref(false);
const toggleButton = ref(null);
const panel = ref(null);

async function openForm() {
  isOpen.value = true;
  await nextTick();
  panel.value?.querySelector("input")?.focus();
}

function closeForm() {
  isOpen.value = false;
  nextTick(() => toggleButton.value?.focus());
}
</script>

<template>
  <aside class="contact-widget" @keydown.esc.stop.prevent="closeForm">
    <section
      v-show="isOpen"
      id="contact-widget-panel"
      ref="panel"
      class="contact-widget-panel"
      role="region"
      :aria-label="t('Send a message')"
    >
      <button
        class="contact-widget-close"
        type="button"
        :aria-label="t('Close contact form')"
        @click="closeForm"
      >×</button>
      <ContactForm />
    </section>
    <button
      ref="toggleButton"
      class="contact-widget-toggle"
      type="button"
      :aria-expanded="isOpen"
      aria-controls="contact-widget-panel"
      :aria-label="t(isOpen ? 'Close contact form' : 'Open contact form')"
      @click="isOpen ? closeForm() : openForm()"
    >
      {{ t(isOpen ? "Close contact form" : "Contact") }}
    </button>
  </aside>
</template>
