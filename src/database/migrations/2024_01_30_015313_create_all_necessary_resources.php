<?php

use App\Models\NavItem;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Permission::findOrCreate('create-akquise-item', 'web');
        Permission::findOrCreate('edit-own-akquise-item', 'web');
        Permission::findOrCreate('delete-own-akquise-item', 'web');

        Permission::findOrCreate('edit-all-akquise-items', 'web');
        Permission::findOrCreate('delete-all-akquise-items', 'web');
        Permission::findOrCreate('view-all-akquise-items', 'web');

        $top = NavItem::factory()->create([
            "team_permissions" => ['akquise_standard'],
            "label" => "Akquise",
            'route' => "akquise.dashboard",
        ]);
        NavItem::factory()->create([
            'top_item' => $top,
            "team_permissions" => ['akquise_standard'],
            "label" => "Karte",
            'route' => "akquise.akquise.map",
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akquise_akquise');
    }
};
