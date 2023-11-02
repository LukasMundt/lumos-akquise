<?php

namespace Lukasmundt\Akquise\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateAkquiseRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $this->merge([
            'nicht_gewuenscht' => $this->status=='Nicht gewünscht'?true:$this->nicht_gewuenscht,
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
            // 'strasse' => ['required', 'string', 'max:255'],
            // 'hausnummer' => ['required', 'string', 'max:50'],
            // 'hausnummer_nummer' => ['required', 'numeric'],
            // 'plz' => ['required', 'string', 'max:5'],
            // 'stadtteil' => ['required', 'string', 'max:50'],
            // 'stadt' => ['nullable', 'string', 'max:255'],
            // 'coordinates_lat' => ['nullable', 'numeric'],
            // 'coordinates_lon' => ['nullable', 'numeric'],
            'teilung' => ['required', 'boolean'],
            'abriss' => ['required', 'boolean'],
            'nicht_gewuenscht' => ['required', 'boolean'],
            'retour' => ['required', 'boolean'],
            'status' => ['required', 'string', 'max:255']
        ];
    }
}
