'use client'

import BigHeading from '@/components/layout/big-heading'
import AboutImage from '@/components/about-image'

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
    src: '/images/about/guide.avif',
    alt: 'Accessibility feature example',
  },
  {
    src: '/images/about/parking.jpg',
    alt: 'Community rating accessibility',
  },
  {
    src: '/images/about/braille.jpg',
    alt: 'Accessible entrance',
  },
  {
    src: '/images/about/sensory.jpg',
    alt: 'Wheelchair accessibility',
  },
  {
    src: '/images/about/flower.jpg',
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
    <div>
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate">
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 my-10 md:my-20 lg:px-8">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <BigHeading
                    title={bigHeading.title}
                    subtitle={bigHeading.subtitle}
                  />
                </div>
                <div className="mt-12 justify-end gap-6 sm:-mt-44 sm:justify-start sm:pl-20 lg:-mt-8 lg:pl-0 hidden md:flex">
                  <div className="ml-auto w-40 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
                    <AboutImage
                      src={aboutImages[0].src}
                      alt={aboutImages[0].alt}
                    />
                  </div>
                  <div className="mr-auto w-40 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <AboutImage
                      src={aboutImages[1].src}
                      alt={aboutImages[1].alt}
                    />
                    <AboutImage
                      src={aboutImages[2].src}
                      alt={aboutImages[2].alt}
                    />
                  </div>
                  <div className="w-40 flex-none space-y-8 pt-32 sm:pt-0">
                    <AboutImage
                      src={aboutImages[3].src}
                      alt={aboutImages[3].alt}
                    />
                    <AboutImage
                      src={aboutImages[4].src}
                      alt={aboutImages[4].alt}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2>Our Mission</h2>
            <div className="mt-8 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-lg ">
                  Accuguide is a platform that allows users to search for places
                  and services based on their accessibility needs. Users can
                  view a variety of accessibility indicators to make informed
                  decisions about where to go.
                </p>
                <p className="mt-10 max-w-xl text-base secondary-text">
                  Our community-driven approach enables users to rate their
                  accessibility experiences at locations, helping others
                  understand what places are accessible and what places to
                  avoid. By sharing real experiences, we're building a
                  comprehensive database of accessibility information that
                  benefits everyone in the disability community.
                </p>
                <p className="mt-6 max-w-xl text-base secondary-text">
                  We believe that accessibility information should be easily
                  available to everyone who needs it. Through Accuguide, we're
                  working to create a more inclusive world where people with
                  disabilities can confidently navigate their communities and
                  discover new places.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="mx-auto my-12 md:my-24 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2>Our Team</h2>
            <p className="mt-6 text-lg ">
              Accuguide is currently developed and maintained by a dedicated
              team passionate about creating accessible solutions, along with
              various open-source contributors who help improve the platform. As
              Accuguide grows, we hope to add more people to our team!
            </p>
          </div>
          <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            {team.map((person) => (
              <li key={person.name}>
                <img
                  alt=""
                  src={person.imageUrl}
                  className="mx-auto size-24 rounded-lg outline-1 -outline-offset-1"
                />
                <h3 className="mt-6 text-base tracking-tight">{person.name}</h3>
                <p className="text-sm ">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Sponsors section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2>Our Sponsors</h2>
            <p className="mt-6 text-lg">
              We're grateful for the support of our sponsors who help keep
              Accuguide up and running for free.
            </p>
          </div>
          <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 md:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            {sponsors.map((sponsor) => (
              <li key={sponsor.name}>
                <img
                  alt=""
                  src={sponsor.imageUrl}
                  className="mx-auto size-24 rounded-lg outline-1 -outline-offset-1"
                />
                <h3 className="mt-6 text-base  tracking-tight">
                  {sponsor.name}
                </h3>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact section */}
        <div className="mx-auto my-12 md:my-24 max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2>Get in Touch</h2>
            <p className="mt-6 text-lg">
              We would love to hear from you! Whether you have questions,
              comments, or feedback, feel free to reach out to us at{' '}
              <a href="mailto:support@accuguide.org" className=" ">
                support@accuguide.org
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
