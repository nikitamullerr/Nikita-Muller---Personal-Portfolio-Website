import { ref, onMounted, onUnmounted } from "vue";

export function useNavigation() {
  const menuOpen = ref(false);
  const activeSection = ref("home");
  let observer;
  function navigate(id) {
    activeSection.value = id;
    menuOpen.value = false;
  }
  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            activeSection.value = entry.target.dataset.nav || entry.target.id;
        }
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    const legacy = window.location.pathname.match(
      /\/(about|education|contact)\.html$/,
    )?.[1];
    const target = legacy || window.location.hash.slice(1);
    if (target && document.getElementById(target)) {
      requestAnimationFrame(() =>
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "instant" }),
      );
    }
  });
  onUnmounted(() => observer?.disconnect());
  return { menuOpen, activeSection, navigate };
}
