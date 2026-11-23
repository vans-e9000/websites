import { ButtonLink } from './Button'
import { Reveal } from './Reveal'
import { company } from '../data/company'

export function CtaBand() {
  return (
    <section className="bg-bg-surface py-20 text-text-inverse">
      <div className="container-site">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl text-text-inverse md:text-4xl">
              Ready to start your project?
            </h2>
            <p className="mt-4 text-green-light">
              Tell us about your painting, building, finishing, or civil works brief.
              We will respond with next steps and a clear quote path.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact">Get a quote</ButtonLink>
              <ButtonLink to={`https://wa.me/${company.whatsappNumber}`} variant="ghost" external>
                WhatsApp us
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
