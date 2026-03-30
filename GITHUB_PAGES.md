# GitHub Pages Configuration

## About

This project uses GitHub Pages to host documentation and project information. The documentation site is automatically deployed on every push to the `main` branch.

## Features

- Automatic deployment via GitHub Actions
- Custom documentation site
- API reference documentation
- Quick start guides
- Deployment instructions

## Accessing the Site

Your GitHub Pages site will be available at:
```
https://todyssc-volubiks.github.io/Andrew-Apartments/
```

## Repository Settings

To enable GitHub Pages:

1. Go to your repository settings
2. Navigate to **Pages** (under Code and automation)
3. Set the source to:
   - Branch: **main**
   - Folder: **/(root)** or **/docs**
4. Select a theme (optional)

## Building Locally

To preview the documentation site locally:

```bash
# Clone repository
git clone https://github.com/todyssc-volubiks/Andrew-Apartments.git
cd Andrew-Apartments

# If using Jekyll (optional)
bundle install
bundle exec jekyll serve

# Open browser
# Visit http://localhost:4000
```

## Adding Content

### Documentation Structure

```
docs/
├── index.md           # Homepage
├── guides/
│  ├── installation.md
│  ├── configuration.md
│  └── deployment.md
├── api/
│  ├── overview.md
│  ├── endpoints.md
│  └── authentication.md
└── assets/
   ├── images/
   └── styles/
```

### Jekyll Configuration

Edit `_config.yml` to customize:

```yaml
title: Andrew Apartments
description: Real Estate Management Platform
theme: jekyll-theme-cayman
plugins:
  - jekyll-sitemap
  - jekyll-mentions
  - jekyll-relative-links
```

## Customization

### Custom Domain

1. Create a `CNAME` file with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Add `CNAME` record pointing to `todyssc-volubiks.github.io`
   - Or use A records pointing to GitHub Pages IP

### Custom Theme

Options available:
- Cayman
- Minimal
- Slate
- Tactile
- Architect
- Merlot
- Dark Slate
- Leap Day
- Midnight
- Hacker
- Time Machine

Or use a custom Jekyll theme.

## Automated Deployment

The `.github/workflows/pages.yml` workflow:

1. Triggers on push to `main`
2. Builds site content
3. Deploys to GitHub Pages automatically
4. URL: `https://yourusername.github.io/repo-name/`

## Troubleshooting

If your site doesn't build:

1. Check GitHub Actions logs
2. Verify no Jekyll errors in output
3. Ensure files are in correct location
4. Check branch permissions
5. Verify workflow permissions

## SEO Optimization

Add to `_config.yml`:

```yaml
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-feed

# Add in front matter:
# seo:
#   description: Page description
#   canonical_url: https://yourdomain.com
```

## Analytics

Add Google Analytics:

```html
<!-- In _includes/head.html or theme layout -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXX-Y');
</script>
```

## Performance

Optimize your site:

1. Compress images
2. Minimize CSS/JS
3. Use CDN for assets
4. Set proper cache headers
5. Enable gzip compression

## References

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/)
- [GitHub Pages IP Addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
