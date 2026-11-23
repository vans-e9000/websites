import { Reveal } from './Reveal'

type PageHeroProps = {
  title: string
  lead: string
  brandFirst?: boolean
}

export function PageHero({ title, lead, brandFirst = false }: PageHeroProps) {
  return (
    <section className="border-b border-gray-light bg-[linear-gradient(180deg,#f7f9f2_0%,#e6ecd6_100%)] pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="container-site max-w-3xl">
        <Reveal>
          {brandFirst ? (
            <p className="font-display text-3xl font-semibold tracking-tight text-surface md:text-5xl">
              {title}
            </p>
          ) : (
            <h1 className="text-3xl md:text-5xl">{title}</h1>
          )}
          <p className="mt-4 max-w-2xl text-base text-text md:text-lg">{lead}</p>
        </Reveal>
      </div>
    </section>
  )
}
