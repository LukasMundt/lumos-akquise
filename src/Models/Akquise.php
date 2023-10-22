<?php

namespace Lukasmundt\Akquise\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

// use Lukasmundt\ProjectCI\Models\Projekt as P;

class Akquise extends Model
{
    // use HasUlids;

    protected $table = "akquise_akquise";
    protected $primaryKey = "projekt_id";

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
        return $this->belongsTo(Projekt::class,'projekt_id','id');
    }
}
