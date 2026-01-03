<?php

namespace App\Domains\User\Services;

use App\Domains\User\Repositories\UserRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class IndexUserService extends UserService
{
    public function __construct(
        protected UserRepository $users
    ) {}

    public function execute(array $queryParams = []): LengthAwarePaginator
    {
        $this->assertAdminRole();

        return $this->users->index($queryParams);
    }
}
