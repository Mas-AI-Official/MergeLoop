# Release Checklist

## Preflight

- [ ] Clean clone in a new directory
- [ ] `npm ci`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `npm run doctor` (understand expected missing CLI warnings if applicable)
- [ ] `npm run smoke`
- [ ] `npm pack --dry-run`

## Integration Checks

- [ ] first-class paths verified
- [ ] documented/manual templates link-check
- [ ] experimental paths labeled clearly
- [ ] planned paths not overclaimed

## Demo And Docs

- [ ] README links valid
- [ ] Demo images render on GitHub
- [ ] Storyboard HTML opens locally
- [ ] FAQ/security/quickstart docs aligned with current behavior
- [ ] Launch copy in `docs/launch/` reviewed

## Package And Trust

- [ ] `package.json` metadata complete
- [ ] `LICENSE` present (Apache-2.0)
- [ ] `CONTRIBUTING.md` present
- [ ] `SECURITY.md` present
- [ ] No accidental large artifacts committed

## GitHub Launch Metadata

- [ ] Repo description set
- [ ] Repo tagline set
- [ ] Social preview image set (`docs/demo/social-card.svg`, convert to PNG if needed)
