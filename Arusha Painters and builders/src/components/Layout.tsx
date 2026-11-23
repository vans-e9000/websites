import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { company } from '../data/company'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export function Layout() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1100] focus:rounded-[48px] focus:bg-accent focus:px-4 focus:py-2 focus:text-bg-surface"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[1000] h-[77px] transition-[background-color,backdrop-filter] duration-300 ease-custom-1 ${
          scrolled || open
            ? 'bg-bg-canvas/95 backdrop-blur-[20px] shadow-lg'
            : 'bg-black/40 backdrop-blur-[10px]'
        }`}
      >
        <div className="container-site flex h-full items-center justify-between">
          <Link
            to="/"
            className={`font-display text-lg tracking-tight transition-all duration-300 hover:scale-105 hover:drop-shadow-lg ${
              scrolled ? 'text-text-primary hover:text-accent' : 'text-white hover:text-accent'
            }`}
          >
            {company.brandName}
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-5 py-3 text-sm tracking-[0.14em] transition-all duration-300 font-medium ${
                    scrolled
                      ? isActive
                        ? 'text-text-primary'
                        : 'text-text-primary hover:text-accent hover:scale-105'
                      : isActive
                      ? 'text-white drop-shadow-md'
                      : 'text-white/90 hover:text-white hover:scale-105 hover:drop-shadow-md'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="ml-2 rounded-[48px] px-7 py-3 text-sm tracking-[0.14em] transition-all duration-300 hover:scale-105 hover:shadow-xl bg-bg-surface text-accent font-medium"
            >
              Get a quote
            </Link>
          </nav>

          <button
            type="button"
            className={`rounded-[12px] px-4 py-3 text-sm tracking-[0.14em] lg:hidden transition-all duration-300 hover:scale-105 ${
              scrolled ? 'text-text-primary hover:bg-gray-light' : 'text-white hover:bg-white/20'
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-gray-light bg-bg-canvas lg:hidden"
          >
            <nav className="container-site flex flex-col py-6" aria-label="Mobile">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className="py-4 text-base tracking-[0.14em] text-bg-surface active:scale-95 transition-transform"
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-[48px] px-7 py-3 text-sm tracking-[0.14em] transition-all duration-300 hover:scale-105 bg-bg-surface text-accent font-medium text-center"
              >
                Get a quote
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="bg-bg-surface text-text-inverse">
        <div className="container-site grid gap-12 py-16 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl tracking-tight">{company.brandName}</p>
            <p className="mt-4 max-w-sm text-green-light">
              {company.legalName}. Local CRB contractor, Arusha.
            </p>
          </div>
          <div>
            <p className="mb-4 tracking-[0.14em] text-green-light">Visit</p>
            <p>
              {company.physicalAddress}
              <br />
              {company.postalAddress}
              <br />
              {company.town}
            </p>
            <p className="mt-4">
              {company.phones.map((p) => (
                <a key={p} href={`tel:+255${p.slice(1)}`} className="block hover:text-accent">
                  {p}
                </a>
              ))}
            </p>
          </div>
          <div>
            <p className="mb-4 tracking-[0.14em] text-green-light">Pages</p>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-green-light transition-[color,transform] duration-200 hover:scale-95 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container-site flex flex-wrap justify-between gap-4 border-t border-border py-6 text-small text-green-light">
          <p>© {new Date().getFullYear()} {company.shortName}</p>
          <a
            href={company.crbSearchUrl}
            className="hover:text-accent"
            target="_blank"
            rel="noreferrer"
          >
            Verify on CRB
          </a>
        </div>
      </footer>
    </div>
  )
}
