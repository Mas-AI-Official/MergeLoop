# FAQ

## Is CouncilKit a Claude-only tool?

No. CouncilKit is host-agnostic. This repo includes a first-class Claude plugin path, plus documented/manual paths for other hosts.

## What happens if one host is capped?

Use another configured host path. Host usage limits and worker usage limits are separate.

## Does CouncilKit add quota?

No. It orchestrates existing workers and quotas.

## Is this “no API ever”?

No. API is optional/future. Core today is local-first and subscription-first.

## Does CouncilKit bypass auth?

No. Worker CLIs must be installed/authenticated separately.

## Is Perplexity supported?

Not in this repo today. It is a planned target only if a tested adapter is shipped.

## Why not just one model?

Council mode helps when you need explicit disagreement signals and stronger verification guidance for higher-impact tasks.
