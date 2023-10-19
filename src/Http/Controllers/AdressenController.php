<?php

namespace Lukasmundt\Akquise\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Spatie\Navigation\Navigation;

class AdressenController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render(
            'lukasmundt/akquise::Editor',
            [
                'navigation' => app(Navigation::class)->tree(),
                'statistics' => [
                    'adressenAnzahl' => 100,
                    'personenAnzahl' => 10000001,
                    'massnahmenAnzahl' => 102,
                    'massnahmenAusgefuehrtAnzahl' => 103
                ]
            ]
        );
    }
}