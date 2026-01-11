<?php

namespace App\Http\Controllers\Category;

use App\Domains\News\Models\Category;
use App\Domains\News\Resources\Category\EditCategoryResource;
use App\Domains\News\Resources\Category\IndexCategoryResource;
use App\Domains\News\Resources\Category\ShowCategoryResource;
use App\Domains\News\Services\Category\DestroyCategoryService;
use App\Domains\News\Services\Category\IndexCategoryService;
use App\Domains\News\Services\Category\StoreCategoryService;
use App\Domains\News\Services\Category\UpdateCategoryService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function __construct(
        protected IndexCategoryService $indexCategory,
        protected StoreCategoryService $storeCategory,
        protected UpdateCategoryService $updateCategory,
        protected DestroyCategoryService $destroyCategory,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Category::class);

        $categories = $this->indexCategory->execute(
            $request->only([
                'search',
                'filters.status',
            ])
        );

        return $this->render('category/index', [
            'categories' => IndexCategoryResource::collection($categories),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Category::class);

        return Inertia::render('category/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $this->authorize('create', Category::class);

        $category = $this->storeCategory->execute($request->toDTO());

        return $this->response('categories.index', 'Kategori berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $this->authorize('view', $category);

        return Inertia::render('category/show', [
            'category' => ShowCategoryResource::make($category)->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $this->authorize('update', $category);

        return Inertia::render('category/edit', [
            'category' => EditCategoryResource::make($category)->resolve(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->authorize('update', $category);

        $category = $this->updateCategory->execute($request->toDTO(), $category);

        return $this->response('categories.index', 'Kategori berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        $this->destroyCategory->execute($category);

        return $this->response('categories.index', 'Kategori berhasil dihapus.');
    }
}
