<?php

namespace Lukasmundt\Akquise\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Lukasmundt\Akquise\Http\Requests\StoreAkquiseRequest;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\Akquise\Http\Requests\FirstCreateAkquiseRequest;
use Lukasmundt\Akquise\Models\Projekt;
use Lukasmundt\Akquise\Services\CoordinatesService;

class AkquiseController extends Controller
{
    public function index(Request $request)
    {
        (int) $page = !empty($request->page)?(int) $request->page:1;
        (String) $search = $request->search;

        return Inertia::render('lukasmundt/akquise::Akquise/Index', [
            'strasse' => $this->getClause()->select(DB::raw('count(strasse) as strasse_count,strasse'))
                ->groupBy('strasse')
                ->get(),
            'plz' => $this->getClause()->select(DB::raw('count(plz) as plz_count,plz'))->groupBy('plz')->get(),
            'projekte' => $this->getClause($request->search)->select('projectci_projekt.*', 'akquise_akquise.*')->paginate(15, null, 'page', $page),
            'search' => $search,
        ]);
    }

    public function getClause($search = "")
    {
        return DB::table('projectci_projekt')
            // Suche
            ->where('projectci_projekt.strasse', 'LIKE', '%' . $search . '%')
            ->orWhere('projectci_projekt.hausnummer', 'LIKE', '%' . $search . '%')
            ->orWhere('projectci_projekt.plz', 'LIKE', '%' . $search . '%')
            ->orWhere('projectci_projekt.stadt', 'LIKE', '%' . $search . '%')
            ->orWhere('akquise_akquise.status', 'LIKE', '%' . $search . '%')
            // other
            
            ->join('akquise_akquise', 'projectci_projekt.id', '=', 'akquise_akquise.projekt_id', 'inner')
            ->orderBy('projectci_projekt.strasse')
            ->orderBy('projectci_projekt.hausnummer_nummer');
    }

    public function firstCreate(Request $request): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/FirstCreate');
    }

    public function secondCreate(FirstCreateAkquiseRequest $request)
    {
        $response = CoordinatesService::getNominatimResponse($request->validated('strasse'), $request->validated('hausnummer'));

        if (
            $response->successful() &&
            count($response->json()) == 1 &&
            Cache::put($response->json()[0]['lat'] . '_' . $response->json()[0]['lon'], [
                'lat' => $response->json()[0]['lat'],
                'lon' => $response->json()[0]['lon'],
                'data' => Str::of($response->json()[0]['display_name'])->explode(', '),
            ], now()->addDays(2))
        ) {
            return redirect(
                route(
                    'akquise.akquise.create3',
                    ['key' => $response->json()[0]['lat'] . '_' . $response->json()[0]['lon']]
                )
            );
        }
    }

    public function thirdCreate(Request $request, string $key = null): Response
    {
        if (empty($key) || !Cache::has($key)) {
            return Inertia::render('lukasmundt/akquise::Akquise/Create', ['response' => null]);
        }
        return Inertia::render('lukasmundt/akquise::Akquise/Create', ['response' => Cache::get($key), 'cacheKey' => $key]);
    }

    public function store(StoreAkquiseRequest $request, string $key = null): RedirectResponse
    {
        if (!empty($key)) {
            Cache::forget($key);
        }

        $projekt = Projekt::create($request->validated());
        // $projekt->save();
        Log::debug($projekt);
        $akquise = new Akquise($request->validated());
        $akquise->projekt()->associate($projekt);
        $akquise->save();

        return redirect(route('akquise.akquise.show', ['projekt' => $projekt]));
    }

    public function show(Request $request, Projekt $projekt): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/Show', [
            'projekt' => $projekt->load(['akquise']),
        ]);
    }

    public function edit(Request $request, Projekt $projekt): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/Edit', [
            'projekt' => $projekt->load(['akquise']),
        ]);
    }

    public function update(Request $request, Projekt $projekt): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/Edit');
    }
}