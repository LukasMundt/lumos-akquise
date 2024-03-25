<?php
namespace Lukasmundt\Akquise\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CoordinatesService
{
    public static function getNominatimShortResponse($strasseUndNummer, $stadt = "", $land = "de", $plz = "")
    {
        $results = [];

        // hier wird die Anfrage an OSM gestellt
        $response = Http::get('https://nominatim.openstreetmap.org/search.php', [
            'addressdetails' => '1',
            'street' => $strasseUndNummer,
            'country' => $land,
            'format' => 'jsonv2',
            'category' => 'building,place',
            'limit' => 40,
        ]);

        if ($response->successful()) {
            foreach ($response->json() as $item) {
                $composed = [
                    'hausnummer' => '',
                    'strasse' => '',
                    'plz' => '',
                    'stadt' => '',
                    'stadtteil' => '',
                ];
                $composed['strasse'] = isset ($item['address']['road']) ? $item['address']['road'] : "";
                $composed['hausnummer'] = isset ($item['address']['house_number']) ? $item['address']['house_number'] : "";
                $composed['plz'] = isset ($item['address']['postcode']) ? $item['address']['postcode'] : "";
                $composed['stadt'] = isset ($item['address']['city']) ? $item['address']['city'] : (isset ($item['address']['town']) ? $item['address']['town'] : (isset ($item['address']['village']) ? $item['address']['village'] : ""));
                $composed['stadtteil'] = isset ($item['address']['suburb']) ? $item['address']['suburb'] : "";

                $item['composed'] = $composed;

                $results[] = $item;
            }

        }

        return $results;
    }

    public static function detailsByCoordinates($lat, $lon)
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

        $secondResponse = Http::get('https://nominatim.openstreetmap.org/reverse.php', [
            'addressdetails' => '1',
            // 'osmtype' => $response->json()[0]['osm_type'],
            // 'osmid' => $response->json()[0]['osm_id'],
            'lat' => $lat,
            'lon' => $lon,
            'hierarchy' => 0,
            'group_hierarchy' => 1,
            'format' => 'jsonv2',
        ]);
        if (!$secondResponse->successful()) {
            Log::debug($secondResponse->json());
            return $result;
        }
        $result['strasse'] = isset ($secondResponse->json()['address']['road']) ? $secondResponse->json()['address']['road'] : "";
        $result['hausnummer'] = isset ($secondResponse->json()['address']['house_number']) ? $secondResponse->json()['address']['house_number'] : "";
        $result['plz'] = isset ($secondResponse->json()['address']['postcode']) ? $secondResponse->json()['address']['postcode'] : "";
        $result['stadt'] = isset ($secondResponse->json()['address']['city']) ? $secondResponse->json()['address']['city'] : "";
        $result['stadtteil'] = isset ($secondResponse->json()['address']['suburb']) ? $secondResponse->json()['address']['suburb'] : "";
        $result['lon'] = $lon;
        $result['lat'] = $lat;

        return $result;
    }
}