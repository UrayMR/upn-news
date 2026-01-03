# Global Props Payload Contract

This document describes the global response contract for all backend-to-frontend data transfers. The structure applies to any page or feature that sends props from backend to frontend, not just the Users Index page.

All top-level properties (`errors`, `name`, `quote`, `auth`, `sidebarOpen`, `payload`) are root-level props. The main data from the backend is always wrapped inside the `payload` property, which can contain any resource or data relevant to the current page or feature (e.g., users, news, categories, etc).

## Response Structure Example

```json
{
    "errors": {},
    "name": "UPNNEWS",
    "quote": {
        "message": "Let all your things have their places; let each part of your business have its time.",
        "author": "Benjamin Franklin"
    },
    "auth": {
        "user": {
            // ... authenticated user object
        }
    },
    "sidebarOpen": true,
    "payload": {
        // Main resource or data for the page, e.g.:
        "users": {
            "data": [
                // ...array of user objects
            ],
            "links": {
                // ...pagination links (Laravel style)
            },
            "meta": {
                // ...pagination meta (Laravel style)
            }
        }
        // or for other pages:
        // "news": { ... },
        // "categories": { ... },
        // etc.
    }
}
```

### Property Descriptions

- **errors**: An object containing validation or global errors (usually empty if no errors).
- **name**: The application name (string).
- **quote**: An object with a motivational quote, containing `message` and `author`.
- **auth**: Contains the authenticated user object under `user`.
- **sidebarOpen**: Boolean indicating if the sidebar is open (UI state).
- **payload**: Main data wrapper. For this page, contains a `users` object.
    - **payload.[resource]**: The main resource object for the page (e.g., `users`, `news`, `categories`, etc). The structure inside depends on the resource, but for paginated resources, it usually contains:
        - **data**: Array of resource objects (e.g., user objects, news objects, etc).
        - **links**: Pagination links (Laravel pagination format).
        - **meta**: Pagination meta information (Laravel pagination format).

#### Example User Object (for users resource)

```json
{
    "id": "019b7f93-108c-70b9-a019-fc6109484133",
    "name": "Test User",
    "email": "test@example.com",
    "email_verified_at": "2026-01-02T16:38:22.000000Z",
    "two_factor_confirmed_at": null,
    "role": "admin",
    "phone_number": null,
    "profile_picture_path": null,
    "status": "active",
    "created_at": "2026-01-02T16:38:23.000000Z",
    "updated_at": "2026-01-02T16:38:23.000000Z"
}
```

**Notes:**

- All main data is always wrapped in the `payload` property, regardless of the resource.
- Pagination follows the standard Laravel API resource format for `links` and `meta`.
- The `payload` property can contain any resource relevant to the current page or feature.
