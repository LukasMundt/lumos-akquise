<?php

namespace Lukasmundt\Akquise\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FirstCreateAkquiseRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'strasse' => ['required', 'string', 'max:255'],
            // 'hausnummer' => ['required', 'string', 'max:255'],
        ];
    }
}
