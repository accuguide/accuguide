# Accuguide

[![Cypress](https://github.com/accessfinder/accessfinder/actions/workflows/cypress.yml/badge.svg)](https://github.com/accessfinder/accessfinder/actions/workflows/cypress.yml)
[![CodeQL](https://github.com/accessfinder/accessfinder/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/accessfinder/accessfinder/actions/workflows/github-code-scanning/codeql)
[![Next](https://github.com/accessfinder/accessfinder/actions/workflows/next.yml/badge.svg)](https://github.com/accessfinder/accessfinder/actions/workflows/next.yml)
[![ESLint](https://github.com/accessfinder/accessfinder/actions/workflows/eslint.yml/badge.svg)](https://github.com/accessfinder/accessfinder/actions/workflows/eslint.yml)
[![Prettier](https://github.com/accessfinder/accessfinder/actions/workflows/prettier.yml/badge.svg)](https://github.com/accessfinder/accessfinder/actions/workflows/prettier.yml)

## About

The source code for Accuguide's website. Accuguide is a platform designed by and for people with disabilities to be able to find and rate accessible places and services! In addition to basic features such as searching and rating entities, ML and AI will be utilized to analyze reviews, images, and entity info to give more information to the user. This project will likely see slow development as it is only developed by one person at the moment, but we hope to get more open source volunteers to help develop this platform.

## Contributing

We are always looking for open source contributions! Check out our contribution guidelines [here](https://github.com/accessfinder/.github/blob/main/CONTRIBUTING.md) for more information!

## Setup

### Prerequisites

- [Docker](https://docs.docker.com/desktop/)
- [Node.js](https://nodejs.org/en/download) (It is recommended to use the LTS version)

### Code Setup

1. `git clone https://github.com/accessfinder/accessfinder.git`
2. `npm install`
3. `cp .env.example .env`
4. Register a free Google Maps API key in Google Cloud (create a project for the key if you don't have one yet). Please ensure to limit quotas to ensure you stay within free limits (e.g. 10 requests/minute, 100 requests/day). Put this key into the `.env` file created in the last step.
5. In your Google Cloud project, setup the OAuth consent screen and client. For Authorized Javascript origins, put `http://localhost:3000`, and for Authorized redirect URIs put `http://localhost:3000/login/google/callback`. On the client page, you will find the Client ID and Client secret. Add both these values to your `.env` file.

### Running The Code

1. `npm run db:start`
2. `npm run db:push` (run this only on first setup or when database schema/seed changes are made)
3. `npm run db:seed` (run this only on first setup or when you want to reset to the seed data)
4. `npm run s3:push`
5. `npm run dev`
6. `npm run db:studio` (optional, only needed to visualize/directly edit database)

## Sponsors

Please considering sponsoring Accuguide to ensure continued development and ability to keep this project free and open source!

### Current Sponsors

<img width="64" alt="logo-netlify-encapsulated-monochrome-darkmodealt" src="https://github.com/user-attachments/assets/6e57689c-3bf9-4378-a471-61d26910cc09" />
