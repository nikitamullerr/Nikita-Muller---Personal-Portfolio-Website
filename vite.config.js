import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    {
      name: 'legacy-page-redirects',
      generateBundle() {
        for (const page of ['about', 'education', 'contact']) {
          this.emitFile({
            type: 'asset',
            fileName: page + '.html',
            source: '<!doctype html><html lang="en"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=./index.html#' + page + '"><title>Redirecting</title><a href="./index.html#' + page + '">Continue to ' + page + '</a></html>',
          })
        }
      },
    },
  ],
})
