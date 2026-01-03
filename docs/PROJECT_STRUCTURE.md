# Project Structure Explanation

This document explains the folder and file structure of the project, focusing on the `app/Domains` and `app/Http` directories, which are central to the application's architecture.

---

## app/Domains

The `Domains` directory is dedicated exclusively to business logic and core domain entities, organized by feature or bounded context. Each subfolder represents a domain (feature/module) in the application. This approach supports separation of concerns and scalability.

> **Important:**
>
> - The `Domains` directory must not contain any HTTP-related code (such as controllers, requests, or anything related to HTTP transport).
> - All logic here is pure business/domain logic, reusable and independent from the delivery mechanism.

**Example:**

- `app/Domains/News/`  
  Contains all logic, models, and services related to the News domain.
- `app/Domains/User/`  
  Contains all logic, models, and services related to the User domain.

A typical domain folder may include:

- `Models/` (Eloquent models)
- `Policies/` (Authorization policies)
- `Enums/` (Domain-specific enumerations)
- `DTOs/` (Data Transfer Objects)
- `Services/` (Domain services)
- `Repositories/` (Data access logic)
- `Resources/` (Domain-specific resources)
- `Providers/` (Domain-specific service providers)

> **Note:** The actual subfolders may vary depending on the domain's complexity and requirements.

---

## app/Http

The `Http` directory contains only HTTP layer logic, including controllers, middleware, requests, and route definitions. This layer is responsible for handling incoming HTTP requests and returning responses.

> **Important:**
>
> - The `Http` directory must only contain HTTP-related code (controllers, middleware, requests, etc).
> - No business/domain logic should be implemented here; it should delegate to the appropriate domain services or actions.

**Subfolders:**

- `Controllers/`  
  Contains controller classes for handling web/API requests.
- `Middleware/`  
  Contains middleware classes for request filtering and processing.
- `Requests/`  
  Contains form request classes for validation and authorization.

---

## Example Structure

```
app/
  Domains/
    News/
      Models/
      Services/
      ..etc
    User/
      Models/
      Policies/
      ..etc
  Http/
    Controllers/
    Middleware/
    Requests/
```

---

## Summary

- **Domains**: Organizes business logic by feature/module for maintainability and scalability.
- **Http**: Handles all HTTP request/response logic, controllers, middleware, and validation.

This structure enforces a strict separation between business logic (Domains) and delivery (HTTP) concerns, making the codebase easier to maintain, test, and extend.
