<?php

namespace Lukasmundt\Akquise\Models;

use Auth;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Lukasmundt\LaravelOwnership\Contracts\CanHaveOwner;
use Lukasmundt\LaravelOwnership\Traits\HasMorphOwner;
use Lukasmundt\ProjectCI\Models\Gruppe;
use Lukasmundt\ProjectCI\Models\Kampagne;
use Lukasmundt\ProjectCI\Models\Notiz;

// use Lukasmundt\ProjectCI\Models\Projekt as P;

class Akquise extends Model implements CanHaveOwner
{
    use HasUlids, HasMorphOwner;

    protected $table = "akquise_akquise";
    protected $primaryKey = "id";
    // protected $attributes = [
    //     'created_by' => Auth::user()->id,
    //     'updated_by' => Auth::user()->id,
    // ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'teilung',
        'abriss',
        'nicht_gewuenscht',
        'retour',
        'status',
    ];

    public function projekt(): BelongsTo
    {
        return $this->belongsTo(Projekt::class, 'id', 'id');
    }

    public function gruppen(): MorphToMany
    {
        return $this->morphToMany(Gruppe::class, 'gruppeverknuepfung', 'projectci_gruppeverknuepfung')->withPivot('typ', 'prioritaet');
    }

    public function notizen(): MorphMany
    {
        return $this->morphMany(Notiz::class, 'notierbar');
    }

    public function kampagnen(): MorphToMany
    {
        return $this->morphToMany(Kampagne::class, 'bewerbbar');
    }

    public function getRouteKeyName(): string
    {
        return 'id';
    }
}
