# Staging preview setup

Use this workflow to deploy a **preview** of feature branches without merging to `main`.

## One-time GitHub setup

1. Open **Settings → Pages** in the repo.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from branch”).
3. Keep `main` as your production branch — production can stay on legacy branch deploy until you migrate.

## Add the workflow (requires `workflow` scope)

Copy this file to `.github/workflows/staging-preview.yml` in the repo (via GitHub web UI or a token with `workflow` scope):

```yaml
name: Staging Preview

on:
  pull_request:
    branches: [main]
  push:
    branches: [feature/about-page-redesign]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages-preview-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3'
          bundler-cache: true
      - run: bundle exec jekyll build --trace
        env:
          JEKYLL_ENV: production
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Preview URLs

After the workflow runs:

| Context | Where to preview |
|--------|-------------------|
| Pull request | **Deployments** check on the PR → preview link (does not replace production) |
| Branch push | Actions run → **Deploy preview** step → `page_url` |
| Project Pages fallback | `https://corrupted-brain.github.io/blog/about/` |

## Quick manual staging (no Actions)

1. Open a PR: https://github.com/corrupted-brain/blog/pull/new/feature/about-page-redesign
2. In **Settings → Pages**, temporarily set branch to `feature/about-page-redesign` / `/ (root)`.
3. Preview at `https://kailashbohara.com.np/about/` — **this replaces live site until you switch back to `main`.**
4. Switch Pages source back to `main` when done.

## Local preview

```bash
git checkout feature/about-page-redesign
bundle install
bundle exec jekyll serve
# http://localhost:4000/about/
```
