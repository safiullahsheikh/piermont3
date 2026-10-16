# React Bits (vendored)

Copied from the official React Bits registry (TypeScript + CSS variants) on 2026-10-16.
Licence: MIT + Commons Clause (https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md).
Use in a site is allowed; reselling the components is not.

| File | Source | Local changes |
|---|---|---|
| FlowingMenu | https://reactbits.dev/r/FlowingMenu-TS-CSS.json | `@hugeicons` arrow replaced with an inline SVG (no extra dependency) |
| DomeGallery | https://reactbits.dev/r/DomeGallery-TS-CSS.json | CSS scoped under `.sphere-root`; focus outline restored (`:focus-visible`) |
| GhostCursor | https://reactbits.dev/r/GhostCursor-TS-CSS.json | None |

Kept close to upstream so they can be diffed and updated; lint skips this folder.
- DomeGallery: the sphere transform adds a `--dg-spin` CSS variable to the dragged yaw (the page drives it from scroll), and opening a tile accounts for it.
