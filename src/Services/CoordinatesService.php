<?php
namespace Lukasmundt\Akquise\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CoordinatesService
{
    public static function getNominatimResponse($strasse, $stadt = "", $land = "de", $plz = "")
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
        Log::debug($response);


        if (!$response->successful() || count($response->json()) != 1) {
            // Entweder die Anfrage war nicht erfolgreich oder es passen mehrere Einträge auf die Suchparameter
            // dem wird hier nicht Rechnung getragen. Es werden lediglich die Straße und die Hausnummer ausgegeben.
            $result = [];
            $result['hausnummer'] = last((array) Str::of($strasse)->explode(' '));
            $result['strasse'] = Str::squish(Str::replace($result['hausnummer'], '', $strasse));

            return $result;
        } else {
            // es gibt nur einen Treffer
            $secondResponse = Http::get('https://nominatim.openstreetmap.org/reverse.php', [
                'addressdetails' => '1',
                // 'osmtype' => $response->json()[0]['osm_type'],
                // 'osmid' => $response->json()[0]['osm_id'],
                'lat' => $response->json()[0]['lat'],
                'lon' => $response->json()[0]['lon'],
                'hierarchy' => 0,
                'group_hierarchy' => 1,
                'format' => 'jsonv2',
            ]);
            if(!$secondResponse->successful()){
                Log::debug($secondResponse->json());
                return $result;
            }
            $result['strasse'] = isset($secondResponse->json()['address']['road']) ? $secondResponse->json()['address']['road'] : "";
            $result['hausnummer'] = isset($secondResponse->json()['address']['house_number']) ? $secondResponse->json()['address']['house_number'] : "";
            $result['plz'] = isset($secondResponse->json()['address']['postcode']) ? $secondResponse->json()['address']['postcode'] : "";
            $result['stadt'] = isset($secondResponse->json()['address']['city']) ? $secondResponse->json()['address']['city'] : "";
            $result['stadtteil'] = isset($secondResponse->json()['address']['suburb']) ? $secondResponse->json()['address']['suburb'] : "";
            $result['lon'] = $response->json()[0]['lon'];
            $result['lat'] = $response->json()[0]['lat'];
            Log::debug($result);
            Log::debug($secondResponse->json());
            return $result;
        }
    }
}