import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { company } from '../data/company'

export function About() {
  return (
    <article className="pt-[77px]">
      <header className="bg-bg-surface py-16 text-text-inverse sm:py-24 md:py-[6.25rem]">
        <div className="container-site">
          <p className="tracking-[0.14em] text-green-light">About</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,6vw,4rem)] leading-[1.08] tracking-[-0.08em] text-text-inverse">
            A local contractor with two CRB tickets
          </h1>
          <p className="mt-6 max-w-2xl text-green-light">
            {company.legalName} is registered in Arusha for building and civil
            works. Facts below are taken from the public CRB directory.
          </p>
        </div>
      </header>

      <section className="py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site grid gap-12 lg:gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-heading">Who we are</h2>
            <p className="mt-4">
              We paint, build, finish interiors, prepare ground, and supply
              materials for homes and commercial sites around Arusha. The
              company is led by {company.managingDirector}, listed as managing
              director on both CRB records.
            </p>
            <p className="mt-4">
              Civil registration dates to August 2015. Building class 6 followed
              in March 2020. Both records list category Local, town Arusha, and
              the same street address.
            </p>
            <p className="mt-4">
              Project stories on this site are strategic marketing prototypes, not
              CRB-filed contract records. Email is not listed on the public CRB
              detail pages.
            </p>
          </Reveal>
          <Reveal>
            <img
              src="/images/painting-ladder.jpg"
              alt="Worker painting wall on ladder"
              loading="lazy"
              width={800}
              height={600}
              className="aspect-[4/3] w-full rounded-[16px] object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-gray-light py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site">
          <Reveal>
            <h2 className="font-display text-heading">Company details</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-8">
            <Reveal>
              <dl className="space-y-6 bg-bg-canvas p-6 rounded-[16px] sm:p-8">
                <div>
                  <dt className="tracking-[0.14em] text-green-mid">Legal name</dt>
                  <dd className="mt-1 text-bg-surface">{company.legalName}</dd>
                </div>
                <div>
                  <dt className="tracking-[0.14em] text-green-mid">Director</dt>
                  <dd className="mt-1 text-bg-surface">{company.managingDirector}</dd>
                </div>
                <div>
                  <dt className="tracking-[0.14em] text-green-mid">Address</dt>
                  <dd className="mt-1 text-bg-surface">
                    {company.physicalAddress}, {company.postalAddress}, {company.town}
                  </dd>
                </div>
                <div>
                  <dt className="tracking-[0.14em] text-green-mid">Email on CRB</dt>
                  <dd className="mt-1 text-bg-surface">Not published on the registry pages.</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal>
              <img
                src="/images/foundation-digging.jpg"
                alt="Construction workers digging foundation ditches"
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/3] w-full rounded-[16px] object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-gray-light py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site">
          <Reveal>
            <h2 className="font-display text-heading">Registrations</h2>
            <p className="mt-3 max-w-xl">
              Verify these numbers on crb.go.tz. We do not invent class or
              licence data.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-8">
            {company.registrations.map((r) => (
              <Reveal key={r.number}>
                <p className="tracking-[0.14em] text-green-mid">{r.type}</p>
                <p className="mt-2 font-display text-heading-sm">Class {r.class}</p>
                <p className="mt-2">{r.number}</p>
                <a
                  href={r.sourceUrl}
                  className="mt-4 inline-block text-bg-surface underline decoration-accent underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open CRB record
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display text-heading">Work with us</h2>
          <ButtonLink to="/contact">Get a quote</ButtonLink>
        </div>
      </section>
    </article>
  )
}
