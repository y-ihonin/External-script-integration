# External Script Integration

An embeddable JavaScript feedback widget for external websites. Built as a single file, isolated via Shadow DOM, and loaded with one `<script>` tag.

## Features

- Single bundle with no runtime dependencies
- Style isolation via Shadow DOM
- Configuration through `data-*` attributes on the `<script>` tag
- Protection against double initialization
- CDN versioning (semver + major alias)
- Automated AWS S3 deployment via GitHub Actions

## Quick Start

### Installation

```bash
npm install
```

### Local Development

```bash
npm run dev
```

Uncomment the dev script in `index.html`:

```html
<script
  type="module"
  src="/src/main.js"
  data-api-key="your-api-key"
  data-theme-color="#0070f3"
  data-title="Feedback"
  data-plugin-name="external-script-integration"
></script>
```

### Build

```bash
npm run build
```

After building, the following files are generated in `dist/`:

```
dist/
├── external-script-integration.js
├── v1/external-script-integration.js      # major alias (updated on deploy)
└── 1.0.1/external-script-integration.js   # immutable release
```

## Client Integration

```html
<script
  src="https://your-cdn.example.com/v1/external-script-integration.js"
  data-api-key="site_green_999"
  data-theme-color="#2e7d32"
  data-title="Support Website"
  data-plugin-name="external-script-integration"
></script>
```

### Configuration Attributes

| Attribute | Required | Description | Default |
|-----------|----------|-------------|---------|
| `data-plugin-name` | Yes | Plugin identifier used to read configuration | — |
| `data-api-key` | No | Site key / client identifier | `default-key` |
| `data-theme-color` | No | Widget primary color (CSS) | `#0070f3` |
| `data-title` | No | Form header title | `Feedback` |

## CDN Versioning

- **`/v1/`** — live alias for the current major version. Cache: `no-cache, must-revalidate`.
- **`/1.0.1/`** — immutable release. Cache: `public, max-age=31536000, immutable`.

For production, use the major alias (`/v1/`). To pin a specific release, use the semver path (`/1.0.1/`).

## Deployment

Deployment runs automatically on push to `main`, or manually via `workflow_dispatch`.

### GitHub Secrets

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `AWS_S3_BUCKET` | S3 bucket name |

### Local Environment Variables

Create a `.env` file in the project root (listed in `.gitignore`):

```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
```

## Project Structure

```
├── src/
│   ├── main.js       # Widget logic
│   └── style.css     # Styles (inlined into the bundle)
├── dist/             # Build output
├── index.html        # Local preview
├── vite.config.js    # Vite config + CDN versioning
└── .github/workflows/deploy.yml
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local Vite dev server |
| `npm run build` | Production build |

## License

ISC
