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
- Postgre SQL
- Google Cloud Platform (Auth, Maps API)
- Groq (groq/compound)
- Better Auth
- Tailwind CSS
- AWS (Image Storage)
- Cypress (Tests)

### Code Quality

- CodeQL
- Biome

### v3.0 Roadmap (estimated completion in early 2026)

- [x] UI redesign
- [ ] Accessibility summary caching
- [ ] Account deletion
- [ ] Public profile page
- [ ] Business claiming placeholder
- [ ] Search algorithm improvements
- [ ] Search result paging
- [ ] Accessibility score in search results
- [ ] Filters for resources
- [ ] Completion of Admin dashboard
- [ ] Basic review moderation
- [ ] Error handling for all comomon issues
- [ ] Loading states for slow actions
- [ ] Volunteer position page
- [ ] Switch to IPv6
- [ ] Switch to native feedback form
- [ ] Ability to add images to reviews
- [ ] Map view
- [ ] Stripe donate form embed
- [ ] Apple OAuth
- [ ] Search filters
- [ ] Fix geolocation issues for location-based search
- [ ] Migrate email subscription management to Mailgun
- [ ] Migrate FAQ items to database
- [ ] Revise legal documents
- [ ] Set up email verification
- [ ] Random username generation for OAuth account creation
- [ ] Handling of non-physical locations
- [ ] Add additional donation options (Github Sponsors, etc)

### Beta Access

- You can access the open beta at https://beta.accuguide.org (if you already have an account on the production site, use that same account to log in to the beta site)
- The beta includes features and improvements that have not yet been formally released to the production site

## Contributing

We are always looking for open source contributions! Check out our contribution guidelines [here](https://github.com/accuguide/.github/blob/main/CONTRIBUTING.md) for more information! Once you are familiar with our guidelines, you can check out our issues to see what needs to be added, fixed, or changed. If you are a new contributor on Github we reccomend you try and tackle issues labeled "good first issue".

## Setup

### Prerequisites

- [Docker](https://docs.docker.com/desktop/)
- [Bun](https://bun.sh/)

### Code Setup

1. `git clone https://github.com/accuguide/accuguide.git`
2. `bun install`
3. `cp .env.example .env`

#### Optional (but recommended) steps

4. Register a free Google Maps API key in Google Cloud (create a project for the key if you don't have one yet). Please ensure to limit quotas to ensure you stay within free limits (e.g. 10 requests/minute, 100 requests/day). Put this key into the `.env` file created in the last step. This step is only required if you need search to function when developing locally.
5. In your Google Cloud project, setup the OAuth consent screen and client. For Authorized Javascript origins, put `http://localhost:3000`, and for Authorized redirect URIs put `http://localhost:3000/login/google/callback`. On the client page, you will find the Client ID and Client secret. Add both these values to your `.env` file. This step is only required if you need Google OAuth to work when developing locally.
6. Register a free Groq AI API key and add it to the appropriate field in your `.env` file. This step is only required if you need place AI summaries to work when developing locally.

### Running The Code

1. `docker compose up`

The following commands are only for initial database setup

- `bun run db:seed` (run this only on first setup or when you want to reset to the seed data)

## Sponsors

Please considering sponsoring Accuguide to ensure continued development and ability to keep this project free and open source!

### Current Sponsors
No sponsors yet!
