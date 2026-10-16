<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import { strengths } from "../../data/portfolio.js";
const { t } = usePortfolio();
</script>

<template>
 <section id="about" class="scene about-section">
   <div class="section-inner">
     <div class="about-layout">
       <div class="section-copy about-copy">
         <p class="eyebrow">{{ t("BEHIND THE SCREEN") }}</p>
         <h2>{{ t("The origin story.") }}</h2>
         <p>
           {{ t("I’m Nikita, a business systems graduate with a growing love for development. I graduated from Rosebank College in 2025 with a Bachelor of IT in Business Systems, and I’m now developing my full stack skills at Life Choices Academy.") }}
         </p>
         <p>
           {{ t("I bring analytical thinking, curiosity, and a people-first perspective to everything I build. My story is still unfolding — and I’m excited for the next chapter.") }}
         </p>
         <div class="strength-tags">
           <span v-for="strength in strengths" :key="strength">{{ t(strength) }}</span>
         </div>
       </div>
       <div class="profile-facts">
         <div><strong>5</strong><span>{{ t("Projects & counting") }}</span></div>
         <div><strong>BIT</strong><span>{{ t("Business Systems graduate") }}</span></div>
         <div><strong>{{ t("Cape Town") }}</strong><span>{{ t("My home base") }}</span></div>
         <div><strong>∞</strong><span>{{ t("Curiosity for what’s next") }}</span></div>
       </div>
     </div>
   </div>
 </section>
</template>
