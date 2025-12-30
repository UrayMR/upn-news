<?php

namespace App\Http\Controllers\User;

use App\Domains\User\Models\User;
use App\Domains\User\Services\CreateUserService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\User\StoreUserRequest;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
  public function __construct(protected CreateUserService $createUser) {}

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

    $user = $this->createUser->execute($request->toDTO(), $request->user());

    return response()->json($user, 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
