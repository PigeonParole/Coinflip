# Secure Coin Flip

A dependency-free GitHub Pages coin flip website powered by the browser's cryptographically secure random number generator.

## Usage

1. Open the coin picker.
2. Select **FLIP** or press the Space key.
3. Read the result shown as **HEADS** or **TAILS**.
4. Press `3` to switch to the three-way picker.

## Keyboard shortcuts

- `Space`: Run the active picker.
- `1`: Open the coin picker.
- `3`: Open the three-way picker.

## Randomness

Each flip:

1. Requests a fresh unsigned 32-bit value from `window.crypto.getRandomValues()`.
2. Uses `value % 2` to select one of two outcomes.
3. Maps `0` to Heads and `1` to Tails.

The full 32-bit range contains exactly the same number of even and odd values, so this mapping has no modulo bias. The website never falls back to `Math.random()`. If Web Crypto is unavailable, the flip button is disabled.

A software-only website cannot prove literal physical randomness. Web Crypto provides cryptographically secure, unpredictable digital randomness supplied by the browser and operating system. It is appropriate for normal decisions, games, and similar use.

## Features

- Cryptographically secure coin flips
- Unbiased three-way random picks
- Responsive desktop and mobile interface
- Reduced-motion support
- Keyboard navigation between picker modes
- Installable PWA and offline support
- No trackers, analytics, external requests, or third-party dependencies

## Browser requirements

The site requires JavaScript and the Web Crypto API in a secure browser context. GitHub Pages and `http://localhost` both meet the secure-context requirement in current browsers.

## GitHub Pages setup

The included workflow deploys the site through GitHub Actions. Every push to `main` triggers a fresh deployment.

1. Open the repository on GitHub.
2. Go to **Settings**, then **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and run **Deploy GitHub Pages** if it did not start automatically.

The expected site address is:

`https://newbbd.github.io/Coinflip/`

## Local testing

Run a local development server from the repository root. Localhost is treated as a secure context by browsers, so Web Crypto remains available. For a quick test with Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## App installation

Browsers that support installable web apps may offer an install option in the address bar or browser menu. Installation is optional, and the website works normally without it.

## Offline behavior

After the first successful visit, the service worker caches the core site files. Previously loaded picker pages can then reopen without a network connection.

## Privacy

Flip results stay in the browser. The service worker caches the website files for offline use. No result data is transmitted by the application.
