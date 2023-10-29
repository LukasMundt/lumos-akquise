<?php
namespace Lukasmundt\Akquise\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CoordinatesService
{
    public static function getNominatimResponse($strasse, $hausnummer, $stadt = "", $land = "de", $plz = "")
    {
        // hier wird das Array initialiesiert, und alle Werte leer gesetzt. Einige werden später ggf. geändert
        $result = [
            'hausnummer' => '',
            'strasse' => '',
            'plz' => '',
            'stadt' => '',
            'stadtteil' => '',
            'lat' => 0,
            'lon' => 0,
        ];
        // hier wird die Anfrage an OSM gestellt
        $response = Http::get('https://nominatim.openstreetmap.org/search.php', [
            'street' => $strasse,
            'country' => $land,
            'format' => 'jsonv2'
        ]);


        if (!$response->successful() || count($response->json()) != 1) {
            // Entweder die Anfrage war nicht erfolgreich oder es passen mehrere Einträge auf die Suchparameter
            // dem wird hier nicht Rechnung getragen. Es werden lediglich die Straße und die Hausnummer ausgegeben.
            $result = [];
            $result['hausnummer'] = last((array) Str::of($strasse)->explode(' '));
            $result['strasse'] = Str::squish(Str::replace($result['hausnummer'], '', $strasse));

            return $result;
        } else {
            // es gibt nur einen Treffer
            $secondResponse = Http::get('https://nominatim.openstreetmap.org/details.php', [
                'osms_id' => $response->json()[0]['osm_id'],
                'adressdetails' => 1,
                'hierarchy' => 0,
                'group_hierarchy' => 1,
                'format' => 'json',
            ]);
            $result['strasse'] = isset($secondResponse->json()['addresstags']['street']) ? $secondResponse->json()['addresstags']['street'] : "";
            $result['hausnummer'] = isset($secondResponse->json()['addresstags']['housenumber']) ? $secondResponse->json()['addresstags']['housenumber'] : "";
            $result['plz'] = isset($secondResponse->json()['addresstags']['postcode']) ? $secondResponse->json()['addresstags']['postcode'] : "";
            $result['stadt'] = isset($secondResponse->json()['addresstags']['city']) ? $secondResponse->json()['addresstags']['city'] : "";
            $result['lon'] = isset($secondResponse->json()['geometry']['coordinates'][0]) ? $secondResponse->json()['geometry']['coordinates'][0] : "";
            $result['lat'] = isset($secondResponse->json()['geometry']['coordinates'][1]) ? $secondResponse->json()['geometry']['coordinates'][1] : "";
            Log::debug($result);
            Log::debug($secondResponse->json());
            return $result;
        }
    }
}