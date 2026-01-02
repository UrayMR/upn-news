<?php

namespace App\Http\Controllers\User;

use App\Domains\User\Models\User;
use App\Domains\User\Resources\UserResource;
use App\Domains\User\Services\DestroyUserService;
use App\Domains\User\Services\IndexUserService;
use App\Domains\User\Services\ShowUserService;
use App\Domains\User\Services\StoreUserService;
use App\Domains\User\Services\UpdateUserService;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
  public function __construct(
    protected IndexUserService $indexUser,
    protected StoreUserService $storeUser,
    protected UpdateUserService $updateUser,
    protected DestroyUserService $destroyUser,
  ) {}

  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $this->authorize('viewAny', User::class);

    logger()->info('request', $request->all());

    $users = $this->indexUser->execute(
      $request->only(
        [
          'search',
          'name',
          'email',
          'role',
          'status'
        ]
      )
    );

    return $this->render('user/index', [
      'users' => UserResource::collection($users),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $this->authorize('create', User::class);

    return Inertia::render('User/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreUserRequest $request)
  {
    $this->authorize('create', User::class);

    $user = $this->storeUser->execute($request->toDTO());

    return redirect()->route('users.index')->with('success', 'User created successfully.');
  }

  /**
   * Display the specified resource.
   */
  public function show(User $user)
  {
    $this->authorize('view', $user);

    return Inertia::render('User/Show', [
      'user' => UserResource::make($user),
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(User $user)
  {
    $this->authorize('update', $user);

    return Inertia::render('User/Edit', [
      'user' => $user,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateUserRequest $request, User $user)
  {
    $this->authorize('update', $user);

    $user = $this->updateUser->execute($request->toDTO(), $user);

    return redirect()->route('users.index')->with('success', 'User updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(User $user)
  {
    $this->authorize('delete', $user);

    $this->destroyUser->execute($user);

    return redirect()->route('users.index')->with('success', 'User deleted successfully.');
  }
}
