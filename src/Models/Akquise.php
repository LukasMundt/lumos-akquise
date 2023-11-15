<?php

namespace Lukasmundt\Akquise\Models;

use Auth;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Lukasmundt\ProjectCI\Models\Gruppe;
use Lukasmundt\ProjectCI\Models\Notiz;

// use Lukasmundt\ProjectCI\Models\Projekt as P;

class Akquise extends Model
{
    use HasUlids;

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
        return $this->belongsTo(Projekt::class);
    }

    public function gruppen(): MorphToMany
    {
        return $this->morphToMany(Gruppe::class, 'gruppeverknuepfung', 'projectci_gruppeverknuepfung')->withPivot('typ','prioritaet');
    }

    public function notizen(): MorphMany
    {
        return $this->morphMany(Notiz::class, 'notierbar');
    }
}
