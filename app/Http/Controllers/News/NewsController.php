<?php

namespace App\Http\Controllers\News;

use App\Domains\News\Models\News;
use App\Domains\News\Repositories\News\NewsRepository;
use App\Domains\News\Resources\News\EditNewsResource;
use App\Domains\News\Resources\News\IndexNewsResource;
use App\Domains\News\Resources\News\ShowNewsResource;
use App\Domains\News\Services\News\DestroyNewsService;
use App\Domains\News\Services\News\StoreNewsService;
use App\Domains\News\Services\News\UpdateNewsService;
use App\Http\Controllers\Controller;
use App\Http\Requests\News\StoreNewsRequest;
use App\Http\Requests\News\UpdateNewsRequest;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function __construct(
        protected NewsRepository $news,
        protected StoreNewsService $storeNews,
        protected UpdateNewsService $updateNews,
        protected DestroyNewsService $destroyNews,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', News::class);

        $news = $this->news->index(
            $request->only([
                'search',
                'filters.status',
            ])
        );

        return $this->render('news/index', [
            'news' => IndexNewsResource::collection($news),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', News::class);

        return $this->render('news/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNewsRequest $request)
    {
        $this->authorize('create', News::class);

        $this->storeNews->execute($request->toDTO());

        return $this->response('news.index', 'Berita berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        $this->authorize('view', $news);

        return $this->render('news/show', [
            'news' => ShowNewsResource::make($news)->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        $this->authorize('update', $news);

        return $this->render('news/edit', [
            'news' => EditNewsResource::make($news)->resolve(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNewsRequest $request, News $news)
    {
        $this->authorize('update', $news);

        $this->updateNews->execute($request->toDTO(), $news);

        return $this->response('news.index', 'Berita berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $this->authorize('delete', $news);

        $this->destroyNews->execute($news);

        return $this->response('news.index', 'Berita berhasil dihapus.');
    }
}
