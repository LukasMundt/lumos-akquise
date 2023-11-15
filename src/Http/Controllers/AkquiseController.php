<?php

namespace Lukasmundt\Akquise\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Lukasmundt\Akquise\Http\Requests\StoreAkquiseRequest;
use Lukasmundt\Akquise\Http\Requests\UpdateAkquiseRequest;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\Akquise\Http\Requests\FirstCreateAkquiseRequest;
use Lukasmundt\Akquise\Models\Projekt;
use Lukasmundt\Akquise\Services\CoordinatesService;
use Spatie\Navigation\Facades\Navigation;

class AkquiseController extends Controller
{
    public function index(Request $request)
    {
        (int) $page = !empty($request->page) ? (int) $request->page : 1;
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

    public function map(Request $request)
    {
        $projekte = $this->getClause($request->search)->select('projectci_projekt.coordinates_lat', 'projectci_projekt.coordinates_lon', 'projectci_projekt.strasse', 'projectci_projekt.hausnummer', 'akquise_akquise.projekt_id', 'akquise_akquise.retour', 'akquise_akquise.nicht_gewuenscht')->get();

        $normalMarkers = [];
        $retourMarkers = [];
        $nichtGewuenschtMarkers = [];

        foreach ($projekte as $projekt) {
            if ($projekt->retour) {
                $retourMarkers[] = [
                    'lat' => $projekt->coordinates_lat,
                    'lon' => $projekt->coordinates_lon,
                    'label' => $projekt->strasse . ' ' . $projekt->hausnummer,
                ];
            } else if ($projekt->nicht_gewuenscht) {
                $nichtGewuenschtMarkers[] = [
                    'lat' => $projekt->coordinates_lat,
                    'lon' => $projekt->coordinates_lon,
                    'label' => $projekt->strasse . ' ' . $projekt->hausnummer,
                ];
            } else {
                $normalMarkers[] = [
                    'lat' => $projekt->coordinates_lat,
                    'lon' => $projekt->coordinates_lon,
                    'label' => $projekt->strasse . ' ' . $projekt->hausnummer,
                ];
            }
        }
        $markers = [
            'layers' => [
                [
                    'name' => 'Projekte',
                    'markers' => $normalMarkers,
                ],
                [
                    'name' => 'retour-Projekte',
                    'markers' => $retourMarkers,
                    'markerColor' => 'yellow',
                ],
                [
                    'name' => 'nicht gewünscht-Projekte',
                    'markers' => $nichtGewuenschtMarkers,
                    'markerColor' => 'red',
                ],
            ]
        ];
        return Inertia::render('lukasmundt/akquise::Akquise/IndexMap', [
            // 'projekte' => $projekte,
            'markers' => $markers
        ]);
    }

    private function getClause($search = "")
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
            //->join('projectci_gruppeverknuepfung', 'akquise_akquise.id', '=', 'projectci_gruppeverknuepfung.gruppeverknuepfung_id')
            ->orderBy('projectci_projekt.strasse')
            ->orderBy('projectci_projekt.hausnummer_nummer');
    }

    public function firstCreate(Request $request): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/FirstCreate');
    }

    public function secondCreate(FirstCreateAkquiseRequest $request)
    {
        $response = CoordinatesService::getNominatimResponse($request->validated('strasse'));

        if (Cache::put($response['lat'] . '_' . $response['lon'], $response, now()->addDays(2))) {
            return redirect(
                route(
                    'akquise.akquise.create3',
                    ['key' => $response['lat'] . '_' . $response['lon']]
                )
            );
        }
    }

    public function thirdCreate(Request $request, string $key = null): Response
    {
        if (empty($key) || !Cache::has($key)) {
            return Inertia::render('lukasmundt/akquise::Akquise/Create', [
                'response' => [
                    'hausnummer' => '',
                    'strasse' => '',
                    'plz' => '',
                    'stadt' => '',
                    'stadtteil' => '',
                    'lat' => '',
                    'lon' => '',
                ]
            ]);
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
            'projekt' => $projekt->load(['akquise', 'akquise.gruppen.personen', 'akquise.notizen']),
        ]);
    }

    public function edit(Request $request, Projekt $projekt): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/Edit', [
            'projekt' => $projekt->load(['akquise']),
        ]);
    }

    public function update(UpdateAkquiseRequest $request, Projekt $projekt): RedirectResponse
    {
        $projekt->load('akquise');
        $projekt->akquise->update($request->validated());

        return redirect(route('akquise.akquise.show', ['projekt' => $projekt]));
    }
}