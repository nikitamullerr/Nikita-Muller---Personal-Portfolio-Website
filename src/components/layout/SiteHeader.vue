<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { usePortfolio } from "../../composables/usePortfolio.js";
import DisplayControls from "../controls/DisplayControls.vue";
import { links } from "../../data/portfolio.js";
const { t, menuOpen, activeSection, navigate } = usePortfolio();

const headerElement = ref(null);
const menuButton = ref(null);
let observer;
function closeMenu(event) {
  if (!menuOpen.value) return;
  if (event.type === 'keydown' && event.key !== 'Escape') return;
  if (event.type === 'pointerdown' && headerElement.value?.contains(event.target)) return;
  menuOpen.value = false;
  if (event.type === 'keydown') menuButton.value?.focus();
}
onMounted(() => {
  observer = new ResizeObserver(() => document.documentElement.style.setProperty('--header-offset', (headerElement.value.offsetHeight + 20) + 'px'));
  observer.observe(headerElement.value);
  document.addEventListener('pointerdown', closeMenu);
  document.addEventListener('keydown', closeMenu);
});
onUnmounted(() => {
  observer?.disconnect();
  document.removeEventListener('pointerdown', closeMenu);
  document.removeEventListener('keydown', closeMenu);
});

</script>

<template>
  <header ref="headerElement" class="site-header" @focusout="event => { if (event.relatedTarget && !headerElement.contains(event.relatedTarget)) menuOpen = false }">
    <a
      class="brand"
      href="#home"
      @click="navigate('home')"
      :aria-label="t('Nikita Muller home')"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <rect x="8" y="8" width="16" height="16" rx="2" />
        <path
          d="M12 2v6m8-6v6M12 24v6m8-6v6M2 12h6m-6 8h6m16-8h6m-6 8h6M14 12l-4 4 4 4m4-8 4 4-4 4"
        />
      </svg>
      <span>Nikita Muller</span>
    </a>
    <button
      ref="menuButton" class="menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="navigation"
      @click="menuOpen = !menuOpen"
      
    >
      {{ t(menuOpen ? "Close −" : "Menu +") }}
    </button>
    <nav
      id="navigation"
      :aria-label="t('Main navigation')"
      :class="{ open: menuOpen }"
      
    >
      <a
        v-for="link in links"
        :key="link.id"
        :href="'#' + link.id"
        :class="{ 'contact-link': link.id === 'contact' }"
        :aria-current="activeSection === link.id ? 'location' : undefined"
        @click="navigate(link.id)"
        >{{ t(link.label) }}</a
      >
      <DisplayControls />
    </nav>
  </header>
</template>

<style scoped>
.site-header { width:min(1200px,calc(100% - 32px)); margin:0 auto; padding:16px 24px; min-height:78px; flex-wrap:nowrap; gap:24px; border-radius:0 0 24px 24px; }
.site-header .brand { margin:0; flex-shrink:0; }
.site-header nav { position:static; display:flex; flex-direction:row; align-items:center; width:auto; margin:0 0 0 auto; padding:0; gap:20px; order:0; border:0; background:transparent; }
.site-header nav > a { white-space:nowrap; position:relative; font-weight:500; }
.site-header nav > a:not(.contact-link)::after { content:""; position:absolute; height:2px; left:0; right:0; bottom:0; background:var(--primary-lilac); transform:scaleX(0); transition:transform .2s ease; }
.site-header nav > a[aria-current]:not(.contact-link)::after,.site-header nav > a:hover:not(.contact-link)::after { transform:scaleX(1); }
.site-header :deep(.display-controls) { width:auto; margin:0; padding:0 0 0 16px; border:0; border-left:1px solid var(--line); order:0; }
.site-header .menu-toggle { display:none; }
@media(max-width:1100px) {
.site-header { min-height:70px; padding:14px 20px; }
.site-header .menu-toggle { display:block; margin-left:auto; order:0; border:1px solid var(--line); border-radius:22px; padding:10px 16px; color:var(--primary-lilac); background:var(--control); font-size:12px; }
.site-header nav { display:none; position:absolute; top:calc(100% + 8px); left:0; right:0; width:100%; margin:0; padding:18px; border:1px solid var(--line); border-radius:20px; background:var(--surface); box-shadow:0 18px 40px #0003; max-height:calc(100dvh - 100px); overflow-y:auto; }
.site-header nav.open { display:flex; flex-direction:column; align-items:stretch; gap:8px; }
.site-header nav > a { padding:12px 16px; border-radius:10px; }
.site-header nav > a:not(.contact-link)[aria-current] { background:#8b5f9e20; }
.site-header nav > a:not(.contact-link)::after { display:none; }
.site-header :deep(.display-controls) { justify-content:space-between; border:0; border-top:1px solid var(--line); padding:16px 0 0; margin-top:8px; }
}
</style>
