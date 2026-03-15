# FAQ

## What happens if Claude is capped?

CouncilKit can still run in any compatible host that can start `council-hub` and invoke installed workers. Vendor limits are separate from orchestration.

## Does CouncilKit create extra quota?

No. It orchestrates the tools and quotas you already have.

## Is this "no API ever"?

No. Core CouncilKit is subscription-first and local-first. API is optional and can be added separately.

## Do I need all workers installed?

No. Use single mode with one worker, or council mode with the subset you have.

## Why not just use one model?

Single model is often enough for simple tasks. Council mode helps when you want cross-checking and explicit disagreement signals.

## Is OpenClaw officially supported?

In this repo, OpenClaw is documented as a community path, not a first-party plugin integration from CouncilKit maintainers.

## Does CouncilKit handle authentication?

No. Each worker CLI must be installed/authenticated separately.
