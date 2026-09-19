# Plugin Architecture

## Purpose

Plugins extend the harness with packaged functionality.

A plugin MAY contain:

```text
Commands
Skills
Tool wrappers
Validators
Hooks
Templates
Configuration
```

## Recommended Structure

```text
.doc/
└── plugins/
    ├── laravel/
    │   ├── manifest.yaml
    │   ├── skills/
    │   ├── commands/
    │   └── checks/
    │
    ├── vue/
    ├── database/
    ├── git/
    └── security/
```

## Example Plugin Manifest

```yaml
name: laravel
version: 1.0.0

skills:
  - laravel-architecture
  - laravel-testing
  - laravel-migrations

commands:
  - audit
  - check
  - test

requires:
  - php
  - composer

optional_mcp:
  - database
  - filesystem
```

Plugins SHOULD be versioned.

Projects SHOULD pin compatible versions where deterministic behavior is required.
