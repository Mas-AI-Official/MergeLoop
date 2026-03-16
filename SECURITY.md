# Security Policy

MergeLoop is a local-first orchestration project. Security is primarily about safe tool execution and clear trust boundaries.

## Supported Versions

Security fixes are targeted to the latest `main` branch and latest tagged release.

## Reporting A Vulnerability

Please open a private security report through GitHub Security Advisories if available, or open an issue without exploit details and request a private channel.

## Project Security Commitments

- No credential harvesting logic.
- No token scraping logic.
- No OAuth/session replay logic.
- Worker CLIs must be separately installed/authenticated by users.

## User Responsibilities

- Review custom worker commands before enabling.
- Treat outputs from external tools as untrusted until verified.
- Use least-privilege environments for sensitive repositories.
- Disable local persistence when required by policy.
