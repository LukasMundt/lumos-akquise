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
    
    public function akquise(): MorphToMany
    {
        // return $this->morphedByMany(Akquise::class, 'gruppeverknuepfung', 'projectci_gruppeverknuepfung',null,null,null,'projekt_id')->withPivot('typ','prioritaet');
        return $this->morphedByMany(Akquise::class, 'gruppeverknuepfung', 'projectci_gruppeverknuepfung')->withPivot('typ','prioritaet');
    }
}
