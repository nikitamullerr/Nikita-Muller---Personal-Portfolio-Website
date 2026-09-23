import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import translations from "../locales/translations.json";

const languages = [
  { code: "en", label: "English" },
  { code: "af", label: "Afrikaans" },
  { code: "xh", label: "isiXhosa" },
];
function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Preferences remain usable without storage. */
  }
}

export function usePreferences() {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storedTheme = readPreference("portfolio-theme");
  const theme = ref(
    ["light", "dark"].includes(storedTheme)
      ? storedTheme
      : systemTheme.matches
        ? "dark"
        : "light",
  );
  const storedLocale = readPreference("portfolio-language");
  const locale = ref(
    languages.some((item) => item.code === storedLocale) ? storedLocale : "en",
  );
  const scrollProgress = ref(0);
  const copyStatus = ref("");
  const t = (text) =>
    locale.value === "en"
      ? text
      : (translations[text]?.[locale.value === "af" ? 0 : 1] ?? text);
  const themeLabel = computed(() =>
    t(theme.value === "dark" ? "Switch to light mode" : "Switch to dark mode"),
  );
  let manualTheme = ["light", "dark"].includes(storedTheme);
  let revealObserver;
  let resizeObserver;
  let scrollFrame = 0;
  let copyTimer;
  const animations = new Set();

  watch(
    theme,
    (value) => {
      document.documentElement.dataset.theme = value;
      document.documentElement.style.colorScheme = value;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", value === "dark" ? "#08060b" : "#faf5ff");
    },
    { immediate: true },
  );
  watch(
    locale,
    (value) => {
      document.documentElement.lang = value;
      savePreference("portfolio-language", value);
    },
    { immediate: true },
  );

  function toggleTheme() {
    manualTheme = true;
    theme.value = theme.value === "dark" ? "light" : "dark";
    savePreference("portfolio-theme", theme.value);
  }
  function followSystem(event) {
    if (!manualTheme) theme.value = event.matches ? "dark" : "light";
  }
  function updateProgress() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.value =
        distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0;
      scrollFrame = 0;
    });
  }
  function stopAnimations(event) {
    if (event.matches) {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }
  }
  async function copyEmail() {
    clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText("nikitamuller1005@gmail.com");
      copyStatus.value = "Email copied!";
    } catch {
      copyStatus.value = "Could not copy. Please use the email link.";
    }
    copyTimer = setTimeout(() => {
      copyStatus.value = "";
    }, 4500);
  }
  onMounted(() => {
    systemTheme.addEventListener("change", followSystem);
    reducedMotion.addEventListener("change", stopAnimations);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(document.body);
    updateProgress();
    // Animate on entry without hiding content while JavaScript or observers load.
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealObserver.unobserve(entry.target);
          if (reducedMotion.matches) return;
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("main > section:not(#home) > .section-inner")
      .forEach((element) => revealObserver.observe(element));
  });
  onUnmounted(() => {
    systemTheme.removeEventListener("change", followSystem);
    reducedMotion.removeEventListener("change", stopAnimations);
    window.removeEventListener("scroll", updateProgress);
    window.removeEventListener("resize", updateProgress);
    resizeObserver?.disconnect();
    revealObserver?.disconnect();
    cancelAnimationFrame(scrollFrame);
    clearTimeout(copyTimer);
    animations.forEach((animation) => animation.cancel());
  });
  return {
    languages,
    locale,
    theme,
    themeLabel,
    toggleTheme,
    t,
    scrollProgress,
    copyEmail,
    copyStatus,
  };
}
