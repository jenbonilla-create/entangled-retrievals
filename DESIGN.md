# Design Brief

## Direction

Entangled Retrievals — a dark premium retrieval coordination platform with enchanting neon-accented aesthetics and LA skyline atmosphere.

## Tone

Luxuriously dark and enchanting with flowing calligraphy headings, neon glow accents, and a fixed LA night skyline silhouette backdrop on every page.

## Differentiation

The fixed LA night skyline silhouette with floating coral-emerald particles and rose gold glassmorphism cards creates an unforgettable premium dark aesthetic.

## Color Palette

| Token      | OKLCH         | Role                           |
| ---------- | ------------- | ------------------------------ |
| background | 0.10 0.02 240 | deepest navy blue-green        |
| foreground | 0.95 0.01 100 | warm white text                |
| card       | 0.14 0.02 240 | elevated card surfaces         |
| primary    | 0.65 0.18 55  | coral salmon CTAs & highlights |
| accent     | 0.58 0.16 45  | rose gold borders & glows      |
| muted      | 0.18 0.02 240 | subtle backgrounds             |

## Typography

- Display: "Playfair Display" — subheadings and section titles with wide letter-spacing
- Hero: "Pinyon Script" — flowing brush script for hero headings and founder signature
- Body: "DM Sans" — clean sans-serif for all body text and UI labels
- Scale: hero `text-5xl md:text-7xl`, h2 `text-3xl md:text-5xl`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Glassmorphism cards with `backdrop-filter: blur(24px)`, rose gold tinted borders at 15-20% opacity, and layered shadows for floating depth over the dark skyline background.

## Structural Zones

| Zone    | Background                | Border               | Notes                                 |
| ------- | ------------------------- | -------------------- | ------------------------------------- |
| Header  | glass-card-premium        | 1px rose-gold/20     | Fixed top, blur backdrop              |
| Hero    | bg-silhouette + overlay   | —                    | Full viewport, skyline visible behind |
| Content | transparent over silhouette | —                  | Alternating glass cards for sections  |
| Footer  | glass-card-dark           | 1px rose-gold/10 top | Darker glass treatment                |

## Spacing & Rhythm

Section gaps of `py-20` to `py-24` (80-96px), content max-width `max-w-7xl`, card padding `p-6` to `p-8`, generous breathing room for premium feel.

## Component Patterns

- Buttons: `rounded-lg`, solid coral salmon `bg-primary`, hover with glow shadow and slight scale
- Cards: `rounded-xl`, glassmorphism with rose gold border, subtle hover lift
- Badges: `rounded-full`, dark navy background with coral salmon text and border

## Motion

- Entrance: fadeInUp with 0.8s cubic-bezier(0.16, 1, 0.3, 1) for sections
- Hover: cards lift 2px with border glow intensification, buttons scale 1.02
- Decorative: particleFloat 12s infinite, float 6s ease-in-out for hero elements

## Constraints

- Solid colors only — no gradients anywhere
- All pages use fixed LA night skyline silhouette background with dark overlay
- Neon glow effects reserved for hero headings and signature only
- Coral salmon (#E58A3A) is the single CTA accent color

## Signature Detail

The founder signature on the About page uses Pinyon Script in coral salmon with a subtle neon-glow-rose text shadow, placed directly beneath the circular founder portrait with a rose gold border ring.
