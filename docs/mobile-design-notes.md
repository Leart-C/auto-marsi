# Mobile showroom update

## Direction

Reference pages reviewed: [Porsche Finder](https://finder.porsche.com/us/en-US) and [Polestar available cars](https://www.polestar.com/uk/stock-cars/). Their direct inventory navigation, vehicle imagery, and restrained hierarchy informed the update. AutoMarsi retains its own charcoal/lime palette and existing vehicle photography.

## Changes

- Compact mobile hero brings search closer to the opening screen.
- Three-item floating navigation with a clear active state and safe-area spacing.
- Scrollable body-style choices and a mobile filter sheet reusing the existing filter fields and API behavior.
- Vehicle cards with clearer specifications and touch-friendly spacing.
- Cover-first gallery, thumbnail selection, photo counter, and accessible full-screen dialog.
- Vehicle price beside the title on smaller screens and an expandable description.
- Inquiry shortcut hides while the form is visible, preventing it from covering the form.
- English/Albanian copy and 16px mobile form controls.

## Verification

Frontend tests, lint, and production build pass. Browser checks covered 320px and 390px mobile layouts, desktop layout, language switching, price filtering, thumbnail selection, full-screen gallery navigation, Escape/focus restoration, and the inquiry shortcut. Horizontal overflow on the narrow homepage was corrected. Verification used a read-only local API proxy; no customer inquiries or production records were submitted.
