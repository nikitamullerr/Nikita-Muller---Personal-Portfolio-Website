<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { usePortfolio } from "../../composables/usePortfolio.js";
import { links } from "../../data/portfolio.js";
const { t, menuOpen, activeSection, navigate } = usePortfolio();

const headerElement = ref(null);
const menuButton = ref(null);
const isScrolled = ref(window.scrollY > 24);
let observer;
function updateScrollState() {
  isScrolled.value = window.scrollY > 24;
}
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
  window.addEventListener("scroll", updateScrollState, { passive: true });
  document.addEventListener('pointerdown', closeMenu);
  document.addEventListener('keydown', closeMenu);
});
onUnmounted(() => {
  observer?.disconnect();
  window.removeEventListener("scroll", updateScrollState);
  document.removeEventListener('pointerdown', closeMenu);
  document.removeEventListener('keydown', closeMenu);
});

</script>

<template>
  <header ref="headerElement" class="site-header" :class="{ 'is-scrolled': isScrolled }" @focusout="event => { if (event.relatedTarget && !headerElement.contains(event.relatedTarget)) menuOpen = false }">
    <a
      class="brand"
      href="#home"
      @click="navigate('home')"
      :aria-label="t('Nikita Muller home')"
    >
      <span>NIKITA</span>
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
    </nav>
  </header>
</template>

<style scoped>
.site-header { position:fixed; top:0; left:0; right:0; width:min(1280px,100%); margin:0 auto; padding:14px 36px; min-height:72px; flex-wrap:nowrap; gap:24px; border-radius:0; border:0; border-bottom:1px solid transparent; background:transparent; transition:background-color .2s ease,border-color .2s ease,backdrop-filter .2s ease; }
.site-header.is-scrolled { border-color:var(--line); background:#0c0d0ef2; backdrop-filter:blur(16px); }
.site-header .brand { margin:0; flex-shrink:0; }
.site-header nav { position:static; display:flex; flex-direction:row; align-items:center; width:auto; margin:0 0 0 auto; padding:0; gap:clamp(14px,2.2vw,30px); order:0; border:0; background:transparent; }
.site-header nav > a { display:flex; min-height:44px; align-items:center; white-space:nowrap; position:relative; font-size:14px; font-weight:500; }
.site-header nav > a:not(.contact-link)::after { content:""; position:absolute; height:2px; left:0; right:0; bottom:0; background:var(--primary-lilac); transform:scaleX(0); transition:transform .2s ease; }
.site-header nav > a[aria-current]:not(.contact-link)::after,.site-header nav > a:hover:not(.contact-link)::after { transform:scaleX(1); }
.site-header .menu-toggle { display:none; }
.site-header .brand { color:#f20d3a; font-size:18px; font-weight:900; letter-spacing:.04em; }
.site-header .brand svg { display:none; }
.site-header.is-scrolled { background:#0c0d0ef2; }
@media(max-width:760px) {
.site-header { min-height:70px; padding:14px 20px; }
.site-header .menu-toggle { display:block; min-height:44px; margin-left:auto; order:0; border:1px solid var(--line); border-radius:22px; padding:10px 16px; color:var(--primary-lilac); background:var(--control); font-size:14px; }
.site-header nav { display:none; position:absolute; top:calc(100% + 8px); left:0; right:0; width:100%; margin:0; padding:18px; border:1px solid var(--line); border-radius:20px; background:var(--surface); box-shadow:0 18px 40px #0003; max-height:calc(100dvh - 100px); overflow-y:auto; }
.site-header nav.open { display:flex; flex-direction:column; align-items:stretch; gap:8px; }
.site-header nav > a { padding:12px 16px; border-radius:10px; }
.site-header nav > a:not(.contact-link)[aria-current] { background:#8b5f9e20; }
.site-header nav > a:not(.contact-link)::after { display:none; }
}
@media(min-width:761px) and (max-width:1100px) {
.site-header { padding-inline:20px; }
.site-header nav { gap:clamp(10px,1.8vw,18px); }
}
</style>
