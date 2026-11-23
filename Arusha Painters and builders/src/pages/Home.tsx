import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { company, projects, services, testimonials } from '../data/company'
import { useState, useEffect } from 'react'

const heroSlides = [
  {
    image: '/images/hero-1.jpg',
    alt: 'Construction worker on scaffolding at work',
    text: '01 / STRUCTURAL BUILDING (CRB CLASS 6)',
  },
  {
    image: '/images/hero-2.jpg',
    alt: 'Construction workers building site',
    text: '02 / PREMIUM ARCHITECTURAL PAINTING',
  },
  {
    image: '/images/hero-3.jpg',
    alt: 'Professional construction team at work',
    text: '03 / CIVIL & FOUNDATION WORKS (CRB CLASS 7)',
  },
  {
    image: '/images/hero-4.jpg',
    alt: 'Construction site with workers',
    text: '04 / BULK MATERIAL SUPPLIES & LOGISTICS',
  },
  {
    image: '/images/interior.jpg',
    alt: 'Interior fit-out and finishing work',
    text: '05 / INTERIOR FINISHING & FIT-OUTS',
  },
]

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={slide.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[8000ms] ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-105'
                : 'opacity-0 scale-100'
            }`}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(rgba(16, 22, 4, 0.3), rgba(16, 22, 4, 0.7) 60%, rgb(16, 22, 4))',
          }}
        />
        <div className="container-site relative flex min-h-[100svh] flex-col justify-center pb-12 pt-24 sm:pb-16 sm:pt-28">
          <p className="font-display text-[clamp(2rem,8vw,4.5rem)] leading-[1.03] tracking-[-0.08em] text-text-inverse">
            {company.brandName}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-[clamp(1.25rem,4vw,2.5rem)] leading-[1.08] tracking-[-0.04em] text-accent sm:mt-4">
            Paint, build, and finish work that holds in Arusha weather.
          </h1>
          <p className="mt-3 max-w-xl text-green-light sm:mt-4">
            CRB-registered building class 6 and civil class 7 contractor — local
            delivery from St. Benjamini Street.
          </p>
          <p className="mt-4 font-display text-base tracking-[0.14em] text-text-inverse sm:mt-6 sm:text-lg">
            {heroSlides[currentSlide].text}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-8 rounded-full transition-all ${
                  index === currentSlide ? 'bg-accent' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <ButtonLink to="/contact">Get a quote</ButtonLink>
            <ButtonLink to="/projects" variant="secondary">
              View projects
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-bg-surface py-16 text-text-inverse sm:py-24 md:py-[6.25rem]">
        <div className="container-site grid gap-8 md:grid-cols-4 sm:gap-10">
          {[
            { k: 'Building', v: 'Class 6' },
            { k: 'Civil', v: 'Class 7' },
            { k: 'Category', v: 'Local' },
            { k: 'Based in', v: 'Arusha' },
          ].map((stat) => (
            <Reveal key={stat.k}>
              <p className="tracking-[0.14em] text-green-light">{stat.k}</p>
              <p className="mt-2 font-display text-heading-sm text-accent">{stat.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site">
          <Reveal>
            <p className="tracking-[0.14em] text-green-mid">Services</p>
            <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,5vw,2.5rem)]">
              Expertise built on registered trades
            </h2>
            <p className="mt-4 max-w-xl">
              We help property owners and developers move from site to finished
              space with painting, building, finishing, civil works, and supplies.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
            {services.map((s, i) => (
              <Reveal key={s.id} delayMs={i * 60}>
                <p className="font-display text-subheading text-bg-surface">{s.title}</p>
                <p className="mt-3">{s.summary}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 md:mt-10">
            <ButtonLink to="/services">View services</ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="bg-gray-light py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site">
          <Reveal>
            <p className="tracking-[0.14em] text-green-mid">Projects</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.5rem)]">
              Five strategic scopes we deliver
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-10">
            {projects.slice(0, 3).map((p) => (
              <Reveal key={p.id}>
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  loading="lazy"
                  width={800}
                  height={640}
                  className="aspect-[5/4] w-full rounded-[16px] object-cover"
                />
                <p className="mt-4 tracking-[0.14em] text-green-mid">{p.category}</p>
                <h3 className="mt-2 font-display text-subheading">{p.title}</h3>
                <p className="mt-3">{p.summary}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 md:mt-10">
            <ButtonLink to="/projects">See all projects</ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site max-w-3xl">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,5vw,2.5rem)]">
              Public record, not marketing claims
            </h2>
            <p className="mt-4">
              Managing director {company.managingDirector}. Registrations{' '}
              {company.registrations.map((r) => r.number).join(' and ')} — listed
              on the Contractors Registration Board of Tanzania.
            </p>
            <div className="mt-6 md:mt-8">
              <ButtonLink to="/about" variant="secondary" className="!bg-bg-surface !text-accent">
                Company credentials
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site">
          <Reveal>
            <p className="tracking-[0.14em] text-green-mid">Trust</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.5rem)]">
              How clients talk about the work
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10">
            {testimonials.map((item, i) => (
              <Reveal key={item.name} delayMs={i * 60}>
                <blockquote>
                  <p className="text-bg-surface">“{item.quote}”</p>
                  <footer className="mt-4 text-sm">{item.name}</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg-surface py-16 text-text-inverse sm:py-24 md:py-[6.25rem]">
        <div className="container-site relative text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] text-text-inverse">
              Ready to start a site in Arusha?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-green-light">
              Tell us the property, the finish you need, and the timeline. We
              respond with a clear next step.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-8">
              <ButtonLink to="/contact" variant="secondary">
                Book a call
              </ButtonLink>
              <ButtonLink
                to={`https://wa.me/${company.whatsappNumber}`}
                variant="ghost"
                external
              >
                WhatsApp
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
