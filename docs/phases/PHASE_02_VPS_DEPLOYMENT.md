# Phase 02 — VPS Deployment & GitHub Actions

## Goal

Create a secure, repeatable automatic production deployment from GitHub `main` to the Hostinger VPS.

## Required Context

Read:

- `../PROJECT_CONTEXT.md`
- this file

Read the deployment section of `../TECHNICAL_ARCHITECTURE.md` only if implementation details require it.

## Dependencies

Phase 01 must be approved.

## Implementation Boundaries

### In Scope

- production runtime preparation on the VPS
- GitHub Actions production workflow
- SSH-based deployment
- Node.js 24 LTS production runtime
- application service/process supervision
- reverse proxy integration as needed
- production environment-file strategy
- health/smoke verification after deployment
- deployment documentation for real required secrets and server values

### Out of Scope

Do not implement:

- Vercel deployment
- staging platform unless specifically requested
- Docker solely for abstraction
- Kubernetes
- database
- application features from later phases
- domain/DNS values by guessing them

## Required Inputs

Before destructive or server-specific work, obtain/inspect actual values for:

- VPS SSH host
- SSH user
- SSH port if non-default
- application directory
- repository access method
- domain/subdomain when ready
- current reverse proxy setup
- available process manager/service manager
- production environment values

Do not invent these.

## Deployment Trigger

Production deployment runs on:

```text
push -> main
```

`develop` must not auto-deploy to production.

## GitHub Actions Requirements

Use current stable GitHub-owned actions.

The workflow should:

1. check out the triggering commit when local CI steps are used
2. run the required pre-deployment verification appropriate at this stage
3. connect to the VPS using GitHub Secrets
4. deploy exactly the intended `main` commit
5. install dependencies from the lockfile
6. build successfully before replacing/restarting the running app
7. restart/reload the app service
8. perform a post-deploy health check
9. fail visibly if deployment or health verification fails

Do not print private SSH keys or secrets.

## Deployment Strategy

Choose one simple strategy based on the real server environment:

### Acceptable Strategy A — Pull on Server

- server clone tracks repository
- action connects through SSH
- fetch/reset to exact approved commit
- `npm ci`
- `npm run build`
- service restart
- health check

This is acceptable when repository access on the server is configured safely.

### Acceptable Strategy B — Artifact/Release Directory

Use only if it clearly improves reliability on the real server without unnecessary complexity.

Do not implement a sophisticated release platform without need.

## Build Failure Safety

A failed new build should not intentionally destroy the currently running production instance.

Where practical with the chosen deployment method:

- build before restart
- restart only after success

## Process Supervision

Use the existing suitable server mechanism if one exists.

Examples may include:

- systemd
- PM2

Do not install a second process supervisor without reason.

The service should:

- bind to localhost or otherwise be safely proxied
- restart reliably
- use production environment variables
- run the production Next.js server

## Reverse Proxy

Use the VPS's existing reverse proxy configuration where possible.

Public traffic should terminate through the reverse proxy rather than exposing the raw Next.js port broadly.

TLS configuration should use the actual domain and existing hosting setup.

## Secrets

GitHub Secrets should hold CI-side sensitive values such as:

- SSH private key
- server host/user/port where appropriate

Application secrets should normally live securely on the server rather than being committed.

Do not echo them into logs.

## Tasks

1. Inspect actual server environment.
2. Confirm Node.js 24 LTS availability or install/configure safely.
3. Choose application directory.
4. Configure repository access/deployment mechanism.
5. Configure production environment-file location.
6. Configure/reuse application process supervisor.
7. Configure/reuse reverse proxy.
8. Create GitHub Actions production workflow.
9. Configure required GitHub Secrets.
10. Test a real `main` deployment using a safe current build.
11. Confirm post-deploy response.
12. Document rollback/recovery steps appropriate to the chosen strategy.

## Acceptance Criteria

- push to `main` triggers deployment
- push to `develop` does not trigger production deployment
- GitHub Action deploys to the intended VPS
- exact intended commit is deployed
- dependencies use the lockfile
- production build occurs successfully
- application restarts only after successful build
- public application responds through the reverse proxy
- no secret appears in repository or workflow logs
- failed deployment produces a failed workflow result
- deployment procedure is repeatable
- recovery steps are documented
- no Vercel-specific requirement is introduced

## Required Tests

- run repository quality gates required by Phase 01
- run/test GitHub Actions workflow on a controlled `main` push
- verify application health after deployment
- verify production process survives an SSH session ending
- verify service restart mechanism
- verify `develop` push does not deploy

## Manual Verification

Check the deployed site from outside the VPS.

Confirm:

- expected page responds
- HTTPS works when the domain is configured
- no raw directory listing/server details are exposed
- application port is not unnecessarily exposed publicly
- deployment logs contain no secret material

## Review Focus

Codex should check:

- command injection/unsafe interpolation in workflow scripts
- secret exposure
- branch trigger correctness
- exact commit deployment
- failure handling
- unnecessary infra complexity
