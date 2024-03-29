<?php

namespace Lukasmundt\Akquise\Http\Controllers;

use App\Http\Controllers\Controller as LaravelController;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\Akquise\Models\Gruppe;
use Lukasmundt\Akquise\Models\Projekt;
use Lukasmundt\ProjectCI\Models\Person;
use Lukasmundt\ProjectCI\Models\Telefonnummer;
use Spatie\Navigation\Navigation;


class Controller extends LaravelController
{
    public function dashboard(Request $request)
    {
        // $json = file_get_contents('C:\Users\lukas\Downloads\20231217_fego.json');
        // $json = json_decode($json, true);


        // foreach ($json[2]['data'] as $key => $adresse) {
        //     $projekt = Projekt::create([
        //         'strasse' => $adresse['Straße'],
        //         'hausnummer' => $adresse['Hausnummer'],
        //         'hausnummer_nummer' => Str::remove(Str::of('a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z')->explode(','), $adresse['Hausnummer']),
        //         'plz' => $adresse['Postleitzahl'],
        //         'stadtteil' => $adresse['Stadtteil'],
        //         'stadt' => $adresse['Stadt'],
        //         'coordinates_lat' => $adresse['lat'],
        //         'coordinates_lon' => $adresse['lon'],
        //         'deleted_at' => $adresse['Flag'] == 'sichtbar' ? null : Carbon::now(),
        //     ]);
        //     $akquise = new Akquise([
        //         'teilung' => $adresse['Teilung'] == "WAHR" ? true : false,
        //         'abriss' => $adresse['Abriss'] == "WAHR" ? true : false,
        //         'nicht_gewuenscht' => $adresse['NichtGewuenscht'] == "WAHR" || $adresse['Status'] == "Nicht gewünscht" ? true : false,
        //         'retour' => $adresse['Retour'] == "WAHR" ? true : false,
        //         'status' => $adresse['Status'],
        //     ]);
        //     $akquise->projekt()->associate($projekt);
        //     $akquise->save();

        //     // Alle Verknüpfungen zwischen Person und Adresse durchgehen
        //     foreach ($json[4]['data'] as $value) {
        //         // wenn die die Verknüpfung nicht zu der aktuellen Adresse passt wird die nächste Verknüpfung aufgerufen
        //         if ($value['IDAdressen'] != $adresse['ID']) {
        //             continue;
        //         } else {
        //             // wenn die aktuelle Verknüpfung zu der aktuellen Adresse gehört
        //             // Gruppe wird erstellt
        //             $gruppe = new Gruppe([
        //                 // 'typ' => $value['Beziehung'] == 'Eigentümer' || $value['Eigentümer'] == 'WAHR'?'eigentuemer':($value['Nachbar'] == 'WAHR'?"nachbar":""),
        //             ]);
        //             // nach Person wird gesucht
        //             foreach ($json[6]['data'] as $eigentuemer) {
        //                 if ($value['IDEigentuemer'] != $eigentuemer['IDEigentuemer']) {
        //                     // falscher Eigentümer --> weiter zum nächsten
        //                     continue;
        //                 } else {
        //                     // zugehörige Person gefunden --> Gruppe in Datenbank speichern
        //                     $person = new Person([
        //                         'anrede' => $eigentuemer['Anrede'],
        //                         'vorname' => $eigentuemer['Vorname'],
        //                         'nachname' => $eigentuemer['Nachname'],
        //                         'email' => $eigentuemer['Mail'],
        //                     ]);
        //                     $gruppe->save();
        //                     $gruppe->personen()->save($person);
        //                     if (!empty($eigentuemer['Telefon'])) {
        //                         $person->telefonnummern()->save(Telefonnummer::create([
        //                             'telefonnummer' => $eigentuemer['Telefon'],
        //                         ]));
        //                     }

        //                 }
        //             }
        //             // --> Gruppe wird erstellt
        //             Log::debug($akquise);
        //             Log::debug($gruppe);
        //             if ($gruppe->id != null) {
        //                 $gruppe->akquise()->attach($akquise->id, [
        //                     'typ' => $value['Beziehung'] == 'Eigentümer' || $value['Eigentümer'] == 'WAHR' ? 'eigentuemer' : ($value['Nachbar'] == 'WAHR' ? "nachbar" : ""),
        //                 ]);
        //             }
                    

        //         }
        //     }

        // }
        return redirect('');
        // return Inertia::render(
        //     'lukasmundt/akquise::Dashboard',
        //     [
        //         'navigation' => app(Navigation::class)->tree(),
        //         'statistics' => [
        //             'adressenAnzahl' => Projekt::has('akquise')->count(),
        //             'personenAnzahl' => 1001,
        //             'massnahmenAusgefuehrtAnzahl' => 103,

        //         ],
        //     ]
        // );
    }

    

    public function pdf(Request $request)
    {


        $pdf = new Pdf();
        $pdf->SetTitle('Serienbrief');
        $pdf->SetMargins(20, 20, 20);
        $pdf->setFont('dejavusans');

        $pdf->setSourceFile("C:\Users\lukas\Downloads\Serienbrief 2023-vorlage.pdf"); // fill in the path to the source file here
        $tpl = $pdf->importPage(1);


        // Block
        $projekte = Projekt::whereRelation('akquise', 'nicht_gewuenscht', false)
            // ->whereRelation('akquise.gruppen','typ','!=','nachbar')
            ->where('Stadtteil', 'Niendorf')
            ->orWhere('Stadtteil', 'Lokstedt')
            ->get();

        foreach ($projekte as $key => $projekt) {
            // akquise element aufgerufen
            $projekt = $projekt->load(['akquise.gruppen.personen']);

            // leeres Array empfaenger erzeugt - mehrere Empfaenger möglich, jeder mit Adresse
            $empfaenger = [];
            if (count($projekt->akquise->gruppen) > 0) {
                // hat gruppen-elemente
                foreach ($projekt->akquise->gruppen as $gruppe) {
                    $adressat = '';

                    if ($gruppe->pivot->typ == 'nachbar') {
                        continue;
                    }

                    foreach ($gruppe->personen as $person) {
                        if (!empty($adressat)) {
                            $adrssat .= ' und ';
                        }
                        $result = (empty($person->vorname) ? $person->anrede . " " : "") . (empty($person->titel) ? "" : $person->titel . " ") . (empty($person->vorname) ? "" : $person->vorname . " ") . (empty($person->nachname) ? "" : $person->nachname . " ");
                        if (!empty($person->nachname)) {
                            $adressat .= $result;
                        }

                    }
                    $empfaenger[] = [
                        strlen($adressat) > 30 ? 'die Eigentümer' : (empty($adressat) ? 'die Eigentümer' : $adressat),
                        $projekt->strasse . " " . $projekt->hausnummer,
                        $projekt->plz . ' ' . $projekt->stadt,
                        'Sehr geehrte Damen und Herren,'
                    ];
                }

            } else {
                // keine Personen zugeordnet
                $empfaenger[] = [
                    'die Eigentümer',
                    $projekt->strasse . " " . $projekt->hausnummer,
                    $projekt->plz . ' ' . $projekt->stadt,
                    'Sehr geehrte Damen und Herren,'
                ];
            }


            // jede Gruppe zu Empfaenger hinzufügen -> mit Namen aller Personen bei zwei Personen -> als Methode des Models Gruppe implementieren -> Gruppenmitglieder müssen gleiche Adresse haben -> migration

            foreach ($empfaenger as $adressat) {
                $pdf->AddPage();

                $pdf->useTemplate($tpl);
                $pdf->setY(41);
                $pdf->writeHtml(View::make(
                    'akquise::pdf.serienbrief.adresse',
                    [
                        'absender' => '',
                        'empfaenger' => $adressat[0],
                        'strasseHausnummer' => $adressat[1],
                        'plzStadt' => $adressat[2],
                        'datum' => 'Hamburg, im Oktober 2023',
                        'ansprache' => $adressat[3]
                    ]
                )->render());
            }
        }

        return $pdf->Output();
    }
}