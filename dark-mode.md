# Plan for Implementing Dark Mode

This document outlines the plan to add a dark mode feature to the Jekyll website, following the user's preferred implementation strategy.

## 1. Investigate Native Jekyll and GitHub Pages Solutions

*   **Native Jekyll:** Review Jekyll's official documentation to determine if there are any built-in, native features for theme switching or dark mode.
*   **GitHub Pages Plugins:** Consult the list of Jekyll plugins officially supported by GitHub Pages. Search for plugins that provide functionality for theme management, dark mode, or CSS variable manipulation.

## 2. CSS-Based Implementation (Primary Approach)

If native or plugin-based solutions are not viable, implement a custom CSS solution. This is the most common and flexible approach.

*   **Analyze Existing CSS:** Examine `css/main.css` to identify existing color definitions and understand the structure.
*   **Implement CSS Variables:**
    *   Refactor the current CSS to use CSS custom properties (variables) for all colors (e.g., `_--background-color_`, `_--text-color_`, etc.) under a `:root` or `[data-theme='light']` selector.
    *   Create a dark theme by defining a `[data-theme='dark']` selector with the same CSS variables but with dark color values.
*   **Automatic Dark Mode (prefers-color-scheme):**
    *   Use the `@media (prefers-color-scheme: dark)` media query to automatically apply the dark theme based on the user's operating system preference.
*   **Manual Theme Toggle:**
    *   Add a toggle button to the site's layout (e.g., in `_includes/header.html`) allowing users to manually switch between light and dark modes.
    *   Create a new JavaScript file to handle the logic for the theme switcher.
    *   The script will toggle the `data-theme` attribute on the `<html>` or `<body>` element.
    *   The user's choice will be saved to `localStorage` to persist the selected theme across sessions.
    *   The script will check `localStorage` on page load to apply the user's preferred theme immediately.

## 3. Create a new branch

*   Create a new branch `dark-mode` to not affect the main branch.

## 4. Test and Verify

*   Thoroughly test the theme switching functionality on different pages and posts.
*   Verify that both automatic (OS-based) and manual toggling work as expected.
*   Ensure the selected theme persists when navigating between pages and on subsequent visits.
