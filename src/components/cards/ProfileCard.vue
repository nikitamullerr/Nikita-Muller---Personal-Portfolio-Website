<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import ProfileAvatar from "../shared/ProfileAvatar.vue";
const { t } = usePortfolio();
</script>

<template>
  <div class="profile-card glass">
    <div class="profile-identity">
      <ProfileAvatar size="large" alt="Portrait of Nikita Muller" />
      <div>
        <span class="accent-label">{{ t("Full name") }}</span>
        <h3>Nikita Muller</h3>
        <p>{{ t("BIT in Business Systems Graduate") }}</p>
      </div>
    </div>
    <div class="profile-facts">
      <div>
        <strong>BIT</strong
        ><span>{{ t("Business Systems") }}<br />{{ t("Graduate") }}</span>
      </div>
      <div>
        <strong>2026</strong
        ><span>{{ t("Full Stack") }}<br />{{ t("Development") }}</span>
      </div>
      <div>
        <strong>CPT</strong
        ><span>{{ t("Cape Town") }}<br />{{ t("South Africa") }}</span>
      </div>
    </div>
  </div>
</template>
