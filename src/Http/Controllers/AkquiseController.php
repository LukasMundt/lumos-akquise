<?php

namespace Lukasmundt\Akquise\Http\Controllers;

use App\Http\Controllers\Controller;
use Elibyy\TCPDF\Facades\TCPDF;
use Elibyy\TCPDF\FpdiTCPDFHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Lukasmundt\Akquise\Http\Requests\StoreAkquiseRequest;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\Akquise\Http\Requests\FirstCreateAkquiseRequest;
use Lukasmundt\Akquise\Models\Projekt;
use setasign\Fpdi\TcpdfFpdi;
use Spatie\Navigation\Navigation;
use setasign\Fpdi\Fpdi;

class Pdf extends TcpdfFpdi
{
    public function Header()
    {
        $this->setY(10);
        $this->SetFont('helvetica', 'B', 20);
        // $this->ImageSVG('https://fego-bauregie.de/images/logo.svg',null,null,1000);
        // Title
        // $this->Cell(0, 15, '<< TCPDF Example 003 >>', 0, false, 'C', 0, '', 0, false, 'M', 'M');
    }
    public function Footer()
    {
        $this->setY(-20);
        $this->writeHTML(View::make(
            'akquise::pdf.serienbrief.footer',
            [
                'footer' => 'Fußzeile',
            ]
        )->render());
    }
}
class AkquiseController extends Controller
{
    public function dashboard(Request $request): Response
    {
        return Inertia::render(
            'lukasmundt/akquise::Index',
            [
                'navigation' => app(Navigation::class)->tree(),
                'statistics' => [
                    'adressenAnzahl' => 100,
                    'personenAnzahl' => 1001,
                    'massnahmenAnzahl' => 102,
                    'massnahmenAusgefuehrtAnzahl' => 103
                ]
            ]
        );
    }

    public function firstCreate(Request $request): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/FirstCreate');
    }

    public function secondCreate(FirstCreateAkquiseRequest $request)
    {
        // if($request->fails()){
        //     return Inertia::render('lukasmundt/akquise::Akquise/FirstCreate');
        // }
        $response = Http::get('https://nominatim.openstreetmap.org/search.php', [
            'street' => $request->validated('strasse') . "+" . $request->validated('hausnummer'),
            'country' => 'de',
            'format' => 'jsonv2'
        ]);



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
        return Inertia::render('lukasmundt/akquise::Akquise/Create', ['response' => Cache::get($key)]);
    }

    public function pdf(Request $request)
    {
        // $pdf = new Fpdi();
        // $pdf->setSourceFile("C:/Users/lukas/Downloads/Serienbrief 2023.pdf");
        // $pdf->AddPage();
        // $tpl = $pdf->importPage(1);
        // $pdf->useTemplate($tpl);
        // $pdf->Output('I');

        $pdf = new Pdf();
        $pdf->SetTitle('hallo');
        // $pdf->setHeaderCallback(function ($pdf) {
        //     // $pdf->SetY();
        //     // Set font
        //     $pdf->SetFont('helvetica', 'I', 8);
        //     // Page number
        //     $pdf->Cell(0, 0, 'Page ' . $pdf->getAliasNumPage() . '/' . $pdf->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        // });
        // $pdf->Header();
        $pdf->SetMargins(20, 20, 20);

        // $pdf->addFont('')
        $pdf->setFont('dejavusans');
        $pdf->setSourceFile(""); // fill in the path to the source file here
        $pdf->AddPage();
        $tpl = $pdf->importPage(1);
        $pdf->useTemplate($tpl);
        $pdf->setY(41);
        $pdf->writeHtml(View::make(
            'akquise::pdf.serienbrief.adresse',
            [
                'absender' => 'Absender',
            ]
        )->render());
        // $pdf->AddPage();
        $pdf->Output();
        // TCPDF::setHeaderCallback(function ($pdf) {
        //     // $pdf->SetY();
        //     // Set font
        //     $pdf->SetFont('helvetica', 'I', 8);
        //     // Page number
        //     $pdf->Cell(0, 0, 'Page ' . $pdf->getAliasNumPage() . '/' . $pdf->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        // });
        // // TCPDF::setHeaderMargin(0);
        // TCPDF::SetMargins(20, 50, 20);
        // TCPDF::AddPage();
        // TCPDF::writeHtml(View::make(
        //     'akquise::greeting',
        //     [
        //         'name' => 'James',
        //         'logoPath' => ''
        //     ]
        // )->render());
        // TCPDF::Output();

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

        // $projekt = Projekt::find($projekt->projekt_id);

        

        return redirect(route('akquise.akquise.show', ['projekt' => $projekt]));

    }

    public function edit(Request $request, Projekt $projekt): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/Create');
    }

    public function update(Request $request, Akquise $akquise): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/Create');
    }

    public function show(Request $request, Projekt $projekt): Response
    {
        return Inertia::render('lukasmundt/akquise::Akquise/Show', [
            'strassen' => Projekt::select('strasse')->distinct()->get(),
            'projekt' => $projekt,
        ]);
    }
}

