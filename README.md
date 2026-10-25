# Greater Baltimore Learning Center Website

A one-page campaign site written to persuade a cold audience (neighbors and local businesses): need, repairs, deadline, ways to give (plus Questions and Privacy pages) that links to the Greater Impact Givebutter campaign. It is built to be shared in email, social media, and group texts, and to grow into the full Learning Center site.

**Status: prototype.** A banner at the top of every page says so. Nothing here is approved for public distribution until the items in `LAUNCH-CHECKLIST.md` are done.

## What lives where

| To change | Edit this file |
|---|---|
| Dates, contact info, Givebutter link, legal name, EIN, nondiscrimination notice, share-preview text | `_data/site.yml` |
| Section text on the home page | `index.html` (plain sentences between the tags) |
| Questions page | `faq.md` |
| Privacy page | `privacy.md` |
| Colors | `assets/css/style.css`, the block at the top called `:root` |
| Photos | Upload to `assets/images/` with these exact names: `hero.jpg`, `roof.jpg`, `hvac.jpg`, `rooms.jpg`, `people.jpg`. Until a file exists the page shows a visible `[TBD: add photo named ...]` box. See `ASSETS-SHOOT-LIST.md`. |
| Welcome video | Upload to YouTube (unlisted is fine), then put the ID (the part after `v=`) in `video_youtube_id` in `_data/site.yml`. Nothing loads from YouTube until a visitor presses play. |
| Photo descriptions for screen readers | `alt_hero`, `alt_roof`, `alt_hvac`, `alt_rooms` in `_data/site.yml` |
| Optional gift levels | `gift_levels` in `_data/site.yml`. Empty hides the section. Add only amounts tied to confirmed costs. |
| Dates in the deadline band and timeline | `construction_start`, `commitments_by`, `camp_opening`, `school_opening` |
| Link-preview picture | Replace `assets/images/share.jpg` (keep it 1200 by 630 pixels and under 300 KB) |

Anything written as `[TBD: ...]` is an open decision. Search the whole repository for `[TBD` before launch; none should remain.

## Fonts

The design is set in Bitter (headings) and Source Sans 3 (text), both free under the SIL Open Font License. The font files could not be downloaded in the build environment, so the site currently falls back to Georgia and the visitor's system font, which looks fine but plainer. To turn the real fonts on: download the two Latin variable `.woff2` files (for example from fontsource.org), save them in `assets/fonts/` as `bitter-latin-wght-normal.woff2` and `source-sans-3-latin-wght-normal.woff2`, then set `custom_fonts: true` in `_data/site.yml`.

## Editing without code (two options)

1. **GitHub's web editor.** Open the file on github.com, click the pencil icon, change the words, and click Commit changes. The site updates in a minute or two. Good for small text changes in `_data/site.yml`.
2. **Pages CMS** (free, https://pagescms.org). Sign in with GitHub and edit the settings in a form. The settings file `.pages.yml` is included but untested; expect to adjust it on first use.

Keep the quotation marks and the colons in `_data/site.yml`. If the site stops updating, open the repository's Actions tab to see the error message.

## Publishing

1. Create a GitHub organization owned by GBC, with at least two owner-level volunteers, and a **public** repository inside it (GitHub Pages is free only for public repositories).
2. Upload these files to the repository.
3. In the repository, go to Settings, then Pages. Under Build and deployment, choose Deploy from a branch, then `main` and `/ (root)`.
4. Wait a minute or two. GitHub shows the site address on the same page.
5. Before the custom domain is live, set `url` and `baseurl` in `_config.yml` as the comments there describe, so the share preview shows full web addresses.

**Custom domain.** Register the domain in an account owned by the organization, not a person. In Settings, Pages, enter the domain, add the DNS records GitHub shows, and turn on Enforce HTTPS. HTTPS can take up to an hour after the DNS change. Then set `url` in `_config.yml` to the final address.

## Rules for a public repository

Everyone on the internet can read this repository and its history. Never add internal numbers, financing details, draft governance documents, donor lists, or photos of identifiable children without signed releases.

## Link tags for email and social posts

The Give buttons pass along campaign tags from the link someone clicked, so Givebutter can show which message led to each gift. Use these patterns after the site address:

| Where the link goes | Add to the end of the address |
|---|---|
| Church email | `?utm_source=newsletter&utm_medium=email&utm_campaign=greater-impact&utm_content=launch` |
| Facebook post | `?utm_source=facebook&utm_medium=social&utm_campaign=greater-impact&utm_content=post-1` |
| Instagram bio | `?utm_source=instagram&utm_medium=social&utm_campaign=greater-impact&utm_content=bio` |
| WhatsApp or group text | `?utm_source=whatsapp&utm_medium=messaging&utm_campaign=greater-impact&utm_content=group-1` |
| Printed QR code | `?utm_source=qr&utm_medium=print&utm_campaign=greater-impact&utm_content=bulletin` |

Change the last part (`launch`, `post-1`, and so on) for each message so results can be compared.

## Updates signup

The signup form uses Givebutter's signup widget. Add the Givebutter account ID to `givebutter_account_id` in `_data/site.yml` (find it in Givebutter under Sharing, then Widgets). Until then the page shows a placeholder note. This list is for updates only; do not turn it into a parent waitlist until Maryland OCC has been asked about enrollment language.

## Progress bar

There is none at launch on purpose. When the campaign has enough gifts to look encouraging, add Givebutter's goal bar widget. Every gift, including checks, must be recorded in Givebutter or the bar will be wrong.

## Content rules for public pages

- Do not mention financing, loans, or guarantors.
- Do not state the internal fundraising ask or any internal financial figures. Public, sourced statistics (such as the Maryland readiness figures) are allowed once Mark confirms them. The public campaign goal wording is in `campaign_goal_text`.
- Call the church "Greater Baltimore Church"; the legal name appears only in the gift-recipient statement.
- Never imply the Learning Center is licensed or enrolling until Maryland licensing is complete.
- Describe the executive director by credentials only, without a name.
