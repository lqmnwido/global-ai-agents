# Nginx Operations

## Configuration Considerations

```text
Server blocks
Reverse proxy settings
SSL/TLS configuration
Caching headers
Compression
Rate limiting
Security headers
Request size limits
Timeout configuration
Log formats
Health check endpoints
```

## Rules

* Never commit production server certificates or private keys.
* Never expose internal infrastructure details.
* Follow existing project deployment patterns.
* Test configuration before reloading production servers.
