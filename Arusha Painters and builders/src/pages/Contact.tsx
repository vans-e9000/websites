import { useState, type FormEvent } from 'react'
import { Button, ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { company } from '../data/company'

export function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <article className="pt-[77px]">
      <header className="bg-bg-surface py-[6.25rem] text-text-inverse">
        <div className="container-site">
          <p className="tracking-[0.14em] text-green-light">Contact</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.08] tracking-[-0.08em] text-text-inverse">
            Tell us about the site
          </h1>
          <p className="mt-6 max-w-xl text-green-light">
            Phones are from the CRB listing. Email is not published there — use
            the form, a call, or WhatsApp.
          </p>
        </div>
      </header>

      <section className="py-[6.25rem]">
        <div className="container-site grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-heading">Reach us</h2>
            <p className="mt-4">
              {company.physicalAddress}
              <br />
              {company.postalAddress}
              <br />
              {company.town}
            </p>
            <p className="mt-6 space-y-2">
              {company.phones.map((p) => (
                <a key={p} href={`tel:+255${p.slice(1)}`} className="block hover:text-bg-surface">
                  {p}
                </a>
              ))}
            </p>
            <div className="mt-8">
              <ButtonLink to={`https://wa.me/${company.whatsappNumber}`} external>
                WhatsApp
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal>
            {sent ? (
              <p className="font-display text-heading-sm">
                Thank you. We will follow up using the number you left.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <label className="block">
                  <span className="tracking-[0.14em]">Name</span>
                  <input
                    required
                    name="name"
                    className="mt-2 w-full rounded-[16px] border-0 bg-gray-light px-4 py-3 text-bg-surface outline-none focus-visible:outline-2 focus-visible:outline-accent"
                  />
                </label>
                <label className="block">
                  <span className="tracking-[0.14em]">Phone</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="mt-2 w-full rounded-[16px] border-0 bg-gray-light px-4 py-3 text-bg-surface outline-none focus-visible:outline-2 focus-visible:outline-accent"
                  />
                </label>
                <label className="block">
                  <span className="tracking-[0.14em]">Project</span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="mt-2 w-full rounded-[16px] border-0 bg-gray-light px-4 py-3 text-bg-surface outline-none focus-visible:outline-2 focus-visible:outline-accent"
                  />
                </label>
                <Button type="submit">Send enquiry</Button>
                <p className="text-small">
                  This form is a prototype — it does not email a server yet.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </article>
  )
}
