# Greater Impact

A concise campaign site for the Greater Impact Learning Center: bright white, deep blue, and red; 20–22px body copy, 16px minimum supporting text, bold headings, and spaces for real photos. The homepage focuses on Christian faith, local families’ urgent need, the planned programs, affordable and self-sustaining care, and Greater Baltimore Church’s $1 million capital campaign over two years. The church receives gifts on behalf of the Learning Center as seed funding to make opening possible; ongoing operations are designed to be self-sustaining. Financial and in-kind donations are invited. Leadership credentials, readiness data, and the long-term vision are available in Questions. The public investment story describes the aging building and playground equipment without a repair breakdown. Built with Jekyll and plain HTML/CSS/JavaScript. No framework, remote fonts, analytics, or third-party requests on initial load.

## Preview

The capital campaign references are [Wanskuck Club](https://bgcprov.org/capital-campaign/) for the connection between an older building and broader learning opportunities, and [Youth Enrichment Services](https://yeskids.org/donate-boston-youth/the-future-of-yes/) for organizing the need, programs, opening plans, and funding request. The [Greater Baltimore Church website](https://www.greaterbaltimorechurch.org/) informs the white, blue, and red palette. Reference screenshots are in the local `.qa/` folder. The supplied church logo is saved unchanged as `assets/images/gbc-logo.png` and used in the header, footer, browser icon, and social preview; other reference-site images and branding are not reused.

The homepage presents early learning for ages 2–5, summer enrichment for grades K–6, and life-skills classes for children and parents. The need section uses the church’s supplied planning estimate for ZIP 21207: about 1,275 children estimated to use center care versus 944 licensed places open to under-5s, or roughly 330 more children than seats / demand 35% above capacity. Bars share a zero baseline and scale, demand 100%, capacity 74.04%. This is estimated demand versus capacity, not actual waiting lists or vacancies. Methods and age limits appear in the FAQ. School holidays are omitted; readiness data remain in Questions.

The hero leads with the future classroom concept. The campus gallery farther down combines the supplied current classroom and hallway photographs with two Google Earth captures of the outdoor space. Originals are unchanged; full-frame JPEG derivatives and small gallery thumbnails keep the page fast. AI-generated experience images sit under 01–03, including a life-skills class for parents and children. Future concepts below the campus story show an age-appropriate tech-forward preschool classroom, a busy summer learning camp with diverse counselors, and a playground transformation; they use the actual classroom and outdoor views as references. Captions distinguish current conditions, experiences, and future concepts. See `IMAGE-NOTES.md` for prompts and saved files.

With Ruby and Jekyll installed:

```powershell
jekyll serve --host 127.0.0.1 --port 4000
```

Open http://127.0.0.1:4000. To generate the static site, run `jekyll build`; output is in `_site/`. GitHub Pages can build the source directly.

## Edit

| Content | Location |
| --- | --- |
| Page story, opening dates, program details | `index.html` |
| Campaign goal and recipient, URL, business email, video ID, photo descriptions | `_data/site.yml` |
| Colors, spacing, responsive layouts | `assets/css/style.css` |
| Header, footer, social metadata | `_layouts/default.html` |
| Givebutter attribution, mobile navigation, video playback | `assets/js/main.js` |
| Questions and privacy | `faq.md`, `privacy.md` |

The business email uses the reserved `.example` domain. Replace it with a real monitored address, then set `prototype_email: false` to remove the prototype labels. Giving and campaign updates both go to the supplied Givebutter page; there is no local email database or fake signup form.

## Add real photos or video

The hero uses `classroom-concept-v3.jpg`. The current-campus gallery uses `classroom-current.jpg`, `hallway-current-thumb.jpg`, `campus-aerial-thumb.jpg`, and `summer-space-aerial-thumb.jpg`, with links to larger versions. Program images are `learning-illustration.jpg`, `summer-illustration.jpg`, and `family-class-illustration.jpg`. Future concepts are `classroom-concept-v3.jpg`, `summer-camp-concept-v2.jpg`, and `playground-concept.jpg`. The playground comparison uses `playground-area-current.jpg`, derived from the supplied `future-playground.png`. To replace an image, update its reference and description in `index.html` and the visible caption together. Preserve the attribution and watermarks on user-supplied photographs and Google Earth captures. See `ASSETS-SHOOT-LIST.md` for guidance.

For a hero video, add its YouTube ID to `video_youtube_id`. The page loads the video only after a click. Leave the ID empty to use the photo or placeholder.

## Attribution

Every Givebutter link (including updates links) receives incoming `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term` tags. Partial tag sets are preserved independently, without adding defaults or overwriting unrelated query parameters. No visitor data is stored. Attribution depends on JavaScript; the donation links themselves work without it.

Example: `/?utm_source=facebook&utm_medium=social&utm_campaign=greater-impact`

## Accessibility and performance

Semantic sections, a skip link, visible keyboard focus, a labeled mobile menu with Escape handling, native disclosure elements, reduced-motion support, and large primary touch targets. Mobile page padding and scroll padding account for the persistent donation bar. Images reserve their space; below-the-fold photos lazy-load. Typography uses Arial without font downloads.

Browser verification should cover phone and desktop layouts, keyboard use, zoom, and the tag behavior above. A production accessibility audit and testing with actual photos remain appropriate before launch.

## Grow from here

Campaign content lives on the homepage; the shared layout and data remain usable for future program, staff, admissions, and family-resource pages. Keep enrollment language and opening dates accurate as licensing progresses. See `LAUNCH-CHECKLIST.md` for the remaining prototype-to-launch changes.


Local-data source review before launch: the church supplied the demand/capacity inputs. 3,272 × 67% × 58% = 1,271.1, consistent with a rough estimate but not exactly 1,275. The national 58% attribution is unverified: NCES Fast Facts reports 62% center participation among children in weekly nonparental care, with a different denominator. The website therefore calls 58% a planning assumption. B23008 uses under-6 own children in families, not all under-5 children. The current ChildCareCenter.us ZIP page lists 39 centers in/around the area; the supplied review covers 26. Retain its dated provider inventory and verify ZIP boundaries, duplicates, active licenses and age-specific capacity before launch. Do not imply all provider capacity is currently vacant or exclusively ages 2–5. Source references: https://nces.ed.gov/fastfacts/display.asp?id=4 and https://childcarecenter.us/maryland/21207_childcare.
