<?php

namespace Lukasmundt\Akquise\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Notifications\Notifiable;
use \Lukasmundt\ProjectCI\Models\Gruppe as GruppeModel;
use Lukasmundt\ProjectCI\Models\Person;

class Gruppe extends GruppeModel
{
    // use HasUlids;

    // protected $table = "projectci_gruppe";

    // public function personen(): HasMany{
    //     return $this->hasMany(Person::class);
    // }

    // public function akquise(): MorphTo
    // {
    //     return $this->morphTo();
    // }
    public function akquise(): MorphToMany
    {
        return $this->morphedByMany(Akquise::class, 'gruppeverknuepfung', 'projectci_gruppeverknuepfung',null,null,null,'projekt_id')->withPivot('typ','prioritaet');
    }
}
