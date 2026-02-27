

## Plan: Remove skip link, show CTA only after 11:19

The user wants to remove the "Já assisti, quero garantir minha vaga agora..." skip button so the CTA only appears after the full 679-second (11:19) timer completes.

### Changes in `src/pages/VSL.tsx`:

1. **Remove the skip link block** (lines 101-112): Replace the current `!showArrow` section that shows "Vídeo em reprodução..." text and the skip button with just the "Vídeo em reprodução..." text (no clickable skip option).

2. Everything else stays the same -- the `showArrow` state is already set to `true` after 679000ms by the existing timer logic.

