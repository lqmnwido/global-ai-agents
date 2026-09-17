# PHP · WordPress Profile

> Company standard for WordPress projects. Load this module when the project stack matches this framework.

## Stack

| Layer | Standard |
|---|---|
| Language | PHP 8.1+ |
| Framework | WordPress 6.x (Classic or Block theme) |
| Frontend | Theme (PHP templates) / Gutenberg blocks |
| Database | MySQL with wpdb / custom tables when needed |
| Testing | PHPUnit + WP-CLI for scripted tests |

## Conventions

- Custom themes in `wp-content/themes/{theme-name}/`
- Custom plugins in `wp-content/plugins/{plugin-name}/`
- Theme structure: `functions.php`, `style.css`, `header.php`, `footer.php`, `index.php`
- Use `wp-content/mu-plugins/` for mandatory site plugins
- Hooks registered via `add_action` and `add_filter` in `functions.php` or plugin files
- Transients API and object caching for performance
- Key files: `wp-config.php`, `functions.php`, `style.css`, `readme.txt`

## Patterns

- Custom post types registered via `register_post_type` with dedicated templates
- Taxonomy extensions using `register_taxonomy`
- REST API extensions via `register_rest_route` in `functions.php`
- Settings API for admin options pages
- Widget and block registration for theme customization

## Rules

- Follow existing project pattern before framework convention
- Mimic the project's existing modules before introducing new patterns
- Never install framework scaffolding tools that restructure the repo without approval

## Testing

- PHPUnit with `tests/` directory and `wp-tests-config.php`
- WP-CLI for setup: `wp scaffold plugin-tests {plugin-name}`
- Run `phpunit` from plugin or theme test directory
