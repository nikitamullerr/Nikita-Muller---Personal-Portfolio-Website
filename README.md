# Nikita Muller — Personal Portfolio

A responsive Vue 3 portfolio, built with Vite. The design follows the supplied dark portfolio reference with the original purple and lilac accents, glowing backgrounds, and rounded translucent panels. Profile, education, experience, and certifications are based on the supplied CV.

## Development

Requires Node.js 20.19+ or 22.12+.

npm install
npm run dev

## Production

npm run build
npm run preview

Deploy the generated dist directory to a static host. Vite uses relative asset paths, including for GitHub Pages project sites. Configure Pages to deploy the built dist artifact, rather than serving the source branch directly.

## Structure

- src/App.vue: application shell and shared-state provider
- src/views/PortfolioView.vue: page composition
- src/components/: section, layout, control, card, project, and contact components
- src/composables/: shared preferences, navigation, and project filtering
- src/data/portfolio.js: editable portfolio content
- src/locales/translations.json: translation dictionary
- src/style.css: responsive layout and original color palette
- src/main.js: Vue entry point
- images/Nikita_Muller_Headshot.png: original portrait
- vite.config.js: build configuration and redirects for the old HTML URLs

The contact form preserves the existing Formspree endpoint and native browser validation. Successful submissions are handled by Formspree. The form is not sent during local verification.

The old HTML URLs redirect to the matching Vue sections in development and production. The original stylesheet remains as reference source.

## Visitor features

- Light and dark themes: follows the system preference until a visitor chooses a theme.
- English, Afrikaans, and isiXhosa: the language selector updates content, labels, and the document language. Names and technology brands stay unchanged. Translations live in src/locales/translations.json.
- Theme and language preferences are saved locally when storage is available.
- Search projects and filter by technology; clear filters when no results match.
- Copy the contact email, follow reading progress, and jump back to the top.
- Entrance and hover animations respect the reduced-motion preference.
