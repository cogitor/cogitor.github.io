# Project Overview

This is the source code for the personal blog of Emil Varga, available at [emilvarga.com](https://emilvarga.com/). The website is built using Jekyll, a static site generator, and is hosted on GitHub Pages.

The site features a dynamic dual-theme (light/dark) system designed to respect user preferences.

## Project Structure

The project follows a standard Jekyll project structure:

*   `_config.yml`: Main Jekyll configuration. It includes `sass: style: compressed` for automatic CSS compression.
*   `_posts/`: Contains all Markdown blog posts (`YYYY-MM-DD-title.md`).
*   `_layouts/`: Contains the primary HTML layouts (`default.html`, `post.html`).
*   `_includes/`: Contains reusable HTML snippets.
    *   `head.html`: Includes a critical inline script to prevent theme flickering on page load.
    *   `disqus.html`: Manages the Disqus comments embed and its initial configuration.
*   `assets/`: Contains all static assets.
    *   `js/theme.js`: Handles the user-initiated theme switching logic and dynamically reloads the Disqus comments to match the new theme.
*   `css/main.scss`: The primary SCSS source file, which uses CSS variables for theming and is compiled by Jekyll.
*   `Gemfile`: Lists Ruby gem dependencies for Bundler.
*   `package.json`: Manages JavaScript tooling and dependencies.

## Key Features & Conventions

### Theming

-   **Dynamic Theme Application:** The site supports both light and dark themes. An inline script in `_includes/head.html` detects user preference (from `localStorage` or `prefers-color-scheme`) and applies the theme before page rendering, preventing any visual flicker (FOUC). All theme styles are defined in `css/main.scss` using CSS variables.
-   **Theme Switching:** The `assets/js/theme.js` script allows users to manually toggle themes. It updates the `data-theme` attribute on the `<html>` element and saves the preference. It also forces a reload of the Disqus comments to ensure their theme synchronizes with the main site.

## Building and Running

To work with this project locally, you need to have Ruby (with Bundler) and Node.js (with npm) installed.

1.  **Install all dependencies:**
    ```bash
    npm install
    ```
    This single command will install both Node.js packages and Ruby gems (via a `postinstall` script).

2.  **Generate Optimized Images (Optional, if image assets are changed):**
    ```bash
    npm run build:img
    ```
    This script processes original image files and generates various optimized renditions for responsive loading.

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This command will build the site and start a local web server, typically at `http://localhost:4000`.

## Plugins

This project uses the following Jekyll plugins:

*   `jekyll-redirect-from`: A plugin to manage redirects.