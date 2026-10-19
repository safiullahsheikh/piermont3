# 21st.dev components

Copied from the public source files on the 21st.dev CDN (the `/r/` registry needs an account key). Each file is the author's published source; every local change is marked with a `// Piermont:` comment and listed below. All are MIT.

| File | Author on 21st.dev | Source | Local changes |
|---|---|---|---|
| `text-effect.tsx` | motion-primitives (@ibelick) | https://cdn.21st.dev/user_motion_primitives/text-effect.tsx | None |
| `tilt.tsx` | motion-primitives (@ibelick) | https://cdn.21st.dev/user_motion_primitives/tilt.tsx | None |
| `spotlight.tsx` | motion-primitives (@ibelick) | https://cdn.21st.dev/user_motion_primitives/spotlight.tsx | Enter/leave listeners are named so cleanup removes them (upstream removed fresh arrow functions, so they stayed attached) |
| `animated-background.tsx` | motion-primitives (@ibelick) | https://cdn.21st.dev/user_motion_primitives/animated-background.tsx | None |
| `animated-group.tsx` | motion-primitives (@ibelick) | https://cdn.21st.dev/user_motion_primitives/animated-group.tsx | None |
| `in-view.tsx` | motion-primitives (@ibelick) | https://cdn.21st.dev/user_motion_primitives/in-view.tsx | None |
| `scroll-progress.tsx` | motion-primitives (@ibelick) | https://cdn.21st.dev/user_motion_primitives/scroll-progress.tsx | `layoutEffect` option removed (framer-motion 12 no longer has it) |
| `transition-panel.tsx` | motion-primitives (@ibelick) | https://cdn.21st.dev/user_motion_primitives/transition-panel.tsx | None |
| `timeline.tsx` | aceternity (@manuarora700) | https://cdn.21st.dev/user_aceternity/timeline.tsx | None |
| `animated-testimonials.tsx` | aceternity (@manuarora700) | https://cdn.21st.dev/user_aceternity/animated-testimonials.tsx | Tabler's two arrow icons drawn inline instead of adding `@tabler/icons-react` |
| `number-ticker.tsx` | magicui (@dillionverma) | https://cdn.21st.dev/user_magicui/number-ticker.tsx | None |

They import `cn` from `@/lib/utils` (clsx + tailwind-merge) and `framer-motion`, as published. Their Tailwind classes compile because Tailwind v4 scans this folder.

Settings used are the ones in each component's own 21st.dev demo unless a page says otherwise (for example Tilt + Spotlight: rotation 6, reversed, spring stiffness 26.7, damping 4.1, mass 0.2).
