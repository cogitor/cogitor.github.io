# Project Overview

This is the source code for the personal blog of Emil Varga, available at [emilvarga.com](https://emilvarga.com/). The website is built using Jekyll, a static site generator written in Ruby, and is hosted on GitHub Pages.

## Project Structure

The project follows a standard Jekyll project structure:

*   `_config.yml`: The main configuration file for the Jekyll site. It contains settings such as the site title, author information, URL, and other global settings.
*   `_posts/`: This directory contains all the blog posts, which are written in Markdown. The filename of each post follows the naming convention `YYYY-MM-DD-title.md`.
*   `_layouts/`: This directory contains the HTML layouts for the different types of pages on the site, such as the default layout and the post layout.
*   `_includes/`: This directory contains reusable HTML snippets that can be included in the layouts and posts.
*   `assets/`: This directory contains all the static assets for the site, such as images, CSS, and JavaScript files.
*   `css/`: This directory contains the main CSS file for the site, `main.css`.
*   `index.md`: The home page of the blog.
*   `about.md`: The about page of the blog.
*   `Gemfile`: This file lists the Ruby gems (dependencies) used by the project.

## Building and Running

To work with this project locally, you need to have Ruby and Bundler installed.

1.  **Install dependencies:**
    ```bash
    bundle install
    ```

2.  **Run the development server:**
    ```bash
    bundle exec jekyll serve
    ```
    This command will build the site and start a local web server, typically at `http://localhost:4000`.

## Development Conventions

*   **Blog Posts:** New blog posts should be created in the `_posts` directory, following the naming convention `YYYY-MM-DD-title.md`.
*   **Styling:** The site's CSS is located in the `css/main.css` file.
*   **Dependencies:** Ruby gems are managed through the `Gemfile`. Any new dependencies should be added there.

## Content

The main content of the blog is in the `_posts` directory. Other pages, such as the about page, are located in the root directory.

## Configuration

The main configuration for the site is located in the `_config.yml` file. This file contains important settings such as:

*   `title`: The title of the site.
*   `author`: The author's information.
*   `url`: The base URL of the site.
*   `permalink`: The URL structure for blog posts.
*   `plugins`: A list of Jekyll plugins used in the project.

## Plugins

This project uses the following Jekyll plugins:

*   `jekyll-redirect-from`: A plugin to manage redirects.