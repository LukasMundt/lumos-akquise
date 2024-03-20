<?php

namespace Lukasmundt\Akquise\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Lukasmundt\Akquise\Http\Requests\StoreAssociationRequest;
use Lukasmundt\Akquise\Http\Requests\StorePersonRequest;
use Lukasmundt\Akquise\Http\Requests\UpdatePersonRequest;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\Akquise\Models\Gruppe;
use Lukasmundt\Akquise\Models\Projekt;
use Lukasmundt\ProjectCI\Models\Person;

class PersonController extends Controller
{
    public function associate(Request $request, $domain, Projekt $projekt)
    {
        $akquiseId = $projekt->akquise->id;
        $gruppenRaw = Gruppe::all()->load('akquise');
        $gruppen = [];

        foreach ($gruppenRaw as $gruppe) {

            if (!str_contains(Arr::query($gruppe->akquise->toArray()), $akquiseId . "")) {
                $gruppen[] = ['label' => $gruppe->namesAsString(), 'value' => $gruppe->id];
            }

        }

        return Inertia::render(
            'lukasmundt/akquise::Person/Associate',
            [
                'personen' => $gruppen,
                'projekt' => $projekt->id,
                'projektStr' => $projekt->getAddressAsString(),
            ]
        );
    }

    public function storeAssociation(StoreAssociationRequest $request, Projekt $projekt)
    {
        $gruppeId = $request->validated('nachname.value');
        $new = $request->validated('nachname.__isNew__');
        $akquise = $projekt->akquise->id;

        // if new person create new empty person, associate it with this and redirect to that
        if ($new) {
            $gruppe = new Gruppe();

            $person = Person::factory()->create(['nachname' => $gruppeId]);

            $gruppe->save();
            $gruppe->personen()->save($person);
            $gruppeId = $gruppe->id;
        }
        // associate with akquise-record
        $gruppe = Gruppe::where("id", $gruppeId)->first();
        $gruppe->akquise()->syncWithoutDetaching([$akquise]);
        $gruppe->akquise()->updateExistingPivot($akquise, ['typ' => $request->validated('typ.value')]);


        // if new redirect to person edit view
        if ($new) {
            return redirect(route('projectci.person.edit', ['person' => $person]));
        }
        // else redirect to akquise view
        else {
            return redirect(route('akquise.akquise.show', ['projekt' => $projekt]));
        }
    }
}