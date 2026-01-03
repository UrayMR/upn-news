# Repository Pattern Usage

This document explains the use of the Repository pattern in this project, with a focus on Eloquent repositories and the flexibility to support multiple data sources (e.g., Eloquent, raw SQL, or others).

---

## What is a Repository?

A Repository abstracts the data access logic and provides a consistent interface for the rest of the application. This allows you to decouple your domain/business logic from the underlying data source (e.g., Eloquent ORM, raw SQL, external APIs).

---

## Example: User Repository Pattern

Currently, the User domain uses the Repository pattern with an interface and an Eloquent implementation:

### UserRepository Interface

```php
// app/Domains/User/Repositories/UserRepository.php
namespace App\Domains\User\Repositories;

use App\Domains\User\DTOs\StoreUserDTO;
use App\Domains\User\DTOs\UpdateUserDTO;
use App\Domains\User\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface UserRepository
{
    public function index(array $filters = [], int $perPage = 15): LengthAwarePaginator;
    public function store(StoreUserDTO $dto, ?string $profilePath = null): User;
    public function update(UpdateUserDTO $dto, User $user, ?string $profilePath = null): User;
    public function destroy(User $user): bool;
}
```

### Eloquent Implementation

```php
// app/Domains/User/Repositories/EloquentUserRepository.php
namespace App\Domains\User\Repositories;

use App\Domains\User\DTOs\StoreUserDTO;
use App\Domains\User\DTOs\UpdateUserDTO;
use App\Domains\User\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class EloquentUserRepository implements UserRepository
{
    public function index(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = User::query();
        // ...filtering logic...
        return $query->orderByDesc('updated_at')->paginate($perPage);
    }

    public function store(StoreUserDTO $dto, ?string $profilePath = null): User
    {
        return User::create([
            'name' => $dto->name,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
            'role' => $dto->role,
            'phone_number' => $dto->phone_number,
            'profile_picture_path' => $profilePath,
            'status' => $dto->status,
        ]);
    }

    public function update(UpdateUserDTO $dto, User $user, ?string $profilePath = null): User
    {
        // ...update logic...
        $user->update([...]);
        return $user;
    }

    public function destroy(User $user): bool
    {
        return $user->delete();
    }
}
```

---

## Multi-Bagger: Delegator Repository Example

In a multi-bagger approach, you keep EloquentUserRepository and RawSqlUserRepository in separate files, each only handling their own logic. Then, you create a delegator (UserRepositoryImpl) that combines them and delegates each method to the appropriate implementation.

### EloquentUserRepository (Eloquent only)

```php
// app/Domains/User/Repositories/EloquentUserRepository.php
class EloquentUserRepository implements UserRepository {
    // Only implement methods you want to use for Eloquent.
    // For unimplemented methods, throw an exception to make it explicit.
    public function index(...) { throw new \BadMethodCallException('Not implemented'); }
    public function store(...) { /* ...eloquent logic... */ }
    public function update(...) { /* ...eloquent logic... */ }
    public function destroy(...) { /* ...eloquent logic... */ }
}
```

> **Note:** You can implement all methods here if you want, because delegator will only call the ones it needs.

> **Suggestion:** Only implement the methods you want to use in this class. For methods not handled by Eloquent, throw a `BadMethodCallException`.

### RawSqlUserRepository (Raw SQL only)

```php
// app/Domains/User/Repositories/RawSqlUserRepository.php
class RawSqlUserRepository implements UserRepository {
    // Only implement methods you want to use for raw SQL.
    // For unimplemented methods, throw an exception to make it explicit.
    public function index(...) { /* ...raw SQL logic...*/ }
    public function store(...) { throw new \BadMethodCallException('Not implemented'); }
    public function update(...) { throw new \BadMethodCallException('Not implemented'); }
    public function destroy(...) { throw new \BadMethodCallException('Not implemented'); }
}
```

> **Note:** You can implement all methods here if you want, because delegator will only call the ones it needs.

> **Suggestion:** Only implement the methods you want to use in this class. For methods not handled by raw SQL, throw a `BadMethodCallException`.

### DelegateUserRepository (Delegator)

```php
// app/Domains/User/Repositories/DelegateUserRepository.php
class DelegateUserRepository implements UserRepository {
    public function __construct(
        private EloquentUserRepository $eloquent,
        private RawSqlUserRepository $rawSql
    ) {}

    public function index(array $filters = [], int $perPage = 15): LengthAwarePaginator {
        // Use raw SQL for index
        return $this->rawSql->index($filters, $perPage);
    }
    public function store(StoreUserDTO $dto, ?string $profilePath = null): User {
        // Use Eloquent for store
        return $this->eloquent->store($dto, $profilePath);
    }
    public function update(UpdateUserDTO $dto, User $user, ?string $profilePath = null): User {
        // Use Eloquent for update
        return $this->eloquent->update($dto, $user, $profilePath);
    }
    public function destroy(User $user): bool {
        // Use Eloquent for destroy
        return $this->eloquent->destroy($user);
    }
}
```

This pattern keeps each implementation clean and focused, and lets you combine them flexibly in the delegator.

---

---

## Binding the Implementation in the Domain Service Provider

Bind the interface to the desired implementation in your domain's service provider (e.g., `app/Domains/User/Providers/UserServiceProvider.php`):

```php
// In the register() method of your domain service provider
$this->app->bind(
    \App\Domains\User\Repositories\UserRepository::class,
    \App\Domains\User\Repositories\DelegateUserRepository::class
);
// DelegateUserRepository will receive both EloquentUserRepository and RawSqlUserRepository via constructor injection.
```

You can swap the delegator logic as needed, and each implementation remains single-responsibility.

---

## Benefits

- **Flexibility:** Easily switch between Eloquent, raw SQL, or other data sources by changing the binding.
- **Testability:** Mock repositories for testing without touching the database.
- **Separation of Concerns:** Keeps domain logic independent from data access details.

---

## Summary

- Use repositories to abstract data access.
- Start with Eloquent repositories for convenience.
- If needed, add multiple implementations (e.g., Eloquent, Raw SQL) and bind the desired one in the service provider.
- This approach enables easy swapping and future extensibility.

---
