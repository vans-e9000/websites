# Anelisa Investment Ltd Website SEO Audit

## Executive Summary

The new site has a crawlable six-page structure covering the homepage, services, projects, company profile, contact details, and quote request. Each route uses a distinct title, description, canonical placeholder, semantic headings, descriptive image alt text, and internal links that support both service discovery and lead conversion. The site is built around the verified business facts available from the Contractors Registration Board: Anelisa Investment Ltd is listed in Nzega, with Andondile Mwakitalu as Managing Director, Building Class 6 registration, and a separate Civil Class 5 listing in the CRB search result. The site does not claim completed projects, client names, awards, delivery statistics, or safety certifications because the source material does not provide them. Technical search controls include `manus-routes.json`, `sitemap.xml`, `robots.txt`, JSON-LD contractor markup, accessible navigation, and responsive layouts. Before production launch, confirm the placeholder domain in the sitemap and canonical tags, connect the quote form to a real inbox or CRM if server-side delivery is preferred, add verified project evidence, and run Lighthouse plus Google Search Console checks. Backlink strength, organic traffic, keyword mix, indexation, and Core Web Vitals cannot be assessed from the supplied source data.

## Evidence-led findings

1. **Site architecture:** The six-page hierarchy is shallow and supports clear journeys from service discovery to quote request. Keep the primary navigation limited to the requested routes and link every service page back to the quote flow.
2. **Content coverage:** Building works, civil works, project delivery, and site coordination are described in direct business language. Add project case studies only when location, scope, delivery date, and approved images are available.
3. **Structured data:** The homepage includes `LocalBusiness`/`Contractor` JSON-LD with the verified phone, email, Nzega location, and CRB registration context. Validate it with Google€™s Rich Results Test after a live domain is available.
4. **Technical SEO:** Titles, descriptions, heading order, image alt text, sitemap, robots rules, and route declarations are included. Confirm the placeholder production domain before launch.
5. **Missing datasets:** No GSC, GA4, crawl export, backlink export, keyword export, or PageSpeed data was provided. Traffic trend, country mix, branded versus non-branded search, backlink quality, and Core Web Vitals are therefore unverified.

## Priority fixes

1. Confirm the production domain in `sitemap.xml`, `robots.txt`, and each page€™s canonical tag. The build uses `https://anelisainvestment.co.tz` as a placeholder.
2. Connect the quote form to the company€™s preferred mailbox and add spam protection.
3. Add verified project pages with original photography, scope, location, delivery dates, and client approval.
4. Submit the live sitemap in Google Search Console and monitor indexing and query data.
5. Run a Lighthouse audit on mobile and compress any locally hosted media before launch.

## Sources

- Contractors Registration Board search listing: https://www.crb.go.tz/contractordetails/home/search?search=anelisa
- Contractors Registration Board Anelisa detail record: https://www.crb.go.tz/contractordetails/home/show/626


