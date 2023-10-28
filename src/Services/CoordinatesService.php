<?php
namespace Lukasmundt\Akquise\Services;

use Illuminate\Support\Facades\Http;

class CoordinatesService
{
    public static function getNominatimResponse($strasse, $hausnummer, $stadt = "", $land = "de", $plz = "")
    {
        return Http::get('https://nominatim.openstreetmap.org/search.php', [
            'street' => $strasse . "+" . $hausnummer,
            'country' => $land,
            'format' => 'jsonv2'
        ]);
    }
}