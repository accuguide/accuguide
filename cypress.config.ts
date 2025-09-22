import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'guhs88',
  e2e: {
    baseUrl: 'http://localhost:3000',
    port: 3001,
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
