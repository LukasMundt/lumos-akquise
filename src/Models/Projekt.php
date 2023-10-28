<?php

namespace Lukasmundt\Akquise\Models;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Lukasmundt\ProjectCI\Models\Projekt as ProjektModel;

class Projekt extends ProjektModel
{
    public function akquise(): HasOne
    {
        return $this->hasOne(Akquise::class);
    }
}