'use client'

import AboutContainer from '@/components/about/about-container'
import AboutImage from '@/components/about/about-image'
import BigHeading from '@/components/layout/big-heading'
import Spacer from '@/components/spacer'
import Sponsor from '@/components/sponsor'
import TeamMember from '@/components/team-member'

const team = [
  {
    name: 'Naya Singhania',
    role: 'Founder',
    imageUrl: '/images/people/nayasinghania.jpg',
  },
]

const sponsors = [
  {
    name: 'Builders & Backers',
    imageUrl: '/images/sponsors/buildersandbackers.jpg',
  },
  {
    name: 'Netlify',
    imageUrl: '/images/sponsors/netlify.png',
  },
]

const aboutImages = [
  {
    src: '/images/about/guide',
    alt: 'Accessibility feature example',
  },
  {
    src: '/images/about/parking',
    alt: 'Community rating accessibility',
  },
  {
    src: '/images/about/braille',
    alt: 'Accessible entrance',
  },
  {
    src: '/images/about/sensory',
    alt: 'Wheelchair accessibility',
  },
  {
    src: '/images/about/flower',
    alt: 'Accessible facilities',
  },
]

const bigHeading = {
  title: 'Making the world more accessible',
  subtitle:
    'Accuguide is a web application created to help people with disabilities find and rate places based on various accessibility features. Our platform empowers users to make informed decisions about where to go by providing detailed accessibility information and real community experiences.',
}

export default function AboutPage() {
  return (
    <main className="isolate">
      {/* Hero section */}
      <div className="mx-auto my-10 max-w-7xl md:my-20">
        <div className="items-center gap-x-12 lg:flex">
          <BigHeading title={bigHeading.title} subtitle={bigHeading.subtitle} />
          <div className="mt-12 hidden gap-6 sm:-mt-44 md:flex lg:-mt-8 justify-end">
            <div className="space-y-8 pt-32 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
              <AboutImage src={aboutImages[0].src} alt={aboutImages[0].alt} />
            </div>
            <div className="space-y-8 sm:pt-52 lg:pt-36">
              <AboutImage src={aboutImages[1].src} alt={aboutImages[1].alt} />
              <AboutImage src={aboutImages[2].src} alt={aboutImages[2].alt} />
            </div>
            <div className="space-y-8 pt-32 sm:pt-0">
              <AboutImage src={aboutImages[3].src} alt={aboutImages[3].alt} />
              <AboutImage src={aboutImages[4].src} alt={aboutImages[4].alt} />
            </div>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <AboutContainer>
        <h2>Our Mission</h2>

        <p className="big-text max-w-2xl">
          Accuguide is a platform that allows users to search for places and
          services based on their accessibility needs. Users can view a variety
          of accessibility indicators to make informed decisions about where to
          go.
        </p>
        <p className="secondary-text">
          Our community-driven approach enables users to rate their
          accessibility experiences at locations, helping others understand what
          places are accessible and what places to avoid. By sharing real
          experiences, we're building a comprehensive database of accessibility
          information that benefits everyone in the disability community.
        </p>
        <p className="secondary-text">
          We believe that accessibility information should be easily available
          to everyone who needs it. Through Accuguide, we're working to create a
          more inclusive world where people with disabilities can confidently
          navigate their communities and discover new places.
        </p>
      </AboutContainer>
      <Spacer />

      {/* Team section */}
      <AboutContainer>
        <h2>Our Team</h2>
        <p className="big-text max-w-2xl">
          Accuguide is currently developed and maintained by a dedicated team
          passionate about creating accessible solutions, along with various
          open-source contributors who help improve the platform. As Accuguide
          grows, we hope to add more people to our team!
        </p>
        <ul className="about-list">
          {team.map((person) => (
            <TeamMember
              key={person.name}
              name={person.name}
              role={person.role}
              imageUrl={person.imageUrl}
            />
          ))}
        </ul>
      </AboutContainer>
      <Spacer />

      {/* Sponsors section */}
      <AboutContainer>
        <h2>Our Sponsors</h2>
        <p className="big-text max-w-2xl">
          We're grateful for the support of our sponsors who help keep Accuguide
          up and running for free.
        </p>
        <ul className="about-list">
          {sponsors.map((sponsor) => (
            <Sponsor
              key={sponsor.name}
              name={sponsor.name}
              imageUrl={sponsor.imageUrl}
            />
          ))}
        </ul>
      </AboutContainer>
      <Spacer />

      {/* Contact section */}
      <AboutContainer>
        <h2>Get in Touch</h2>
        <p className="big-text">
          We would love to hear from you! Whether you have questions, comments,
          or feedback, feel free to reach out to us at{' '}
          <a href="mailto:support@accuguide.org">support@accuguide.org</a>.
        </p>
      </AboutContainer>
      <Spacer />
    </main>
  )
}
