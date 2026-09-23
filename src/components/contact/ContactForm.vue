<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
const { t } = usePortfolio();
</script>

<template>
  <form
    action="https://formspree.io/f/xgoqgnql"
    method="post"
    class="contact-form glass"
  >
    <h3>{{ t("Send a message") }}</h3>
    <div class="form-pair">
      <label
        >{{ t("Your name *")
        }}<input
          name="name"
          autocomplete="name"
          :placeholder="t('Full name')"
          required /></label
      ><label
        >{{ t("Email address *")
        }}<input
          type="email"
          name="email"
          autocomplete="email"
          placeholder="you@example.com"
          required
      /></label>
    </div>
    <label
      >{{ t("Subject")
      }}<input
        name="subject"
        :placeholder="t('Project / opportunity / hello')" /></label
    ><label
      >{{ t("Your message *")
      }}<textarea
        name="message"
        rows="4"
        :placeholder="t('Tell me a little about your idea…')"
        required
      ></textarea></label
    ><button type="submit" class="button">
      {{ t("Send message") }} <span aria-hidden="true">↗</span>
    </button>
    <p class="form-note">
      {{ t("* Required fields. Submitted through Formspree.") }}
    </p>
  </form>
</template>
