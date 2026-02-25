# Accuguide

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/accuguide/accuguide/biome.yml?logo=github&label=Biome)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/accuguide/accuguide/cypress.yml?logo=github&label=Cypress)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/accuguide/accuguide/codeql.yml?logo=github&label=CodeQL)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/accuguide/accuguide/build.yml?logo=github&label=Build)
![Netlify](https://img.shields.io/netlify/378e5089-548b-429f-b1ad-507f6bae73e4?logo=netlify&label=Netlify)

## About

The source code for Accuguide's website. Accuguide is a platform designed by and for people with disabilities to be able to find and rate accessible places and services!

### Tech Stack

- Next.js
- PostgreSQL
- Google Cloud Platform (Auth, Maps API)
- Groq (groq/compound)
- Better Auth
- Tailwind CSS
- AWS (Image Storage)
- Cypress (Tests)

### Code Quality

- CodeQL
- Biome

### Beta Access

- You can access the open beta at https://beta.accuguide.org (if you already have an account on the production site, use that same account to log in to the beta site)
- The beta includes features and improvements that have not yet been formally released to the production site

## Contributing

We are always looking for open source contributions! Check out our contribution guidelines [here](https://github.com/accuguide/.github/blob/main/CONTRIBUTING.md) for more information! Once you are familiar with our guidelines, you can check out our issues to see what needs to be added, fixed, or changed. If you are a new contributor on Github we recommend you try and tackle issues labeled "good first issue".

## Setup

### Prerequisites

- [Docker](https://docs.docker.com/desktop/)
- [Bun](https://bun.sh/)

### Code Setup

1. `git clone https://github.com/accuguide/accuguide.git`
2. `bun install`
3. `cp .env.example .env`

#### Optional (but recommended) steps

- Register a free Google Maps API key in Google Cloud (create a project for the key if you don't have one yet). Please ensure to limit quotas to ensure you stay within free limits (e.g. 10 requests/minute, 100 requests/day). Put this key into the `.env` file created in the last step, in both variables with the name `GOOGLE_MAPS_API_KEY`. This step is only required if you need search to function when developing locally.
  - In your Google Cloud project, setup the OAuth consent screen and client. For Authorized Javascript origins, put `http://localhost:3000`, and for Authorized redirect URIs put `http://localhost:3000/login/google/callback`. On the client page, you will find the Client ID and Client secret. Add both these values to your `.env` file. This step is only required if you need Google OAuth to work when developing locally.
- Register a free Groq AI API key and add it to the appropriate field in your `.env` file. This step is only required if you need place AI summaries to work when developing locally.
- At this time, donation and email related features are unavailable for contributors to work on due to complex setup requirements

### Running The Code

1. `bun dev`
2. `bun run s3:push`

3. The following commands are only for initial database setup / resetting the database

- `bun db:push` (applies schema changes)
- `bun db:seed` (resets to seed data)

If Docker is having issues regarding the volume location as a result of the upgrade from postgres:17 to postgres:18, running `docker compose down -v`, stopping all services, then doing the dev command again should fix it.

## Sponsors

Please considering sponsoring Accuguide to ensure continued development and ability to keep this project free and open source!

### Current Sponsors
No sponsors yet!

