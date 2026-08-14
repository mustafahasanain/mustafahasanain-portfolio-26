# Production Deployment

Production deployments are triggered only by a push to `main`. The `develop`
branch is the long-lived development branch and never triggers this workflow.

## GitHub configuration

Configure these GitHub Actions repository secrets without committing their
values:

- `VPS_HOST` — the confirmed public hostname or IP of the VPS.
- `VPS_SSH_PRIVATE_KEY` — the dedicated, non-interactive private key for the
  `portfolio-deploy` account.
- `VPS_SSH_KNOWN_HOSTS` — a verified OpenSSH `known_hosts` entry for the exact
  value in `VPS_HOST` on port `22`.

Obtain the host-key entry from the server administrator and verify its
fingerprint through a trusted channel before saving it. Do not generate and
trust the entry with an unverified `ssh-keyscan` call inside GitHub Actions.
The public half of the deployment key must be authorized for
`portfolio-deploy` on the VPS by the server-side administrator.

No application environment values are sent through GitHub Actions. When a
future phase requires them, production values belong in
`/var/www/mustafahasanain-portfolio-26/shared/.env.production` on the VPS.

## Deployment flow

1. A push reaches `main` and starts `.github/workflows/deploy-production.yml`.
2. GitHub Actions checks out `${{ github.sha }}`, uses Node.js 24 LTS, installs
   dependencies from the committed npm lockfile, and runs `npm run verify`.
3. After every quality gate passes, the runner connects over SSH on port `22`
   as `portfolio-deploy` with strict host-key verification.
4. The runner invokes only:

   ```bash
   sudo /usr/local/sbin/deploy-mustafahasanain-portfolio <40-character-lowercase-commit-sha>
   ```

   The argument is the exact triggering `github.sha`, not a branch name.
5. The server-side script builds a release, switches it into service through
   PM2 as `mustafahasanain-portfolio`, and checks
   `http://127.0.0.1:3002/`. Its non-zero exit status fails the workflow.

Release creation, npm installation and build, environment-file handling, PM2,
the internal port, health retries, rollback, and release retention remain the
responsibility of the existing server script. If the new release fails its
health check, that script automatically restores the previous release.

## Failure and recovery

A failed quality gate prevents the SSH step from starting. An SSH failure or a
non-zero exit from the deployment script fails the workflow without suppressing
the error.

When a new release fails its health check, the server script restores the
previous release automatically before returning failure. Review the failed
workflow and server-side deployment logs, correct the repository or server
issue in the appropriate scope, and deploy a new approved `main` commit. If the
automatic restoration itself cannot complete, recovery belongs to the
server-side administrator; GitHub Actions intentionally has no direct PM2,
release-directory, or reverse-proxy commands.

## Pending production work

- Confirm the public value for `VPS_HOST` and configure all three GitHub
  Actions secrets.
- Choose the production domain.
- Create the Nginx virtual host and reverse proxy configuration.
- Configure and verify HTTPS/SSL.
- Perform the first controlled `main` deployment and verify GitHub Actions,
  SSH, PM2 process creation and persistence, internal health, rollback, the
  public reverse proxy, the production domain, and HTTPS end to end.

These pending items require controlled GitHub/VPS work and cannot be validated
from the repository alone.
