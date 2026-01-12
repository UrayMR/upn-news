<?php

namespace App\Http\Controllers\Category;

use App\Domains\News\Models\Category;
use App\Domains\News\Repositories\Category\CategoryRepository;
use App\Domains\News\Resources\Category\EditCategoryResource;
use App\Domains\News\Resources\Category\IndexCategoryResource;
use App\Domains\News\Resources\Category\ShowCategoryResource;
use App\Domains\News\Services\Category\CategoryService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryRequest;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryRepository $categories,
        protected CategoryService $categoryService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Category::class);

        $categories = $this->categories->index(
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

        return $this->render('category/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $this->authorize('create', Category::class);

        $category = $this->categoryService->create($request->toDTO());

        return $this->response('categories.index', 'Kategori berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $this->authorize('view', $category);

        return $this->render('category/show', [
            'category' => ShowCategoryResource::make($category)->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $this->authorize('update', $category);

        return $this->render('category/edit', [
            'category' => EditCategoryResource::make($category)->resolve(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, Category $category)
    {
        $this->authorize('update', $category);

        $category = $this->categoryService->update($request->toDTO(), $category);

        return $this->response('categories.index', 'Kategori berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        $this->categories->destroy($category);

        return $this->response('categories.index', 'Kategori berhasil dihapus.');
    }
}
