<?php

namespace Lukasmundt\Akquise\Models;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Lukasmundt\Akquise\Models\Akquise;
use Lukasmundt\LaravelOwnership\Contracts\CanHaveOwner;
use Lukasmundt\LaravelOwnership\Traits\HasMorphOwner;
use Lukasmundt\ProjectCI\Models\Projekt as ProjektModel;

class Projekt extends ProjektModel implements CanHaveOwner
{
    use HasMorphOwner;
    
    public function akquise(): HasOne
    {
        return $this->hasOne(Akquise::class, 'id');
    }
}