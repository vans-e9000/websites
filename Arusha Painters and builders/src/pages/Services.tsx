import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { services } from '../data/company'

const serviceImages: Record<string, string> = {
  painting: '/images/painting-ladder.jpg',
  building: '/images/kaduna-concrete-block.jpg',
  finishing: '/images/service-finishing.jpg',
  civil: '/images/service-civil.jpg',
  supplies: '/images/service-supplies.jpg',
}

export function Services() {
  return (
    <article className="pt-[77px]">
      <header className="py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site">
          <p className="tracking-[0.14em] text-green-mid">Services</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,6vw,4rem)] leading-[1.08] tracking-[-0.08em]">
            From first coat to finished structure
          </h1>
          <p className="mt-6 max-w-2xl">
            Five lines of work, one contractor. We keep the scope clear so you
            know who is on site and what gets handed over.
          </p>
        </div>
      </header>

      <section className="pb-16 sm:pb-24 md:pb-[6.25rem]">
        <div className="container-site space-y-12 sm:space-y-16">
          {services.map((s, i) => (
            <Reveal key={s.id}>
              <article
                className={`grid gap-6 py-8 md:gap-8 md:py-12 md:grid-cols-[160px_1fr] ${
                  i !== services.length - 1 ? 'border-b border-gray-light' : ''
                }`}
              >
                <p className="tracking-[0.14em] text-green-mid">0{i + 1}</p>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h2 className="font-display text-heading-sm">{s.title}</h2>
                    <p className="mt-3 max-w-2xl">{s.detail}</p>
                  </div>
                  <img
                    src={serviceImages[s.id]}
                    alt={s.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full rounded-[16px] object-cover"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-bg-surface py-16 text-text-inverse sm:py-24 md:py-[6.25rem]">
        <div className="container-site flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display text-heading text-text-inverse">
            Need a scoped proposal?
          </h2>
          <ButtonLink to="/contact" variant="secondary">
            Book a call
          </ButtonLink>
        </div>
      </section>
    </article>
  )
}
