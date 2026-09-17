# API Design

APIs SHOULD follow a consistent structure.

## Success Response

```json
{
  "success": true,
  "message": "Profile retrieved successfully.",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {}
}
```

## HTTP Status Codes

Use appropriate HTTP status codes.

Typical:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
```

Do not expose internal stack traces in production responses.
