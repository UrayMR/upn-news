<?php

namespace App\Http\Controllers\User;

use App\Domains\User\Models\User;
use App\Domains\User\Services\StoreUserService;
use App\Domains\User\Services\UpdateUserService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
  public function __construct(
    protected StoreUserService $createUser,
    protected UpdateUserService $updateUser
  ) {}

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreUserRequest $request)
  {
    Gate::authorize('create', User::class);

    $user = $this->createUser->execute($request->toDTO());

    return response()->json($user, 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(User $user)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(User $user)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateUserRequest $request, User $user)
  {
    Gate::authorize('update', $user);

    $user = $this->updateUser->execute($request->toDTO(), $user);

    return response()->json($user, 201);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(User $user)
  {
    //
  }
}
