# React Bits (vendored)

Copied from the official React Bits registry (TypeScript + CSS variants) on 2026-10-16.
Licence: MIT + Commons Clause (https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md).
Use in a site is allowed; reselling the components is not.

| File | Source | Local changes |
|---|---|---|
| FlowingMenu | https://reactbits.dev/r/FlowingMenu-TS-CSS.json | `@hugeicons` arrow replaced with an inline SVG (no extra dependency) |
| DomeGallery | https://reactbits.dev/r/DomeGallery-TS-CSS.json | CSS scoped under `.sphere-root`; focus outline restored (`:focus-visible`) |
| OptionWheel | https://reactbits.dev/r/OptionWheel-TS-CSS.json | `ariaLabel` prop; at either end of a non-looping wheel the mouse wheel scrolls the page instead of being swallowed |
| FlexCarousel | https://reactbits.dev/r/FlexCarousel-TS-CSS.json | `ariaLabel` prop; with `captureWheel`, after one full lap of vertical wheel the page scrolls on instead of being trapped by the loop |

Kept close to upstream so they can be diffed and updated; lint skips this folder.
- DomeGallery: `cursorSpin` prop (the mouse's x across the gallery turns it, eased, added to the dragged yaw; opening a tile accounts for it); items may carry `video` and `aspect`: a tile plays its video while the mouse is on it, and the opened view plays the video at the item's own shape instead of a cropped square.
