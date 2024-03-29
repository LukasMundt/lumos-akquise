<?php

namespace Lukasmundt\Akquise\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Lukasmundt\Akquise\Http\Requests\StoreAkquiseRequest;
use Lukasmundt\Akquise\Http\Requests\UpdateAkquiseRequest;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\Akquise\Http\Requests\FirstCreateAkquiseRequest;
use Lukasmundt\Akquise\Models\Projekt;
use Lukasmundt\Akquise\Services\CoordinatesService;

class AkquiseController extends Controller
{
    // public function __construct()
    // {
    //     $this->authorizeResource(Akquise::class, 'akquise');
    // }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Akquise::class);

        // (int) $page = !empty($request->page) ? (int) $request->page : 1;
        (String) $search = $request->search;
        (string) $filter = $request->filter;

        $filterVals = [];
        if ($filter != "") {
            $expl = explode(";", urldecode($filter));
            $filterVals = array();
            foreach ($expl as $value) {
                $filterVals[explode(':', $value)[0]] = explode(',', explode(':', $value)[1]);
            }
        }

        $projekte = Projekt::where(function (Builder $query) use ($filterVals) {
            $query->whereIn('strasse', $filterVals['strasse'] ?? [], 'and', !isset ($filterVals['strasse']) || count($filterVals['strasse']) == 0)
                ->whereIn('hausnummer', $filterVals['hausnummer'] ?? [], 'and', !isset ($filterVals['hausnummer']) || count($filterVals['hausnummer']) == 0)
                ->whereIn('stadtteil', $filterVals['stadtteil'] ?? [], 'and', !isset ($filterVals['stadtteil']) || count($filterVals['stadtteil']) == 0)
                ->whereIn('plz', $filterVals['plz'] ?? [], 'and', !isset ($filterVals['plz']) || count($filterVals['plz']) == 0);
        })->where(function (Builder $query) use ($search) {
            $query->where('strasse', 'LIKE', '%' . $search . '%')
                ->orWhere('hausnummer', 'LIKE', '%' . $search . '%')
                ->orWhere('plz', 'LIKE', '%' . $search . '%')
                ->orWhere('stadt', 'LIKE', '%' . $search . '%');
            // ->orWhere('akquise_akquise.status', 'LIKE', '%' . $search . '%')

        })
            // ->orderBy('strasse')
            // ->orderBy('hausnummer_nummer')
            ->get('*')
            ->load('akquise');


        // ->orWhere('projectci_projekt.plz', 'LIKE', '%' . $search . '%')
        // ->orWhere('projectci_projekt.stadt', 'LIKE', '%' . $search . '%')
        // ->orWhere('akquise_akquise.status', 'LIKE', '%' . $search . '%')


        // $projekte = $projekte->toQue
// == []?"true":"false"
        $projekteEmpty = json_decode(json_encode($projekte), 1) == [];

        return Inertia::render('lukasmundt/akquise::Akquise/Index', [
            // 'strasse' => $this->getClause()->select(DB::raw('count(strasse) as strasse_count,strasse'))
            //     ->groupBy('strasse')
            //     ->get(),
            // 'plz' => $this->getClause()->select(DB::raw('count(plz) as count,plz'))->groupBy('plz')->get(),
            // 'projekte' => $this->getClause($request->search)->select('projectci_projekt.*', 'akquise_akquise.*')->paginate(15, null, 'page', $page),
            'projekte' => $projekteEmpty ? [] : $projekte->toQuery()->paginate(),
            'search' => $search,
            'filter' => $filterVals,
            'filterCols' => [
                'Stadtteil' => $projekteEmpty ? [] : Projekt::all()->toQuery()->select(DB::raw('count(stadtteil) as count,stadtteil as value'))->groupBy('stadtteil')->get(),
                'PLZ' => $projekteEmpty ? [] : Projekt::all()->toQuery()->select(DB::raw('count(plz) as count,plz as value'))->groupBy('plz')->get(),
                'Strasse' => $projekteEmpty ? [] : Projekt::all()->toQuery()->select(DB::raw('count(strasse) as count,strasse as value'))->groupBy('strasse')->get(),
                // 'Retoure' => $projekte->toQuery()->select(DB::raw('count(akquise.retour) as count,akquise.retour'))->groupBy('akquise.retour')->get(),
            ],
            // 'test' => $projekte->toQuery()->paginate(),
        ]);
    }

    public function map(Request $request)
    {
        $this->authorize('viewAny', Akquise::class);

        $projekte = $this->getClause($request->search)->select('projectci_projekt.coordinates_lat', 'projectci_projekt.coordinates_lon', 'projectci_projekt.strasse', 'projectci_projekt.hausnummer', 'akquise_akquise.id', 'akquise_akquise.retour', 'akquise_akquise.nicht_gewuenscht')->get();

        $normalMarkers = [];
        $retourMarkers = [];
        $nichtGewuenschtMarkers = [];

        foreach ($projekte as $projekt) {
            if ($projekt->retour) {
                $retourMarkers[] = [
                    'lat' => $projekt->coordinates_lat,
                    'lon' => $projekt->coordinates_lon,
                    'label' => $projekt->strasse . ' ' . $projekt->hausnummer,
                    'url' => route('akquise.akquise.show', ['projekt' => $projekt->id, 'domain' => session()->get('team')])
                ];
            } else if ($projekt->nicht_gewuenscht) {
                $nichtGewuenschtMarkers[] = [
                    'lat' => $projekt->coordinates_lat,
                    'lon' => $projekt->coordinates_lon,
                    'label' => $projekt->strasse . ' ' . $projekt->hausnummer,
                    'url' => route('akquise.akquise.show', ['projekt' => $projekt->id, 'domain' => session()->get('team')])
                ];
            } else {
                $normalMarkers[] = [
                    'lat' => $projekt->coordinates_lat,
                    'lon' => $projekt->coordinates_lon,
                    'label' => $projekt->strasse . ' ' . $projekt->hausnummer,
                    'url' => route('akquise.akquise.show', ['projekt' => $projekt->id, 'domain' => session()->get('team')])
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

            ->join('akquise_akquise', 'projectci_projekt.id', '=', 'akquise_akquise.id', 'inner');
        //->join('projectci_gruppeverknuepfung', 'akquise_akquise.id', '=', 'projectci_gruppeverknuepfung.gruppeverknuepfung_id')
        // ->orderBy('projectci_projekt.strasse')
        // ->orderBy('projectci_projekt.hausnummer_nummer');
    }

    public function create(Request $request): Response
    {
        $this->authorize('create', Akquise::class);

        return Inertia::render('lukasmundt/akquise::Akquise/CreateComplete');
    }

    public function listCreatables(FirstCreateAkquiseRequest $request, $domain)
    {
        $this->authorize('create', Akquise::class);

        $results = CoordinatesService::getNominatimShortResponse($request->validated('strasse'));

        // foreach ($results as $i => $result) {
        //     if (Cache::put($result['lat'] . '_' . $result['lon'], $result, now()->addDays(2))) {
        //         $result['key'] = $result['lat'] . '_' . $result['lon'];
        //         $result['display_names'] = array_reverse(Str::of($result['display_name'])->explode(", ")->toArray());
        //         $results[$i] = $result;
        //     }
        // }

        return $results;
    }

    public function detailsByCoordinates(Request $request)
    {
        $validated = $request->validate(['lat' => 'required', 'lon' => 'required']);
        return CoordinatesService::detailsByCoordinates($validated['lat'], $validated['lon']);
    }

    public function store(StoreAkquiseRequest $request, string $key = null): RedirectResponse
    {
        $this->authorize('create', Akquise::class);

        if (!empty ($key)) {
            Cache::forget($key);
        }

        $projekt = Projekt::create($request->validated());
        // $projekt->save();
        Log::debug($projekt);
        $akquise = new Akquise($request->validated());
        $akquise->projekt()->associate($projekt);
        $akquise->save();
        $projekt->owner()->attach(Auth::user());
        $akquise->owner()->attach(Auth::user());
        // Auth::user()->owns()->attach($projekt);

        return redirect(route('akquise.akquise.show', ['projekt' => $projekt->akquise->id, 'domain' => session()->get('team')]));
    }

    public function show(string $domain, Akquise $projekt): Response
    {
        $akquise = $projekt;
        $this->authorize('view', $akquise);
        $projekt = $projekt->projekt;


        return Inertia::render('lukasmundt/akquise::Akquise/Show', [
            'projekt' => $projekt->load(['akquise', 'akquise.gruppen.personen.telefonnummern', 'akquise.notizen']),
            // 'notiz' => $notiz,
        ]);
    }

    public function edit(Request $request, Projekt $projekt): Response
    {
        $this->authorize('update', $projekt);

        return Inertia::render('lukasmundt/akquise::Akquise/Edit', [
            'projekt' => $projekt->load(['akquise']),
        ]);
    }

    public function update(UpdateAkquiseRequest $request, Projekt $projekt): RedirectResponse
    {
        $this->authorize('update', $projekt);

        $projekt->load('akquise');
        $projekt->akquise->update($request->validated());

        return redirect(route('akquise.akquise.show', ['projekt' => $projekt]));
    }
}