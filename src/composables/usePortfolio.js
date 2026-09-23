import { inject, provide } from "vue";
import { usePreferences } from "./usePreferences.js";
import { useNavigation } from "./useNavigation.js";

const portfolioKey = Symbol("portfolio");

// Create one shared instance so settings and event listeners stay in sync.
export function providePortfolio() {
  const portfolio = { ...usePreferences(), ...useNavigation() };
  provide(portfolioKey, portfolio);
  return portfolio;
}

export function usePortfolio() {
  const portfolio = inject(portfolioKey);
  if (!portfolio)
    throw new Error(
      "Portfolio components require providePortfolio() in App.vue",
    );
  return portfolio;
}
