import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { projects } from '../data/company'

export function Projects() {
  return (
    <article className="pt-[77px]">
      <header className="bg-bg-surface py-16 text-text-inverse sm:py-24 md:py-[6.25rem]">
        <div className="container-site">
          <p className="tracking-[0.14em] text-green-light">Projects</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,6vw,4rem)] leading-[1.08] tracking-[-0.08em] text-text-inverse">
            Five strategic scopes
          </h1>
          <p className="mt-6 max-w-2xl text-green-light">
            Painting, estate construction, interiors, civil packages, and
            commercial fit-outs — prototype workstreams, not CRB-filed contracts.
          </p>
        </div>
      </header>

      <section className="py-16 sm:py-24 md:py-[6.25rem]">
        <div className="container-site space-y-12 sm:space-y-16 md:space-y-20">
          {projects.map((project, i) => {
            const reverse = i % 2 === 1
            return (
              <Reveal key={project.id} delayMs={40}>
                <article className="grid items-center gap-10 lg:grid-cols-2">
                  <div className={reverse ? 'lg:order-2' : ''}>
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      width={800}
                      height={640}
                      className="aspect-[5/4] w-full rounded-[16px] object-cover"
                    />
                  </div>
                  <div className={reverse ? 'lg:order-1' : ''}>
                    <p className="tracking-[0.14em] text-green-mid">{project.category}</p>
                    <h2 className="mt-3 font-display text-heading-sm">{project.title}</h2>
                    <p className="mt-4">{project.summary}</p>
                    <p className="mt-4">{project.outcome}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CtaBand />
    </article>
  )
}
