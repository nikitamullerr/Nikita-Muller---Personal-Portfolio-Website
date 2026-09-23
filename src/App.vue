<script setup>
import { providePortfolio } from "./composables/usePortfolio.js";
import SiteHeader from "./components/layout/SiteHeader.vue";
import SiteFooter from "./components/layout/SiteFooter.vue";
import ReadingProgress from "./components/controls/ReadingProgress.vue";
import BackToTop from "./components/controls/BackToTop.vue"; 
import PortfolioView from "./views/PortfolioView.vue";

const { t } = providePortfolio();
</script>

<template>
  <a class="skip-link" href="#main">{{ t("Skip to content") }}</a>
  <ReadingProgress />
  <SiteHeader />
  <PortfolioView />
  <SiteFooter />
  <BackToTop />
</template>
