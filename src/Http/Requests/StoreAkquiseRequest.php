<?php

namespace Lukasmundt\Akquise\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StoreAkquiseRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $this->merge([
            'hausnummer' => Str::lower($this->hausnummer),
            'hausnummer_nummer' => Str::remove(Str::of('a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z')->explode(','), $this->hausnummer),
            'hausnummer_buchstabe' => Str::remove(Str::of('0,1,2,3,4,5,6,7,8,9')->explode(','), $this->hausnummer),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'strasse' => ['required', 'string', 'max:255'],
            'hausnummer' => ['required', 'string', 'max:50'],
            'hausnummer_nummer' => ['required', 'numeric'],
            'hausnummer_buchstabe' => ['nullable', 'string', 'max:50'],
            'plz' => ['required', 'string', 'max:5'],
            'stadtteil' => ['required', 'string', 'max:50'],
            'stadt' => ['nullable', 'string', 'max:255'],
            'coordinates_lat' => ['nullable', 'numeric'],
            'coordinates_lon' => ['nullable', 'numeric'],
            'teilung' => ['required', 'boolean'],
            'abriss' => ['required', 'boolean'],
            'nicht_gewuenscht' => ['required', 'boolean'],
            'retour' => ['required', 'boolean'],
            'status' => ['required', 'string', 'max:255']
        ];
    }
}